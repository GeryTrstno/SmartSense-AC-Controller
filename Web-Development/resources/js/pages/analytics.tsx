import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Reading, type PaginatedData, type PaginatedLink } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { analytics } from '@/routes';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: analytics().url, // Ganti dengan route('analytics.index') jika sudah ada
    },
];

// Gunakan tipe PaginatedData<Reading> untuk props
interface AnalyticsProps {
    sensorData: PaginatedData<Reading>;
}

export default function Analytics({ sensorData }: AnalyticsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="p-4 md:p-6">
                <h1 className="text-2xl font-semibold mb-4">Data Sensor Historis</h1>

                {/* Lakukan pengecekan null sebelum me-render */}
                {sensorData && sensorData.data.length > 0 ? (
                    <>
                        {/* Tampilkan Tabel Data */}
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Suhu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Kelembapan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Gerakan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y bg-white dark:divide-gray-700 dark:bg-gray-900">
                                    {/* Beri tipe eksplisit pada 'reading' */}
                                    {sensorData.data.map((reading: Reading) => (
                                        <tr key={reading.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{reading.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">{reading.temperature}°C</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">{reading.humidity}%</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">{reading.motion_detected ? 'Ya' : 'Tidak'}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(reading.created_at).toLocaleString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tampilkan Tombol Paginasi */}
                        <div className="mt-4 flex flex-wrap gap-1">
                            {/* Beri tipe eksplisit pada 'link' dan 'index' */}
                            {sensorData.links.map((link: PaginatedLink, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/50'} ${!link.url ? 'cursor-not-allowed text-muted-foreground/50' : ''}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Tidak ada data untuk ditampilkan.</p>
                )}
            </div>
        </AppLayout>
    );
}
