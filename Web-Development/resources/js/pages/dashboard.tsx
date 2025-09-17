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
        Echo: any; // You can be more specific here if you want to use the actual type
    }
}

export default function Dashboard({ latestreading: initialLatestReading, historicalData }: DashboardProps) {
    // 1. Buat state untuk menampung data terbaru. Diinisialisasi dengan data dari server.
    const [latestReading, setLatestReading] = useState<Reading | null>(initialLatestReading);

    useEffect(() => {
        // console.log('Inisialisasi WebSocket...');
        if (window.Echo) {
            // console.log('Mendengarkan channel WebSocket untuk data sensor...');
            window.Echo.channel('sensor-data')
                .listen('NewSensorReading', (event: Reading) => {
                    // console.log('Data baru diterima via WebSocket:', event);

                    // --- PERBAIKAN #1: UPDATE STATE ---
                    // Perbarui state dengan data baru yang diterima dari Reverb.
                    setLatestReading(event);
                });

            return () => {
                window.Echo.leaveChannel('sensor-data');
            };
        }
    }, []); // Array kosong memastikan ini hanya berjalan sekali
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* {latestReading && (
                    <div className="mb-4 text-lg font-semibold">
                        Data ID: {latestReading.id}
                    </div>
                )} */}
                <WelcomeBanner />

                {/* --- PERBAIKAN #2: GUNAKAN STATE --- */}
                {/* Berikan STATE 'latestReading' ke komponen anak, bukan props awal. */}
                <DashboardCards latestReading={latestReading} />

                <DashboardChart historicalData={historicalData}/>

            </div>
        </AppLayout>
    );
}
