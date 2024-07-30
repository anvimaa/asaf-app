import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db } from "$lib/server/db";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/");
  }
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const name = formData.get("name");
    const password = formData.get("password");
    const email = formData.get("email") as string;

    if (
      typeof name !== "string" ||
      name.length < 3 ||
      name.length > 31
    ) {
      return fail(400, {
        message: "Usuario Invalido",
      });
    }

    if (
      typeof password !== "string" ||
      password.length < 3 ||
      password.length > 255
    ) {
      return fail(400, {
        message: "Senha Invalida",
      });
    }

    const hashedPassword = await new Argon2id().hash(password);

    try {
      const user = await db.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } catch (e) {
      console.error(e);

      return fail(500, {
        message: "An unknown error occurred",
      });
    }
    return redirect(302, "/dashboard");
  },
};
