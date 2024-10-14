import { LayoutDashboard, Package, User } from "lucide-svelte";
import type { ItemMenu } from "./types";

export const app_menu: ItemMenu[] = [
    {
        label: "Painel",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Pacientes",
        href: "/paciente",
        icon: Package,
    },
]
