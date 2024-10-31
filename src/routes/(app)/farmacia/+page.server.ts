import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '@/server/db';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { categoriaSchema, medicamentoSchema } from '@/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

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
    const entradas = await db.entrada.findMany({
        include: {
            medicamento: { select: { nome: true } },
            fornecedor: { select: { nome: true } }
        }
    })

    let form = await superValidate(zod(medicamentoSchema));

    return { medicamentos, form, fornecedores, categorias, entradas };

}) satisfies PageServerLoad;

const entradaSchema = z.object({
    medicamentoId: z.number().int(),
    fornecedorId: z.number().int(),
    quantidade: z.number().int(),
    dataEntrada: z.date()
})

export const actions: Actions = {
    cadastrar: async ({ request }) => {
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
    },
    entrada: async ({ request }) => {
        const form = await superValidate(request, zod(entradaSchema));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data
        //console.log(data)

        try {
            let medicamento = await db.medicamento.findUnique({ where: { id: data.medicamentoId } })
            const estoqueAtual = medicamento?.estoqueAtual! + data.quantidade

            await db.entrada.create({ data: data });

            await db.medicamento.update({
                where: { id: data.medicamentoId }, data: {
                    estoqueAtual: estoqueAtual
                }
            })

            return message(form, { type: 'success', message: `Entrada Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
