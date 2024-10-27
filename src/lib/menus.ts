import { ContactRound, LayoutDashboard, Microscope, BriefcaseMedical } from "lucide-svelte";
import type { ItemMenu } from "./types";

export const app_menu: ItemMenu[] = [
    {
        label: "Painel",
        href: "/dashboard",
        icon: LayoutDashboard,
        levels: ["a", "m", "f", "r"]
    },
    {
        label: "Pacientes",
        href: "/paciente",
        icon: ContactRound,
        levels: ["a"]
    },
    {
        label: "Consultas",
        href: "/consulta",
        icon: Microscope,
        levels: ["a", "m"]
    },
    {
        label: "Farmácia",
        href: "/farmacia",
        icon: BriefcaseMedical,
        levels: ["a", "f"]
    },
]
