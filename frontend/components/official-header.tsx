"use client";

import Link from "next/link";
import { Search, Menu, Globe, Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OfficialHeader() {
    const { t, language, setLanguage } = useLanguage();
    const router = useRouter();
    const [fontSize, setFontSize] = useState(1);
    const [user, setUser] = useState<{ full_name: string; role: string } | null>(null);

    // Initial check for font preference can be loaded here if needed
    // Authentication Check
    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem("isAuthenticated");
            const userStr = localStorage.getItem("user");
            if (auth && userStr) {
                try {
                    setUser(JSON.parse(userStr));
                } catch (e) {
                    console.error("Failed to parse user", e);
                }
            } else {
                setUser(null);
            }
        };

        checkAuth();
        // Listener for storage events (optional, for multi-tab sync)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const increaseFont = () => setFontSize((prev) => Math.min(prev + 0.1, 1.3));
    const decreaseFont = () => setFontSize((prev) => Math.max(prev - 0.1, 0.8));
    const resetFont = () => setFontSize(1);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    return (
        <header className="w-full font-sans" style={{ fontSize: `${fontSize}rem` }}>
            {/* Top Utility Strip */}
            <div className="bg-slate-100 border-b border-slate-200 py-1 px-4 text-xs font-medium text-slate-600">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex gap-4">
                        <span>GOVERNMENT OF INDIA</span>
                        <span className="text-slate-400">|</span>
                        <span>भारत सरकार</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex gap-2 items-center border-r border-slate-300 pr-4">
                            <button onClick={decreaseFont} className="hover:text-gov-navy font-bold px-1" aria-label="Decrease Font">A-</button>
                            <button onClick={resetFont} className="hover:text-gov-navy font-bold px-1" aria-label="Reset Font">A</button>
                            <button onClick={increaseFont} className="hover:text-gov-navy font-bold px-1" aria-label="Increase Font">A+</button>
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer hover:text-gov-navy select-none"
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        >
                            <Globe className="h-3 w-3" />
                            <span>{language === 'en' ? 'English / हिन्दी' : 'हिन्दी / English'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-white shadow-sm border-b-4 border-gov-saffron">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* Emblem Placeholder */}
                            <div className="w-10 h-14 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">
                                <span className="text-[0.5rem] text-center leading-tight">National<br />Emblem</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-gov-navy leading-none tracking-tight group-hover:text-gov-emerald transition-colors">
                                    {language === 'en' ? 'SubsiGuard' : t('app.name')}
                                </h1>
                                <span className="text-[0.65rem] font-medium text-slate-500 uppercase tracking-widest mt-1">
                                    {language === 'en' ? 'National Subsidy Leakage Detection Portal' : t('app.tagline')}
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links (Desktop) */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
                            <Link href="/" className="hover:text-gov-navy hover:underline decoration-2 underline-offset-4">
                                {t('nav.home')}
                            </Link>
                            <Link href="/dashboard" className="hover:text-gov-navy hover:underline decoration-2 underline-offset-4">
                                {t('nav.dashboard')}
                            </Link>
                            <Link href="/upload" className="hover:text-gov-navy hover:underline decoration-2 underline-offset-4">
                                {t('nav.audit')}
                            </Link>

                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold p-0">
                                            {user.full_name.charAt(0)}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 font-sans">
                                        <div className="flex items-center justify-start gap-2 p-2">
                                            <div className="flex flex-col space-y-1 leading-none">
                                                <p className="font-medium">{user.full_name}</p>
                                                <p className="w-[200px] truncate text-xs text-muted-foreground">{user.role}</p>
                                            </div>
                                        </div>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>{t('nav.logout')}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm" className="bg-gov-navy hover:bg-gov-navy/90 text-white gap-2 rounded shadow-sm">
                                        <Shield className="w-4 h-4" />
                                        {t('nav.login')}
                                    </Button>
                                </Link>
                            )}
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-gov-navy">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
