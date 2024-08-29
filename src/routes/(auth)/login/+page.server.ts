import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { db } from "$lib/server/db";

import type { Actions, PageServerLoad } from "./$types";
import { sendSMS } from "@/server/vonage";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/dashboard");
  }
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof email !== "string" ||
      email.length < 3
    ) {
      return fail(400, {
        message: "Email de Usuario Inválido",
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

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return fail(400, {
        message: "Usuario não encontrado",
      });
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password
    );
    if (!validPassword) {
      return fail(400, {
        message: "Senha errada",
      });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    //const res = await sendSMS("244934342795", "Login Iniciado Com Sucesso.")
    return redirect(302, "/dashboard");
  },
};
