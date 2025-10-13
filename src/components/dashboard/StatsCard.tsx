import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success" | "warning";
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  variant = "default" 
}: StatsCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg",
      variant === "primary" && "border-primary/20 bg-gradient-primary text-primary-foreground",
      variant === "accent" && "border-accent/20 bg-gradient-blood text-accent-foreground",
      variant === "success" && "border-success/20 bg-gradient-success text-success-foreground",
      variant === "warning" && "border-warning/20",
      variant === "default" && "hover:border-primary/30"
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            variant === "default" ? "text-muted-foreground" : "opacity-90"
          )}>
            {title}
          </p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              variant === "default" 
                ? trend.isPositive ? "text-success" : "text-destructive"
                : "opacity-80"
            )}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn(
          "rounded-lg p-3",
          variant === "default" && "bg-primary/10",
          variant !== "default" && "bg-white/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            variant === "default" && "text-primary"
          )} />
        </div>
      </div>
    </Card>
  );
}
