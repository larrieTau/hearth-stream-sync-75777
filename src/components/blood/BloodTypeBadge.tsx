import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BloodTypeBadgeProps {
  bloodType: string;
  size?: "sm" | "md" | "lg";
}

const bloodTypeColors: Record<string, string> = {
  "A+": "bg-red-100 text-red-700 border-red-300",
  "A-": "bg-red-50 text-red-600 border-red-200",
  "B+": "bg-blue-100 text-blue-700 border-blue-300",
  "B-": "bg-blue-50 text-blue-600 border-blue-200",
  "AB+": "bg-purple-100 text-purple-700 border-purple-300",
  "AB-": "bg-purple-50 text-purple-600 border-purple-200",
  "O+": "bg-green-100 text-green-700 border-green-300",
  "O-": "bg-green-50 text-green-600 border-green-200",
};

export function BloodTypeBadge({ bloodType, size = "md" }: BloodTypeBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-bold border-2",
        bloodTypeColors[bloodType] || "bg-gray-100 text-gray-700 border-gray-300",
        size === "sm" && "text-xs px-2 py-0.5",
        size === "md" && "text-sm px-3 py-1",
        size === "lg" && "text-base px-4 py-1.5"
      )}
    >
      {bloodType}
    </Badge>
  );
}
