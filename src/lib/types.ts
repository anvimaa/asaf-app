export interface ItemMenu {
    label: string;
    href: string;
    icon?: any;
    levels?: string[];
}

export interface Stat {
    title: string;
    content: any;
    description: string;
    icon: any;
}

export interface Transation {
    name: string;
    email: string;
    operation: string;
    status: string;
    date: Date;
}

export type SelectListOption = {
    label: string;
    value: any;
};