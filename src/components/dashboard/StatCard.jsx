function StatCard({ title, value, change, icon, positive = true }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p className="stat-title">{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">{icon}</div>
      </div>

      <div className="stat-card-bottom">
        <span className={positive ? "change positive" : "change negative"}>
          {positive ? "↑" : "↓"} {change}
        </span>

        <span className="change-label">vs last month</span>
      </div>
    </div>
  );
}

export default StatCard;
