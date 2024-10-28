import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { categoriaSchema, fornecedorSchema } from '@/schemas';

export const load = (async () => {
    let form = await superValidate(zod(fornecedorSchema));

    const fornecedores = await db.fornecedor.findMany()

    return { fornecedores, form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(fornecedorSchema));

        if (!form.valid) {
            console.log(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const paciente = await db.fornecedor.create({
                data: {
                    nome: data.nome,
                    nif: data.nif,
                    contato: data.contato,
                    endereco: data.endereco
                }
            });
            return message(form, { type: 'success', message: `${paciente.nome} Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
