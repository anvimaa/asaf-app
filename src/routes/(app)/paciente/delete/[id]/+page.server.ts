import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const paciente = await db.paciente.findUnique({ where: { id: +params.id } })
    if (!paciente) redirect(302, "/paciente")
    return { paciente };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const paciente = await db.paciente.findUnique({ where: { id: +id } })
        if (!paciente) return error(404, "Paciente inexistente")
        await db.paciente.delete({ where: { id: paciente.id } })
        return { deleted: true }
    }
};
