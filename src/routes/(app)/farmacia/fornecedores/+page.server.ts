import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { categoriaSchema } from '@/schemas';

export const load = (async () => {
    let form = await superValidate(zod(categoriaSchema));

    const fornecedores = await db.fornecedor.findMany()

    return { fornecedores, form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(categoriaSchema));

        if (!form.valid) {
            console.log(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const paciente = await db.categoria.create({ data: { nome: data.nome, descricao: data.descricao! } });
            return message(form, { type: 'success', message: `${paciente.nome} Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
