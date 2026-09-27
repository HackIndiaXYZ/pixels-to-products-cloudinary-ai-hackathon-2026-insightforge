import { useState } from "react";
import "./CreativeAnalyzer.css";

function CreativeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Limit file size to 10 MB
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      return;
    }

    // Reset previous analysis
    setCloudinaryUrl(null);
    setError("");

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setCloudinaryUrl(null);
    setError("");
  };

  // Upload image to backend → Cloudinary
  const handleAnalyze = async () => {
    if (!selectedFile) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("creative", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/creatives/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      console.log("Cloudinary response:", data);

      setCloudinaryUrl(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message || "Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="analyzer-page">

      {/* Header */}
      <div className="analyzer-header">
        <div>
          <p className="page-label">CREATIVE INTELLIGENCE</p>

          <h1>Creative Analyzer</h1>

          <p className="page-description">
            Upload a marketing creative and discover the visual elements
            that could influence campaign performance.
          </p>
        </div>
      </div>

      <div className="analyzer-grid">

        {/* Upload Section */}
        <div className="upload-card">

          <div className="upload-icon">
            ↑
          </div>

          <h2>Upload your creative</h2>

          <p>
            Upload an advertisement image to analyze its visual
            characteristics.
          </p>

          {!previewUrl ? (
            <div className="upload-box">

              <div className="upload-cloud">
                ↑
              </div>

              <h3>Drop your creative here</h3>

              <span>or</span>

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
            <div className="preview-container">

              <img
                src={previewUrl}
                alt="Selected marketing creative"
                className="creative-preview"
              />

              <div className="file-info">
                <div>
                  <strong>{selectedFile.name}</strong>

                  <small>
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </small>
                </div>

                <button
                  className="remove-button"
                  onClick={handleRemove}
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
                {uploading ? "Uploading..." : "Analyze Creative"}
              </button>

              {/* Error */}
              {error && (
                <p className="upload-error">
                  {error}
                </p>
              )}

              {/* Cloudinary Success */}
              {cloudinaryUrl && (
                <div className="upload-success">
                  ✅ Creative uploaded to Cloudinary
                </div>
              )}

            </div>
          )}

        </div>

        {/* Analysis Section */}
        <div className="analysis-card">

          <div className="analysis-header">

            <div>
              <span className="analysis-label">
                AI ANALYSIS
              </span>

              <h2>Creative Insights</h2>
            </div>

            <div className="status">
              {uploading
                ? "Uploading..."
                : cloudinaryUrl
                ? "Uploaded"
                : previewUrl
                ? "Ready"
                : "Waiting"}
            </div>

          </div>

          <div className="empty-analysis">

            <div className="empty-icon">
              ✦
            </div>

            <h3>
              {cloudinaryUrl
                ? "Creative uploaded successfully"
                : previewUrl
                ? "Creative ready for analysis"
                : "No creative analyzed yet"}
            </h3>

            <p>
              {cloudinaryUrl
                ? "Your creative is now stored in Cloudinary. AI visual analysis will be connected next."
                : previewUrl
                ? "Click Analyze Creative to upload your creative to Cloudinary."
                : "Upload an advertisement to see its visual characteristics and AI-powered insights."}
            </p>

          </div>

        </div>

      </div>

      {/* What We Analyze */}
      <div className="features-section">

        <div className="section-title">
          <p className="page-label">WHAT WE ANALYZE</p>
          <h2>Understand your creative</h2>
        </div>

        <div className="analysis-features">

          <div className="feature-card">
            <div className="feature-icon">🎨</div>

            <h3>Visual Elements</h3>

            <p>
              Identify colors, composition, objects and
              overall visual style.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>

            <h3>Text & CTA</h3>

            <p>
              Analyze text density, messaging and calls
              to action.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>

            <h3>Product Visibility</h3>

            <p>
              Understand how prominently the product
              appears in the creative.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>

            <h3>Human Presence</h3>

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