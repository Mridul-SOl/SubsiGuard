import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";

interface FraudScoreBadgeProps {
    score: number;
    reason?: string;
    className?: string;
}

export function FraudScoreBadge({ score, reason, className }: FraudScoreBadgeProps) {
    // Determine variant based on score
    // High score = High risk
    let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
    let colorClass = "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20";
    let Icon = CheckCircle2;

    if (score >= 80) {
        variant = "destructive";
        colorClass = "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20";
        Icon = AlertCircle;
    } else if (score >= 50) {
        variant = "default"; // using custom class instead
        colorClass = "bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25 border-yellow-500/20";
        Icon = HelpCircle;
    }

    const badge = (
        <Badge
            variant="outline"
            className={cn(
                "gap-1.5 py-1 px-2 font-mono font-medium border transition-colors cursor-help",
                colorClass,
                className
            )}
        >
            <Icon className="w-3.5 h-3.5" />
            {score}%
        </Badge>
    );

    if (!reason) return badge;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{badge}</TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px] text-xs">
                    <p className="font-semibold mb-1">Risk Factor:</p>
                    {reason}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
