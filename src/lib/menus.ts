import { LayoutDashboard, User } from "lucide-svelte";
import type { ItemMenu } from "./types";

export const app_menu: ItemMenu[] = [
    {
        label: "Painel",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Asegurados",
        href: "/asegurados",
        icon: User,
    },
]
