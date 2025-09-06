import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { type User } from '@/types';

export default function WelcomeBanner() {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const user = auth.user;

    return (
        <Card className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-200/20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    Hello, {user.name.split(' ')[0]} 👋
                </CardTitle>
                <CardDescription className="text-white/80">
                    Welcome back to your dashboard! Here you can monitor real-time sensor data and
                    track motion changes.
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
