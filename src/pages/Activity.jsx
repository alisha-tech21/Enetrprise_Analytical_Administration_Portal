import { useMemo, useState } from "react";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "created a new report",
    target: "Monthly Revenue Report",
    time: "2 minutes ago",
    icon: "▣",
    type: "report",
  },
  {
    id: 2,
    user: "Michael Chen",
    action: "updated project",
    target: "Analytics Dashboard",
    time: "18 minutes ago",
    icon: "✎",
    type: "project",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "joined the platform",
    target: "",
    time: "42 minutes ago",
    icon: "♙",
    type: "user",
  },
  {
    id: 4,
    user: "James Wilson",
    action: "exported analytics data",
    target: "August Analytics",
    time: "1 hour ago",
    icon: "↓",
    type: "export",
  },
  {
    id: 5,
    user: "Olivia Brown",
    action: "changed account settings",
    target: "",
    time: "2 hours ago",
    icon: "⚙",
    type: "settings",
  },
  {
    id: 6,
    user: "Daniel Miller",
    action: "created a new project",
    target: "Customer Insights",
    time: "3 hours ago",
    icon: "+",
    type: "project",
  },
  {
    id: 7,
    user: "Sarah Johnson",
    action: "logged into the dashboard",
    target: "",
    time: "4 hours ago",
    icon: "→",
    type: "login",
  },
];

function Activity() {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  // --------------------------------
  // FILTER ACTIVITY
  // --------------------------------
  const filteredActivities = useMemo(() => {
    if (filter === "all") {
      return activities;
    }

    if (filter === "users") {
      return activities.filter((activity) => activity.type === "user");
    }

    if (filter === "reports") {
      return activities.filter(
        (activity) => activity.type === "report" || activity.type === "export",
      );
    }

    if (filter === "projects") {
      return activities.filter((activity) => activity.type === "project");
    }

    return activities;
  }, [filter]);

  // --------------------------------
  // LOAD MORE
  // --------------------------------
  const visibleActivities = showAll
    ? filteredActivities
    : filteredActivities.slice(0, 5);

  // --------------------------------
  // EXPORT
  // --------------------------------
  const handleExport = () => {
    const exportData = filteredActivities.map((activity) => ({
      User: activity.user,
      Action: activity.action,
      Target: activity.target,
      Time: activity.time,
    }));

    const csvHeader = Object.keys(exportData[0] || {}).join(",");

    const csvRows = exportData.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    );

    const csvContent = [csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "activity-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // --------------------------------
  // FILTER CHANGE
  // --------------------------------
  const handleFilterChange = (value) => {
    setFilter(value);
    setShowAll(false);
  };

  return (
    <div className="activity-page">
      {/* Heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACTIVITY</p>

          <h1>Activity</h1>

          <p>Track recent actions and events across your platform.</p>
        </div>

        <div className="activity-controls">
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Activity</option>
            <option value="users">Users</option>
            <option value="reports">Reports</option>
            <option value="projects">Projects</option>
          </select>

          <button className="primary-button" onClick={handleExport}>
            Export Activity
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="activity-stats-grid">
        <div className="activity-stat-card">
          <div className="activity-stat-icon">↗</div>

          <div>
            <span>Total Events</span>
            <strong>24,892</strong>
            <small>+12.4% this month</small>
          </div>
        </div>

        <div className="activity-stat-card">
          <div className="activity-stat-icon">♙</div>

          <div>
            <span>Active Users</span>
            <strong>8,426</strong>
            <small>+8.2% this month</small>
          </div>
        </div>

        <div className="activity-stat-card">
          <div className="activity-stat-icon">▣</div>

          <div>
            <span>Reports Created</span>
            <strong>1,248</strong>
            <small>+15.6% this month</small>
          </div>
        </div>

        <div className="activity-stat-card">
          <div className="activity-stat-icon">↓</div>

          <div>
            <span>Exports</span>
            <strong>3,842</strong>
            <small>+6.8% this month</small>
          </div>
        </div>
      </div>

      {/* Main Activity Card */}
      <div className="activity-card">
        <div className="activity-card-header">
          <div>
            <h3>Recent Activity</h3>

            <p>{filteredActivities.length} recent events found</p>
          </div>

          {/* Filter Button */}
          <button
            className="activity-filter-button"
            onClick={() => handleFilterChange("all")}
          >
            Clear Filter
          </button>
        </div>

        {/* Activity List */}
        <div className="activity-list">
          {visibleActivities.length > 0 ? (
            visibleActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                {/* Timeline */}
                <div className={`activity-icon ${activity.type}`}>
                  {activity.icon}
                </div>

                <div className="activity-line"></div>

                {/* Content */}
                <div className="activity-details">
                  <div>
                    <strong>{activity.user}</strong>

                    <span className="activity-action"> {activity.action}</span>

                    {activity.target && (
                      <span className="activity-target">
                        {" "}
                        "{activity.target}"
                      </span>
                    )}
                  </div>

                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-activity">
              No activity found for this filter.
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredActivities.length > 5 && (
          <div className="activity-footer">
            <button
              className="load-more-button"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? "Show Less" : "Load More Activity"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity;
