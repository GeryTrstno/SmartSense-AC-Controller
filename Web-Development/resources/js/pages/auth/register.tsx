import { store } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, UserPlus, Mail, Lock, ShieldCheck, User, Cpu, Activity, Globe } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
            <Head title="Register - SmartSense" />

            {/* --- SISI KIRI: BRANDING & INFO (Hidden on Mobile) --- */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-blue-600 p-12 text-white lg:flex">
                {/* Background Pattern Halus */}
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
                        Start Managing Your <br /> IoT Ecosystem.
                    </h1>
                    <p className="mt-4 text-blue-100 text-lg">
                        Join our network of smart devices and take full control over your hardware sensors in one unified dashboard.
                    </p>
                    
                    <div className="mt-8 flex gap-6 text-sm font-medium text-blue-200">
                        <div className="flex items-center gap-2"><Activity className="h-4 w-4" /> Real-time Monitoring</div>
                        <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Cloud Sync</div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-blue-200">
                    &copy; 2026 SmartSense IoT Core v1.0.4 - Computer Engineering Project
                </div>
            </div>

            {/* --- SISI KANAN: FORM PENDAFTARAN --- */}
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 md:p-16">
                <div className="w-full max-w-md space-y-8">
                    {/* Header Mobile Only */}
                    <div className="flex flex-col gap-2 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white mb-2">
                            <Cpu className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create an account</h2>
                    </div>

                    <div className="hidden lg:block">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Join the Network</h2>
                        <p className="mt-2 text-slate-500">Register your administrator credentials below.</p>
                    </div>

                    <Form 
                        {...store.form()} 
                        resetOnSuccess={['password', 'password_confirmation']} 
                        disableWhileProcessing 
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</Label>
                                        <div className="group relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                id="name" type="text" required autoFocus tabIndex={1} name="name"
                                                placeholder="Gery Trstno"
                                                className="pl-10 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600"
                                            />
                                        </div>
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Email Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email address</Label>
                                        <div className="group relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                id="email" type="email" required tabIndex={2} name="email"
                                                placeholder="gery@smartsense.io"
                                                className="pl-10 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500">Secure Password</Label>
                                        <div className="group relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                id="password" type="password" required tabIndex={3} name="password"
                                                placeholder="••••••••"
                                                className="pl-10 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600"
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation" className="text-xs font-bold uppercase tracking-widest text-slate-500">Verify Password</Label>
                                        <div className="group relative">
                                            <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                id="password_confirmation" type="password" required tabIndex={4} name="password_confirmation"
                                                placeholder="••••••••"
                                                className="pl-10 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600"
                                            />
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="h-11 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <UserPlus className="mr-2 h-4 w-4" />
                                    )}
                                    Initialize Account
                                </Button>

                                <div className="text-center text-sm text-slate-500">
                                    Already have an account?{' '}
                                    <Link 
                                        href={login().url} 
                                        className="font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4"
                                    >
                                        Access System
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