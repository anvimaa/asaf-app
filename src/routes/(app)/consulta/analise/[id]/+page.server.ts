import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { analiseSchema } from '@/schemas';


export const load = (async ({ params, request }) => {

    const analise = await db.analise.findUnique({
        where: { id: +params.id },
        include: {
            consulta: {
                include: {
                    paciente: true
                }
            }
        }
    })

    //@ts-ignore
    let form = await superValidate(analise, zod(analiseSchema));

    return { analise, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(analiseSchema));

        if (!form.valid) {
            console.error(form.errors);
            return fail(400, { form });
        }

        const data = form.data

        try {
            const analise = await db.analise.update({
                where: { id: data.id! },
                data: {
                    resultado: data.resultado,
                    tipo: data.tipo
                }
            })
            console.log(analise)
            return message(form, { type: 'success', message: `Analise atualizada com sucesso!` });
        } catch (error) {
            console.error(error);
            return message(form, { type: 'error', message: 'Erro ao Registrar' });
        }
    }
};
