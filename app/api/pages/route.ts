import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, like, desc, sql, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema';

// Schema pre vytvorenie stránky
const createPageSchema = {
  userId: (value: string) => typeof value === 'string' && value.length > 0,
  title: (value: string) => typeof value === 'string' && value.length > 0,
  slug: (value: string) => typeof value === 'string' && value.length > 0,
};

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') ?? '';
    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? 10);
    const offset = (page - 1) * limit;

    // Fetch pages for the authenticated user
    const result = await db
      .select()
      .from(pages)
      .where(
        search
          ? and(eq(pages.userId, user.id), like(pages.title, `%${search}%`))
          : eq(pages.userId, user.id)
      )
      .orderBy(desc(pages.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(pages)
      .where(eq(pages.userId, user.id));

    const total = totalResult[0]?.count ?? 0;

    return NextResponse.json({
      data: result,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Validácia vstupných dát
    if (!createPageSchema.userId(body.userId)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }
    if (!createPageSchema.title(body.title)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
    }
    if (!createPageSchema.slug(body.slug)) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    // Ensure the user can only create pages for themselves
    if (body.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if slug already exists
    const existingSlug = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, body.slug))
      .get();

    if (existingSlug) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    const newPage = {
      id: nanoid(),
      userId: body.userId,
      title: body.title,
      slug: body.slug,
      description: body.description ?? '',
      theme: body.theme ?? 'default',
      isPublished: body.isPublished ? 1 : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.insert(pages).values(newPage);

    return NextResponse.json({ success: true, page: newPage }, { status: 201 });
  } catch (err) {
    console.error('Error creating page:', err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}