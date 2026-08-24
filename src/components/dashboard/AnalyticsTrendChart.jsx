import { useState } from "react";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { analyticsMonthlyData } from "../../data/analyticsData";

function AnalyticsTrendChart() {
  const [period, setPeriod] = useState("6");

  const filteredData =
    period === "6" ? analyticsMonthlyData.slice(-6) : analyticsMonthlyData;

  return (
    <div className="analytics-chart-card">
      <div className="analytics-chart-header">
        <div>
          <h3>Business Performance</h3>
          <p>Compare revenue and user growth over time</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>

      <div className="analytics-chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            margin={{
              top: 10,
              right: 15,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-primary)"
                  stopOpacity={0.22}
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
              yAxisId="revenue"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "var(--chart-axis)",
              }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <YAxis
              yAxisId="users"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "var(--chart-axis)",
              }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              contentStyle={{
                background: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "8px",
                color: "var(--chart-tooltip-text)",
                fontSize: "11px",
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: "10px",
                paddingTop: "10px",
                color: "var(--text-secondary)",
              }}
            />

            <Area
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="var(--chart-primary)"
              fill="url(#analyticsRevenue)"
              strokeWidth={2.5}
            />

            <Line
              yAxisId="users"
              type="monotone"
              dataKey="users"
              name="Users"
              stroke="var(--chart-secondary)"
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: "var(--chart-secondary)",
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsTrendChart;
