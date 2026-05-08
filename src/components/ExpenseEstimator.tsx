"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

// India-specific INR budget breakdown
const data = [
  { name: "Flights", value: 8000, color: "#f97316" },
  { name: "Hotels", value: 12000, color: "#FF9933" },
  { name: "Food", value: 4500, color: "#4ade80" },
  { name: "Activities", value: 3200, color: "#60a5fa" },
  { name: "Local Travel", value: 2000, color: "#a78bfa" },
  { name: "Misc", value: 1200, color: "#f472b6" },
];

export default function ExpenseEstimator() {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="glass-dark rounded-[2rem] p-6 border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">Total Estimate</h3>
        <span className="text-2xl font-extrabold text-orange-400">₹{total.toLocaleString("en-IN")}</span>
      </div>
      <p className="text-xs text-gray-400 mb-5">For 7 days · Medium budget · Per person</p>
      
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
              contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown list */}
      <div className="space-y-2 mt-2">
        {data.map(item => (
          <div key={item.name} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">₹{item.value.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
