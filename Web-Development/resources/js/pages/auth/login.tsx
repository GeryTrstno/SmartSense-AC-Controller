import { store } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, LogIn, Mail, Lock, Cpu, Activity, Globe, ShieldCheck } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
            <Head title="Login - SmartSense" />

            {/* --- SISI KIRI: BRANDING (Hidden on Mobile) --- */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-blue-600 p-12 text-white lg:flex">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                        <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter uppercase">SmartSense</span>
                </div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold leading-tight">
                        Authorized Access <br /> Only.
                    </h1>
                    <p className="mt-4 text-blue-100 text-lg">
                        Please enter your administrative credentials to access the IoT sensor grid and hardware control systems.
                    </p>
                    
                    <div className="mt-8 flex gap-6 text-sm font-medium text-blue-200">
                        <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure Auth</div>
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4" /> System Ready</div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-blue-200">
                    &copy; 2026 SmartSense IoT Core v1.0.4 - System Authorization
                </div>
            </div>

            {/* --- SISI KANAN: FORM LOGIN --- */}
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 md:p-16">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Header Section */}
                    <div className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white lg:hidden mb-4">
                            <Cpu className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Access Portal</h2>
                        <p className="text-slate-500">Enter your credentials to manage the gateway.</p>
                    </div>

                    {status && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/20">
                            {status}
                        </div>
                    )}

                    <Form {...store.form()} resetOnSuccess={['password']} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    {/* Email Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin Email</Label>
                                        <div className="group relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                id="email" type="email" name="email" required autoFocus tabIndex={1}
                                                placeholder="admin@smartsense.io"
                                                className="pl-10 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password Field */}
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500">Security Key</Label>
                                            {canResetPassword && (
                                                <Link href={request().url} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                                                    Recover Key?
                                                </Link>
                                            )}
                                        </div>
                                        <div className="group relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                id="password" type="password" name="password" required tabIndex={2}
                                                placeholder="••••••••"
                                                className="pl-10 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600"
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" name="remember" tabIndex={3} className="border-slate-300 data-[state=checked]:bg-blue-600" />
                                        <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                                            Maintain session for 30 days
                                        </Label>
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="h-11 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]" 
                                    tabIndex={4} 
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <LogIn className="mr-2 h-4 w-4" />
                                    )}
                                    Authorize Access
                                </Button>

                                <div className="text-center text-sm text-slate-500">
                                    New Administrator?{' '}
                                    <Link 
                                        href={register().url} 
                                        className="font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4"
                                    >
                                        Join the Network
                                    </Link>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}