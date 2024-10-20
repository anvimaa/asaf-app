import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { consultaSchema, pacienteSchema } from '@/schemas';
import { db } from '@/server/db';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const load = (async ({ params }) => {
    let form = await superValidate(zod(consultaSchema));
    const pacientes = await db.paciente.findMany()
    return { form, pacientes };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        console.log(formData)

        const form = await superValidate(request, zod(consultaSchema));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            //const paciente = await db.paciente.create({ data: { ...data, dataNascimento: new Date(data.dataNascimento) } });
            return message(form, { type: 'success', message: `Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
