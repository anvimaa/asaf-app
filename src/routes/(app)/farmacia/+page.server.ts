import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '@/server/db';

export const load = (async () => {

    const analises = await db.analise.findMany()

    return { analises };

}) satisfies PageServerLoad;
