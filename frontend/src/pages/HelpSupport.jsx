import { useState } from "react";
import BackButton from "../components/BackButton";

function HelpSupport() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <div className="help-page">
      <BackButton />


      <div className="help-page-header">

        <div>
          <p className="section-label">SUPPORT</p>

          <h1>
            Help & Support
          </h1>

          <p>
            Find answers or get help with your InsightForge workspace.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to Dashboard
        </button>

      </div>

      <div className="help-grid">

        <div className="help-card">

          <div className="help-card-icon">
            ?
          </div>

          <h2>
            Getting Started
          </h2>

          <p>
            Learn how to upload creatives, analyze campaigns,
            and generate AI-powered marketing insights.
          </p>

          <button
  className="secondary-button"
  onClick={() => {
    window.location.href = "/analyzer";
  }}
>
  View Guide
</button>

        </div>

        <div className="help-card">

          <div className="help-card-icon">
            ✦
          </div>

          <h2>
            AI Insights
          </h2>

          <p>
            Understand how InsightForge analyzes creative
            elements and campaign performance.
          </p>

          <button
            className="secondary-button"
            onClick={() => {
              window.location.href = "/insights";
            }}
          >
            Explore Insights
          </button>

        </div>

        <div className="help-card">

          <div className="help-card-icon">
            ↗
          </div>

          <h2>
            Contact Support
          </h2>

          <p>
            Need assistance? Reach out to the InsightForge
            support team for help.
          </p>

          <button
            className="secondary-button"
            onClick={() => {
              window.location.href =
                "mailto:support@insightforge.ai";
            }}
          >
            Contact Support
          </button>

        </div>

      </div>

      <div className="help-faq-section">

  <h2>
    Frequently Asked Questions
  </h2>

  {/* FAQ 1 */}
  <div className={`faq-item ${openFaq === 0 ? "open" : ""}`}>

    <button
      className="faq-question"
      onClick={() => toggleFaq(0)}
    >
      <span>
        How do I analyze a creative?
      </span>

      <span className="faq-toggle">
        {openFaq === 0 ? "−" : "+"}
      </span>
    </button>

    {openFaq === 0 && (
      <div className="faq-answer">
        <p>
          Open Creative Analyzer, upload your marketing
          creative, and run the AI analysis.
        </p>
      </div>
    )}

  </div>


  {/* FAQ 2 */}
  <div className={`faq-item ${openFaq === 1 ? "open" : ""}`}>

    <button
      className="faq-question"
      onClick={() => toggleFaq(1)}
    >
      <span>
        How do I upload campaign data?
      </span>

      <span className="faq-toggle">
        {openFaq === 1 ? "−" : "+"}
      </span>
    </button>

    {openFaq === 1 && (
      <div className="faq-answer">
        <p>
          Open Campaign Analytics and upload your campaign
          performance CSV file.
        </p>
      </div>
    )}

  </div>


  {/* FAQ 3 */}
  <div className={`faq-item ${openFaq === 2 ? "open" : ""}`}>

    <button
      className="faq-question"
      onClick={() => toggleFaq(2)}
    >
      <span>
        Are AI insights guaranteed to improve performance?
      </span>

      <span className="faq-toggle">
        {openFaq === 2 ? "−" : "+"}
      </span>
    </button>

    {openFaq === 2 && (
      <div className="faq-answer">
        <p>
          No. Insights are recommendations based on the
          available creative and campaign data and should
          be treated as analysis rather than guarantees.
        </p>
      </div>
    )}

  </div>

</div>
      

    </div>
  );
}

export default HelpSupport;