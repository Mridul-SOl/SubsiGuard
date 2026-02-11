import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean; // true = good (e.g., leakage down), false = bad (e.g., leakage up)
        label?: string;
    };
    className?: string;
    trendMode?: "normal" | "inverse"; // normal: up is good; inverse: down is good (for fraud/leakage)
}

export function KpiCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className,
    trendMode = "normal",
}: KpiCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        {trend && (
                            <span
                                className={cn(
                                    "flex items-center font-medium",
                                    trendMode === "normal"
                                        ? trend.value > 0
                                            ? "text-emerald-500"
                                            : "text-red-500"
                                        : trend.value > 0 // inverse mode (e.g. leakage)
                                            ? "text-red-500" // up is bad
                                            : "text-emerald-500" // down is good
                                )}
                            >
                                {trend.value > 0 ? (
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : trend.value < 0 ? (
                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                ) : (
                                    <Minus className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(trend.value)}%
                            </span>
                        )}
                        {description && <span>{description}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
