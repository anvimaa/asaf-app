import { json, type RequestHandler } from '@sveltejs/kit';
import { consultaSchema } from '../../../lib/schemas';

interface Analise {
    id: number;
    tipo: string;
    data: string;
    resultado: string;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        //@ts-ignore
        data.pacienteId = +data.pacienteId

        const schema = consultaSchema.safeParse(data);

        if (!schema.success) {
            return json({ error: 'Dados Inválidos.', issues: schema.error.issues, }, { status: 400 });
        }

        // Extrair a lista de análises e desserializar
        const analiseListString = formData.get('analiseList');
        if (!analiseListString) {
            return json({ error: 'Lista de análises não enviada.' }, { status: 400 });
        }

        // Validar e desserializar JSON
        let analiseList: Analise[];
        try {
            analiseList = JSON.parse(analiseListString as string);
        } catch (error) {
            return json({ error: 'Erro ao processar a lista de análises.' }, { status: 400 });
        }

        // Verificar se os dados são válidos (opcional)
        if (!Array.isArray(analiseList) || analiseList.some((analise) => typeof analise !== 'object')) {
            return json({ error: 'Formato de dados inválido.' }, { status: 400 });
        }

        // Processar a lista de análises
        console.log(analiseList);
        console.log(schema.data);

        return json({ success: true, message: 'Lista de análises recebida e processada.' });
    } catch (error) {
        console.error(error)
        return json({ error: 'Erro ao processar a requisição.' }, { status: 500 });
    }
};
