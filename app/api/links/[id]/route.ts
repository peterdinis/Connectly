import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { links, pages } from '@/drizzle/schema';

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    // Najprv nájdeme link a overíme, že patrí používateľovi
    const linkWithPage = await db
      .select({
        link: links,
        page: pages,
      })
      .from(links)
      .innerJoin(pages, eq(links.pageId, pages.id))
      .where(and(eq(links.id, id), eq(pages.userId, user.id)))
      .get();

    if (!linkWithPage) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Pripravíme updates
    const updates: any = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.url !== undefined) updates.url = body.url;
    if (body.icon !== undefined) updates.icon = body.icon;
    if (body.isActive !== undefined) updates.isActive = body.isActive ? 1 : 0;
    if (body.order !== undefined) updates.order = body.order;

    // Aktualizujeme link
    const result = await db
      .update(links)
      .set(updates)
      .where(eq(links.id, id))
      .returning();

    return NextResponse.json({ 
      message: 'Link updated successfully',
      link: result[0]
    });

  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Najprv nájdeme link a overíme, že patrí používateľovi
    const linkWithPage = await db
      .select({
        link: links,
        page: pages,
      })
      .from(links)
      .innerJoin(pages, eq(links.pageId, pages.id))
      .where(and(eq(links.id, id), eq(pages.userId, user.id)))
      .get();

    if (!linkWithPage) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Vymažeme link
    await db
      .delete(links)
      .where(eq(links.id, id));

    return NextResponse.json({ 
      message: 'Link deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}