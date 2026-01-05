import AppLayout from '@/layouts/app-layout';
import { control } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Power, PowerOff, Snowflake, Wind, Fan, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Control',
        href: control().url,
    },
];

export default function Control() {
    // State lokal untuk memberikan feedback visual instan (optimistic UI)
    const [lastCommand, setLastCommand] = useState<'ON' | 'OFF' | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleAcCommand(command: 'ON' | 'OFF') {
        setIsLoading(true);
        setLastCommand(command);
        
        router.post('/control/send-command', { command }, {
            onFinish: () => setIsLoading(false)
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hardware Control" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950">
                
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Device Control</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Interact with your connected hardware in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Main AC Control Card */}
                    <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                        <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl transition-all duration-500 ${lastCommand === 'ON' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                                        <Snowflake className={`h-6 w-6 ${lastCommand === 'ON' ? 'animate-spin-slow' : ''}`} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-semibold">Air Conditioner</CardTitle>
                                        <CardDescription>ESP32 Node - Living Room</CardDescription>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${lastCommand === 'ON' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                                    {lastCommand === 'ON' ? 'Active' : 'Standby'}
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                
                                {/* ON Button Section */}
                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        disabled={isLoading}
                                        onClick={() => handleAcCommand('ON')}
                                        className={`group relative flex h-32 w-32 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                                            lastCommand === 'ON' 
                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-xl shadow-blue-500/10' 
                                            : 'border-slate-100 bg-white hover:border-blue-400 dark:border-slate-800 dark:bg-slate-900'
                                        }`}
                                    >
                                        <Power className={`h-12 w-12 transition-transform group-active:scale-90 ${lastCommand === 'ON' ? 'text-blue-600' : 'text-slate-300'}`} />
                                        {lastCommand === 'ON' && (
                                            <span className="absolute -inset-1 rounded-full border border-blue-400 animate-ping opacity-20"></span>
                                        )}
                                    </button>
                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Power ON</span>
                                </div>

                                <div className="hidden md:block h-20 w-[1px] bg-slate-100 dark:bg-slate-800"></div>

                                {/* OFF Button Section */}
                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        disabled={isLoading}
                                        onClick={() => handleAcCommand('OFF')}
                                        className={`group flex h-32 w-32 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                                            lastCommand === 'OFF' 
                                            ? 'border-slate-600 bg-slate-50 dark:bg-slate-800 shadow-xl' 
                                            : 'border-slate-100 bg-white hover:border-red-400 dark:border-slate-800 dark:bg-slate-900'
                                        }`}
                                    >
                                        <PowerOff className={`h-12 w-12 transition-transform group-active:scale-90 ${lastCommand === 'OFF' ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`} />
                                    </button>
                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Power OFF</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Info / Secondary Controls */}
                    <div className="flex flex-col gap-6">
                        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Settings2 className="h-4 w-4 text-blue-600" /> System Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Connection</span>
                                    <span className="font-medium text-blue-600">Stable</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Last Sync</span>
                                    <span className="font-medium">Just now</span>
                                </div>
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wind className="h-4 w-4 text-slate-400" />
                                        <span className="text-xs font-bold uppercase text-slate-400">Fan Speed</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Low', 'Med', 'High'].map((speed) => (
                                            <div key={speed} className="text-[10px] text-center py-1 rounded border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600">
                                                {speed}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}