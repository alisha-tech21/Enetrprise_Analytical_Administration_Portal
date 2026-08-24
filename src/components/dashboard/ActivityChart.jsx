import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import { activityData } from "../../data/analyticsData";

const activityColors = [
  "var(--chart-activity-1)",
  "var(--chart-activity-2)",
  "var(--chart-activity-3)",
  "var(--chart-activity-4)",
];

function ActivityChart() {
  const total = activityData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-card activity-chart-card">
      <div className="chart-header">
        <div>
          <h3>Activity Overview</h3>
          <p>Current activity distribution</p>
        </div>
      </div>

      <div className="activity-content">
        <div className="activity-donut">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                stroke="none"
              >
                {activityData.map((entry, index) => (
                  <Cell key={entry.name} fill={activityColors[index]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [`${value}%`, "Activity"]}
                contentStyle={{
                  background: "var(--chart-tooltip-bg)",
                  border: "1px solid var(--chart-tooltip-border)",
                  borderRadius: "8px",
                  color: "var(--chart-tooltip-text)",
                  fontSize: "11px",
                }}
                labelStyle={{
                  color: "var(--chart-tooltip-text)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>{total}%</strong>
            <span>Total</span>
          </div>
        </div>

        <div className="activity-legend">
          {activityData.map((item, index) => (
            <div className="legend-item" key={item.name}>
              <div className="legend-label">
                <span
                  className="legend-dot"
                  style={{
                    backgroundColor: activityColors[index],
                  }}
                />

                <span>{item.name}</span>
              </div>

              <strong>{item.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityChart;
