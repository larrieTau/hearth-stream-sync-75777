import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BloodInventoryChartProps {
  data: Array<{ type: string; units: number }>;
}

const COLORS = {
  "A+": "#ef4444",
  "A-": "#f87171",
  "B+": "#3b82f6",
  "B-": "#60a5fa",
  "AB+": "#8b5cf6",
  "AB-": "#a78bfa",
  "O+": "#10b981",
  "O-": "#34d399",
};

export function BloodInventoryChart({ data }: BloodInventoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="units"
          animationBegin={0}
          animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.type as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
