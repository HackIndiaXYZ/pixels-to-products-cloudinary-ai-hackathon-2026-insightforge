import AuthLayout from "../components/AuthLayout";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend-only login
    window.location.href = "/";
  };

  return (
    <AuthLayout>

      <div className="auth-card">

        <div className="auth-header">
          <p className="auth-label">
            WELCOME BACK
          </p>

          <h1>
            Sign in to InsightForge
          </h1>

          <p>
            Access your marketing intelligence dashboard.
          </p>
        </div>


        <form
          className="auth-form"
          onSubmit={handleLogin}
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


          <div className="form-group">

            <div className="password-label-row">

              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className="auth-link-button"
                onClick={() => {
                  window.location.href =
                    "/forgot-password";
                }}
              >
                Forgot password?
              </button>

            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />

          </div>


          <button
            type="submit"
            className="auth-submit-button"
          >
            Sign In
          </button>

        </form>


        <div className="auth-divider">
          <span>OR</span>
        </div>


        <p className="auth-switch">

          Don't have an account?

          <button
            type="button"
            className="auth-link-button signup-link"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Create account
          </button>

        </p>

      </div>

    </AuthLayout>
  );
}

export default Login;