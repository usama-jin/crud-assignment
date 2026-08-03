import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { register } from "../services/authService";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/users" replace />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);

      alert("Account created successfully");
      navigate("/");
    } catch (error: any) {
      alert(JSON.stringify(error.response?.data.message, null, 2));
    }
  };

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <h1 className="navbar-brand navbar-brand-autodark">
            CRUD Assignment
          </h1>
        </div>

        <form
          className="card card-md"
          onSubmit={handleSignUp}
          autoComplete="off"
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Create an Account</h2>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">
                Create Account
              </button>
            </div>
          </div>
        </form>

        <div className="text-center text-secondary mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0 align-baseline"
            onClick={() => navigate("/")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
