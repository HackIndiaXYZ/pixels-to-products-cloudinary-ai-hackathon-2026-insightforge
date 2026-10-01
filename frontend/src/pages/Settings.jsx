import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, setTheme } = useTheme();

  const [campaignAlerts, setCampaignAlerts] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);

  /* =========================================
     BACK TO PREVIOUS PAGE
  ========================================= */

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  /* =========================================
     THEME CHANGE
  ========================================= */

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked
      ? "dark"
      : "light";

    setTheme(newTheme);
  };

  return (
    <div className="settings-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="settings-page-header">

        <div>

          <p className="section-label">
            PREFERENCES
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Manage your InsightForge preferences
            and account settings.
          </p>

        </div>

        <button
          className="secondary-button"
          onClick={goBack}
        >
          ← Back
        </button>

      </div>


      {/* =====================================
          SETTINGS CONTAINER
      ===================================== */}

      <div className="settings-container">


        {/* ===================================
            APPEARANCE
        =================================== */}

        <section className="settings-section">

          <h2>
            Appearance
          </h2>

          <p>
            Customize how InsightForge looks
            on your screen.
          </p>


          <div className="setting-row">

            <div className="setting-info">

              <h3>
                Dark Mode
              </h3>

              <p>
                Turn on dark mode or switch to
                the light interface across the
                entire InsightForge application.
              </p>

            </div>


            <label className="setting-toggle">

              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />

              <span className="toggle-slider"></span>

            </label>

          </div>

        </section>


        {/* ===================================
            NOTIFICATIONS
        =================================== */}

        <section className="settings-section">

          <h2>
            Notifications
          </h2>

          <p>
            Control which updates you receive
            from InsightForge.
          </p>


          {/* ---------------------------------
              CAMPAIGN ALERTS
          --------------------------------- */}

          <div className="setting-row">

            <div className="setting-info">

              <h3>
                Campaign Alerts
              </h3>

              <p>
                Get notified when important
                campaign performance changes
                are detected.
              </p>

            </div>


            <label className="setting-toggle">

              <input
                type="checkbox"
                checked={campaignAlerts}
                onChange={(event) =>
                  setCampaignAlerts(
                    event.target.checked
                  )
                }
              />

              <span className="toggle-slider"></span>

            </label>

          </div>


          {/* ---------------------------------
              AI RECOMMENDATIONS
          --------------------------------- */}

          <div className="setting-row">

            <div className="setting-info">

              <h3>
                AI Recommendations
              </h3>

              <p>
                Receive updates when new
                AI-generated insights are
                available.
              </p>

            </div>


            <label className="setting-toggle">

              <input
                type="checkbox"
                checked={aiRecommendations}
                onChange={(event) =>
                  setAiRecommendations(
                    event.target.checked
                  )
                }
              />

              <span className="toggle-slider"></span>

            </label>

          </div>

        </section>


        {/* ===================================
            ACCOUNT
        =================================== */}

        <section className="settings-section">

          <h2>
            Account
          </h2>

          <p>
            Manage your InsightForge account.
          </p>


          <div className="settings-account-card">

            {/* Account information */}

            <div className="settings-account-info">

              <div className="settings-account-avatar">
                A
              </div>

              <div>

                <h3>
                  Marketing Team
                </h3>

                <p>
                  team@insightforge.ai
                </p>

              </div>

            </div>


            {/* Profile button */}

            <button
              className="settings-button"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              View Profile
            </button>

          </div>

        </section>


      </div>

    </div>
  );
}

export default Settings;