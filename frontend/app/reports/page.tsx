"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { FileText, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

import { AuthGuard } from "@/components/auth-guard";

export default function ReportsPage() {
    return (
        <AuthGuard>
            <ReportsContent />
        </AuthGuard>
    );
}

function ReportsContent() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({
        total_audits: 0,
        critical_issues: 0,
        resolved_cases: 0,
        total_leakage: 0
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await api.getReportsSummary();
                setSummary(data);
            } catch (error) {
                console.error("Failed to fetch reports summary:", error);
                toast.error("Failed to load audit data");
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gov-navy">Audit Center</h1>
                    {loading && <Loader2 className="w-5 h-5 animate-spin text-slate-400" />}
                </div>
                <p className="text-slate-500 mb-8">Centralized repository for audit reports and anomaly findings.</p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="p-6 bg-white border-l-4 border-blue-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Analyzed Records</p>
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {loading ? "-" : summary.total_audits.toLocaleString()}
                                </h3>
                            </div>
                            <FileText className="h-8 w-8 text-blue-500 opacity-80" />
                        </div>
                    </GlassCard>
                    <GlassCard className="p-6 bg-white border-l-4 border-red-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Critical Issues</p>
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {loading ? "-" : summary.critical_issues.toLocaleString()}
                                </h3>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-500 opacity-80" />
                        </div>
                    </GlassCard>
                    <GlassCard className="p-6 bg-white border-l-4 border-green-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Compliant Cases</p>
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {loading ? "-" : summary.resolved_cases.toLocaleString()}
                                </h3>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
                        </div>
                    </GlassCard>
                </div>

                {summary.total_leakage > 0 && (
                    <GlassCard className="p-6 bg-gradient-to-r from-red-50 to-white border-red-100 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 rounded-full text-red-600">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-red-900">Total Potential Leakage Detected</h3>
                                <p className="text-2xl font-bold text-red-600">₹{(summary.total_leakage / 10000000).toFixed(2)} Cr</p>
                            </div>
                        </div>
                    </GlassCard>
                )}

                <GlassCard className="p-12 text-center bg-white/50 border-dashed border-2 border-slate-300">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                        <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Detailed Reports</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        Individual audit reports are currently available via the Dashboard immediately after analysis.
                        Run a new analysis from the <a href="/upload" className="text-blue-600 hover:underline">Upload</a> page.
                    </p>
                </GlassCard>
            </div>
        </div>
    );
}
