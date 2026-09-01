import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/signup", form);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-8">
        <h1 className="text-4xl font-display font-bold text-brand-orange mb-2">JOIN THE SHOWROOM</h1>
        <p className="text-gray-400 mb-8 font-body">Create your account</p>

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Full Name"
            className="w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
            value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            required
          />
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
          <select
            className="w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange"
            value={form.role} onChange={e => setForm({...form, role: e.target.value})}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin (Seller)</option>
          </select>
          <button type="submit" className="w-full bg-brand-orange text-white font-display font-bold text-lg py-3 rounded-lg hover:bg-orange-600 transition-colors">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Have an account? <Link to="/login" className="text-brand-orange hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}