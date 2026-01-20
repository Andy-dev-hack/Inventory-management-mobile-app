import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { Asset } from "../../schemas/asset.schema";

interface CategoryDonutChartProps {
  assets: Asset[];
}

const COLORS = {
  laptop: "#0ea5e9", // Sky-500
  desktop: "#3b82f6", // Blue-500
  smartphone: "#8b5cf6", // Violet-500
  tablet: "#a855f7", // Purple-500
  monitor: "#f59e0b", // Amber-500
  peripheral: "#f97316", // Orange-500
  network: "#10b981", // Emerald-500
  server: "#ef4444", // Red-500
  furniture: "#64748b", // Slate-500
  other: "#94a3b8", // Slate-400
};

export const CategoryDonutChart = ({ assets }: CategoryDonutChartProps) => {
  const data = useMemo(() => {
    // Dynamically count categories based on the schema
    const counts: Record<string, number> = {};

    assets.forEach((asset) => {
      const cat = asset.category || "other";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.keys(counts)
      .map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: counts[key],
        key: key, // for color mapping
      }))
      .filter((item) => item.value > 0);
  }, [assets]);

  if (assets.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700/50">
        <p className="text-slate-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
      <h3 className="text-slate-400 text-sm font-medium mb-4">
        Assets by Category
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.key}`}
                fill={COLORS[entry.key as keyof typeof COLORS] || COLORS.other}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              color: "#f1f5f9",
            }}
            itemStyle={{ color: "#f1f5f9" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
