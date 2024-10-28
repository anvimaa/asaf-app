import type { PageServerLoad } from './$types';
import { db } from "@/server/db"

export const load = (async ({ params }) => {
    const fornecedor = await db.fornecedor.findUnique({
        where: { id: +params.id },
        include: {
            medicamentos: true
        }
    })
    return { fornecedor };
}) satisfies PageServerLoad;
