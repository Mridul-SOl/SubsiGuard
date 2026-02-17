"use client";


import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Globe, Shield, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter, usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OfficialHeader() {
    const { t, language, setLanguage } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [fontSize, setFontSize] = useState(1);
    const [user, setUser] = useState<{ full_name: string; role: string } | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Determine if header should be transparent (Home page only, and menu closed)
    const isTransparent = isHome && !isMobileMenuOpen;

    // Initial check for font preference can be loaded here if needed
    // Authentication Check
    useEffect(() => {
        const checkAuth = () => {
            // ... existing code ...
        };

        checkAuth();
        // Listener for storage events (optional, for multi-tab sync)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const increaseFont = () => setFontSize((prev) => Math.min(prev + 0.1, 1.3));
    const decreaseFont = () => setFontSize((prev) => Math.max(prev - 0.1, 0.8));
    const resetFont = () => setFontSize(1);

    const handleLogout = () => {
        // ... existing code ...
    };

    return (
        <header className={`w-full font-sans z-50 transition-all duration-300 ${isHome ? 'absolute top-0 left-0' : 'relative'} ${isTransparent ? 'bg-transparent' : 'bg-white'}`} style={{ fontSize: `${fontSize}rem` }}>
            {/* Top Utility Strip */}
            {/* ... existing code ... */}
            <div className={`border-b py-1 px-4 text-xs font-medium transition-colors ${isTransparent ? 'bg-white/60 text-slate-800 border-slate-200/50' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {/* ... existing utility strip content ... */}
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex gap-4">
                        <span>GOVERNMENT OF INDIA</span>
                        <span className={`${isTransparent ? 'text-slate-400' : 'text-slate-400'}`}>|</span>
                        <span>भारत सरकार</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`hidden sm:flex gap-2 items-center border-r pr-4 ${isTransparent ? 'border-slate-300/50' : 'border-slate-300'}`}>
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
            <div className={`shadow-sm border-b-4 transition-all ${isTransparent ? 'bg-white/80 backdrop-blur-md border-gov-saffron/80' : 'bg-white border-gov-saffron'}`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* Emblem */}
                            <div className="relative w-10 h-16">
                                <Image
                                    src="/emblem.png"
                                    alt="National Emblem of India"
                                    fill
                                    className="object-contain"
                                    priority
                                    unoptimized
                                />
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
                            {/* ... existing links ... */}
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
                        <button
                            className="md:hidden text-gov-navy"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-32 px-6 animate-in slide-in-from-top-5 duration-200 md:hidden overflow-y-auto">
                    <nav className="flex flex-col gap-6 text-lg font-semibold text-slate-800 pb-10">
                        <Link href="/" className="hover:text-gov-navy border-b pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('nav.home')}
                        </Link>
                        <Link href="/dashboard" className="hover:text-gov-navy border-b pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('nav.dashboard')}
                        </Link>
                        <Link href="/upload" className="hover:text-gov-navy border-b pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('nav.audit')}
                        </Link>
                        <Link href="/reports" className="hover:text-gov-navy border-b pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                            Audit Center
                        </Link>

                        {user ? (
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                        {user.full_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{user.full_name}</p>
                                        <p className="text-xs text-slate-500">{user.role}</p>
                                    </div>
                                </div>
                                <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} variant="destructive" className="w-full justify-start gap-2">
                                    <LogOut className="w-4 h-4" />
                                    {t('nav.logout')}
                                </Button>
                            </div>
                        ) : (
                            <Link href="/login" className="mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-gov-navy text-white gap-2">
                                    <Shield className="w-4 h-4" />
                                    {t('nav.login')}
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
