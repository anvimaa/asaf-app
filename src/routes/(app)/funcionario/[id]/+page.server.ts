import type { PageServerLoad } from './$types';
import { db } from "@/server/db"

export const load = (async ({ params }) => {
    const funcionario = await db.funcionario.findUnique({
        where: { id: +params.id }
    })
    return { funcionario };
}) satisfies PageServerLoad;
