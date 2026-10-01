import { useState } from "react";
import "./AIInsights.css";

function AIInsights() {
  const [openPattern, setOpenPattern] = useState(null);
  const [openRecommendation, setOpenRecommendation] = useState(null);

  // Temporary frontend data
  const insights = [
    {
      number: "01",
      type: "VISUAL PATTERN",
      title: "Prominent product placement",
      description:
        "Creatives where the product is clearly visible are associated with stronger CTR in the current campaign dataset.",
      metric: "7.2%",
      metricLabel: "Observed CTR",
      icon: "◈",
    },
    {
      number: "02",
      type: "TEXT PATTERN",
      title: "Lower text density",
      description:
        "Creatives with less visual text appear to perform better on click-through rate compared with more text-heavy creatives.",
      metric: "6.8%",
      metricLabel: "Observed CTR",
      icon: "Aa",
    },
    {
      number: "03",
      type: "CTA SIGNAL",
      title: "Clear calls to action",
      description:
        "Creatives with visually prominent calls to action show stronger engagement signals in the available campaign data.",
      metric: "8.1%",
      metricLabel: "Observed CTR",
      icon: "→",
    },
  ];

  const recommendations = [
    {
      priority: "HIGH PRIORITY",
      title: "Test stronger product visibility",
      description:
        "Create a variation where the primary product is more visually prominent and compare its campaign performance.",
      icon: "◈",
    },
    {
      priority: "MEDIUM PRIORITY",
      title: "Reduce unnecessary text",
      description:
        "Test a simplified creative with fewer text elements while keeping the core marketing message unchanged.",
      icon: "Aa",
    },
    {
      priority: "MEDIUM PRIORITY",
      title: "Experiment with CTA prominence",
      description:
        "Test a more visually distinct CTA placement and compare engagement against the current creative.",
      icon: "→",
    },
  ];

  const togglePattern = (index) => {
    setOpenPattern(openPattern === index ? null : index);
  };

  const toggleRecommendation = (index) => {
    setOpenRecommendation(
      openRecommendation === index ? null : index
    );
  };

  return (
    <div className="insights-page">

      {/* =================================
          BACK BUTTON
      ================================== */}

      <button
        className="insights-back-button"
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/";
          }
        }}
        aria-label="Go back"
        title="Go back"
      >
        ←
      </button>


      {/* =================================
          HEADER
      ================================== */}

      <div className="insights-header">

        <p className="page-label">
          AI-POWERED INTELLIGENCE
        </p>

        <h1>
          AI Insights
        </h1>

        <p className="page-description">
          Turn creative analysis and campaign performance data into
          actionable marketing intelligence.
        </p>

      </div>


      {/* =================================
          CAMPAIGN SUMMARY
      ================================== */}

      <section className="insight-summary">

        <div className="summary-icon">
          ✦
        </div>

        <div className="summary-content">

          <p className="summary-label">
            CAMPAIGN SUMMARY
          </p>

          <h2>
            Your creatives show several patterns worth testing
          </h2>

          <p>
            The current campaign data shows associations between
            certain visual characteristics and stronger performance.
            These patterns can be used to design controlled creative
            tests and future campaign variations.
          </p>

        </div>

        <div className="summary-score">

          <span>
            INSIGHT SIGNAL
          </span>

          <strong>
            82%
          </strong>

          <small>
            Pattern confidence
          </small>

        </div>

      </section>


      {/* =================================
          PERFORMANCE SNAPSHOT
      ================================== */}

      <div className="section-heading">

        <p className="page-label">
          PERFORMANCE SNAPSHOT
        </p>

        <h2>
          What the data is showing
        </h2>

      </div>


      <div className="insight-metrics">

        <div className="insight-metric-card">

          <span>
            Avg. CTR
          </span>

          <strong>
            5.82%
          </strong>

          <small>
            Across analyzed creatives
          </small>

        </div>


        <div className="insight-metric-card">

          <span>
            Avg. CVR
          </span>

          <strong>
            7.95%
          </strong>

          <small>
            Conversion rate
          </small>

        </div>


        <div className="insight-metric-card">

          <span>
            Top CTR
          </span>

          <strong>
            7.20%
          </strong>

          <small>
            Highest observed creative
          </small>

        </div>


        <div className="insight-metric-card">

          <span>
            Creatives
          </span>

          <strong>
            24
          </strong>

          <small>
            In current dataset
          </small>

        </div>

      </div>


      {/* =================================
          DETECTED PATTERNS
      ================================== */}

      <div className="section-heading patterns-heading">

        <p className="page-label">
          DETECTED PATTERNS
        </p>

        <h2>
          Visual signals associated with performance
        </h2>

      </div>


      <div className="insights-grid">

        {insights.map((insight, index) => (

          <div
            className={`insight-card ${
              openPattern === index ? "expanded" : ""
            }`}
            key={insight.number}
          >

            {/* CLICKABLE HEADER */}

            <button
              className="insight-card-toggle"
              onClick={() => togglePattern(index)}
            >

              <div className="insight-card-top">

                <span className="insight-number">
                  {insight.number}
                </span>

                <span className="insight-type">
                  {insight.type}
                </span>

              </div>

              <div className="insight-toggle-icon">
                {openPattern === index ? "−" : "+"}
              </div>

            </button>


            {/* ALWAYS VISIBLE TITLE */}

            <div className="pattern-preview">

              <div className="pattern-icon">
                {insight.icon}
              </div>

              <h3>
                {insight.title}
              </h3>

            </div>


            {/* COLLAPSIBLE CONTENT */}

            {openPattern === index && (

              <div className="insight-expanded-content">

                <p>
                  {insight.description}
                </p>

                <div className="observed-metric">

                  <strong>
                    {insight.metric}
                  </strong>

                  <span>
                    {insight.metricLabel}
                  </span>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>


      {/* =================================
          RECOMMENDATIONS
      ================================== */}

      <div className="section-heading recommendations-heading">

        <p className="page-label">
          AI RECOMMENDATIONS
        </p>

        <h2>
          What you could test next
        </h2>

      </div>


      <div className="recommendations-container">

        {recommendations.map((recommendation, index) => (

          <div
            className={`recommendation-card ${
              openRecommendation === index ? "expanded" : ""
            }`}
            key={index}
          >

            {/* CLICKABLE HEADER */}

            <button
              className="recommendation-toggle"
              onClick={() => toggleRecommendation(index)}
            >

              <div className="recommendation-icon">
                {recommendation.icon}
              </div>

              <div className="recommendation-content">

                <span className="recommendation-priority">
                  {recommendation.priority}
                </span>

                <h3>
                  {recommendation.title}
                </h3>

              </div>

              <div className="recommendation-arrow">

                {openRecommendation === index
                  ? "−"
                  : "+"}

              </div>

            </button>


            {/* COLLAPSIBLE CONTENT */}

            {openRecommendation === index && (

              <div className="recommendation-expanded-content">

                <p>
                  {recommendation.description}
                </p>

              </div>

            )}

          </div>

        ))}

      </div>


      {/* =================================
          TESTING STRATEGY
      ================================== */}

      <section className="testing-card">

        <div className="testing-icon">
          ✦
        </div>


        <div className="testing-content">

          <p className="page-label">
            NEXT STEP
          </p>

          <h2>
            Turn insights into creative experiments
          </h2>

          <p>
            Use these observations as hypotheses for your next
            campaign. Create variations that change one visual
            element at a time and compare their performance.
          </p>

        </div>


        <div className="testing-badge">
          AI READY
        </div>

      </section>


      {/* =================================
          FOOTER NOTE
      ================================== */}

      <div className="insights-footer">

        <span>
          ✦
        </span>

        <p>
          Insights are based on observed associations in the
          available campaign data and should be validated through
          controlled testing.
        </p>

      </div>

    </div>
  );
}

export default AIInsights;