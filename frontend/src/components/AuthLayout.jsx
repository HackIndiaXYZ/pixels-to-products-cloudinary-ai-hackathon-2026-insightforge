function AuthLayout({ children }) {
  return (
    <div className="auth-page">

      <div className="auth-brand">
        <div className="auth-logo-icon">
          ✦
        </div>

        <span>
          InsightForge
        </span>
      </div>

      <div className="auth-container">
        {children}
      </div>

      <p className="auth-footer">
        © 2026 InsightForge. Marketing intelligence powered by AI.
      </p>

    </div>
  );
}

export default AuthLayout;