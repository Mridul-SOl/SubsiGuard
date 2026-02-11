'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileSpreadsheet, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CsvDropzoneProps {
    onFileSelect: (file: File) => void;
    isUploading: boolean;
}

export function CsvDropzone({ onFileSelect, isUploading }: CsvDropzoneProps) {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            // Reset progress
            setProgress(0);

            // Simulate progress for visual feedback
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(interval);
                        return 95;
                    }
                    return prev + 10;
                });
            }, 100);

            onFileSelect(selectedFile);
        }
    }, [onFileSelect]);

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setProgress(0);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.csv'],
        },
        maxFiles: 1,
        disabled: isUploading || !!file,
    });

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-10 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden",
                    isDragActive ? "border-emerald bg-emerald/5" : "border-border hover:border-emerald/50 hover:bg-muted/50",
                    file ? "bg-muted/30 border-emerald/30" : "",
                    "min-h-[300px]"
                )}
            >
                <input {...getInputProps()} />

                {file ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="bg-emerald/10 p-4 rounded-full mb-4">
                            <FileSpreadsheet className="w-10 h-10 text-emerald" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            {file.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            {(file.size / 1024).toFixed(2)} KB
                        </p>

                        {isUploading ? (
                            <div className="w-64 space-y-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Uploading...</span>
                                    <span>{Math.min(progress, 90)}%</span>
                                </div>
                                {/* We'll need to install Progress component or use a simple div */}
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald animate-pulse" style={{ width: '100%' }} />
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={removeFile}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Remove File
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="bg-muted p-4 rounded-full mb-4 group-hover:bg-background transition-colors">
                            <UploadCloud className="w-10 h-10 text-muted-foreground group-hover:text-emerald transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Drag & drop your CSV file here
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs mb-6">
                            Support for PDS, PM-KISAN, and MGNREGA datasets. Max file size 50MB.
                        </p>
                        <Button variant="outline" className="mt-2">
                            Browse Files
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
