import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/cards/AnimatedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Hospital as HospitalIcon, Calendar } from "lucide-react";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function Patients() {
  const headerRef = useGsapFadeIn(0);
  
  // Mock data
  const patients = [
    { id: 1, username: "patient001", email: "patient1@example.com", age: 35, bloodType: "A+", hospital: "City Hospital", registeredDate: "2025-01-15" },
    { id: 2, username: "patient002", email: "patient2@example.com", age: 42, bloodType: "O-", hospital: "General Medical", registeredDate: "2025-02-20" },
    { id: 3, username: "patient003", email: "patient3@example.com", age: 28, bloodType: "B+", hospital: "St. Mary's", registeredDate: "2025-03-10" },
    { id: 4, username: "patient004", email: "patient4@example.com", age: 56, bloodType: "AB-", hospital: "City Hospital", registeredDate: "2025-04-05" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Patients Management</h2>
            <p className="text-muted-foreground">Manage patient information and records</p>
          </div>
          <Button className="bg-gradient-primary shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name, email, or hospital..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient, index) => (
            <AnimatedCard key={patient.id} delay={0.4 + index * 0.1} className="group">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-blood text-white font-bold text-lg">
                      {patient.username.charAt(patient.username.length - 1)}
                    </div>
                    <BloodTypeBadge bloodType={patient.bloodType} />
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-foreground">{patient.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HospitalIcon className="h-3 w-3" />
                      {patient.hospital}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Age: {patient.age}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">{patient.registeredDate}</p>
                      <p className="text-xs text-muted-foreground">Registration Date</p>
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
