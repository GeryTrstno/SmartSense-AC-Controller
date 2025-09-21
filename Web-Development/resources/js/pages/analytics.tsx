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
    console.log(sensorData);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <AnalyticsTable sensorData={sensorData} />
            </div>
        </AppLayout>
    );
}
