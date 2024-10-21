import { db } from '@/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const consultas = await db.consulta.findMany({
        include: {
            paciente: {
                select: {
                    nome: true,
                    telefone: true
                }
            }
        }
    })
    return { consultas };
}) satisfies PageServerLoad;
