import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type Reading = {
    id: number;
    temperature: number;
    humidity: number;
    motion_detected: boolean;
    created_at: string;
};

export type HistoricalData = {
    hourly: Reading[];
    daily: Reading[];
    weekly: Reading[];
    monthly?: Reading[]; // Tambahkan '?' jika 'monthly' mungkin tidak ada
};

export type HistoricalData = {
    [key: string]: Reading[];
};

// export type Timespan = keyof HistoricalData;
