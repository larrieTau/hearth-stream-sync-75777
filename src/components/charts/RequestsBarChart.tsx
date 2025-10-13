import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RequestsBarChartProps {
  data: Array<{ status: string; count: number }>;
}

export function RequestsBarChart({ data }: RequestsBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="status" 
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
        <Bar 
          dataKey="count" 
          fill="hsl(var(--primary))"
          radius={[8, 8, 0, 0]}
          animationDuration={800}
          animationBegin={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
