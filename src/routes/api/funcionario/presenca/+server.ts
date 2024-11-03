import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '@/server/db';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();

        // Validação básica dos dados
        if (!body.funcionarioId || !body.tipo || !body.data) {
            return json(
                { error: 'Dados incompletos' },
                { status: 400 }
            );
        }

        // Verifica se o funcionário existe
        let funcionario = await db.funcionario.findFirst({
            where: { id: body.funcionarioId }
        });

        if (!funcionario) {
            return json(
                { error: 'Funcionário não encontrado' },
                { status: 404 }
            );
        }

        // Verifica se já existe registro para esta data
        const registroExistente = await db.presenca.findFirst({
            where: {
                funcionarioId: body.funcionarioId,
                data: new Date(body.data)
            }
        });

        if (registroExistente) {
            return json(
                { error: 'Já existe um registro para esta data' },
                { status: 400 }
            );
        }

        // Cria o registro de presença
        const presenca = await db.presenca.create({
            data: {
                funcionarioId: body.funcionarioId,
                tipo: body.tipo,
                data: new Date(body.data)
            }
        });

        funcionario = await db.funcionario.findUnique({
            where: { id: +body.funcionarioId },
            include: {
                presencas: true
            }
        });

        return json({ success: true });
    } catch (error) {
        console.error('Erro ao registrar presença:', error);
        return json(
            { error: 'Erro ao registrar presença' },
            { status: 500 }
        );
    }
};

export async function PUT({ request }) {
    const data = await request.json();

    // Atualizar presença existente
    const presenca = await db.presenca.update({
        where: {
            id: data.id,
        },
        data: {
            tipo: data.tipo
        }
    });

    return json(presenca);
}
