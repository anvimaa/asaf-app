import { Users } from "lucide-svelte";
import type { Stat, Transation } from "./types";

export const stats: Stat[] = [
    {
        title: 'Pacientes',
        content: 2,
        description: 'Total de pacientes registrados',
        icon: Users
    },
    {
        title: 'Consultas',
        content: 1,
        description: 'Total de Consultas Registradas',
        icon: Users
    }
];

export const transations: Transation[] = [
    {
        name: 'Antonio...',
        email: '936985457',
        operation: 'Normal',
        status: 'Triagem',
        date: new Date()
    }
    , {
        name: 'Maria...',
        email: '925784521',
        operation: 'Urgente',
        status: 'Banco de Urgencia',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
]

export const generos: string[] = ["Masculino", "Feminino", "Outro"]
