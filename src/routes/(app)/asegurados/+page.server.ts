import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { asseguradoSchema } from '@/schemas';
import type { Action } from '@sveltejs/kit';

export const load = (async () => {
    const form = await superValidate(zod(asseguradoSchema));

    return { form };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(asseguradoSchema));
        console.log(form);

        if (!form.valid) {
            return fail(400, { form });
        }


        return message(form, 'Form posted successfully!');
    }
};