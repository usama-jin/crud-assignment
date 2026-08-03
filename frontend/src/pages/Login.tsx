import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Redirect if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/users", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.data.token);
      navigate("/users", { replace: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Invalid email or password";

      // Show error strictly below the password field
      setError(message);
    }
  };

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        {/* Logo / Brand */}
        <div className="text-center mb-4">
          <h1 className="navbar-brand navbar-brand-autodark">
            CRUD Assignment
          </h1>
        </div>

        {/* Login Card */}
        <form
          className="card card-md"
          onSubmit={handleLogin}
          autoComplete="off"
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Sign in to your account
            </h2>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label required">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="mb-4">
              <label className="form-label required">Password</label>
              <div className="input-group input-group-flat">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                <span className="input-group-text">
                  <button
                    type="button"
                    className="link-secondary text-decoration-none border-0 bg-transparent p-0"
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                      </svg>
                    )}
                  </button>
                </span>
              </div>

              {/* Single Error Message Below Password */}
              {error && <div className="text-danger small mt-1">{error}</div>}
            </div>

            {/* Submit Button */}
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-secondary mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0 align-baseline ms-1"
            onClick={() => navigate("/signup")}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
