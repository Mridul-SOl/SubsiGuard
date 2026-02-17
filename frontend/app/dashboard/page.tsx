"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
            {/* Sidebar (Keep as is) */}
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
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{activeTab}</h1>
                        <p className="text-sm text-slate-500">Welcome back, Auditor. Here is today's subsidy leakage report.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleExport}
                            disabled={!result}
                            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-all shadow-sm ${result
                                ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            <Download className="w-4 h-4" />
                            {t('dash.export')}
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-[1600px] mx-auto space-y-8 relative pb-20">
                    {activeTab === "Overview" ? (
                        <>
                            {/* 1. Upload Section (Full Width, Top) */}
                            <GlassCard className="p-8 border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900">Initiate New Audit</h2>
                                                <p className="text-slate-500 text-sm">Upload beneficiary data (CSV) to run the Hybrid Fraud Detection Engine.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="p-3 bg-white rounded-xl border border-slate-100 text-sm">
                                                <span className="font-semibold text-slate-900 block">Supported Formats</span>
                                                <span className="text-slate-500">.csv, .xlsx (Max 50MB)</span>
                                            </div>
                                            <div className="p-3 bg-white rounded-xl border border-slate-100 text-sm">
                                                <span className="font-semibold text-slate-900 block">Encryption</span>
                                                <span className="text-slate-500">AES-256 for PII Data</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 w-full max-w-md">
                                        {loading ? (
                                            <div className="w-full py-8 bg-white border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center animate-pulse">
                                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                                                <span className="text-sm font-medium text-slate-600">{t('dash.analyzing')}</span>
                                                <span className="text-xs text-slate-400">Running Isolation Forest Model...</span>
                                            </div>
                                        ) : result ? (
                                            <div className="w-full py-6 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                        <ShieldCheck className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-emerald-900">Analysis Complete</div>
                                                        <div className="text-xs text-emerald-700">File: {result.file_id.substring(0, 15)}...</div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => reset()}
                                                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                                                >
                                                    Upload New
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    accept=".csv,.xlsx"
                                                />
                                                <button
                                                    onClick={handleUploadClick}
                                                    className="w-full py-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400 transition-all group flex flex-col items-center justify-center gap-2"
                                                >
                                                    <Upload className="w-8 h-8 text-blue-400 group-hover:text-blue-600 transition-colors" />
                                                    <span className="text-sm font-bold text-blue-900">Click to Upload Data</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </GlassCard>


                            {/* 2. Detailed Analysis Table (Shadcn) - MOVED UP */}
                            {result && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            Detailed Analysis Report
                                        </h2>
                                        <span className="text-sm text-slate-500">Showing top 10 high-risk cases</span>
                                    </div>

                                    <GlassCard className="overflow-hidden p-0 border-slate-200">
                                        <Table>
                                            <TableHeader className="bg-slate-50">
                                                <TableRow>
                                                    <TableHead className="w-[100px]">Case ID</TableHead>
                                                    <TableHead>Beneficiary</TableHead>
                                                    <TableHead>Scheme</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Fraud Reasons (AI Detected)</TableHead>
                                                    <TableHead className="text-right">Risk Score</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {result.cases.map((fraudCase) => (
                                                    <TableRow key={fraudCase.id} className="group hover:bg-slate-50">
                                                        <TableCell className="font-medium text-slate-900">{fraudCase.id}</TableCell>
                                                        <TableCell>{fraudCase.beneficiary_name}</TableCell>
                                                        <TableCell>
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${fraudCase.scheme === 'PM-KISAN' ? 'bg-emerald-50 text-emerald-700' :
                                                                fraudCase.scheme === 'PDS' ? 'bg-blue-50 text-blue-700' :
                                                                    'bg-orange-50 text-orange-700'
                                                                }`}>
                                                                {fraudCase.scheme}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>₹{fraudCase.amount.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1">
                                                                {fraudCase.fraud_reasons.map((reason, idx) => (
                                                                    <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100">
                                                                        {reason}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <span className={`font-bold ${fraudCase.risk_score > 80 ? "text-red-600" :
                                                                    fraudCase.risk_score > 50 ? "text-orange-500" : "text-slate-600"
                                                                    }`}>
                                                                    {fraudCase.risk_score}/100
                                                                </span>
                                                                <div className={`w-2 h-2 rounded-full ${fraudCase.risk_score > 80 ? "bg-red-500 animate-pulse" :
                                                                    fraudCase.risk_score > 50 ? "bg-orange-400" : "bg-slate-300"
                                                                    }`}></div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </GlassCard>
                                </div>
                            )}

                            {/* 3. AI Analysis Summary - NEW SECTION */}
                            {result && (
                                <GlassCard className="p-6 border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-indigo-900 mb-2">AI Audit Summary</h3>
                                            <p className="text-slate-600 leading-relaxed text-sm">
                                                Based on the analysis of <strong>{result.summary.total_records.toLocaleString()} records</strong>, the SubsiGuard AI Engine has flagged
                                                <strong className="text-red-600"> {result.summary.flagged_count} high-risk beneficiaries</strong>.
                                                This represents potential leakage estimation of <strong className="text-emerald-600">₹{(result.summary.total_leakage_amount / 10000000).toFixed(2)} Cr</strong>.
                                                The primary fraud indicators identified include <em>Duplicate Identity</em>, <em>Income Threshold Verification</em>, and <em>Geographic Mismatch</em>.
                                                Immediate field verification is recommended for cases with Risk Score &gt; 90.
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            )}

                            {/* 4. Live Monitoring (Bento Grid) with Explanations */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-blue-600" />
                                        {t('dash.live_monitoring')}
                                    </h2>
                                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                                        System Active
                                    </span>
                                </div>

                                <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[13rem]">
                                    <BentoGridItem
                                        title="PDS"
                                        description="Public Distribution System (Food Security)"
                                        header={
                                            <div className="space-y-2">
                                                <div className="text-3xl font-bold text-slate-900">4.2M</div>
                                                <div className="text-xs text-slate-500 leading-tight">Beneficiaries receiving subsidized rice/wheat.</div>
                                            </div>
                                        }
                                        icon={<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><FileText className="w-4 h-4" /></div>}
                                        className="border-slate-100"
                                    />
                                    <BentoGridItem
                                        title="PM-KISAN"
                                        description="Farmer Income Support Scheme"
                                        header={
                                            <div className="space-y-2">
                                                <div className="text-3xl font-bold text-slate-900">8.9M</div>
                                                <div className="text-xs text-slate-500 leading-tight">Farmers receiving ₹6000/year direct transfer.</div>
                                            </div>
                                        }
                                        icon={<div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><TrendingUp className="w-4 h-4" /></div>}
                                        className="border-slate-100"
                                    />
                                    <BentoGridItem
                                        title="LPG (PAHAL)"
                                        description="Direct Benefit Transfer for Liquid Gas"
                                        header={
                                            <div className="space-y-2">
                                                <div className="text-3xl font-bold text-slate-900">2.1M</div>
                                                <div className="text-xs text-slate-500 leading-tight">Households receiving gas cylinder subsidy.</div>
                                            </div>
                                        }
                                        icon={<div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><AlertCircle className="w-4 h-4" /></div>}
                                        className="border-slate-100"
                                    />
                                    <BentoGridItem
                                        title="MGNREGA"
                                        description="Rural Employment Guarantee Act"
                                        header={
                                            <div className="space-y-2">
                                                <div className="text-3xl font-bold text-slate-900">5.6M</div>
                                                <div className="text-xs text-slate-500 leading-tight">Workers guaranteed 100 days of wage employment.</div>
                                            </div>
                                        }
                                        icon={<div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><User className="w-4 h-4" /></div>}
                                        className="border-slate-100"
                                    />
                                </BentoGrid>
                            </div>

                            {/* 3. Main Stats & Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left: Stats Cards */}
                                <div className="space-y-6">
                                    <GlassCard className="p-6 relative overflow-hidden group hover:shadow-premium transition-all">
                                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <ShieldCheck className="w-32 h-32 text-blue-600" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="text-sm font-medium text-slate-500">High-Risk Anomalies</div>
                                                <div className="group relative">
                                                    <AlertCircle className="w-3 h-3 text-slate-400 cursor-help" />
                                                </div>
                                            </div>
                                            <div className="text-4xl font-bold text-slate-900">
                                                {result ? result.summary.flagged_count : "1,284"}
                                            </div>
                                            <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                                                Action Required
                                            </div>
                                            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                                                Cases flagged by AI as having &gt;80% probability of fraud due to duplicate IDs, income mismatch, or outlier patterns.
                                            </p>
                                        </div>
                                    </GlassCard>

                                    <GlassCard className="p-6 relative overflow-hidden group hover:shadow-premium transition-all">
                                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Download className="w-32 h-32 text-emerald-600" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="text-sm font-medium text-slate-500 mb-2">Potential Savings</div>
                                            <div className="text-4xl font-bold text-slate-900 text-emerald-600">
                                                {result ? `₹${(result.summary.total_leakage_amount / 10000000).toFixed(2)} Cr` : "₹4.2 Cr"}
                                            </div>
                                            <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                                                +12.5% vs Last Month
                                            </div>
                                            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                                                Estimated funds that can be recovered by blocking fraudulent claims identified in this session.
                                            </p>
                                        </div>
                                    </GlassCard>

                                    {/* AI Logic Explainer Card */}
                                    <GlassCard className="p-6 bg-slate-900 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-indigo-500/20 rounded-lg">
                                                <Activity className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <h3 className="font-bold">How AI Works?</h3>
                                        </div>
                                        <div className="space-y-4 text-sm text-slate-300">
                                            <div>
                                                <strong className="text-white block mb-1">1. Rule Engine</strong>
                                                Checks against 50+ strict government policies (e.g., Income &lt; ₹2.5L).
                                            </div>
                                            <div>
                                                <strong className="text-white block mb-1">2. Anomaly Detection</strong>
                                                Uses <em>Isolation Forest</em> algorithm to find hidden patterns (e.g., 100 people sharing same bank account).
                                            </div>
                                            <div>
                                                <strong className="text-white block mb-1">3. Risk Scoring</strong>
                                                Assigns 0-100 score. Cases &gt;80 are flagged for immediate audit.
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* Right: Charts (Span 2) */}
                                <div className="lg:col-span-2 space-y-6">
                                    <GlassCard className="p-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-6">Fraud Distribution by Scheme</h3>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={chartData.length > 0 ? chartData : data} barSize={40}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                                <Bar dataKey="fraud" radius={[6, 6, 6, 6]}>
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fraud > 50 ? "#ef4444" : "#3b82f6"} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </GlassCard>

                                    <GlassCard className="p-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-6">Trend Analysis (6 Months)</h3>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={timeData}>
                                                <defs>
                                                    <linearGradient id="colorAmountPremium" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmountPremium)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </GlassCard>
                                </div>
                            </div>



                            {/* 5. Final Audit Report Details (Textual) */}
                            {result?.report_details && (
                                <GlassCard className="p-8 border-slate-200 bg-white shadow-sm">
                                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                        <div className="p-2 bg-slate-100 rounded-lg">
                                            <FileText className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">Final Audit Report</h2>
                                            <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                                Executive Summary
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                {result.report_details.executive_summary}
                                            </p>
                                        </section>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <section>
                                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                                                    Key Findings
                                                </h3>
                                                <ul className="space-y-3">
                                                    {result.report_details.key_findings.map((finding, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-slate-600">
                                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold border border-red-100">
                                                                {i + 1}
                                                            </span>
                                                            <span className="pt-1">{finding}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                                                    Recommendations
                                                </h3>
                                                <ul className="space-y-3">
                                                    {result.report_details.recommendations.map((rec, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-slate-600">
                                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold border border-emerald-100">
                                                                {i + 1}
                                                            </span>
                                                            <span className="pt-1">{rec}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        </div>

                                        <section className="pt-4 border-t border-slate-100">
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">Conclusion</h3>
                                            <p className="text-slate-600 leading-relaxed text-sm font-medium italic">
                                                "{result.report_details.conclusion}"
                                            </p>
                                        </section>
                                    </div>
                                </GlassCard>
                            )}
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
