import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (!locals.user) {
        return redirect(302, "/login");
    }

    return {
        user: locals.user,
        appName: "APP NAME",
    };
}) satisfies LayoutServerLoad;
