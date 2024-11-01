import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const funcionario = await db.funcionario.findUnique({ where: { id: +params.id } })
    if (!funcionario) redirect(302, "/funcionario")
    return { funcionario };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
            const funcionario = await db.funcionario.findUnique({ where: { id: +id } })
        if (!funcionario) return error(404, "funcionario inexistente")
        await db.funcionario.delete({ where: { id: funcionario.id } })
        return { deleted: true }
    }
};
