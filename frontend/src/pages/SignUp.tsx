import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="w-96 rounded-lg bg-white p-6 shadow-lg"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">Create Account</h1>

        <input
          className="mb-4 w-full rounded border p-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="mb-6 w-full rounded border p-2"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Sign Up
        </button>
        <h1>Already have an Account?</h1>
        <button
          onClick={() => navigate("/")}
          className="w-full rounded bg-blue-600  py-2 text-white hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
