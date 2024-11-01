import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const patrimonio = await db.patrimonio.findUnique({ where: { id: +params.id } })
    if (!patrimonio) redirect(302, "/patrimonio")
    return { patrimonio };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const patrimonio = await db.patrimonio.findUnique({ where: { id: +id } })
        if (!patrimonio) return error(404, "patrimonio inexistente")
        await db.patrimonio.delete({ where: { id: patrimonio.id } })
        return { deleted: true }
    }
};
