import { Link, usePage } from '@inertiajs/react';
import { Gauge, SlidersHorizontal, ChartColumn, Folder, BookOpen, LogOut } from 'lucide-react';

export default function CustomSidebar() {
    const { url } = usePage(); // Mengambil URL aktif untuk styling menu

    const menuItems = [
        { title: 'Dashboard', href: '/dashboard', icon: Gauge },
        { title: 'Control', href: '/control', icon: SlidersHorizontal },
        { title: 'Analytics', href: '/analytics', icon: ChartColumn },
    ];

    const footerItems = [
        { title: 'Repository', href: 'https://github.com/gerytrstno', icon: Folder },
        { title: 'Docs', href: 'https://laravel.com/docs', icon: BookOpen },
    ];

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            {/* Header / Logo Section */}
            <div className="flex h-20 items-center gap-3 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                    <Gauge className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">SmartSense</span>
                    <span className="text-[10px] text-slate-500 font-medium">IoT PROJECT ONE</span>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 space-y-1 px-4 py-4">
                {menuItems.map((item) => {
                    const isActive = url.startsWith(item.href);
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                                isActive 
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                                : "text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                            }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Navigation */}
            <div className="border-t border-slate-100 p-4 dark:border-slate-900">
                <div className="space-y-1">
                    {footerItems.map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </a>
                    ))}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Link>
                </div>
            </div>
        </aside>
    );
}