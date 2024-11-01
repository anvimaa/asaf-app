import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { patrimonioSchema } from '@/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
    const patrimonios = await db.patrimonio.findMany()

    let form = await superValidate(zod(patrimonioSchema));

    return { patrimonios, form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    cadastrar: async ({ request }) => {
        const form = await superValidate(request, zod(patrimonioSchema));

        if (!form.valid) {
            console.log(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const patrimonio = await db.patrimonio.create({ data: data });
            return message(form, { type: 'success', message: `Patrimônio ${patrimonio.codigo} registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao registrar patrimônio' });
        }
    }
};
