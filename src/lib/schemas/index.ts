import { z } from 'zod';

export const pacienteSchema = z.object({
    nome: z.string().min(1, "Introduza o nome do paciente"),
    genero: z.string().min(1, "Introduza o genero do paciente"),
    morada: z.string().min(1, "Introduza a morada do paciente"),
    nascimento: z.date({ required_error: "Introduza a data de nascimento do paciente" }),
});
