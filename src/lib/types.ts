export interface ItemMenu {
    label: string;
    href: string;
    icon?: any;
}

export interface Stat {
    title: string;
    content: string;
    description: string;
    icon: any;
}

export interface Transation {
    title: string;
    content: string;
    status: string;
    date: Date;
}