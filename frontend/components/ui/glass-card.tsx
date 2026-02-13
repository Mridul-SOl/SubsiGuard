import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const GlassCard = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "bg-white/60 backdrop-blur-xl shadow-premium rounded-3xl p-8 border border-slate-100 relative overflow-hidden",
                className
            )}
        >
            {children}
        </div>
    );
};
