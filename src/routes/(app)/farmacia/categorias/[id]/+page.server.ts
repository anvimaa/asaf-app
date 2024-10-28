import type { PageServerLoad } from './$types';
import { db } from "@/server/db"

export const load = (async ({ params }) => {
    const categoria = await db.categoria.findUnique({
        where: { id: +params.id },
        include: {
            medicamentos: true
        }
    })
    return { categoria };
}) satisfies PageServerLoad;
