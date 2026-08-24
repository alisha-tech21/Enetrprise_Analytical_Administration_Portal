import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  revenueData,
  performanceData,
  userGrowthData,
  activityData,
  analyticsMonthlyData,
} from "../data/analyticsData";

function Reports() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      name: "Monthly Revenue Report",
      type: "Revenue",
      date: "Aug 23, 2026",
      status: "Ready",
      description: "Monthly revenue performance and growth trends.",
    },
    {
      id: 2,
      name: "User Growth Analysis",
      type: "Analytics",
      date: "Aug 22, 2026",
      status: "Ready",
      description: "Registered user growth and business activity analysis.",
    },
    {
      id: 3,
      name: "Department Performance",
      type: "Performance",
      date: "Aug 20, 2026",
      status: "Ready",
      description: "Performance scores across business departments.",
    },
    {
      id: 4,
      name: "Customer Activity Report",
      type: "Activity",
      date: "Aug 18, 2026",
      status: "Processing",
      description: "Current activity distribution across the platform.",
    },
    {
      id: 5,
      name: "Business Performance Report",
      type: "Analytics",
      date: "Aug 15, 2026",
      status: "Ready",
      description: "Combined revenue, users and order performance.",
    },
  ];

  // --------------------------------
  // FILTER REPORTS
  // --------------------------------

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.name.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query);

      const matchesType =
        filterType === "all" ||
        report.type.toLowerCase() === filterType.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  // --------------------------------
  // SUMMARY
  // --------------------------------

  const totalReports = reports.length;

  const readyReports = reports.filter(
    (report) => report.status === "Ready",
  ).length;

  const processingReports = reports.filter(
    (report) => report.status === "Processing",
  ).length;

  const analyticsReports = reports.filter(
    (report) => report.type === "Analytics",
  ).length;

  // --------------------------------
  // OPEN REPORT
  // --------------------------------

  const openReport = (report) => {
    setSelectedReport(report);
  };

  // --------------------------------
  // REPORT VISUALIZATION
  // --------------------------------

  const renderReportChart = (report) => {
    if (!report) return null;

    // REVENUE
    if (report.type === "Revenue") {
      return (
        <div className="report-detail-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" axisLine={false} tickLine={false} />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // ANALYTICS
    if (report.type === "Analytics") {
      return (
        <div className="report-detail-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={analyticsMonthlyData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="reportAnalyticsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.25} />

                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" axisLine={false} tickLine={false} />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="#4f46e5"
                strokeWidth={2.5}
                fill="url(#reportAnalyticsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // PERFORMANCE
    if (report.type === "Performance") {
      return (
        <div className="report-detail-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="department"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />

              <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />

              <Tooltip formatter={(value) => [`${value}%`, "Performance"]} />

              <Bar
                dataKey="value"
                fill="#4f46e5"
                radius={[5, 5, 0, 0]}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // ACTIVITY
    if (report.type === "Activity") {
      const activityColors = ["#4f46e5", "#8b5cf6", "#c4b5fd", "#e5e7eb"];

      return (
        <div className="report-detail-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >
                {activityData.map((item, index) => (
                  <Cell key={item.name} fill={activityColors[index]} />
                ))}
              </Pie>

              <Tooltip formatter={(value) => [`${value}%`, "Activity"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="reports-page">
      {/* =========================
          HEADING
      ========================= */}

      <div className="page-heading">
        <div>
          <p className="eyebrow">REPORTS</p>

          <h1>Business Reports</h1>

          <p>
            Explore business performance through interactive reports and visual
            analytics.
          </p>
        </div>
      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="report-stats">
        <div className="report-stat-card">
          <div className="report-stat-icon">▤</div>

          <div>
            <span>Total Reports</span>
            <strong>{totalReports}</strong>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">✓</div>

          <div>
            <span>Completed</span>
            <strong>{readyReports}</strong>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">◷</div>

          <div>
            <span>Processing</span>
            <strong>{processingReports}</strong>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">◈</div>

          <div>
            <span>Analytics Reports</span>
            <strong>{analyticsReports}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          REPORT CARD
      ========================= */}

      <div className="reports-card">
        <div className="reports-card-header">
          <div>
            <h3>Available Reports</h3>

            <p>Select a report to explore its visual analytics.</p>
          </div>

          <div className="reports-controls">
            <div className="reports-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="revenue">Revenue</option>
              <option value="analytics">Analytics</option>
              <option value="performance">Performance</option>
              <option value="activity">Activity</option>
            </select>
          </div>
        </div>

        {/* =========================
            REPORT LIST
        ========================= */}

        <div className="reports-list">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div className="report-row" key={report.id}>
                <div className="report-info">
                  <div className="report-file-icon">▤</div>

                  <div>
                    <strong>{report.name}</strong>

                    <span>
                      {report.type} • {report.date}
                    </span>
                  </div>
                </div>

                <div
                  className={`report-status ${
                    report.status === "Ready" ? "ready" : "processing"
                  }`}
                >
                  <span></span>

                  {report.status}
                </div>

                <button
                  className="view-report-button"
                  disabled={report.status !== "Ready"}
                  onClick={() => openReport(report)}
                >
                  View Report →
                </button>
              </div>
            ))
          ) : (
            <div className="no-reports">No reports found.</div>
          )}
        </div>
      </div>

      {/* =========================
          REPORT DETAIL MODAL
      ========================= */}

      {selectedReport && (
        <div className="modal-overlay">
          <div className="modal-card report-detail-modal">
            <div className="modal-header">
              <div>
                <p className="eyebrow">{selectedReport.type.toUpperCase()}</p>

                <h2>{selectedReport.name}</h2>

                <p>{selectedReport.description}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedReport(null)}
              >
                ×
              </button>
            </div>

            <div className="report-detail-meta">
              <div>
                <span>Generated</span>
                <strong>{selectedReport.date}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedReport.status}</strong>
              </div>
            </div>

            {/* Chart */}

            {renderReportChart(selectedReport)}

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
