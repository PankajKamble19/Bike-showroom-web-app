import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function InquiryForm() {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inquiries", { ...form, bike: bikeId });
      setSent(true);
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      alert("Failed to send inquiry");
    }
  };

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-display font-bold text-3xl text-white mb-2">Inquiry Sent!</h2>
        <p className="text-gray-400 font-body">We'll get back to you shortly. Redirecting...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
        <h1 className="font-display font-bold text-4xl text-white mb-2">BOOK THIS BIKE</h1>
        <p className="text-gray-400 font-body mb-8">Fill in your details and we'll contact you.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "name", label: "Full Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone Number", type: "tel" },
          ].map(({ key, label, type }) => (
            <input
              key={key} type={type} placeholder={label}
              className="w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
              value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
              required={key !== "phone"}
            />
          ))}
          <textarea
            placeholder="Message (optional)" rows={4}
            className="w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange resize-none"
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          />
          <button type="submit" className="w-full bg-brand-orange text-white font-display font-bold text-lg py-3 rounded-lg hover:bg-orange-600 transition-colors">
            SEND INQUIRY
          </button>
        </form>
      </div>
    </div>
  );
}