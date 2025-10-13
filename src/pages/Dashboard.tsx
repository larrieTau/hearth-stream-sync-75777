import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedStatsCard } from "@/components/dashboard/AnimatedStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  UserPlus, 
  Droplet, 
  AlertCircle,
  TrendingUp,
  Hospital,
  Activity,
  BarChart3
} from "lucide-react";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { UrgencyBadge } from "@/components/requests/UrgencyBadge";
import { BloodInventoryChart } from "@/components/charts/BloodInventoryChart";
import { DonationTrendChart } from "@/components/charts/DonationTrendChart";
import { RequestsBarChart } from "@/components/charts/RequestsBarChart";
import { UrgencyDistributionChart } from "@/components/charts/UrgencyDistributionChart";
import { useGsapStagger } from "@/hooks/useGsapAnimation";

export default function Dashboard() {
  const requestsRef = useGsapStagger(".request-item", 0.5);
  const chartsRef = useGsapStagger(".chart-card", 0.8);

  // Mock data - would be fetched from API
  const stats = {
    totalDonors: 1247,
    totalPatients: 892,
    bloodUnits: 3456,
    urgentRequests: 12,
  };

  const recentRequests = [
    { id: 1, patient: "John Doe", bloodType: "A+", urgency: "critical", hospital: "City Hospital" },
    { id: 2, patient: "Jane Smith", bloodType: "O-", urgency: "high", hospital: "General Medical" },
    { id: 3, patient: "Bob Johnson", bloodType: "B+", urgency: "medium", hospital: "St. Mary's" },
  ];

  const bloodInventory = [
    { type: "A+", units: 450, percentage: 85 },
    { type: "A-", units: 280, percentage: 70 },
    { type: "B+", units: 520, percentage: 92 },
    { type: "B-", units: 190, percentage: 58 },
    { type: "AB+", units: 210, percentage: 65 },
    { type: "AB-", units: 150, percentage: 45 },
    { type: "O+", units: 680, percentage: 95 },
    { type: "O-", units: 420, percentage: 78 },
  ];

  const chartData = [
    { type: "A+", units: 450 },
    { type: "A-", units: 280 },
    { type: "B+", units: 520 },
    { type: "B-", units: 190 },
    { type: "AB+", units: 210 },
    { type: "AB-", units: 150 },
    { type: "O+", units: 680 },
    { type: "O-", units: 420 },
  ];

  const trendData = [
    { month: "Jan", donations: 120, requests: 95 },
    { month: "Feb", donations: 135, requests: 110 },
    { month: "Mar", donations: 148, requests: 125 },
    { month: "Apr", donations: 156, requests: 132 },
    { month: "May", donations: 165, requests: 145 },
    { month: "Jun", donations: 178, requests: 158 },
  ];

  const requestStats = [
    { status: "Pending", count: 45 },
    { status: "Approved", count: 82 },
    { status: "Completed", count: 156 },
    { status: "Rejected", count: 8 },
  ];

  const urgencyData = [
    { level: "low", count: 28 },
    { level: "medium", count: 52 },
    { level: "high", count: 34 },
    { level: "critical", count: 12 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Overview of blood bank operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedStatsCard
            title="Total Donors"
            value={stats.totalDonors}
            icon={UserPlus}
            variant="primary"
            trend={{ value: "12% from last month", isPositive: true }}
            delay={0}
          />
          <AnimatedStatsCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            trend={{ value: "8% from last month", isPositive: true }}
            delay={0.1}
          />
          <AnimatedStatsCard
            title="Blood Units"
            value={stats.bloodUnits}
            icon={Droplet}
            variant="accent"
            trend={{ value: "5% from last month", isPositive: false }}
            delay={0.2}
          />
          <AnimatedStatsCard
            title="Urgent Requests"
            value={stats.urgentRequests}
            icon={AlertCircle}
            variant="warning"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Recent Blood Requests
              </CardTitle>
            </CardHeader>
            <CardContent ref={requestsRef}>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="request-item flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{request.patient}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hospital className="h-3 w-3" />
                        {request.hospital}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BloodTypeBadge bloodType={request.bloodType} size="sm" />
                      <UrgencyBadge level={request.urgency} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blood Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-primary" />
                Blood Inventory Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bloodInventory.map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BloodTypeBadge bloodType={item.type} size="sm" />
                        <span className="text-sm font-medium text-foreground">
                          {item.units} units
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-blood transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div ref={chartsRef} className="grid gap-6 lg:grid-cols-2">
          {/* Blood Distribution Chart */}
          <Card className="chart-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Blood Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BloodInventoryChart data={chartData} />
            </CardContent>
          </Card>

          {/* Urgency Distribution */}
          <Card className="chart-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Request Urgency Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UrgencyDistributionChart data={urgencyData} />
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart */}
        <Card className="chart-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Donations vs Requests Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DonationTrendChart data={trendData} />
          </CardContent>
        </Card>

        {/* Request Statistics */}
        <Card className="chart-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Request Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RequestsBarChart data={requestStats} />
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-xs text-muted-foreground">Donations received</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">642</p>
                <p className="text-xs text-muted-foreground">Donations received</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Requests Fulfilled</p>
                <p className="text-2xl font-bold text-foreground">98.5%</p>
                <p className="text-xs text-muted-foreground">Success rate this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
