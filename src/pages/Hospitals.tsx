import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/cards/AnimatedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MapPin, Phone, Building2 } from "lucide-react";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function Hospitals() {
  const headerRef = useGsapFadeIn(0);
  
  // Mock data
  const hospitals = [
    { 
      id: 1, 
      name: "City Hospital", 
      location: "123 Main St, Downtown", 
      contact: "+1 (555) 123-4567",
      patients: 45,
      requests: 12
    },
    { 
      id: 2, 
      name: "General Medical Center", 
      location: "456 Oak Ave, Midtown", 
      contact: "+1 (555) 234-5678",
      patients: 38,
      requests: 8
    },
    { 
      id: 3, 
      name: "St. Mary's Hospital", 
      location: "789 Elm St, Uptown", 
      contact: "+1 (555) 345-6789",
      patients: 52,
      requests: 15
    },
    { 
      id: 4, 
      name: "Regional Medical", 
      location: "321 Pine Rd, Suburbs", 
      contact: "+1 (555) 456-7890",
      patients: 29,
      requests: 6
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Hospitals</h2>
            <p className="text-muted-foreground">Manage hospital network and partnerships</p>
          </div>
          <Button className="bg-gradient-primary shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Hospital
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hospitals by name or location..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Hospitals Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {hospitals.map((hospital, index) => (
            <AnimatedCard key={hospital.id} delay={0.4 + index * 0.15} className="group">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-white">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-foreground">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: #{hospital.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{hospital.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground font-medium">{hospital.contact}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="flex-1 text-center">
                      <p className="text-2xl font-bold text-primary">{hospital.patients}</p>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                    <div className="flex-1 text-center border-l">
                      <p className="text-2xl font-bold text-accent">{hospital.requests}</p>
                      <p className="text-xs text-muted-foreground">Active Requests</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
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
