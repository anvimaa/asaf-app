import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { analiseSchema } from '@/schemas';


export const load = (async ({ params, request }) => {
    let form = await superValidate(zod(analiseSchema));
    return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, zod(analiseSchema));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const analise = await db.analise.create({
                data: {
                    tipo: data.tipo,
                    resultado: data.resultado! || "",
                    data: new Date(data.data!),
                    consultaId: +params.id
                }
            })
            console.log(analise)
            return message(form, { type: 'success', message: `Analise registrada com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
