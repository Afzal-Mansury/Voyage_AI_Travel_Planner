"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const data = [
  { name: "Hotels", value: 1200, color: "#3b82f6" },
  { name: "Flights", value: 800, color: "#8b5cf6" },
  { name: "Food", value: 600, color: "#ec4899" },
  { name: "Activities", value: 400, color: "#10b981" },
  { name: "Transport", value: 200, color: "#f59e0b" },
];

export default function ExpenseEstimator() {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="glass-dark rounded-[2rem] p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Estimated Budget: ${total}</h3>
      <div className="h-64 w-full">
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
