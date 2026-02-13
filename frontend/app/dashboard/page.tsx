"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell
} from "recharts";
import {
    LayoutDashboard,
    Upload,
    Search,
    Bell,
    User,
    Filter,
    Download,
    AlertCircle,
    Loader2,
    ShieldCheck,
    FileText,
    TrendingUp,
    Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAnalyze } from "@/hooks/useAnalyze";
import { api, AnalysisResult } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const data = [
    { name: "PDS", value: 400, fraud: 120 },
    { name: "KISAN", value: 300, fraud: 45 },
    { name: "LPG", value: 200, fraud: 80 },
    { name: "MGNREGA", value: 278, fraud: 90 },
];

const timeData = [
    { date: "Jan", amount: 4000 },
    { date: "Feb", amount: 3000 },
    { date: "Mar", amount: 5000 },
    { date: "Apr", amount: 2780 },
    { date: "May", amount: 1890 },
    { date: "Jun", amount: 2390 },
];

export default function DashboardPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = React.useState("Overview");

    React.useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [router]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { loading, error, result, processFile, reset } = useAnalyze();

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await processFile(file);
        }
    };

    const handleExport = async () => {
        if (!result) {
            toast.error("No analysis available", {
                description: "Please upload and analyze a file first to export the report."
            });
            return;
        }

        try {
            toast.info("Preparing export...", {
                description: "Generating your report..."
            });
            await api.downloadReport(result.file_id);
            toast.success("Export started", {
                description: "Your report has been downloaded."
            });
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Export failed", {
                description: "Could not generate the report. Please try again."
            });
        }
    };

    const handleAction = (action: string) => {
        alert(`${action} feature coming soon!`);
    };

    // Transform API result for charts
    const chartData = React.useMemo(() => {
        if (!result) return data;

        const schemeCounts: Record<string, { total: number, fraud: number }> = {};

        result.cases.forEach(c => {
            if (!schemeCounts[c.scheme]) {
                schemeCounts[c.scheme] = { total: 0, fraud: 0 };
            }
            schemeCounts[c.scheme].total += 1;
            if (c.risk_score > 50) {
                schemeCounts[c.scheme].fraud += 1;
            }
        });

        return Object.keys(schemeCounts).map(scheme => ({
            name: scheme,
            value: schemeCounts[scheme].total * 10, // Mocking total relative to fraud
            fraud: schemeCounts[scheme].fraud
        }));

    }, [result]);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-10 pl-2">
                    <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tight">
                        Subsi<span className="text-blue-600">Guard</span>
                    </Link>
                    <div className="text-xs text-slate-400 font-medium mt-1 tracking-wide">GOV. ANALYTICS SUITE</div>
                </div>

                <nav className="flex-1 space-y-1">
                    {[
                        { icon: LayoutDashboard, label: t('dash.overview'), key: "Overview" },
                        { icon: Search, label: "Investigations", key: "Investigations" },
                        { icon: Bell, label: "Alerts", key: "Alerts" },
                        { icon: User, label: "Profile", key: "Profile" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 group ${activeTab === item.key
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${activeTab === item.key ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">JD</div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">John Doe</div>
                                <div className="text-xs text-slate-500">Sr. Auditor</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                <GridPattern
                    width={60}
                    height={60}
                    x={-1}
                    y={-1}
                    className="opacity-30 text-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"
                />

                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{activeTab}</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                        >
                            <Download className="w-4 h-4" />
                            {t('dash.export')}
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-[1600px] mx-auto space-y-8 relative pb-20">
                    {activeTab === "Overview" ? (
                        <>
                            {/* Subsidy Types Overview (Bento Grid) */}
                            <div className="mb-0">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-blue-600" />
                                    {t('dash.live_monitoring')}
                                </h2>
                                <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[14rem]">
                                    <BentoGridItem
                                        title="PDS"
                                        description="Public Distribution System"
                                        header={<div className="text-3xl font-bold text-slate-900">4.2M</div>}
                                        icon={<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><FileText className="w-5 h-5" /></div>}
                                        className="border-slate-100"
                                    />
                                    <BentoGridItem
                                        title="PM-KISAN"
                                        description="Farmer Income Support"
                                        header={<div className="text-3xl font-bold text-slate-900">8.9M</div>}
                                        icon={<div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><TrendingUp className="w-5 h-5" /></div>}
                                        className="border-slate-100"
                                    />
                                    <BentoGridItem
                                        title="LPG"
                                        description="Direct Benefit Transfer"
                                        header={<div className="text-3xl font-bold text-slate-900">2.1M</div>}
                                        icon={<div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><AlertCircle className="w-5 h-5" /></div>}
                                        className="border-slate-100"
                                    />
                                    <BentoGridItem
                                        title="MGNREGA"
                                        description="Employment Guarantee"
                                        header={<div className="text-3xl font-bold text-slate-900">5.6M</div>}
                                        icon={<div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><User className="w-5 h-5" /></div>}
                                        className="border-slate-100"
                                    />
                                </BentoGrid>
                            </div>

                            {/* Main Stats with Real Data */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <GlassCard className="p-6 relative overflow-hidden group hover:shadow-premium transition-all">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <ShieldCheck className="w-32 h-32 text-blue-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-sm font-medium text-slate-500 mb-2">Total High-Risk Anomalies</div>
                                        <div className="text-4xl font-bold text-slate-900">
                                            {result ? result.summary.flagged_count : "1,284"}
                                        </div>
                                        <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                                            Action Required
                                        </div>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-6 relative overflow-hidden group hover:shadow-premium transition-all">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Download className="w-32 h-32 text-emerald-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-sm font-medium text-slate-500 mb-2">Potential Savings Detected</div>
                                        <div className="text-4xl font-bold text-slate-900 text-emerald-600">
                                            {result ? `₹${(result.summary.total_leakage_amount / 10000000).toFixed(2)} Cr` : "₹4.2 Cr"}
                                        </div>
                                        <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                                            +12.5% vs Last Month
                                        </div>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-6 relative overflow-hidden group hover:shadow-premium transition-all">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Filter className="w-32 h-32 text-orange-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-sm font-medium text-slate-500 mb-2">Network Risk Score</div>
                                        <div className="text-4xl font-bold text-slate-900 text-orange-500">
                                            {result ? result.summary.average_risk_score : "Medium"}
                                        </div>
                                        <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600">
                                            Monitoring Active
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Charts Column */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Fraud by Component Chart */}
                                    <GlassCard className="p-8">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-lg font-bold text-slate-900">Fraud Distribution by Scheme</h3>
                                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View Details</button>
                                        </div>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={chartData.length > 0 ? chartData : data} barSize={40}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                                    dy={10}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: '#f8fafc' }}
                                                    contentStyle={{
                                                        borderRadius: '16px',
                                                        border: '1px solid #f1f5f9',
                                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                                                        padding: '12px 16px'
                                                    }}
                                                />
                                                <Bar dataKey="fraud" radius={[8, 8, 8, 8]}>
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.8} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </GlassCard>

                                    {/* Recovery Progress Chart */}
                                    <GlassCard className="p-8">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-lg font-bold text-slate-900">Recovery Trends (6 Months)</h3>
                                            <div className="flex gap-2">
                                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                                <span className="text-xs text-slate-500">Recovered Amount</span>
                                            </div>
                                        </div>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <AreaChart data={timeData}>
                                                <defs>
                                                    <linearGradient id="colorAmountPremium" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis
                                                    dataKey="date"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                                    dy={10}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '16px',
                                                        border: '1px solid #f1f5f9',
                                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                                                        padding: '12px 16px'
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="amount"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    fillOpacity={1}
                                                    fill="url(#colorAmountPremium)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </GlassCard>
                                </div>

                                {/* Upload Zone & Recent Activity */}
                                <div className="space-y-8">
                                    <GlassCard className="p-8 flex flex-col items-center text-center border-slate-100 h-full justify-center">
                                        {loading ? (
                                            <div className="flex flex-col items-center py-12">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                                                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-2">{t('dash.analyzing')}</h3>
                                                <p className="text-slate-500 text-sm">Our AI is scanning for anomalies.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm">
                                                    <Upload className="w-10 h-10 text-blue-600" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('dash.upload')}</h3>
                                                <p className="text-slate-500 mb-8 text-sm leading-relaxed px-4">
                                                    Drag & drop your CSV file here to start a new audit. Max file size 50MB.
                                                </p>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    accept=".csv,.xlsx"
                                                />
                                                <button
                                                    onClick={handleUploadClick}
                                                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                                                >
                                                    Select File
                                                </button>
                                                {error && (
                                                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium w-full border border-red-100">
                                                        {error}
                                                    </div>
                                                )}
                                                {result && (
                                                    <div className="mt-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium w-full border border-emerald-100 flex items-center justify-center gap-2">
                                                        <ShieldCheck className="w-4 h-4" />
                                                        Analysis Complete
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </GlassCard>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-slate-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeTab} Section</h2>
                            <p className="text-slate-500 max-w-md mx-auto">This module is part of the premium SubsiGuard suite and will be available shortly.</p>
                            <button
                                onClick={() => setActiveTab("Overview")}
                                className="mt-8 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-full hover:bg-slate-50 transition-colors"
                            >
                                Return to Overview
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
