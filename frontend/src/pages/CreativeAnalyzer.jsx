import { useState } from "react";
import "./CreativeAnalyzer.css";

function CreativeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState(null);

  // ================================
  // IMAGE SELECTION
  // ================================

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Maximum 10 MB
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      return;
    }

    // Reset previous results
    setCloudinaryUrl(null);
    setAnalysis(null);
    setError("");

    // Revoke previous preview URL if one exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // ================================
  // REMOVE IMAGE
  // ================================

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setCloudinaryUrl(null);
    setAnalysis(null);
    setError("");
  };

  // ================================
  // BACK BUTTON
  // ================================

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  // ================================
  // UPLOAD + AI ANALYSIS
  // ================================

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setUploading(true);
    setError("");
    setAnalysis(null);
    setCloudinaryUrl(null);

    try {
      const formData = new FormData();

      formData.append("creative", selectedFile);

      console.log("=================================");
      console.log("CREATIVE ANALYSIS REQUEST");
      console.log("=================================");
      console.log("File:", selectedFile.name);
      console.log("Size:", selectedFile.size);
      console.log("Type:", selectedFile.type);

      const response = await fetch(
        "http://localhost:5000/api/creatives/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      // Try to parse JSON response
      let data;

      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error(
          `Backend returned an invalid response. HTTP status: ${response.status}`
        );
      }

      console.log("=================================");
      console.log("BACKEND RESPONSE");
      console.log("=================================");
      console.log(data);

      // ================================
      // HANDLE BACKEND ERROR
      // ================================

      if (!response.ok) {
        const backendError =
          data?.error ||
          data?.message ||
          `Request failed with HTTP status ${response.status}`;

        throw new Error(backendError);
      }

      // ================================
      // HANDLE SUCCESS
      // ================================

      console.log("Cloudinary URL:", data.url);
      console.log("AI Analysis:", data.analysis);

      setCloudinaryUrl(data.url);
      setAnalysis(data.analysis);

    } catch (error) {
      console.error("=================================");
      console.error("CREATIVE ANALYSIS ERROR");
      console.error("=================================");
      console.error(error);
      console.error("Message:", error?.message);

      setError(
        error?.message ||
          "Something went wrong while analyzing the creative."
      );
    } finally {
      setUploading(false);
    }
  };


  // ================================
  // TOGGLE AI ANALYSIS SECTION
  // ================================

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };


  // ================================
  // RENDER
  // ================================

  return (
    <div className="analyzer-page">

      {/* =================================
          BACK BUTTON
      ================================== */}

      <button
        className="analyzer-back-button"
        onClick={handleBack}
        aria-label="Go back"
        title="Go back"
      >
        ←
      </button>


      {/* =================================
          HEADER
      ================================== */}

      <div className="analyzer-header">

        <div>

          <p className="page-label">
            CREATIVE INTELLIGENCE
          </p>

          <h1>
            Creative Analyzer
          </h1>

          <p className="page-description">
            Upload a marketing creative and discover the visual
            elements that could influence campaign performance.
          </p>

        </div>

      </div>


      {/* =================================
          MAIN ANALYZER GRID
      ================================== */}

      <div className="analyzer-grid">


        {/* =================================
            UPLOAD SECTION
        ================================== */}

        <div className="upload-card">

          <div className="upload-icon">
            ☁
          </div>

          <h2>
            Upload your creative
          </h2>

          <p>
            Upload an advertisement image to analyze its visual
            characteristics.
          </p>


          {!previewUrl ? (

            /* Upload Box */

            <div className="upload-box">

              <div className="upload-cloud">
                ☁
              </div>

              <h3>
                Drop your creative here
              </h3>

              <span>
                or
              </span>


              <input
                id="creative-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                hidden
              />


              <label
                htmlFor="creative-upload"
                className="upload-button"
              >
                Browse Files
              </label>


              <small>
                PNG, JPG or WEBP • Max 10MB
              </small>

            </div>

          ) : (

            /* Preview */

            <div className="preview-container">

              <img
                src={previewUrl}
                alt="Selected marketing creative"
                className="creative-preview"
              />


              <div className="file-info">

                <div>

                  <strong>
                    {selectedFile.name}
                  </strong>

                  <small>
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </small>

                </div>


                <button
                  className="remove-button"
                  onClick={handleRemove}
                  disabled={uploading}
                >
                  Remove
                </button>

              </div>


              {/* Analyze Button */}

              <button
                className="analyze-button"
                onClick={handleAnalyze}
                disabled={uploading}
              >
                {uploading
                  ? "Analyzing..."
                  : "Analyze Creative"}
              </button>


              {/* Error */}

              {error && (
                <div className="upload-error">
                  <strong>Analysis failed</strong>

                  <p>
                    {error}
                  </p>
                </div>
              )}


              {/* Cloudinary Success */}

              {cloudinaryUrl && !error && (
                <div className="upload-success">

                  ✅ Creative uploaded to Cloudinary

                </div>
              )}

            </div>

          )}

        </div>


        {/* =================================
            AI ANALYSIS SECTION
        ================================== */}

        <div className="analysis-card">

          <div className="analysis-header">

            <div>

              <span className="analysis-label">
                AI ANALYSIS
              </span>

              <h2>
                Creative Insights
              </h2>

            </div>


            <div className="status">

              {uploading
                ? "Analyzing..."
                : analysis
                ? "Analyzed"
                : cloudinaryUrl
                ? "Uploaded"
                : previewUrl
                ? "Ready"
                : "Waiting"}

            </div>

          </div>


          {/* =================================
              AI RESULTS
          ================================== */}

          {analysis ? (

            <div className="analysis-results">

              {/* Visual Elements */}
              <div
                className={`result-section collapsible-result-section ${
                  openSection === "visual" ? "section-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="result-section-header"
                  onClick={() => toggleSection("visual")}
                  aria-expanded={openSection === "visual"}
                >
                  <h3>🎨 Visual Elements</h3>
                  <span className="section-toggle">
                    {openSection === "visual" ? "−" : "+"}
                  </span>
                </button>

                {openSection === "visual" && (
                  <div className="result-section-content">
                    <p>
                      <strong>Colors:</strong>{" "}
                      {analysis.visualElements?.dominantColors?.join(", ") ||
                        "Not detected"}
                    </p>
                    <p>
                      <strong>Composition:</strong>{" "}
                      {analysis.visualElements?.composition ||
                        "Not detected"}
                    </p>
                    <p>
                      <strong>Objects:</strong>{" "}
                      {analysis.visualElements?.objects?.join(", ") ||
                        "Not detected"}
                    </p>
                    <p>
                      <strong>Style:</strong>{" "}
                      {analysis.visualElements?.style ||
                        "Not detected"}
                    </p>
                  </div>
                )}
              </div>

              {/* Text & CTA */}
              <div
                className={`result-section collapsible-result-section ${
                  openSection === "text" ? "section-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="result-section-header"
                  onClick={() => toggleSection("text")}
                  aria-expanded={openSection === "text"}
                >
                  <h3>📝 Text & CTA</h3>
                  <span className="section-toggle">
                    {openSection === "text" ? "−" : "+"}
                  </span>
                </button>

                {openSection === "text" && (
                  <div className="result-section-content">
                    <p>
                      <strong>Main Text:</strong>{" "}
                      {analysis.textAndCTA?.mainText || "Not detected"}
                    </p>
                    <p>
                      <strong>CTA:</strong>{" "}
                      {analysis.textAndCTA?.cta || "Not detected"}
                    </p>
                    <p>
                      <strong>Text Density:</strong>{" "}
                      {analysis.textAndCTA?.textDensity || "Not detected"}
                    </p>
                    <p>
                      <strong>CTA Prominence:</strong>{" "}
                      {analysis.textAndCTA?.ctaProminence || "Not detected"}
                    </p>
                  </div>
                )}
              </div>

              {/* Product Visibility */}
              <div
                className={`result-section collapsible-result-section ${
                  openSection === "product" ? "section-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="result-section-header"
                  onClick={() => toggleSection("product")}
                  aria-expanded={openSection === "product"}
                >
                  <h3>📦 Product Visibility</h3>
                  <span className="section-toggle">
                    {openSection === "product" ? "−" : "+"}
                  </span>
                </button>

                {openSection === "product" && (
                  <div className="result-section-content">
                    <p>
                      <strong>Product:</strong>{" "}
                      {analysis.productVisibility?.product || "Not detected"}
                    </p>
                    <p>
                      <strong>Prominence:</strong>{" "}
                      {analysis.productVisibility?.prominence || "Not detected"}
                    </p>
                    <p>
                      <strong>Placement:</strong>{" "}
                      {analysis.productVisibility?.placement || "Not detected"}
                    </p>
                  </div>
                )}
              </div>

              {/* Human Presence */}
              <div
                className={`result-section collapsible-result-section ${
                  openSection === "human" ? "section-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="result-section-header"
                  onClick={() => toggleSection("human")}
                  aria-expanded={openSection === "human"}
                >
                  <h3>👤 Human Presence</h3>
                  <span className="section-toggle">
                    {openSection === "human" ? "−" : "+"}
                  </span>
                </button>

                {openSection === "human" && (
                  <div className="result-section-content">
                    <p>
                      {analysis.humanPresence?.present
                        ? analysis.humanPresence.description
                        : "No people detected."}
                    </p>
                  </div>
                )}
              </div>

              {/* Marketing Summary */}
              <div
                className={`result-section collapsible-result-section ${
                  openSection === "summary" ? "section-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="result-section-header"
                  onClick={() => toggleSection("summary")}
                  aria-expanded={openSection === "summary"}
                >
                  <h3>📢 Marketing Summary</h3>
                  <span className="section-toggle">
                    {openSection === "summary" ? "−" : "+"}
                  </span>
                </button>

                {openSection === "summary" && (
                  <div className="result-section-content">
                    <p>
                      {analysis.marketingSummary || "No summary available."}
                    </p>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div
                className={`result-section collapsible-result-section ${
                  openSection === "recommendations" ? "section-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="result-section-header"
                  onClick={() => toggleSection("recommendations")}
                  aria-expanded={openSection === "recommendations"}
                >
                  <h3>💡 Recommendations</h3>
                  <span className="section-toggle">
                    {openSection === "recommendations" ? "−" : "+"}
                  </span>
                </button>

                {openSection === "recommendations" && (
                  <div className="result-section-content">
                    {analysis.recommendations?.length > 0 ? (
                      <ul>
                        {analysis.recommendations.map(
                          (recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>No recommendations available.</p>
                    )}
                  </div>
                )}
              </div>

            </div>

          ) : (

            /* =================================
               EMPTY STATE
            ================================== */

            <div className="empty-analysis">

              <div className="empty-icon">
                ✦
              </div>


              <h3>

                {uploading
                  ? "Analyzing your creative..."
                  : error
                  ? "Analysis failed"
                  : cloudinaryUrl
                  ? "Creative uploaded successfully"
                  : previewUrl
                  ? "Creative ready for analysis"
                  : "No creative analyzed yet"}

              </h3>


              <p>

                {uploading
                  ? "Cloudinary and Gemini are processing your creative."
                  : error
                  ? "Check the error message on the left and the backend terminal for details."
                  : cloudinaryUrl
                  ? "Your creative has been uploaded to Cloudinary."
                  : previewUrl
                  ? "Click Analyze Creative to analyze your advertisement."
                  : "Upload an advertisement to see its visual characteristics and AI-powered insights."}

              </p>

            </div>

          )}

        </div>

      </div>



      {/* =================================
          COLLAPSIBLE ANALYSIS STYLES
      ================================== */}

      <style>{`
        .collapsible-result-section {
          padding: 0 !important;
          overflow: hidden !important;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .collapsible-result-section.section-open {
          border-color: rgba(141, 124, 255, 0.55) !important;
        }

        .result-section-header {
          width: 100%;
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px !important;
          margin: 0 !important;
          border: 0 !important;
          background: transparent !important;
          color: inherit !important;
          cursor: pointer;
          text-align: left;
          box-sizing: border-box;
        }

        .result-section-header:hover {
          background: rgba(255, 255, 255, 0.025) !important;
        }

        .result-section-header h3 {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 16px !important;
          line-height: 1.4 !important;
        }

        .section-toggle {
          flex: 0 0 auto;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #30384a;
          border-radius: 50%;
          background: #151b2a;
          color: #a397ff;
          font-size: 20px;
          line-height: 1;
          box-sizing: border-box;
        }

        .result-section-header:hover .section-toggle {
          background: #211a48;
          border-color: #51477e;
        }

        .result-section-content {
          margin: 0 24px !important;
          padding: 4px 0 24px !important;
          border-top: 1px solid #1c2230;
          animation: creativeAnalysisOpen 0.2s ease;
        }

        .result-section-content p {
          margin: 16px 0 0 !important;
          line-height: 1.7 !important;
        }

        .result-section-content ul {
          margin: 16px 0 0 !important;
          padding-left: 22px !important;
          line-height: 1.7 !important;
        }

        .result-section-content li {
          margin-bottom: 10px;
        }

        @keyframes creativeAnalysisOpen {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>


      {/* =================================
          WHAT WE ANALYZE
      ================================== */}

      <div className="features-section">

        <div className="section-title">

          <p className="page-label">
            WHAT WE ANALYZE
          </p>

          <h2>
            Understand your creative
          </h2>

        </div>


        <div className="analysis-features">


          <div className="feature-card">

            <div className="feature-icon">
              🎨
            </div>

            <h3>
              Visual Elements
            </h3>

            <p>
              Identify colors, composition, objects
              and overall visual style.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📝
            </div>

            <h3>
              Text & CTA
            </h3>

            <p>
              Analyze text density, messaging and
              calls to action.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📦
            </div>

            <h3>
              Product Visibility
            </h3>

            <p>
              Understand how prominently the product
              appears in the creative.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              👤
            </div>

            <h3>
              Human Presence
            </h3>

            <p>
              Detect people and understand their role
              within the creative.
            </p>

          </div>


        </div>

      </div>

    </div>
  );
}

export default CreativeAnalyzer;