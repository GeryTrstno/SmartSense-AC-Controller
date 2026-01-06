import { store } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, KeyRound, Cpu, ArrowLeft, ShieldAlert } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
            <Head title="Forgot Password - SmartSense" />

            {/* --- SISI KIRI: BRANDING & SECURITY INFO (Hidden on Mobile) --- */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-blue-600 p-12 text-white lg:flex">
                {/* Background Pattern Grid */}
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
                        Account Recovery <br /> Protocol.
                    </h1>
                    <p className="mt-4 text-blue-100 text-lg">
                        Lost your access key? Follow the security protocol to verify your identity and reset your administrative credentials.
                    </p>
                    
                    <div className="mt-8 flex gap-6 text-sm font-medium text-blue-200">
                        <div className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> Identity Verification</div>
                        <div className="flex items-center gap-2"><KeyRound className="h-4 w-4" /> Secure Reset</div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-blue-200">
                    &copy; 2026 SmartSense IoT Core v1.0.4 - Secure Authentication System
                </div>
            </div>

            {/* --- SISI KANAN: RESET FORM --- */}
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 md:p-16">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Header Section */}
                    <div className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white lg:hidden mb-4">
                            <Cpu className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Recover Access</h2>
                        <p className="text-slate-500 font-medium">Enter your admin email to receive a secure reset link.</p>
                    </div>

                    {/* Status Message (Success) */}
                    {status && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            {status}
                        </div>
                    )}

                    <Form {...store.form()} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    {/* Email Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Registered Email</Label>
                                        <div className="group relative">
                                            <Mail className={`absolute left-3 top-3.5 h-4 w-4 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
                                            <Input
                                                id="email" 
                                                type="email" 
                                                name="email" 
                                                required 
                                                autoFocus 
                                                placeholder="admin@smartsense.io"
                                                className={`pl-10 h-11 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600 transition-all ${errors.email ? 'border-red-500 ring-red-500/20' : ''}`}
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="h-11 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]" 
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Mail className="mr-2 h-4 w-4" />
                                    )}
                                    Send Recovery Link
                                </Button>

                                <div className="text-center">
                                    <Link 
                                        href={login().url} 
                                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Return to Access Portal
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