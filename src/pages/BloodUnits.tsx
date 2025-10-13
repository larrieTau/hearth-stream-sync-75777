import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/cards/AnimatedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, AlertTriangle } from "lucide-react";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { Badge } from "@/components/ui/badge";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function BloodUnits() {
  const headerRef = useGsapFadeIn(0);
  
  // Mock data
  const bloodUnits = [
    { id: 1, donorName: "John Doe", bloodType: "A+", quantity: 450, expiryDate: "2025-11-15", status: "available", daysUntilExpiry: 32 },
    { id: 2, donorName: "Jane Smith", bloodType: "O-", quantity: 500, expiryDate: "2025-10-25", status: "available", daysUntilExpiry: 11 },
    { id: 3, donorName: "Mike Brown", bloodType: "B+", quantity: 480, expiryDate: "2025-12-01", status: "reserved", daysUntilExpiry: 48 },
    { id: 4, donorName: "Sarah Jones", bloodType: "AB+", quantity: 450, expiryDate: "2025-10-20", status: "available", daysUntilExpiry: 6 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success/20 text-success border-success/30";
      case "reserved":
        return "bg-warning/20 text-warning border-warning/30";
      case "used":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const getExpiryWarning = (days: number) => {
    if (days <= 7) return "critical";
    if (days <= 14) return "warning";
    return "normal";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Blood Inventory</h2>
            <p className="text-muted-foreground">Track and manage blood unit inventory</p>
          </div>
          <Button className="bg-gradient-blood shadow-accent">
            <Plus className="mr-2 h-4 w-4" />
            Add Blood Unit
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by donor name, blood type, or status..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blood Units Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bloodUnits.map((unit, index) => {
            const expiryWarning = getExpiryWarning(unit.daysUntilExpiry);
            return (
              <AnimatedCard key={unit.id} delay={0.4 + index * 0.1} className="group">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <BloodTypeBadge bloodType={unit.bloodType} size="lg" />
                      <Badge
                        variant="outline"
                        className={`border-2 ${getStatusColor(unit.status)}`}
                      >
                        {unit.status}
                      </Badge>
                    </div>

                    {/* Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Donor</p>
                        <p className="font-semibold text-foreground">{unit.donorName}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                          <p className="text-2xl font-bold text-primary">{unit.quantity} ml</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Unit ID</p>
                          <p className="font-mono text-sm font-semibold text-foreground">#{unit.id.toString().padStart(6, '0')}</p>
                        </div>
                      </div>

                      {/* Expiry Warning */}
                      <div className={`rounded-lg border-2 p-3 ${
                        expiryWarning === "critical" 
                          ? "bg-destructive/10 border-destructive/30" 
                          : expiryWarning === "warning"
                          ? "bg-warning/10 border-warning/30"
                          : "bg-muted/50 border-border"
                      }`}>
                        <div className="flex items-center gap-2">
                          {expiryWarning !== "normal" && (
                            <AlertTriangle className={`h-4 w-4 ${
                              expiryWarning === "critical" ? "text-destructive" : "text-warning"
                            }`} />
                          )}
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">Expires</p>
                            <p className="text-sm font-semibold text-foreground">{unit.expiryDate}</p>
                          </div>
                        </div>
                        <p className={`mt-1 text-xs font-medium ${
                          expiryWarning === "critical" 
                            ? "text-destructive" 
                            : expiryWarning === "warning"
                            ? "text-warning"
                            : "text-muted-foreground"
                        }`}>
                          {unit.daysUntilExpiry} days remaining
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
