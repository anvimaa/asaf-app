import type { PageServerLoad } from './$types';
import { db } from "@/server/db"

export const load = (async ({ params }) => {
    const patrimonio = await db.patrimonio.findUnique({
        where: { id: +params.id }
    })
    return { patrimonio };
}) satisfies PageServerLoad;
