import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const consulta = await db.consulta.findUnique({ where: { id: +params.id } })
    if (!consulta) redirect(302, "/consulta")
    return { consulta };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const consulta = await db.consulta.findUnique({ where: { id: +id }, include: { analises: true } })
        if (!consulta) return error(404, "consulta inexistente")

        for (const analise of consulta.analises) {
            await db.analise.delete({ where: { id: analise.id } })
        }

        await db.consulta.delete({ where: { id: consulta.id } })
        return { deleted: true }
    }
};
