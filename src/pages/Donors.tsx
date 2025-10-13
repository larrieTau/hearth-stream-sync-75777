import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/cards/AnimatedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Calendar } from "lucide-react";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { Badge } from "@/components/ui/badge";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function Donors() {
  const headerRef = useGsapFadeIn(0);
  
  // Mock data
  const donors = [
    { id: 1, username: "johndoe", email: "john@example.com", age: 28, bloodType: "A+", donationCount: 5, lastDonation: "2025-09-15" },
    { id: 2, username: "janesmith", email: "jane@example.com", age: 32, bloodType: "O-", donationCount: 12, lastDonation: "2025-08-20" },
    { id: 3, username: "mikebrown", email: "mike@example.com", age: 45, bloodType: "B+", donationCount: 8, lastDonation: "2025-10-01" },
    { id: 4, username: "sarahjones", email: "sarah@example.com", age: 25, bloodType: "AB+", donationCount: 3, lastDonation: "2025-09-28" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Donors Management</h2>
            <p className="text-muted-foreground">Manage and track blood donors</p>
          </div>
          <Button className="bg-gradient-primary shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Donor
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search donors by name, email, or blood type..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donors Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor, index) => (
            <AnimatedCard key={donor.id} delay={0.4 + index * 0.1} className="group">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-white font-bold text-lg">
                      {donor.username.charAt(0).toUpperCase()}
                    </div>
                    <BloodTypeBadge bloodType={donor.bloodType} />
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-foreground">{donor.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {donor.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Age: {donor.age}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="flex-1 text-center">
                      <p className="text-2xl font-bold text-primary">{donor.donationCount}</p>
                      <p className="text-xs text-muted-foreground">Donations</p>
                    </div>
                    <div className="flex-1 text-center border-l">
                      <p className="text-sm font-semibold text-foreground">{donor.lastDonation}</p>
                      <p className="text-xs text-muted-foreground">Last Donation</p>
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
