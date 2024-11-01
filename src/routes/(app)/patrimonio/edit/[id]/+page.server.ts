import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { patrimonioSchema } from '@/schemas';

const patrimonioCrud = patrimonioSchema.extend({
    id: z.number().int().optional()
})

export const load = (async ({ params }) => {
    let form = await superValidate(zod(patrimonioCrud));

    const id = params.id

    if (id !== undefined) {
        const patrimonio = await db.patrimonio.findUnique({ where: { id: +id } });
        if (!patrimonio) error(404, "Patrimonio não encontrado")
        //@ts-ignore
        form = await superValidate(patrimonio, zod(patrimonioCrud));
    }

    return { form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(patrimonioCrud));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const patrimonio = await db.patrimonio.update({ where: { id: data.id }, data: { ...data } });
            return message(form, { type: 'success', message: `${patrimonio.nome} atualizado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
