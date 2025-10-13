import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DonationTrendChartProps {
  data: Array<{ month: string; donations: number; requests: number }>;
}

export function DonationTrendChart({ data }: DonationTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="donations"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--primary))", r: 5 }}
          activeDot={{ r: 7 }}
          animationDuration={1000}
        />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="hsl(var(--accent))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--accent))", r: 5 }}
          activeDot={{ r: 7 }}
          animationDuration={1000}
          animationBegin={200}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
