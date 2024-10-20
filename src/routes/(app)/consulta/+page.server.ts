import { db } from '@/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const consultas = await db.consulta.findMany()
    return { consultas };
}) satisfies PageServerLoad;
