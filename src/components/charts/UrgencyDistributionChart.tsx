import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface UrgencyDistributionChartProps {
  data: Array<{ level: string; count: number }>;
}

const URGENCY_COLORS = {
  low: "#3b82f6",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#dc2626",
};

export function UrgencyDistributionChart({ data }: UrgencyDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="count"
          animationBegin={0}
          animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={URGENCY_COLORS[entry.level as keyof typeof URGENCY_COLORS]} 
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
