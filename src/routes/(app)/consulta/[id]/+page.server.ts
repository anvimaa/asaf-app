import { db } from '@/server/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const consulta = await db.consulta.findUnique({
        where: { id: +params.id },
        include: {
            paciente: true,
            analises: true
        }
    })
    return { consulta };
}) satisfies PageServerLoad;
