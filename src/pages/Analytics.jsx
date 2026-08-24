import { useState } from "react";
import AnalyticsMetric from "../components/dashboard/AnalyticsMetric";
import AnalyticsTrendChart from "../components/dashboard/AnalyticsTrendChart";
import { performanceData } from "../data/analyticsData";

function Analytics() {
  const [period, setPeriod] = useState("monthly");

  const handleExport = () => {
    const periodName = period.charAt(0).toUpperCase() + period.slice(1);

    alert(`${periodName} report is ready to export.`);
  };

  return (
    <div className="analytics-page">
      {/* Heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">ANALYTICS</p>

          <h1>Business Analytics</h1>

          <p>Explore performance trends and business intelligence metrics.</p>
        </div>

        {/* Analytics Controls */}
        <div className="analytics-controls">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button className="primary-button" onClick={handleExport}>
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="analytics-metrics-grid">
        <AnalyticsMetric
          title="Total Revenue"
          value="$84.3K"
          change="8.4%"
          description={`vs last ${period === "monthly" ? "month" : period === "quarterly" ? "quarter" : "year"}`}
          icon="$"
        />

        <AnalyticsMetric
          title="Total Users"
          value="12.4K"
          change="12.8%"
          description={`vs last ${period === "monthly" ? "month" : period === "quarterly" ? "quarter" : "year"}`}
          icon="♙"
        />

        <AnalyticsMetric
          title="Orders"
          value="724"
          change="9.6%"
          description={`vs last ${period === "monthly" ? "month" : period === "quarterly" ? "quarter" : "year"}`}
          icon="◈"
        />

        <AnalyticsMetric
          title="Avg. Order Value"
          value="$116.46"
          change="4.2%"
          description={`vs last ${period === "monthly" ? "month" : period === "quarterly" ? "quarter" : "year"}`}
          icon="◆"
        />
      </div>

      {/* Main Chart */}
      <AnalyticsTrendChart period={period} />

      {/* Insights */}
      <div className="analytics-bottom-grid">
        <div className="insights-card">
          <div className="section-heading">
            <div>
              <h3>Key Insights</h3>
              <p>
                Important changes detected for{" "}
                {period === "monthly"
                  ? "this month"
                  : period === "quarterly"
                    ? "this quarter"
                    : "this year"}
              </p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon positive">↑</div>

            <div>
              <strong>Revenue increased by 8.4%</strong>

              <p>
                Revenue reached $84.3K this period, continuing its upward trend.
              </p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon positive">↑</div>

            <div>
              <strong>User growth is accelerating</strong>

              <p>The platform gained more than 1,200 new users this period.</p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon neutral">→</div>

            <div>
              <strong>Support performance is stable</strong>

              <p>Support performance remains within the expected range.</p>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="department-card">
          <div className="section-heading">
            <div>
              <h3>Department Performance</h3>
              <p>Current performance score</p>
            </div>
          </div>

          <div className="department-list">
            {performanceData.map((item) => (
              <div className="department-row" key={item.department}>
                <div className="department-info">
                  <span>{item.department}</span>

                  <strong>{item.value}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${item.value}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
