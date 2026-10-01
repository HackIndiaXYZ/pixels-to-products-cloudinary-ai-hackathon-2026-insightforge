import AuthLayout from "../components/AuthLayout";

function ResetPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend-only flow
    window.location.href = "/login";
  };

  return (
    <AuthLayout>

      <div className="auth-card">

        <div className="auth-header">

          <p className="auth-label">
            RESET PASSWORD
          </p>

          <h1>
            Create a new password
          </h1>

          <p>
            Choose a new password for your InsightForge account.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="newPassword">
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              minLength={6}
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              minLength={6}
              required
            />

          </div>

          <button
            type="submit"
            className="auth-submit-button"
          >
            Reset Password
          </button>

        </form>

        <p className="auth-switch">

          Remember your password?

          <button
            type="button"
            className="auth-link-button signup-link"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Back to Sign In
          </button>

        </p>

      </div>

    </AuthLayout>
  );
}

export default ResetPassword;