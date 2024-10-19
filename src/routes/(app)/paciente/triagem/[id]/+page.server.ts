import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { triagemSchema } from '@/schemas';

export const load = (async ({ params }) => {
    let form = await superValidate(zod(triagemSchema));

    const paciente = await db.paciente.findUnique({
        where: { id: +params.id },
        include: {
            consultas: true,
            historicoMedicos: true,
            internacoes: true
        }
    })
    return { paciente, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(triagemSchema));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data
        console.log(data)

        try {
            //const paciente = await db.paciente.create({ data: { ...data, dataNascimento: new Date(data.dataNascimento) } });
            return message(form, { type: 'success', message: `Registrado com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
