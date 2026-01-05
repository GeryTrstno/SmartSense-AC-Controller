import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Activity } from 'lucide-react';

interface SensorReading {
    temperature: number;
    humidity: number;
    motion_detected: boolean;
}

interface DashboardCardsProps {
    latestReading: SensorReading | null;
}

export default function DashboardCards({ latestReading }: DashboardCardsProps) {
    const temp = latestReading ? latestReading.temperature.toFixed(1) : '0.0';
    const humidity = latestReading ? latestReading.humidity.toFixed(1) : '0.0';
    const motion = latestReading ? (latestReading.motion_detected ? 'Detected' : 'Clear') : 'Checking...';

    const cardStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:border-blue-500/50 hover:shadow-md";

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {/* Temperature Card */}
            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Temperature</CardTitle>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{temp}°C</div>
                    <p className="text-xs text-slate-400 mt-1">Real-time thermal monitoring</p>
                </CardContent>
            </Card>

            {/* Humidity Card */}
            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Humidity</CardTitle>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{humidity}%</div>
                    <p className="text-xs text-slate-400 mt-1">Air moisture concentration</p>
                </CardContent>
            </Card>

            {/* Motion Card - Logika Kondisional Manual */}
            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Motion Status</CardTitle>
                    <div className={`p-2 rounded-lg transition-colors ${
                        latestReading?.motion_detected 
                        ? "bg-blue-100 dark:bg-blue-900/40" 
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}>
                        <Activity className={`h-5 w-5 ${
                            latestReading?.motion_detected 
                            ? "text-blue-600 animate-pulse" 
                            : "text-slate-500"
                        }`} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{motion}</div>
                    <p className="text-xs text-slate-400 mt-1">Activity sensor updates</p>
                </CardContent>
            </Card>
        </div>
    );
}