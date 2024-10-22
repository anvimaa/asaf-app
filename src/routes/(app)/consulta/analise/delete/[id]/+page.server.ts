import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const analise = await db.analise.findUnique({ where: { id: +params.id } })
    if (!analise) redirect(302, "/consulta")
    return { analise };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const analise = await db.analise.findUnique({ where: { id: +id }, include: { consulta: true } })
        if (!analise) return error(404, "analise inexistente")

        await db.analise.delete({ where: { id: analise.id } })
        return { deleted: true }
    }
};
