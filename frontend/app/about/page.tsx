
import { GlassCard } from "@/components/ui/glass-card";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-10 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-gov-navy mb-6">About SubsiGuard</h1>
                <GlassCard className="p-8 bg-white/80 backdrop-blur-md">
                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            <strong>SubsiGuard</strong> is the official National Subsidy Leakage Detection Portal, an initiative by the Government of India to ensure transparency and efficiency in welfare distribution.
                        </p>
                        <p className="text-slate-600 mb-4">
                            Our mission is to leverage advanced data analytics and artificial intelligence to identify irregularities in schemes like PDS (Public Distribution System), PM-KISAN, and MGNREGA. By detecting and preventing leakage, we ensure that the benefits reach the rightful beneficiaries.
                        </p>
                        <h3 className="text-xl font-semibold text-gov-navy mt-6 mb-2">Key Features</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Real-time anomaly detection in transaction data.</li>
                            <li>Geospatial analysis of subsidy distribution.</li>
                            <li>Secure reporting mechanisms for whistleblowers and auditors.</li>
                            <li>Comprehensive dashboards for policy makers and administrators.</li>
                        </ul>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
