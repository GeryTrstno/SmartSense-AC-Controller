import { CardContent, CardFooter } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type PaginatedData, type PaginatedLink, type Reading } from '@/types';
import { Thermometer, Droplets, Clock, Fingerprint } from 'lucide-react';

interface AnalyticsTableProps {
    sensorData: PaginatedData<Reading>;
}

export default function AnalyticsTable({ sensorData }: AnalyticsTableProps) {
    return (
        <>
            <CardContent className="p-0"> {/* P-0 agar tabel menempel ke pinggir card */}
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                        <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                            <TableHead className="hidden w-[80px] sm:table-cell text-slate-500 font-bold">ID</TableHead>
                            <TableHead className="text-slate-500 font-bold">
                                <div className="flex items-center gap-2"><Thermometer className="h-4 w-4" /> Temp</div>
                            </TableHead>
                            <TableHead className="text-slate-500 font-bold">
                                <div className="flex items-center gap-2"><Droplets className="h-4 w-4" /> Humidity</div>
                            </TableHead>
                            <TableHead className="text-slate-500 font-bold">
                                <div className="flex items-center gap-2"><Fingerprint className="h-4 w-4" /> Status</div>
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-slate-500 font-bold">
                                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Recorded At</div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sensorData.data.length > 0 ? (
                            sensorData.data.map((reading: Reading) => (
                                <TableRow key={reading.id} className="border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                    <TableCell className="hidden font-mono text-xs text-slate-400 sm:table-cell">#{reading.id}</TableCell>
                                    <TableCell className="font-semibold text-slate-700 dark:text-slate-200">{reading.temperature.toFixed(1)}°C</TableCell>
                                    <TableCell className="text-slate-600 dark:text-slate-300">{reading.humidity.toFixed(1)}%</TableCell>
                                    <TableCell>
                                        <div
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
                                                reading.motion_detected 
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                            }`}
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full ${reading.motion_detected ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'}`} />
                                            {reading.motion_detected ? 'Motion Detected' : 'No Motion'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-slate-500 text-sm">
                                        {new Date(reading.created_at).toLocaleString('id-ID', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                                    No records found in database.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800 p-6 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-medium text-slate-900 dark:text-white">{sensorData.from}</span> to <span className="font-medium text-slate-900 dark:text-white">{sensorData.to}</span> of <span className="font-medium text-slate-900 dark:text-white">{sensorData.total}</span> records.
                </div>
                
                <Pagination className="mx-0 w-fit">
                    <PaginationContent className="gap-1">
                        {sensorData.links.map((link: PaginatedLink, index: number) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={link.url || '#'}
                                    size="sm"
                                    className={`h-9 min-w-[36px] transition-all ${
                                        link.active 
                                        ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" 
                                        : "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400"
                                    } ${!link.url ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {link.label.replace(/&laquo;|&raquo;|&lsaquo;|&rsaquo;/g, (match) => {
                                        const maps: Record<string, string> = { '&laquo;': '«', '&raquo;': '»', '&lsaquo;': '‹', '&rsaquo;': '›' };
                                        return maps[match] || match;
                                    })}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </>
    );
}