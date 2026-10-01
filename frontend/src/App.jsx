import { useEffect, useState } from "react";

import CampaignAnalytics from "./pages/CampaignAnalytics";
import CreativeAnalyzer from "./pages/CreativeAnalyzer";
import AIInsights from "./pages/AIInsights";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";

import "./App.css";

function App() {
  const path = window.location.pathname;

  const [campaign, setCampaign] = useState(null);
  const [loadingCampaign, setLoadingCampaign] = useState(true);

  // ==========================================
  // LOAD LATEST CAMPAIGN DATA
  // ==========================================

  useEffect(() => {
    if (path !== "/") {
      setLoadingCampaign(false);
      return;
    }

    const loadCampaignData = async () => {
      try {
        setLoadingCampaign(true);

        const response = await fetch(
          "http://localhost:5000/api/campaigns/latest"
        );

        if (!response.ok) {
          throw new Error("No campaign data available");
        }

        const data = await response.json();

        console.log("Dashboard campaign data:", data);

        setCampaign(data);
      } catch (error) {
        console.log(
          "Dashboard campaign data not available:",
          error.message
        );

        setCampaign(null);
      } finally {
        setLoadingCampaign(false);
      }
    };

    loadCampaignData();
  }, [path]);

  // ==========================================
  // ROUTES
  // ==========================================

  if (path === "/analyzer") return <CreativeAnalyzer />;
  if (path === "/campaigns") return <CampaignAnalytics />;
  if (path === "/insights") return <AIInsights />;
  if (path === "/login") return <Login />;
  if (path === "/signup") return <Signup />;
  if (path === "/forgot-password") return <ForgotPassword />;
  if (path === "/reset-password") return <ResetPassword />;
  if (path === "/profile") return <Profile />;
  if (path === "/settings") return <Settings />;
  if (path === "/help") return <HelpSupport />;

  // ==========================================
  // NAVIGATION
  // ==========================================

  const navigate = (url) => {
    window.location.href = url;
  };

  // ==========================================
  // CALCULATE TOP CREATIVE
  // ==========================================

  const topCreative =
    campaign?.campaignData?.length > 0
      ? campaign.campaignData.reduce((best, current) =>
          Number(current.ctr) > Number(best.ctr)
            ? current
            : best
        )
      : null;

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">✦</div>
          <span>InsightForge</span>
        </div>

        <nav className="nav">

          <button
            className="nav-item active"
            onClick={() => navigate("/")}
            type="button"
          >
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/analyzer")}
            type="button"
          >
            <span className="nav-icon">◈</span>
            <span>Creative Analyzer</span>
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/campaigns")}
            type="button"
          >
            <span className="nav-icon">▥</span>
            <span>Campaign Analytics</span>
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/insights")}
            type="button"
          >
            <span className="nav-icon">✦</span>
            <span>AI Insights</span>
          </button>

        </nav>

        <button
          className="sidebar-bottom"
          onClick={() => navigate("/help")}
          type="button"
        >
          <span className="sidebar-icon">?</span>
          <span>Help & Support</span>
        </button>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* ================= TOPBAR ================= */}

        <header className="topbar">

          <div className="topbar-title">

            <p className="welcome">
              Welcome back 👋
            </p>

            <h1>
              Marketing Intelligence
            </h1>

            <p className="topbar-subtitle">
              Monitor your creatives and campaign
              performance from one place.
            </p>

          </div>

          <button
            className="profile profile-button"
            onClick={() => navigate("/profile")}
            type="button"
          >

            <div className="avatar">
              A
            </div>

            <div className="profile-text">

              <strong>
                Marketing Team
              </strong>

              <small>
                InsightForge
              </small>

            </div>

            <span className="profile-arrow">
              →
            </span>

          </button>

        </header>

        {/* ================= KPI CARDS ================= */}

        <section className="stats">

          {/* TOTAL CREATIVES */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span className="stat-label">
                Total Creatives
              </span>

              <span className="stat-icon">
                ◈
              </span>

            </div>

            <h2>
              {loadingCampaign
                ? "..."
                : campaign?.campaignData?.length || 0}
            </h2>

            <p className="positive">
              Uploaded campaign creatives
            </p>

          </div>

          {/* CTR */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span className="stat-label">
                Average CTR
              </span>

              <span className="stat-icon">
                %
              </span>

            </div>

            <h2>
              {loadingCampaign
                ? "..."
                : `${campaign?.summary?.ctr ?? 0}%`}
            </h2>

            <p className="positive">
              Campaign overall CTR
            </p>

          </div>

          {/* CVR */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span className="stat-label">
                Average CVR
              </span>

              <span className="stat-icon">
                ↗
              </span>

            </div>

            <h2>
              {loadingCampaign
                ? "..."
                : `${campaign?.summary?.cvr ?? 0}%`}
            </h2>

            <p className="positive">
              Campaign overall CVR
            </p>

          </div>

          {/* TOP CREATIVE */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span className="stat-label">
                Top Creative
              </span>

              <span className="stat-icon">
                ✦
              </span>

            </div>

            <h2>
              {loadingCampaign
                ? "..."
                : topCreative
                  ? topCreative.creative
                  : "—"}
            </h2>

            <p className="positive">
              Highest CTR
            </p>

          </div>

        </section>

        {/* ================= DASHBOARD GRID ================= */}

        <section className="dashboard-grid">

          {/* PERFORMANCE */}

          <div className="card performance-card">

            <div className="card-header">

              <div>

                <span className="card-eyebrow">
                  PERFORMANCE
                </span>

                <h3>
                  Campaign Performance
                </h3>

                <p>
                  CTR performance across uploaded
                  creatives
                </p>

              </div>

              <select
                className="period-select"
                defaultValue="30"
              >
                <option value="30">
                  Last 30 days
                </option>

                <option value="7">
                  Last 7 days
                </option>

                <option value="90">
                  Last 90 days
                </option>

              </select>

            </div>

            {/* REAL CAMPAIGN CHART */}

            <div className="chart">

              {campaign?.campaignData?.length > 0 ? (

                <>
                  <div className="chart-bars">

                    {campaign.campaignData.map(
                      (item, index) => {

                        const maxCTR = Math.max(
                          ...campaign.campaignData.map(
                            (row) =>
                              Number(row.ctr) || 0
                          )
                        );

                        const height =
                          maxCTR > 0
                            ? (Number(item.ctr) /
                                maxCTR) *
                              85
                            : 0;

                        return (
                          <div
                            className="bar"
                            key={index}
                            style={{
                              height: `${Math.max(
                                height,
                                5
                              )}%`,
                            }}
                          >
                            <span>
                              {Number(item.ctr).toFixed(2)}%
                            </span>
                          </div>
                        );
                      }
                    )}

                  </div>

                  <div className="chart-labels">

                    {campaign.campaignData.map(
                      (item, index) => (
                        <span key={index}>
                          {item.creative}
                        </span>
                      )
                    )}

                  </div>
                </>

              ) : (

                <div
                  style={{
                    padding: "80px 20px",
                    textAlign: "center",
                    color: "var(--text-secondary)",
                  }}
                >
                  Upload campaign data to view
                  performance.
                </div>

              )}

            </div>

          </div>

          {/* AI INSIGHT */}

          <button
            className="card insight-card"
            onClick={() => navigate("/insights")}
            type="button"
          >

            <div className="insight-card-header">

              <div className="insight-icon">
                ✦
              </div>

              <span className="ai-label">
                AI INSIGHT
              </span>

            </div>

            <h3>
              Strong product visibility is
              performing better
            </h3>

            <p>
              Creatives with prominent product
              placement and lower text density
              are associated with higher CTR in
              your current campaign data.
            </p>

            <div className="insight-footer">

              <span>
                View AI Insights
              </span>

              <span className="insight-arrow">
                →
              </span>

            </div>

          </button>

        </section>

        {/* ================= CREATIVE TABLE ================= */}

        <section className="card table-card">

          <div className="card-header">

            <div>

              <span className="card-eyebrow">
                CREATIVE ANALYTICS
              </span>

              <h3>
                Creative Performance
              </h3>

              <p>
                Compare your uploaded marketing
                creatives
              </p>

            </div>

            <button
              className="view-button"
              onClick={() => navigate("/campaigns")}
              type="button"
            >
              View all →
            </button>

          </div>

          <div className="table">

            <div className="table-row table-head">

              <span>
                Creative
              </span>

              <span>
                Impressions
              </span>

              <span>
                Clicks
              </span>

              <span>
                CTR
              </span>

              <span>
                CVR
              </span>

            </div>

            {campaign?.campaignData?.length > 0 ? (

              campaign.campaignData.map(
                (item, index) => (

                  <div
                    className="table-row"
                    key={index}
                  >

                    <span className="creative-name">
                      {item.creative}
                    </span>

                    <span>
                      {Number(
                        item.impressions
                      ).toLocaleString()}
                    </span>

                    <span>
                      {Number(
                        item.clicks
                      ).toLocaleString()}
                    </span>

                    <span className="highlight">
                      {Number(item.ctr).toFixed(2)}%
                    </span>

                    <span>
                      {Number(item.cvr).toFixed(2)}%
                    </span>

                  </div>

                )
              )

            ) : (

              <div
                style={{
                  padding: "35px 20px",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                Upload campaign data to
                view creative performance.
              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;