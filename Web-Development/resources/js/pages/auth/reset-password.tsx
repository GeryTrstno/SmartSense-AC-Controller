import { store } from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Lock, ShieldCheck, Mail, Cpu, Key, Activity } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans">
            <Head title="Reset Password - SmartSense" />

            {/* --- SISI KIRI: BRANDING & SECURITY PROTOCOL (Hidden on Mobile) --- */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-blue-600 p-12 text-white lg:flex overflow-hidden">
                {/* Background Pattern Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md border border-white/10">
                        <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter uppercase">SmartSense</span>
                </div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Credential Update <br /> Protocol.
                    </h1>
                    <p className="mt-4 text-blue-100 text-lg leading-relaxed max-w-md">
                        Your identity has been verified through the recovery link. Please re-establish your secure access keys for the IoT gateway.
                    </p>
                    
                    <div className="mt-8 flex gap-6 text-sm font-medium text-blue-200">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full"><Key className="h-4 w-4" /> RSA Encryption</div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full"><Activity className="h-4 w-4" /> Gateway Ready</div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-blue-200 font-mono">
                    LOG: AUTH_GATEWAY_RECOVERY_MODE // BUILD v1.0.4
                </div>
            </div>

            {/* --- SISI KANAN: RESET FORM --- */}
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 md:p-16">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Header Section */}
                    <div className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white lg:hidden mb-4 shadow-lg shadow-blue-500/20">
                            <Cpu className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Update Credentials</h2>
                        <p className="text-slate-500 font-medium">Define your new administrative pass-key below.</p>
                    </div>

                    <Form 
                        {...store.form()} 
                        transform={(data) => ({ ...data, token, email })} 
                        resetOnSuccess={['password', 'password_confirmation']}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-5">
                                    {/* Email Field (Read Only) */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Target Node Email</Label>
                                        <div className="relative opacity-60">
                                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="email" 
                                                type="email" 
                                                name="email" 
                                                value={email} 
                                                readOnly 
                                                className="pl-10 h-11 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-not-allowed"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* New Password Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">New Pass-Key</Label>
                                        <div className="group relative">
                                            <Lock className={`absolute left-3 top-3.5 h-4 w-4 transition-colors ${errors.password ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
                                            <Input
                                                id="password" 
                                                type="password" 
                                                name="password" 
                                                required 
                                                autoFocus 
                                                placeholder="••••••••"
                                                className={`pl-10 h-11 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600 transition-all ${errors.password ? 'border-red-500 ring-red-500/20' : ''}`}
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Verify Pass-Key</Label>
                                        <div className="group relative">
                                            <ShieldCheck className={`absolute left-3 top-3.5 h-4 w-4 transition-colors ${errors.password_confirmation ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
                                            <Input
                                                id="password_confirmation" 
                                                type="password" 
                                                name="password_confirmation" 
                                                required 
                                                placeholder="••••••••"
                                                className={`pl-10 h-11 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:ring-blue-600 transition-all ${errors.password_confirmation ? 'border-red-500 ring-red-500/20' : ''}`}
                                            />
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]" 
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Key className="mr-2 h-4 w-4" />
                                    )}
                                    Update Security Keys
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}