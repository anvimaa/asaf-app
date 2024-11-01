import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { funcionarioSchema } from '@/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
    const funcionarios = await db.funcionario.findMany()

    let form = await superValidate(zod(funcionarioSchema));

    return { funcionarios, form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    cadastrar: async ({ request }) => {
        const form = await superValidate(request, zod(funcionarioSchema));

        if (!form.valid) {
            console.log(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const funcionario = await db.funcionario.create({ data: data });
            return message(form, { type: 'success', message: `${funcionario.nome} Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
