import { z } from 'zod';

export const pacienteSchema = z.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }), // Nome obrigatório
    dataNascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de nascimento inválida"
    }), // Validação de data
    sexo: z.enum(["Masculino", "Feminino", "Outro"], {
        errorMap: () => ({ message: "Sexo inválido. Os valores permitidos são: Masculino, Feminino ou Outro." })
    }), // Campo de sexo com valores fixos e mensagem personalizada
    nif: z.string().min(1, { message: "NIF deve ter pelo menos 14 caracteres" }).max(14, { message: "O NIF deve ter no maximo 14 caracteres" }), // Validação do NIF
    endereco: z.string().min(1, { message: "Endereço é obrigatório" }), // Endereço obrigatório
    telefone: z.string().min(9, { message: "Telefone deve ter pelo menos 9 caracteres" }), // Validação de telefone
});

export const triagemSchema = z.object({
    id: z.number().int().optional(),
    idade: z.number().int(),
    peso: z.number(),
    altura: z.number(),
    pa: z.string().min(1, {
        message: "Introduza o P.A"
    }),
    ta: z.string().min(1, { message: "Introduza a T.A" }),
    area: z.string().default("Pediatria"),
    urgencia: z.string().default("Normal"),
    obs: z.string(),
});

export const consultaSchema = z.object({
    id: z.number().int().optional(),
    pacienteId: z.number().int().optional(),
    data: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de nascimento inválida"
    }),
    medico: z.string().min(1),
    descricao: z.string().min(1),
    prescricao: z.string().optional(),
});

export const analiseSchema = z.object({
    id: z.number().int().optional(),
    tipo: z.string(),
    data: z.string().min(1),
    resultado: z.string().optional(),
});

export type AnaliseType = z.infer<typeof analiseSchema>;
