import { NextResponse } from 'next/server';
import { eq, like, desc, sql, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema';
import { createPageSchema } from '@/schemas/pageSchema';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const search = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 10);
  const offset = (page - 1) * limit;

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const query = db
    .select()
    .from(pages)
    .where(
      search
        ? and(eq(pages.userId, userId), like(pages.title, `%${search}%`))
        : eq(pages.userId, userId)
    )
    .orderBy(desc(pages.createdAt))
    .limit(limit)
    .offset(offset);

  const result = await query;
  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(pages)
    .where(eq(pages.userId, userId));

  return NextResponse.json({
    data: result,
    pagination: {
      page,
      limit,
      total: total[0]?.count ?? 0,
      totalPages: Math.ceil((total[0]?.count ?? 0) / limit),
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createPageSchema.parse(body);

    const newPage = {
      id: nanoid(),
      userId: parsed.userId,
      title: parsed.title,
      slug: parsed.slug,
      description: parsed.description ?? '',
      theme: parsed.theme ?? 'default',
      isPublished: parsed.isPublished ? 1 : 0,
    };

    await db.insert(pages).values(newPage);

    return NextResponse.json({ success: true, page: newPage }, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
