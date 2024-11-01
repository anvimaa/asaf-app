import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { funcionarioSchema, pacienteSchema } from '@/schemas';
import { db } from '@/server/db';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const funcionarioCrud = funcionarioSchema.extend({
    id: z.number().int().optional()
})

export const load = (async ({ params }) => {
    let form = await superValidate(zod(funcionarioCrud));

    const id = params.id

    if (id !== undefined) {
        const funcionario = await db.funcionario.findUnique({ where: { id: +id } });
        if (!funcionario) error(404, "Funcionario não encontrado")
        //@ts-ignore
        form = await superValidate(funcionario, zod(funcionarioCrud));
    }

    return { form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(funcionarioCrud));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const funcionario = await db.funcionario.update({ where: { id: data.id }, data: { ...data } });
            return message(form, { type: 'success', message: `${funcionario.nome} atualizado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
