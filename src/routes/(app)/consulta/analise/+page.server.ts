import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '@/server/db';

export const load = (async ({ url }) => {
    const consultaId = url.searchParams.get("consulta") as string

    console.log(consultaId)
    if (!consultaId) {
        redirect(302, "/consulta")
    }

    const analises = await db.analise.findMany({ where: { consultaId: +consultaId } })
    const consulta = await db.consulta.findUnique({
        where: { id: +consultaId }, include: {
            paciente: true
        }
    })

    return { analises, consulta };

}) satisfies PageServerLoad;
