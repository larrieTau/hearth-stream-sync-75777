import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/cards/AnimatedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, User, Hospital as HospitalIcon, Calendar } from "lucide-react";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { UrgencyBadge } from "@/components/requests/UrgencyBadge";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function Requests() {
  const headerRef = useGsapFadeIn(0);
  
  // Mock data
  const requests = [
    { id: 1, patient: "Patient 001", bloodType: "A+", quantity: 450, urgency: "critical", hospital: "City Hospital", date: "2025-10-13", status: "pending" },
    { id: 2, patient: "Patient 002", bloodType: "O-", quantity: 500, urgency: "high", hospital: "General Medical", date: "2025-10-13", status: "pending" },
    { id: 3, patient: "Patient 003", bloodType: "B+", quantity: 350, urgency: "medium", hospital: "St. Mary's", date: "2025-10-12", status: "approved" },
    { id: 4, patient: "Patient 004", bloodType: "AB+", quantity: 450, urgency: "low", hospital: "City Hospital", date: "2025-10-11", status: "completed" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning border-warning/30";
      case "approved":
        return "bg-primary/20 text-primary border-primary/30";
      case "completed":
        return "bg-success/20 text-success border-success/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-secondary text-secondary-foreground border-border";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Blood Requests</h2>
            <p className="text-muted-foreground">Manage and track blood transfusion requests</p>
          </div>
          <Button className="bg-gradient-primary shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests by patient, blood type, or hospital..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request, index) => (
            <AnimatedCard key={request.id} delay={0.4 + index * 0.1} className="group">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Request #{request.id.toString().padStart(6, '0')}</p>
                      <h3 className="mt-1 font-bold text-lg text-foreground">{request.patient}</h3>
                    </div>
                    <UrgencyBadge level={request.urgency} />
                  </div>

                  {/* Blood Type and Quantity */}
                  <div className="flex items-center gap-4">
                    <BloodTypeBadge bloodType={request.bloodType} size="lg" />
                    <div>
                      <p className="text-2xl font-bold text-primary">{request.quantity}</p>
                      <p className="text-xs text-muted-foreground">ml required</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HospitalIcon className="h-3 w-3" />
                      {request.hospital}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Requested: {request.date}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <div className={`rounded-full px-3 py-1 text-xs font-semibold border-2 ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                    {request.status === "pending" && (
                      <Button size="sm" className="flex-1 bg-gradient-success">
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
