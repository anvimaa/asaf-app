import { db } from '@/server/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const analise = await db.analise.findUnique({
        where: { id: +params.id },
        include: {
            consulta: {
                include: {
                    paciente: true
                }
            }
        }
    })
    return { analise };
}) satisfies PageServerLoad;