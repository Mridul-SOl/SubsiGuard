import { GlassCard } from "@/components/ui/glass-card";
import { FileText, AlertTriangle, CheckCircle } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-gov-navy mb-2">Audit Center</h1>
                <p className="text-slate-500 mb-8">Centralized repository for audit reports and anomaly findings.</p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="p-6 bg-white border-l-4 border-blue-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Audits</p>
                                <h3 className="text-3xl font-bold text-slate-800">1,248</h3>
                            </div>
                            <FileText className="h-8 w-8 text-blue-500 opacity-80" />
                        </div>
                    </GlassCard>
                    <GlassCard className="p-6 bg-white border-l-4 border-red-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Critical Issues</p>
                                <h3 className="text-3xl font-bold text-slate-800">42</h3>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-500 opacity-80" />
                        </div>
                    </GlassCard>
                    <GlassCard className="p-6 bg-white border-l-4 border-green-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Resolved Cases</p>
                                <h3 className="text-3xl font-bold text-slate-800">856</h3>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
                        </div>
                    </GlassCard>
                </div>

                <GlassCard className="p-12 text-center bg-white/50 border-dashed border-2 border-slate-300">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                        <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No reports generated yet</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        Run an analysis from the <a href="/upload" className="text-blue-600 hover:underline">Upload</a> page to generate new audit reports.
                    </p>
                </GlassCard>
            </div>
        </div>
    );
}
