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
    tipoConsulta: z.string(),
    pacienteId: z.number().int(),
    data: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de nascimento inválida"
    }),
    medico: z.string().min(1),
    descricao: z.string().min(1),
    prescricao: z.string().optional(),
});

export const analiseSchema = z.object({
    id: z.number().int().optional(),
    tipo: z.string().min(1, { message: "Informe o tipo da analise" }),
    data: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data inválida"
    }),
    resultado: z.string().optional(),
    obs: z.string().optional(),
});

export type AnaliseType = z.infer<typeof analiseSchema>;


export const categoriaSchema = z.object({
    id: z.number().int().optional(),
    nome: z.string().min(1, { message: "Informe o nome" }),
    descricao: z.string().optional(),
});

export const fornecedorSchema = z.object({
    id: z.number().int().optional(),
    nome: z.string().min(1, { message: "Informe o nome" }),
    nif: z.string().min(1, { message: "Informe o nif" }),
    contato: z.string().min(1, { message: "Informe o contato" }),
    endereco: z.string().min(1, { message: "Informe o endereco" }),

});


export const medicamentoSchema = z.object({
    nome: z.string().min(1, { message: "Introduza o nome" }),
    tipo: z.string().min(1, "Selecione o tipo de remedio"),
    dataValidade: z.date({ required_error: "Introduza a validade" }),
    estoqueAtual: z.number().int(),
    limiteEstoque: z.number().int(),
    dosagem: z.number().int(),
    categoriaId: z.number().int(),
    descricao: z.string().optional(),
});


export const funcionarioSchema = z.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    genero: z.string().min(1, { message: "Gênero é obrigatório" }),
    nif: z.string().min(1, { message: "NIF é obrigatório" }),
    agente: z.string().optional(),
    endereco: z.string().min(1, { message: "Endereço é obrigatório" }),
    telefone: z.string().min(1, { message: "Telefone é obrigatório" }),
    dataAdmissao: z.date({
        required_error: "Data de admissão é obrigatória",
        invalid_type_error: "Data de admissão inválida"
    }),
    funcao: z.string().min(1, { message: "Função é obrigatória" }),
});

export const patrimonioSchema = z.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    codigo: z.string().min(1, { message: "Código é obrigatório" }),
    tipo: z.string().min(1, { message: "Tipo é obrigatório" }),
    estado: z.string().min(1, { message: "Estado é obrigatório" }),
    valor: z.number().min(0, { message: "Valor deve ser maior que 0" }),
    dataAquisicao: z.date({
        required_error: "Data de aquisição é obrigatória",
        invalid_type_error: "Data de aquisição inválida"
    }),
    localizacao: z.string().min(1, { message: "Localização é obrigatória" }),
    observacoes: z.string().optional(),
    garantia: z.boolean().default(false),
    dataGarantia: z.date().optional(),
    ultimaManutencao: z.date().optional(),
    proximaManutencao: z.date().optional()
});