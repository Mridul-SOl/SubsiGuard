"use client";

import { use, useEffect } from "react";
import { useGetResults } from '@/hooks/use-get-results';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Download, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function ResultsPage({ params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = use(params);
  const { data, isLoading, isError } = useGetResults(fileId);

  useEffect(() => {
    if (data) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-emerald" />
          <p className="text-muted-foreground">Analyzing fraud patterns...</p>
        </main>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-destructive" />
          <p className="text-destructive font-medium">Failed to load results</p>
          <Button asChild variant="outline">
            <Link href="/upload">Try Again</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-8 max-w-screen-2xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/upload" className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Upload New File
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Fraud Analysis Report</h1>
            <p className="text-muted-foreground">
              File: <span className="font-mono text-foreground">{data.file_id}</span> •
              Processed at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button className="bg-emerald hover:bg-emerald/90 gap-2 text-white">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Leakage</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                ₹{data.summary.total_leakage_amount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {(data.summary.flagged_count / data.summary.total_records * 100).toFixed(1)}% of total value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {data.summary.flagged_count}
              </div>
              <p className="text-xs text-muted-foreground">
                Out of {data.summary.total_records.toLocaleString()} records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
              <div className="h-4 w-4 rounded-full border border-current flex items-center justify-center text-xs font-bold text-yellow-500">
                !
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {data.summary.average_risk_score}/100
              </div>
              <Progress value={data.summary.average_risk_score} className="h-2 mt-2" indicatorClassName="bg-yellow-500" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Risk State</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate" title={data.summary.top_risk_state}>
                {data.summary.top_risk_state}
              </div>
              <p className="text-xs text-muted-foreground">
                Highest concentration of anomalies
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Details Tabs */}
        <Tabs defaultValue="flagged" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="flagged" className="gap-2">
                Flagged Cases
                <Badge variant="destructive" className="ml-1 rounded-full px-1 py-0 h-5 min-w-5">
                  {data.summary.flagged_count}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="flagged" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>High Risk Transactions</CardTitle>
                <CardDescription>
                  Transactions flagged with risk score &gt; 70 requiring immediate attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Case ID</TableHead>
                        <TableHead>Beneficiary</TableHead>
                        <TableHead>Scheme</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Primary Reason</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.cases.filter(c => c.risk_score > 70).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-xs">{item.id}</TableCell>
                          <TableCell className="font-medium">{item.beneficiary_name}</TableCell>
                          <TableCell>{item.scheme}</TableCell>
                          <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={item.risk_score > 80 ? "destructive" : "secondary"}>
                              {item.risk_score}%
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-muted-foreground">
                            {item.fraud_reasons[0]}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Records</CardTitle>
                <CardDescription>Full dataset from the uploaded file.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid place-items-center h-40 text-muted-foreground">
                  Full table view implementation...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Deep Analysis</CardTitle>
                <CardDescription>Charts and visualizations of fraud distribution.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid place-items-center h-40 text-muted-foreground">
                  charts here...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
