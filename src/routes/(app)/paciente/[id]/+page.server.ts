import type { PageServerLoad } from './$types';
import { db } from "@/server/db"

export const load = (async ({ params }) => {
    const paciente = await db.paciente.findUnique({
        where: { id: +params.id },
        include: {
            consultas: true,
            historicoMedicos: true,
            internacoes: true
        }
    })
    return { paciente };
}) satisfies PageServerLoad;
