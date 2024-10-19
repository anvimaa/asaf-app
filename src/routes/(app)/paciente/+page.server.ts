import type { PageServerLoad } from './$types';
import { db } from '@/server/db';

export const load = (async () => {
    //const form = await superValidate(zod(pacienteSchema));
    const pacientes = await db.paciente.findMany({ orderBy: { id: 'desc' } });

    return { pacientes };

}) satisfies PageServerLoad;
