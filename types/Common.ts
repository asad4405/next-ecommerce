export interface ContactType {
    hotline: number;
    hotmail: string;
    phone: string;
    email: string;
    address: string;
}

export interface SettingsType {
    description: string;
    dark_logo: string;
}

export interface PolicyType {
    id: number;
    name: string;
    slug: string;
    title: string;
    description: string;
    status: number;
}

export interface SocialType {
    name: string;
    icon: string;
    color: string;
    link: string;
}