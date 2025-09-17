import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SensorReading {
    temperature: number;
    humidity: number;
    motion_detected: boolean;
}

interface DashboardCardsProps {
    latestReading: SensorReading | null;
}

export default function DashboardCards({ latestReading }: DashboardCardsProps) {
    const temp = latestReading ? latestReading.temperature.toFixed(1) : 'N/A';
    const humidity = latestReading ? latestReading.humidity.toFixed(1) : 'N/A';
    const motion = latestReading ? (latestReading.motion_detected ? 'Detected' : 'Idle') : 'N/A';

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Card untuk Suhu */}
            <Card className='bg-gradient-to-br from-muted/50 to-muted transition-all duration-300 hover:scale-103 hover:shadow-lg cursor-pointer shadow-lg shadow-muted/50'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Temperature</CardTitle>
                    <Thermometer className="h-6 w-6 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{temp}°C</div>
                    <p className="text-xs text-muted-foreground">
                        Current room temperature
                    </p>
                </CardContent>
            </Card>

            {/* Card untuk Kelembapan */}
            <Card className='bg-gradient-to-br from-muted/50 to-muted transition-all duration-300 hover:scale-103 hover:shadow-lg cursor-pointer shadow-lg shadow-muted/50'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Humidity</CardTitle>
                    <Droplets className="h-6 w-6 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{humidity}%</div>
                    <p className="text-xs text-muted-foreground">
                        Current room humidity
                    </p>
                </CardContent>
            </Card>

            {/* Card untuk Gerakan */}
            <Card className='bg-gradient-to-br from-muted/50 to-muted transition-all duration-300 hover:scale-103 hover:shadow-lg cursor-pointer shadow-lg shadow-muted/50'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Motion Status</CardTitle>
                    <Activity className="h-6 w-6 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{motion}</div>
                    <p className="text-xs text-muted-foreground">
                        Latest motion detection status
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
