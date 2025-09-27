import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { control } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Power, PowerOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Control',
        href: control().url,
    },
];

export default function Control() {

    function handleAcCommand(command: 'ON' | 'OFF') {
        router.post('/control/send-command', { command });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Control" />
            {/* <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div> */}

            <Card>
                <CardHeader><CardTitle>Kontrol AC</CardTitle></CardHeader>
                <CardContent className="flex gap-4">
                    <Button onClick={() => handleAcCommand('ON')} className="flex items-center gap-2">
                        <Power className="h-4 w-4" /> Nyalakan
                    </Button>
                    <Button onClick={() => handleAcCommand('OFF')} variant="destructive" className="flex items-center gap-2">
                        <PowerOff className="h-4 w-4" /> Matikan
                    </Button>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
