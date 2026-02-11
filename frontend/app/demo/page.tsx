"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DemoPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            toast.success("Demo Mode Activated", {
                description: "Loaded synthetic data for PDS and PM-KISAN schemes.",
                duration: 5000,
            });
            router.push("/dashboard");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-navy text-white">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
                <h1 className="text-2xl font-bold">Initializing Demo Environment...</h1>
                <p className="text-muted-foreground">Loading synthetic datasets for analysis</p>
            </div>
        </div>
    );
}
