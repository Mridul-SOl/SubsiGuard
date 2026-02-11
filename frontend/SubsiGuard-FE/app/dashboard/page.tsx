"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { KpiCard } from "@/components/kpi-card";

// import { IndiaHeatmap } from "@/components/india-heatmap";
import dynamic from "next/dynamic";
const IndiaHeatmap = dynamic(() => import("@/components/india-heatmap").then(mod => mod.IndiaHeatmap), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-lg" />
});
import { DataTable } from "@/components/data-table";
import { FraudScoreBadge } from "@/components/fraud-score-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import {
    Building2,
    Users,
    AlertTriangle,
    Banknote,
    TrendingUp,
    Download,
    Filter
} from "lucide-react";

// Mock Data
const kpiData = [
    {
        title: "Total Disbursed",
        value: "₹1,245 Cr",
        icon: Banknote,
        trend: { value: 12.5, isPositive: true },
        description: "vs last month"
    },
    {
        title: "Projected Leakage",
        value: "₹142 Cr",
        icon: AlertTriangle,
        trend: { value: -2.4, isPositive: true },
        trendMode: "inverse" as const,
        description: "potential savings"
    },
    {
        title: "Flagged Beneficiaries",
        value: "8,542",
        icon: Users,
        trend: { value: 5.2, isPositive: false },
        trendMode: "inverse" as const,
        description: "high risk cases"
    },
    {
        title: "Avg Fraud Score",
        value: "18%",
        icon: TrendingUp,
        trend: { value: -1.5, isPositive: true },
        trendMode: "inverse" as const,
        description: "system wide avg"
    }
];

const stateRiskData = [
    { state: "Uttar Pradesh", value: 45000000, riskScore: 78 },
    { state: "Bihar", value: 32000000, riskScore: 82 },
    { state: "Maharashtra", value: 28000000, riskScore: 65 },
    { state: "West Bengal", value: 21000000, riskScore: 71 },
    { state: "Madhya Pradesh", value: 18000000, riskScore: 55 },
    { state: "Rajasthan", value: 15000000, riskScore: 48 },
    { state: "Karnataka", value: 12000000, riskScore: 35 },
];

const leakageBySchemeData = [
    { name: "PM-KISAN", value: 45 },
    { name: "PDS", value: 30 },
    { name: "MGNREGA", value: 15 },
    { name: "LPG Subsidy", value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const fraudDistributionData = [
    { range: "0-20%", count: 12500 },
    { range: "20-40%", count: 5400 },
    { range: "40-60%", count: 3200 },
    { range: "60-80%", count: 1800 },
    { range: "80-100%", count: 850 },
];

type Beneficiary = {
    id: string;
    name: string;
    scheme: string;
    state: string;
    amount: number;
    riskScore: number;
    status: "Pending" | "Flagged" | "Verified";
};

const recentFlaggedData: Beneficiary[] = [
    { id: "BEN-001", name: "Rahul Kumar", scheme: "PM-KISAN", state: "Uttar Pradesh", amount: 2000, riskScore: 85, status: "Flagged" },
    { id: "BEN-002", name: "Amit Singh", scheme: "PDS", state: "Bihar", amount: 450, riskScore: 92, status: "Flagged" },
    { id: "BEN-003", name: "Priya Sharma", scheme: "MGNREGA", state: "Maharashtra", amount: 5600, riskScore: 78, status: "Flagged" },
    { id: "BEN-004", name: "Suresh Patel", scheme: "LPG", state: "Gujarat", amount: 300, riskScore: 65, status: "Pending" },
    { id: "BEN-005", name: "Anita Devi", scheme: "PM-KISAN", state: "West Bengal", amount: 2000, riskScore: 88, status: "Flagged" },
    { id: "BEN-006", name: "Vikram Malhotra", scheme: "PDS", state: "Punjab", amount: 500, riskScore: 45, status: "Verified" },
    { id: "BEN-007", name: "Sneha Gupta", scheme: "MGNREGA", state: "Uttar Pradesh", amount: 4200, riskScore: 72, status: "Flagged" },
];

const columns: ColumnDef<Beneficiary>[] = [
    {
        accessorKey: "name",
        header: "Beneficiary",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "scheme",
        header: "Scheme",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(amount);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "riskScore",
        header: "Risk Score",
        cell: ({ row }) => (
            <FraudScoreBadge score={row.getValue("riskScore")} />
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${status === "Flagged" ? "bg-red-500/10 text-red-500" :
                    status === "Verified" ? "bg-emerald-500/10 text-emerald-500" :
                        "bg-yellow-500/10 text-yellow-500"
                    }`}>
                    {status}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Building2 className="h-4 w-4" />
            </Button>
        ),
    },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container py-8 max-w-screen-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                        <p className="text-muted-foreground">
                            Real-time monitoring of subsidy distribution and fraud detection.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 gap-1">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        <Button size="sm" className="h-9 gap-1 bg-emerald hover:bg-emerald/90 text-white">
                            <Download className="h-4 w-4" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {kpiData.map((kpi, index) => (
                        <KpiCard key={index} {...kpi} />
                    ))}
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
                        <TabsTrigger value="reports">Recent Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            {/* Heatmap Section */}
                            <div className="col-span-4 lg:col-span-4">
                                <IndiaHeatmap data={stateRiskData} className="h-full" />
                            </div>

                            {/* Charts Section */}
                            <Card className="col-span-3 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Leakage by Scheme</CardTitle>
                                    <CardDescription>
                                        Distribution of flagged suspicious transactions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={leakageBySchemeData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {leakageBySchemeData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                                                    itemStyle={{ color: '#e2e8f0' }}
                                                />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            {/* Bar Chart */}
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Fraud Risk Distribution</CardTitle>
                                    <CardDescription>Number of transactions by risk score range</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={fraudDistributionData}>
                                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                                <XAxis
                                                    dataKey="range"
                                                    stroke="#888888"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <YAxis
                                                    stroke="#888888"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickFormatter={(value) => `${value}`}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: 'transparent' }}
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                                                    itemStyle={{ color: '#10b981' }}
                                                />
                                                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Transactions List */}
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Flagged Cases</CardTitle>
                                    <CardDescription>
                                        Latest high-risk beneficiaries detected
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-auto max-h-[300px]">
                                        <DataTable
                                            columns={columns}
                                            data={recentFlaggedData}
                                            filterColumn="name"
                                            filterPlaceholder="Search name..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <Card>
                            <CardHeader>
                                <CardTitle>Advanced Analytics</CardTitle>
                                <CardDescription>Detailed breakdown coming soon...</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                                Detailed trend analysis and forecasting module.
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
