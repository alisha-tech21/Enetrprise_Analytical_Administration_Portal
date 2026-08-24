import { useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { userGrowthData } from "../../data/analyticsData";

function UserGrowthChart() {
  const [period, setPeriod] = useState("6");

  const filteredData =
    period === "6" ? userGrowthData.slice(-6) : userGrowthData;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>User Growth</h3>
          <p>Registered users over time</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="userGrowthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--chart-primary)"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="var(--chart-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--chart-grid)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "var(--chart-axis)",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "var(--chart-axis)",
              }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [Number(value).toLocaleString(), "Users"]}
              contentStyle={{
                background: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "8px",
                color: "var(--chart-tooltip-text)",
                fontSize: "11px",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              fill="url(#userGrowthGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--chart-primary)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserGrowthChart;
