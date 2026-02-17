"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

import { AuthGuard } from "@/components/auth-guard";

export default function AuditCenterPage() {
    return (
        <AuthGuard>
            <AuditCenterContent />
        </AuthGuard>
    );
}


function AuditCenterContent() {
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            toast.info("File selected for verification.");
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.csv']
        },
        maxFiles: 1
    });

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);

        try {
            const data = await api.uploadFile(file);
            toast.success("File uploaded successfully. Audit initiated.");

            // Redirect to results page
            if (data.file_id) {
                router.push(`/results/${data.file_id}`);
            } else {
                toast.error("No file ID returned.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to process file. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gov-navy mb-2">Audit Center</h1>
                <p className="text-slate-600">Submit beneficiary data for automated leakage detection and compliance verification.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Upload Column */}
                <div className="md:col-span-2">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg text-gov-navy flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                Data Submission
                            </CardTitle>
                            <CardDescription>Upload CSV files containing beneficiary records.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
                  ${isDragActive ? "border-gov-emerald bg-emerald-50" : "border-slate-300 hover:border-gov-navy hover:bg-slate-50"}
                  ${file ? "bg-slate-50 border-gov-navy" : ""}
                `}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${file ? "bg-gov-emerald/10" : "bg-slate-100"}`}>
                                        {file ? <FileText className="w-8 h-8 text-gov-emerald" /> : <Upload className="w-8 h-8 text-slate-400" />}
                                    </div>
                                    <div>
                                        {file ? (
                                            <div>
                                                <p className="font-medium text-gov-navy text-lg">{file.name}</p>
                                                <p className="text-slate-500 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="font-medium text-slate-700 text-lg">Drag & drop or Click to Upload</p>
                                                <p className="text-slate-500 text-sm mt-1">Accepts .csv files (Max 50MB)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button
                                    onClick={handleUpload}
                                    disabled={!file || isUploading}
                                    className="bg-gov-navy hover:bg-gov-navy/90 text-white px-8"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Initiate Audit"
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Verification Checklist */}
                <div>
                    <Card className="border-slate-200 shadow-sm h-full bg-slate-50/50">
                        <CardHeader>
                            <CardTitle className="text-lg text-gov-navy">Verification Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${file ? "text-gov-emerald" : "text-slate-300"}`}>
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className={file ? "text-slate-700 font-medium" : "text-slate-400"}>File Format Valid (.csv)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${file ? "text-gov-emerald" : "text-slate-300"}`}>
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className={file ? "text-slate-700 font-medium" : "text-slate-400"}>Schema Compliance Check</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${isUploading ? "text-gov-emerald animate-pulse" : "text-slate-300"}`}>
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className={isUploading ? "text-gov-navy font-bold" : "text-slate-400"}>Secure Upload to Server</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-400">AI Fraud Analysis</span>
                                </li>
                            </ul>

                            <div className="mt-8 bg-amber-50 border border-amber-200 rounded p-3 flex gap-3 text-sm text-amber-800">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>Ensure sensitive PII fields are hashed before upload as per Data Privacy Act 2023.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>


        </div>
    );
}
