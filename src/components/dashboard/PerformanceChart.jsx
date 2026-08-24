import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { performanceData } from "../../data/analyticsData";

function PerformanceChart() {
  const [period, setPeriod] = useState("monthly");

  const displayedData = useMemo(() => {
    if (period === "quarterly") {
      return performanceData.map((item) => ({
        ...item,
        value: Math.round(item.value * 1.15),
      }));
    }

    return performanceData;
  }, [period]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Performance</h3>
          <p>Department performance</p>
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={displayedData}
            margin={{
              top: 10,
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="var(--chart-grid)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="department"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "var(--chart-axis)",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "var(--chart-axis)",
              }}
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

            <Bar
              dataKey="value"
              fill="var(--chart-primary)"
              radius={[5, 5, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PerformanceChart;
