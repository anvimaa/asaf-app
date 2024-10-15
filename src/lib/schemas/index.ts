import { z } from 'zod';

export const pacienteSchema = z.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }), // Nome obrigatório
    dataNascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de nascimento inválida"
    }), // Validação de data
    sexo: z.enum(["Masculino", "Feminino", "Outro"], { invalid_type_error: "Genero invalido" }), // Campo de sexo com valores fixos
    nif: z.string().min(14, { message: "NIF deve ter pelo menos 14 caracteres" }), // Validação do NIF
    endereco: z.string().min(1, { message: "Endereço é obrigatório" }), // Endereço obrigatório
    telefone: z.string().min(9, { message: "Telefone deve ter pelo menos 9 caracteres" }), // Validação de telefone
    documentoIdentidade: z.string().optional(), // Documento é opcional
    area: z.string().default("Triagem").optional(), // Área com valor padrão "Triagem"
    urgencia: z.enum(["Normal", "Regular", "Intensivo"]).default("Normal").optional(), // Nível de urgência com valor padrão
});
