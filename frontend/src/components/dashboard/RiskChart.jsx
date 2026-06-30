"use client";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts";

export default function RiskChart({ risk }) {

  const score = risk?.pri || 0;

  const data = [
    {
      name: "Risk",
      value: score,
      fill:
        score >= 70
          ? "#ef4444"
          : score >= 40
          ? "#f59e0b"
          : "#22c55e",
    },
  ];

  return (
    <div className="w-full h-64">

      <ResponsiveContainer>

        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            background
            clockWise
            dataKey="value"
          />

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-4xl font-bold"
          >
            {score}
          </text>

        </RadialBarChart>

      </ResponsiveContainer>

    </div>
  );

}