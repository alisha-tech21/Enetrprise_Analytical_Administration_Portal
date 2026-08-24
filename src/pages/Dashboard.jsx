import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import ActivityChart from "../components/dashboard/ActivityChart";

function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>

          <h1>Good morning, Admin </h1>

          <p>Here&apos;s what&apos;s happening across your business today.</p>
        </div>

        <div className="last-updated">
          <span className="status-dot"></span>
          Updated 2 minutes ago
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard title="Total Users" value="12,486" change="12.8%" icon="♙" />

        <StatCard title="Revenue" value="$84,320" change="8.4%" icon="$" />

        <StatCard title="Active Projects" value="248" change="5.2%" icon="◈" />

        <StatCard
          title="Conversion Rate"
          value="68.4%"
          change="3.1%"
          icon="%"
        />
      </div>

      {/* Charts Area - Coming Next */}
      <div className="dashboard-grid">
        <RevenueChart />
        <ActivityChart />
      </div>
      <div className="dashboard-grid">
        <UserGrowthChart />
        <PerformanceChart />
      </div>
    </div>
  );
}

export default Dashboard;
