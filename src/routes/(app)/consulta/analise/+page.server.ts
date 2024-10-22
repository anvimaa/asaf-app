import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '@/server/db';

export const load = (async ({ url }) => {
    const consulta = url.searchParams.get("consulta") as string

    console.log(consulta)
    if (!consulta) {
        redirect(302, "/consulta")
    }

    const analises = await db.analise.findMany({ where: { consultaId: +consulta } })

    return { analises };

}) satisfies PageServerLoad;
