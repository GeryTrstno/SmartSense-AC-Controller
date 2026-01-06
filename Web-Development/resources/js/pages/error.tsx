import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Cpu, WifiOff, ArrowLeft, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dashboard, home } from '@/routes';

export default function ErrorPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
            <Head title="404 - Signal Lost" />

            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-600"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
            </div>

            <div className="relative z-10 w-full max-w-lg text-center">
                <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
                    
                    <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20"></div>
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <WifiOff className="h-12 w-12 text-blue-600" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 dark:border-red-900/30 dark:bg-red-950/30">
                        <AlertTriangle className="h-3 w-3" /> Error Code: 404_NODE_NOT_FOUND
                    </div>
                    
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-6xl">
                        Signal <span className="text-blue-600">Lost.</span>
                    </h1>
                    
                    <p className="mx-auto max-w-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        The requested communication node is unreachable or has been decommissioned from the SmartSense grid.
                    </p>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href={home().url}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 active:scale-95"
                    >
                        <Cpu className="h-4 w-4" /> Return to Gateway
                    </Link>
                    
                    <button 
                        onClick={() => window.location.reload()}
                        className="cursor-pointer flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:bg-slate-900 dark:text-slate-400"
                    >
                        <Activity className="h-4 w-4" /> Re-scan Network
                    </button>
                </div>

                <div className="mt-12 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    SYS_LOG: Unauthorized path access attempt // Source: {window.location.pathname}
                </div>
            </div>
        </div>
    );
}