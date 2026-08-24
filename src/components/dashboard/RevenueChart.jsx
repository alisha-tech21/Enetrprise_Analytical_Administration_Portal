import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { revenueData } from "../../data/analyticsData";

function RevenueChart() {
  const [period, setPeriod] = useState("6");

  const filteredData = period === "6" ? revenueData.slice(-6) : revenueData;

  return (
    <div className="chart-card revenue-chart-card">
      <div className="chart-header">
        <div>
          <h3>Revenue Overview</h3>
          <p>Monthly revenue performance</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
              contentStyle={{
                background: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "8px",
                color: "var(--chart-tooltip-text)",
                fontSize: "11px",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--chart-primary)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--chart-primary)",
              }}
              activeDot={{
                r: 6,
                fill: "var(--chart-primary)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
