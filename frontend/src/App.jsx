import CreativeAnalyzer from "./pages/CreativeAnalyzer";
import "./App.css";

function App() {

  if (window.location.pathname === "/analyzer") {
  return <CreativeAnalyzer />;
}

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <span>InsightForge</span>
        </div>

        <nav className="nav">
          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() => {
            window.location.href = "/analyzer";
          }}
          >
          <span>◈</span>
            Creative Analyzer
          </button>

          <button className="nav-item">
            <span>▥</span>
            Campaign Analytics
          </button>

          <button className="nav-item">
            <span>✦</span>
            AI Insights
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help">?</div>
          <span>Help & Support</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="topbar">
          <div>
            <p className="welcome">Welcome back 👋</p>
            <h1>Marketing Intelligence</h1>
          </div>

          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Marketing Team</strong>
              <small>InsightForge</small>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Creatives</span>
            <h2>24</h2>
            <p className="positive">↑ 12% this month</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Average CTR</span>
            <h2>5.82%</h2>
            <p className="positive">↑ 8.4% this month</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Average CVR</span>
            <h2>6.40%</h2>
            <p className="positive">↑ 5.2% this month</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Best Creative</span>
            <h2>#17</h2>
            <p className="positive">7.82% CTR</p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="dashboard-grid">

          {/* Performance */}
          <div className="card performance-card">
            <div className="card-header">
              <div>
                <h3>Campaign Performance</h3>
                <p>CTR performance across recent creatives</p>
              </div>

              <select>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="chart">
              <div className="chart-bars">
                <div className="bar" style={{ height: "45%" }}>
                  <span>3.2%</span>
                </div>

                <div className="bar" style={{ height: "65%" }}>
                  <span>4.7%</span>
                </div>

                <div className="bar" style={{ height: "52%" }}>
                  <span>3.9%</span>
                </div>

                <div className="bar" style={{ height: "82%" }}>
                  <span>6.1%</span>
                </div>

                <div className="bar" style={{ height: "72%" }}>
                  <span>5.4%</span>
                </div>

                <div className="bar" style={{ height: "95%" }}>
                  <span>7.2%</span>
                </div>

                <div className="bar" style={{ height: "78%" }}>
                  <span>5.9%</span>
                </div>
              </div>

              <div className="chart-labels">
                <span>Ad 01</span>
                <span>Ad 02</span>
                <span>Ad 03</span>
                <span>Ad 04</span>
                <span>Ad 05</span>
                <span>Ad 06</span>
                <span>Ad 07</span>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="card insight-card">
            <div className="insight-icon">✦</div>

            <span className="ai-label">AI INSIGHT</span>

            <h3>Strong product visibility is performing better</h3>

            <p>
              Creatives with prominent product placement and lower
              text density are associated with higher CTR in your
              current campaign data.
            </p>

            <button className="insight-button">
              View detailed insights →
            </button>
          </div>
        </section>

        {/* Creative Table */}
        <section className="card table-card">
          <div className="card-header">
            <div>
              <h3>Creative Performance</h3>
              <p>Compare your latest marketing creatives</p>
            </div>

            <button className="view-button">View all →</button>
          </div>

          <div className="table">
            <div className="table-row table-head">
              <span>Creative</span>
              <span>Impressions</span>
              <span>Clicks</span>
              <span>CTR</span>
              <span>CVR</span>
            </div>

            <div className="table-row">
              <span className="creative-name">Creative 01</span>
              <span>100,000</span>
              <span>5,800</span>
              <span className="highlight">5.80%</span>
              <span>7.24%</span>
            </div>

            <div className="table-row">
              <span className="creative-name">Creative 02</span>
              <span>100,000</span>
              <span>2,100</span>
              <span>2.10%</span>
              <span>6.19%</span>
            </div>

            <div className="table-row">
              <span className="creative-name">Creative 03</span>
              <span>100,000</span>
              <span>7,200</span>
              <span className="highlight">7.20%</span>
              <span>8.47%</span>
            </div>

            <div className="table-row">
              <span className="creative-name">Creative 04</span>
              <span>85,000</span>
              <span>4,600</span>
              <span>5.41%</span>
              <span>6.82%</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;