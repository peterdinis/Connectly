import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema';
import { updatePageSchema } from '@/schemas/pageSchema';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const page = await db
            .select()
            .from(pages)
            .where(and(eq(pages.id, params.id), eq(pages.userId, user.id)))
            .get();

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify page belongs to user
        const userPage = await db
            .select()
            .from(pages)
            .where(and(eq(pages.id, params.id), eq(pages.userId, user.id)))
            .get();

        if (!userPage) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        const body = await req.json();
        const parsed = updatePageSchema.parse(body);

        const updateData: {
            title?: string;
            slug?: string;
            description?: string;
            theme?: string;
            isPublished?: number;
            updatedAt?: string;
        } = {
            updatedAt: new Date().toISOString()
        };

        if (parsed.title !== undefined) updateData.title = parsed.title;
        if (parsed.slug !== undefined) updateData.slug = parsed.slug;
        if (parsed.description !== undefined) updateData.description = parsed.description;
        if (parsed.theme !== undefined) updateData.theme = parsed.theme;
        if (parsed.isPublished !== undefined) updateData.isPublished = parsed.isPublished ? 1 : 0;

        await db
            .update(pages)
            .set(updateData)
            .where(eq(pages.id, params.id));

        const updated = await db
            .select()
            .from(pages)
            .where(eq(pages.id, params.id))
            .get();

        return NextResponse.json(updated);
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify page belongs to user
        const userPage = await db
            .select()
            .from(pages)
            .where(and(eq(pages.id, params.id), eq(pages.userId, user.id)))
            .get();

        if (!userPage) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        await db.delete(pages).where(eq(pages.id, params.id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}