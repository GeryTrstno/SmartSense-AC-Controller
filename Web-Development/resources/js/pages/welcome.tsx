import { dashboard, login, register } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { Activity, ChartColumn, ChevronRight, Cpu, Gauge, ShieldCheck, SlidersHorizontal, Zap } from 'lucide-react';

export default function Welcome({ auth }: { auth: { user: any } }) {
    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950">
            <Head title="Welcome to SmartSense" />

            <nav className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                            <Cpu className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-black tracking-tighter text-slate-900 uppercase dark:text-white">SmartSense</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard().url} className="group flex items-center gap-2 text-sm font-bold text-blue-600">
                                Open Dashboard <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login().url}
                                    className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={register().url}
                                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="pointer-events-none absolute inset-0 z-0 opacity-10 dark:opacity-20">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-600" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase dark:border-blue-900/30 dark:bg-blue-950/30 dark:text-blue-400">
                        <Zap className="h-3 w-3" /> Version 1.0.4 Ready
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl lg:leading-[1.1] dark:text-white">
                        Monitor. Automate. <br />
                        <span className="text-blue-600">Control Everything.</span>
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Integrated IoT system designed for high-precision environment monitoring and remote hardware management. Built for engineers,
                        by engineers.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-6">
                        <Link
                            href={register().url}
                            className="rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-950"
                        >
                            Initialize Project
                        </Link>
                        <Link
                            href="#features"
                            className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                        >
                            View Capability
                        </Link>
                    </div>
                </div>
            </section>

            <section id="features" className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <FeatureCard
                        icon={Gauge}
                        title="Real-time Telemetry"
                        desc="Instant data stream from ESP32 sensors directly to your browser using WebSocket technology."
                    />
                    <FeatureCard
                        icon={SlidersHorizontal}
                        title="Remote Execution"
                        desc="Broadcast commands to your hardware nodes worldwide with ultra-low latency."
                    />
                    <FeatureCard
                        icon={ChartColumn}
                        title="Deep Analytics"
                        desc="Visualize historical data trends with interactive charts and exportable records."
                    />
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-blue-600" />
                        <span className="font-bold tracking-tighter text-slate-900 uppercase dark:text-white">SmartSense</span>
                    </div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-500">
                        &copy; 2026 GeryTrstno • Computer Engineering Project
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 transition-colors hover:text-blue-600">
                            <ShieldCheck className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 transition-colors hover:text-blue-600">
                            <Activity className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
    return (
        <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-100">
                <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
        </div>
    );
}
