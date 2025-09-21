import { CardContent, CardFooter } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type PaginatedData, type PaginatedLink, type Reading } from '@/types';
import { Link } from '@inertiajs/react';

interface AnalyticsTableProps {
    sensorData: PaginatedData<Reading>;
}

export default function AnalyticsTable({ sensorData }: AnalyticsTableProps) {
    return (
        <>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">ID</TableHead>
                            <TableHead>Temperature</TableHead>
                            <TableHead>Humidity</TableHead>
                            <TableHead>Motion</TableHead>
                            <TableHead className="hidden md:table-cell">Time Recorded</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sensorData.data.length > 0 ? (
                            sensorData.data.map((reading: Reading) => (
                                <TableRow key={reading.id}>
                                    <TableCell className="hidden font-medium sm:table-cell">{reading.id}</TableCell>
                                    <TableCell>{reading.temperature.toFixed(1)}°C</TableCell>
                                    <TableCell>{reading.humidity.toFixed(1)}%</TableCell>
                                    <TableCell>
                                        <div
                                            className={`inline-block rounded-full px-2 py-1 text-xs ${reading.motion_detected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {reading.motion_detected ? 'Detected' : 'Idle'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(reading.created_at).toLocaleString('id-ID')}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No record.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                    <div>
                        Showing {sensorData.from} to {sensorData.to} of {sensorData.total} records.
                    </div>
                    {/* Komponen Paginasi */}
                    <Pagination className="mx-0 w-fit">
                        <PaginationContent>
                            {sensorData.links.map((link: PaginatedLink, index: number) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href={link.url || ''}
                                        size="default"
                                        isActive={link.active}
                                    >{link.label.replace(/&laquo;|&raquo;|&lsaquo;|&rsaquo;/g, (match) => {
                                        switch (match) {
                                            case '&laquo;':
                                                return '«';
                                            case '&raquo;':
                                                return '»';
                                            case '&lsaquo;':
                                                return '‹';
                                            case '&rsaquo;':
                                                return '›';
                                            default:
                                                return match;
                                        }})}</PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardFooter>
        </>
    );
}
