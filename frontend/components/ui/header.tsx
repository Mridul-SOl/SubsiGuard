import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <ShieldCheck className="h-6 w-6 text-emerald" />
                    <span className="font-bold text-lg text-white">SubsiGuard</span>
                </Link>
                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                    <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Dashboard
                    </Link>
                    <Link href="/upload" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Analyze File
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="https://github.com" target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 4 3c-1 0-3 .5-2.5 0-.5-2 1.5-3.5 2.5-3.5 0 0 0.5 0 1.5 1-2 1-3.5-1.5-3.5-5.5 1-1 3-1.5 5.5-1.5 0-1.5 4.8-1.5 3.5 0 0 4.8 0 0 4.8 4.8 0 0 0-1 3.5c0 0 0 0 0 4v2" /></svg>
                            <span className="sr-only">GitHub</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
