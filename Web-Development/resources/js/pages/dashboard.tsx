import DashboardCards from '@/components/dashboard-cards';
import WelcomeBanner from '@/components/welcome-banner';
import DashboardChart from '@/components/dashboard-chart';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Reading, type HistoricalData } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    latestreading: Reading | null;
    historicalData: HistoricalData;
}

declare global {
    interface Window {
        Echo: any;
    }
}

export default function Dashboard({ latestreading: initialLatestReading, historicalData }: DashboardProps) {
    const [latestReading, setLatestReading] = useState<Reading | null>(initialLatestReading);

    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('sensor-data')
                .listen('NewSensorReading', (event: Reading) => {
                    setLatestReading(event);
                });

            return () => {
                window.Echo.leaveChannel('sensor-data');
            };
        }
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sensor Monitor" />
            {/* Latar belakang monokrom yang bersih */}
            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-slate-50/50 dark:bg-slate-950">
                <WelcomeBanner />

                <section className="flex flex-col gap-8">
                    {/* Status Utama */}
                    <DashboardCards latestReading={latestReading} />
                    
                    {/* Visualisasi Data */}
                    <DashboardChart historicalData={historicalData}/>
                </section>
            </div>
        </AppLayout>
    );
}