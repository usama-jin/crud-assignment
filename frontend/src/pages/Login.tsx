import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/users" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.data.token);

      navigate("/users", { replace: true });
    } catch (error) {
      alert("Invalid credentials");
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

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label">Password</label>

                <a href="#" className="form-label-description">
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

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
            className="btn btn-link p-0 align-baseline"
            onClick={() => navigate("/signup")}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
