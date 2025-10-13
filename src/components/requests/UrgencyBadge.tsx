import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  level: string;
  showIcon?: boolean;
}

const urgencyConfig: Record<string, { label: string; icon: any; className: string }> = {
  low: {
    label: "Low",
    icon: Clock,
    className: "bg-blue-100 text-blue-700 border-blue-300",
  },
  medium: {
    label: "Medium",
    icon: AlertTriangle,
    className: "bg-warning/20 text-warning border-warning/30",
  },
  high: {
    label: "High",
    icon: AlertCircle,
    className: "bg-accent/20 text-accent border-accent/30",
  },
  critical: {
    label: "Critical",
    icon: AlertCircle,
    className: "bg-destructive/20 text-destructive border-destructive/30 animate-pulse",
  },
};

export function UrgencyBadge({ level, showIcon = true }: UrgencyBadgeProps) {
  const config = urgencyConfig[level.toLowerCase()] || urgencyConfig.low;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn("font-semibold border-2", config.className)}
    >
      {showIcon && <Icon className="mr-1 h-3 w-3" />}
      {config.label}
    </Badge>
  );
}
