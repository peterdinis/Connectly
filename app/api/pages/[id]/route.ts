import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema';
import { updatePageSchema } from '@/schemas/pageSchema';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const page = await db.select().from(pages).where(eq(pages.id, params.id)).get();

    if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const parsed = updatePageSchema.parse(body);

        const updateData: {
            title?: string;
            slug?: string;
            description?: string;
            theme?: string;
            isPublished?: number;
        } = {};

        if (parsed.title !== undefined) updateData.title = parsed.title;
        if (parsed.slug !== undefined) updateData.slug = parsed.slug;
        if (parsed.description !== undefined) updateData.description = parsed.description;
        if (parsed.theme !== undefined) updateData.theme = parsed.theme;
        if (parsed.isPublished !== undefined) updateData.isPublished = parsed.isPublished ? 1 : 0;

        await db.update(pages).set(updateData).where(eq(pages.id, params.id));

        const updated = db.select().from(pages).where(eq(pages.id, params.id)).get();

        return NextResponse.json(updated);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await db.delete(pages).where(eq(pages.id, params.id));
    return NextResponse.json({ success: true });
}
