function AnalyticsMetric({ title, value, change, description, icon }) {
  return (
    <div className="analytics-metric">
      <div className="analytics-metric-header">
        <span className="analytics-metric-title">{title}</span>

        <span className="analytics-metric-icon">{icon}</span>
      </div>

      <h2>{value}</h2>

      <div className="analytics-metric-footer">
        <span className="metric-change">↑ {change}</span>

        <span>{description}</span>
      </div>
    </div>
  );
}

export default AnalyticsMetric;
