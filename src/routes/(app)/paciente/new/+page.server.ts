import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { pacienteSchema } from '@/schemas';
import { db } from '@/server/db';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const pacienteCrud = pacienteSchema.extend({
    id: z.number().int().optional()
})

export const load = (async ({ url }) => {
    const id = url.searchParams.get("id")
    let form = await superValidate(zod(pacienteCrud));

    if (id !== null) {
        console.log(+id * 2)
        const paciente = await db.paciente.findUnique({ where: { id: +id } });
        if (!paciente) error(404, "Paciente não encontrado")
        form = await superValidate(paciente, zod(pacienteCrud));
    }

    return { form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(pacienteCrud));

        if (!form.valid) {
            //console.log(form.errors, form.data);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const paciente = await db.paciente.create({ data: { ...data, dataNascimento: new Date(data.dataNascimento) } });
            return message(form, { type: 'success', message: `${paciente.nome} Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
