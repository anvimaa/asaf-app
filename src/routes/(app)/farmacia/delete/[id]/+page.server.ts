import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const medicamento = await db.medicamento.findUnique({ where: { id: +params.id } })
    if (!medicamento) redirect(302, "/farmacia")
    return { medicamento };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const medicamento = await db.medicamento.findUnique({ where: { id: +id } })
        if (!medicamento) return error(404, "medicamento inexistente")
        await db.medicamento.delete({ where: { id: medicamento.id } })
        return { deleted: true }
    }
};
