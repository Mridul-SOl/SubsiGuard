'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { CsvDropzone } from '@/components/csv-dropzone';
import { Button } from '@/components/ui/button';
import { useUploadCsv } from '@/hooks/use-upload-csv';
import { useAnalyze } from '@/hooks/use-analyze';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function UploadPage() {
    const router = useRouter();
    const [fileData, setFileData] = useState<{
        file_id: string;
        filename: string;
        preview_rows: any[];
        total_rows: number;
    } | null>(null);

    const { mutate: uploadCsv, isPending: isUploading } = useUploadCsv();
    const { mutate: analyzeFile, isPending: isAnalyzing } = useAnalyze();

    const handleFileSelect = (file: File) => {
        uploadCsv(file, {
            onSuccess: (data) => {
                setFileData(data);
            },
        });
    };

    const handleAnalyze = () => {
        if (!fileData) return;

        analyzeFile({ file_id: fileData.file_id }, {
            onSuccess: () => {
                toast.success('Analysis Complete', {
                    description: 'Redirecting to results dashboard...'
                });
                router.push(`/results/${fileData.file_id}`);
            },
            onError: (error) => {
                toast.error('Analysis Failed', {
                    description: error.message || 'Something went wrong during analysis'
                });
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 container py-12 max-w-screen-xl">
                <div className="mb-10 text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-glow">
                        Upload Beneficiary Data
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Upload your scheme data (CSV) to detect anomalies, duplicate beneficiaries, and potential fraud patterns.
                    </p>
                </div>

                <div className="grid gap-12">
                    {!fileData ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <CsvDropzone onFileSelect={handleFileSelect} isUploading={isUploading} />
                        </div>
                    ) : (
                        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <FileCheck className="text-emerald w-5 h-5" />
                                        File Ready: <span className="text-emerald">{fileData.filename}</span>
                                    </h2>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        {fileData.total_rows.toLocaleString()} records found
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setFileData(null)}
                                        disabled={isAnalyzing}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing}
                                        className="bg-emerald hover:bg-emerald/90 text-white min-w-[150px]"
                                    >
                                        {isAnalyzing ? 'Analyzing...' : (
                                            <>
                                                Analyze Fraud
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">Data Preview</CardTitle>
                                    <CardDescription>
                                        Showing first few rows. Please verify column mapping.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border border-border/50">
                                        <Table>
                                            <TableHeader className="bg-muted/50">
                                                <TableRow>
                                                    {fileData.preview_rows.length > 0 && Object.keys(fileData.preview_rows[0]).map((key) => (
                                                        <TableHead key={key} className="capitalize">
                                                            {key.replace(/_/g, ' ')}
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {fileData.preview_rows.map((row, i) => (
                                                    <TableRow key={i}>
                                                        {Object.values(row).map((value: any, j) => (
                                                            <TableCell key={j} className="font-mono text-xs text-muted-foreground">
                                                                {typeof value === 'object' ? JSON.stringify(value) : value}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/90 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>
                                    Note: This file contains personal beneficiary data. Analysis is performed securely and data is encrypted at rest.
                                    Ensure you have authorization to process this data.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
