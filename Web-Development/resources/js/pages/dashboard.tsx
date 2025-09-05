import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DashboardCards from '@/components/dashboard-cards';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Reading = {
    id: number;
    value: number;
    created_at: string;
};

type HistoricalData = {
    [key: string]: Reading[];
};

interface DashboardProps {
    latestreading: Reading | null;
    historicalData: HistoricalData;
}

export default function Dashboard({ latestreading, historicalData }: DashboardProps) {
    const [activeTimespan, setActiveTimespan] = useState('hourly');
    const chartData = historicalData[activeTimespan];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                        <DashboardCards
                            latestReading={
                                latestreading
                                    ? {
                                        ...latestreading,
                                        temperature: (latestreading as any).temperature ?? 0,
                                        humidity: (latestreading as any).humidity ?? 0,
                                        motion_detected: (latestreading as any).motion_detected ?? false,
                                    }
                                    : null
                            }
                        />

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-sidebar md:min-h-min dark:border-sidebar-border"></div>
            </div>
        </AppLayout>
    );
}
