import { Users } from "lucide-svelte";
import type { Stat, Transation } from "./types";

export const stats: Stat[] = [
    {
        title: 'Assegurados',
        content: '+1220',
        description: '+20.1% from last month',
        icon: Users
    }
];

export const transations: Transation[] = [
    {
        name: 'John Doe',
        email: 'pC8L2@example.com',
        operation: 'Credito',
        status: 'Aprovado',
        date: new Date()
    }
    , {
        name: 'John Doe',
        email: 'pC8L3@example.com',
        operation: 'Debito',
        status: 'Recusado',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
    , {
        name: 'Jane Doe',
        email: 'pC8L4@example.com',
        operation: 'Transferencia',
        status: 'Pendente',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 895)
    }
]

export const generos: string[] = ["Masculino", "Femenino", "Outro"]
