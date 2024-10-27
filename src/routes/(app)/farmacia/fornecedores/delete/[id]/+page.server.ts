import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const fornecedor = await db.fornecedor.findUnique({ where: { id: +params.id } })
    if (!fornecedor) redirect(302, "/farmacia/fornecedors")
    return { fornecedor };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const fornecedor = await db.fornecedor.findUnique({ where: { id: +id } })
        if (!fornecedor) return error(404, "fornecedor inexistente")
        await db.fornecedor.delete({ where: { id: fornecedor.id } })
        return { deleted: true }
    }
};
