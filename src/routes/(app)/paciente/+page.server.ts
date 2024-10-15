import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { pacienteSchema } from '@/schemas';
import { db } from '@/server/db';

export const load = (async () => {
    const form = await superValidate(zod(pacienteSchema));
    const pacientes = await db.paciente.findMany({ orderBy: { id: 'desc' } });

    return { form, pacientes };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(pacienteSchema));

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
