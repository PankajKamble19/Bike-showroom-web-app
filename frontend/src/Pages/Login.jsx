import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user, data.token);
      navigate(data.user.role === "admin" ? "/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-8">
        <h1 className="text-4xl font-display font-bold text-brand-orange mb-2">WELCOME BACK</h1>
        <p className="text-gray-400 mb-8 font-body">Sign in to your account</p>

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email" placeholder="Email"
            className="w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            required
          />
          <input
            type="password" placeholder="Password"
            className="w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            required
          />
          <button type="submit" className="w-full bg-brand-orange text-white font-display font-bold text-lg py-3 rounded-lg hover:bg-orange-600 transition-colors">
            SIGN IN
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          No account? <Link to="/signup" className="text-brand-orange hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}