import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { categorySchema } from '@/schemas';
import { db } from '@/server/db';

export const load = (async () => {
    const form = await superValidate(zod(categorySchema));
    const categories = await db.category.findMany({ orderBy: { id: 'desc' } });

    return { form, categories };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(categorySchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const data = form.data

        try {
            await db.category.create({ data });
            return message(form, 'Salvo com sucesso!');
        } catch (error) {
            console.error(error);
            return message(form, 'Erro ao Salvar');
        }
    }
};
