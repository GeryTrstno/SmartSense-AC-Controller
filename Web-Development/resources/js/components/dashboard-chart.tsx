'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { type HistoricalData, type Timespan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartConfig = {
    temperature: { label: 'Temperature', color: '#2563eb' }, // Royal Blue
    humidity: { label: 'Humidity', color: '#64748b' },    // Slate (Monochrome)
};

interface DashboardChartProps {
    historicalData: HistoricalData;
}

export default function DashboardChart({ historicalData }: DashboardChartProps) {
    const isMobile = useIsMobile();
    const [activeTimespan, setActiveTimespan] = React.useState<Timespan>('daily');

    const chartData = historicalData?.[activeTimespan] || [];

    return (
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                    <CardTitle className="text-xl font-semibold">Historical Analytics</CardTitle>
                    <CardDescription>Sensor data trends over time</CardDescription>
                </div>
                <CardAction>
                    {/* Toggle Group Monokrom dengan Highlight Biru saat aktif */}
                    <ToggleGroup
                        type="single"
                        value={activeTimespan}
                        onValueChange={(v) => v && setActiveTimespan(v as Timespan)}
                        className="hidden md:flex border border-slate-200 dark:border-slate-700 rounded-lg p-1"
                    >
                        {['hourly', 'daily', 'weekly'].map((t) => (
                            <ToggleGroupItem 
                                key={t} 
                                value={t} 
                                className="px-4 py-1 rounded-md data-[state=on]:bg-blue-600 data-[state=on]:text-white capitalize"
                            >
                                {t}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>

                    {/* Select for Mobile */}
                    <div className="md:hidden">
                        <Select value={activeTimespan} onValueChange={(v) => setActiveTimespan(v as Timespan)}>
                            <SelectTrigger className="w-32 border-slate-200 dark:border-slate-700">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
                            <defs>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                            <XAxis 
                                dataKey="created_at" 
                                axisLine={false} 
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                tickFormatter={(v) => new Date(v).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                cursor={{ stroke: '#2563eb', strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="temperature"
                                stroke="#2563eb"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorTemp)"
                            />
                            <Area
                                type="monotone"
                                dataKey="humidity"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="none"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}