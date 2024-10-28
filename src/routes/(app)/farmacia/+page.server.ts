import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { categoriaSchema, medicamentoSchema } from '@/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {

    const medicamentos = await db.medicamento.findMany({
        include: {
            categoria: {
                select: {
                    nome: true
                }
            }
        }
    })

    const fornecedores = await db.fornecedor.findMany()
    const categorias = await db.categoria.findMany()

    let form = await superValidate(zod(medicamentoSchema));

    return { medicamentos, form, fornecedores, categorias };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(medicamentoSchema));

        if (!form.valid) {
            console.log(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const medicamento = await db.medicamento.create({ data: data });
            return message(form, { type: 'success', message: `${medicamento.nome} Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
