import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { links, pages } from '@/drizzle/schema';
import { nanoid } from 'nanoid';

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
    }

    // Verify that the page belongs to the user
    const userPage = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)))
      .get();

    if (!userPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Get links for the page
    const result = await db
      .select()
      .from(links)
      .where(eq(links.pageId, pageId))
      .orderBy(links.order);

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Error fetching links:', error);
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
    const { pageId, title, url, isActive = true, order = 0, icon = '🔗' } = body;

    // Validate required fields
    if (!pageId || !title || !url) {
      return NextResponse.json(
        { error: 'Missing required fields: pageId, title, url' },
        { status: 400 }
      );
    }

    // Verify that the page belongs to the user
    const userPage = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)))
      .get();

    if (!userPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Create new link
    const newLink = {
      id: nanoid(),
      pageId,
      title,
      url,
      isActive: isActive ? 1 : 0,
      order,
      icon,
    };

    const result = await db
      .insert(links)
      .values(newLink)
      .returning();

    return NextResponse.json({ 
      message: 'Link created successfully',
      link: result[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}