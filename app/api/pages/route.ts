import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, and, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '@/drizzle/db';
import { links, pages } from '@/drizzle/schema';

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
            .limit(1);

        if (userPage.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        const result = await db
            .select()
            .from(links)
            .where(eq(links.pageId, pageId))
            .orderBy(desc(links.order));

        return NextResponse.json({ data: result });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
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
        
        // Verify that the page belongs to the user
        const userPage = await db
            .select()
            .from(pages)
            .where(and(eq(pages.id, body.pageId), eq(pages.userId, user.id)))
            .limit(1);

        if (userPage.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        const newLink = {
            id: nanoid(),
            pageId: body.pageId,
            title: body.title,
            url: body.url,
            icon: body.icon || '🔗',
            isActive: body.isActive ? 1 : 0,
            order: body.order || 0,
        };

        await db.insert(links).values(newLink);

        return NextResponse.json({ success: true, link: newLink }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
    }
}