import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const categoria = await db.categoria.findUnique({ where: { id: +params.id } })
    if (!categoria) redirect(302, "/farmacia/categorias")
    return { categoria };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const categoria = await db.categoria.findUnique({ where: { id: +id } })
        if (!categoria) return error(404, "categoria inexistente")
        await db.categoria.delete({ where: { id: categoria.id } })
        return { deleted: true }
    }
};
