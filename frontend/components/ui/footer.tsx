export function Footer() {
    return (
        <footer className="border-t border-border/40 py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built for <span className="font-semibold text-foreground">Hackathon 2025</span>.
                    Empowering transparency in subsidy distribution.
                </p>
            </div>
        </footer>
    );
}
