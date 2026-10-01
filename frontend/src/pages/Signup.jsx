import AuthLayout from "../components/AuthLayout";

function Signup() {
  const handleSignup = (e) => {
    e.preventDefault();

    // Temporary frontend-only signup
    window.location.href = "/login";
  };

  return (
    <AuthLayout>

      <div className="auth-card">

        <div className="auth-header">
          <p className="auth-label">
            GET STARTED
          </p>

          <h1>
            Create your account
          </h1>

          <p>
            Start turning your creative data into marketing intelligence.
          </p>
        </div>


        <form
          className="auth-form"
          onSubmit={handleSignup}
        >

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              required
            />

          </div>


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

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              minLength={6}
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              minLength={6}
              required
            />

          </div>


          <button
            type="submit"
            className="auth-submit-button"
          >
            Create Account
          </button>

        </form>


        <div className="auth-divider">
          <span>OR</span>
        </div>


        <p className="auth-switch">

          Already have an account?

          <button
            type="button"
            className="auth-link-button signup-link"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Sign in
          </button>

        </p>

      </div>

    </AuthLayout>
  );
}

export default Signup;