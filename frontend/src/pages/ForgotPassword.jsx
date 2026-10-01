import AuthLayout from "../components/AuthLayout";

function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend-only flow
    window.location.href = "/reset-password";
  };

  return (
    <AuthLayout>

      <div className="auth-card">

        <div className="auth-header">

          <p className="auth-label">
            ACCOUNT RECOVERY
          </p>

          <h1>
            Forgot your password?
          </h1>

          <p>
            Enter your email and we'll help you reset your password.
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />

          </div>


          <button
            type="submit"
            className="auth-submit-button"
          >
            Continue
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

export default ForgotPassword;