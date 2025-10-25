import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, and, inArray } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { links, pages } from '@/drizzle/schema';

export async function PATCH(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { links: linksToReorder } = body;

    if (!linksToReorder || !Array.isArray(linksToReorder)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Overíme, že všetky links patria používateľovi
    const linkIds = linksToReorder.map(link => link.id);
    
    const userLinks = await db
      .select({
        linkId: links.id,
      })
      .from(links)
      .innerJoin(pages, eq(links.pageId, pages.id))
      .where(and(inArray(links.id, linkIds), eq(pages.userId, user.id)))
      .all();

    if (userLinks.length !== linkIds.length) {
      return NextResponse.json(
        { error: 'Some links not found or access denied' },
        { status: 403 }
      );
    }

    // Aktualizujeme order pre každý link
    for (const linkData of linksToReorder) {
      await db
        .update(links)
        .set({ order: linkData.order })
        .where(eq(links.id, linkData.id));
    }

    return NextResponse.json({ 
      message: 'Links reordered successfully'
    });

  } catch (error) {
    console.error('Error reordering links:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}