import AnalyticsTable from '@/components/analytics-table';
import AppLayout from '@/layouts/app-layout';
import { analytics } from '@/routes';
import { type BreadcrumbItem, type PaginatedData, type Reading } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: analytics().url,
    },
];

interface AnalyticsProps {
    sensorData: PaginatedData<Reading>;
}

export default function Analytics({ sensorData }: AnalyticsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sensor Analytics" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950">
                {/* Header Section Kreatif */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Historical Analytics</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Detailed record of all sensor activities and environment changes.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    <AnalyticsTable sensorData={sensorData} />
                </div>
            </div>
        </AppLayout>
    );
}