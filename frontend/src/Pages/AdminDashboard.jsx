import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const emptyForm = { name: "", brand: "", price: "", engineCapacity: "", mileage: "", description: "", imageUrl: "", available: true };

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState("bikes");

const [accessories, setAccessories] = useState([]);
const [accForm, setAccForm] = useState({ name: "", brand: "", category: "helmet", type: "accessory", price: "", description: "", imageUrl: "", inStock: true });
  const fetchAccessories = () => api.get("/accessories").then(({ data }) => setAccessories(data));

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/"); return; }
    fetchBikes();
    fetchInquiries();
    fetchAccessories();
  }, []);

  const fetchBikes = () => api.get("/bikes").then(({ data }) => setBikes(data));
  const fetchInquiries = () => api.get("/inquiries").then(({ data }) => setInquiries(data)).catch(() => {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/bikes/${editId}`, form);
      } else {
        await api.post("/bikes", form);
      }
      setForm(emptyForm);
      setEditId(null);
      fetchBikes();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving bike");
    }
  };

  const handleEdit = (bike) => {
    setForm({ ...bike, price: bike.price.toString(), engineCapacity: bike.engineCapacity.toString(), mileage: bike.mileage.toString() });
    setEditId(bike._id);
    setTab("bikes");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this bike?")) return;
    await api.delete(`/bikes/${id}`);
    fetchBikes();
  };

  const handleAccSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post("/accessories", accForm);
    setAccForm({ name: "", brand: "", category: "helmet", type: "accessory", price: "", description: "", imageUrl: "", inStock: true });
    fetchAccessories();
  } catch (err) {
    alert(err.response?.data?.message || "Error");
  }
};

  const inputCls = "w-full bg-brand-muted border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange text-sm";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display font-black text-5xl text-white mb-8">
        ADMIN <span className="text-brand-orange">DASHBOARD</span>
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-brand-border">
       {["bikes", "accessories", "inquiries"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 font-body text-sm capitalize transition-colors ${tab === t ? "border-b-2 border-brand-orange text-brand-orange" : "text-gray-400 hover:text-white"}`}>
            {t === "bikes" ? `🏍️ Bikes (${bikes.length})` : `📩 Inquiries (${inquiries.length})`}
          </button>
        ))}
      </div>

      {tab === "bikes" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-bold text-2xl text-white mb-5">
                {editId ? "EDIT BIKE" : "ADD BIKE"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input placeholder="Bike Name" className={inputCls} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <input placeholder="Brand" className={inputCls} value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required />
                <input placeholder="Price (₹)" type="number" className={inputCls} value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                <input placeholder="Engine CC" type="number" className={inputCls} value={form.engineCapacity} onChange={e => setForm({...form, engineCapacity: e.target.value})} required />
                <input placeholder="Mileage (kmpl)" type="number" className={inputCls} value={form.mileage} onChange={e => setForm({...form, mileage: e.target.value})} required />
                <input placeholder="Image URL" className={inputCls} value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                <textarea placeholder="Description" rows={3} className={`${inputCls} resize-none`} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <label className="flex items-center gap-2 text-gray-300 text-sm font-body cursor-pointer">
                  <input type="checkbox" checked={form.available} onChange={e => setForm({...form, available: e.target.checked})} className="accent-brand-orange" />
                  Available for sale
                </label>
                <div className="flex gap-2 pt-1">
                  <button type="submit" className="flex-1 bg-brand-orange text-white font-display font-bold py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
                    {editId ? "UPDATE" : "ADD BIKE"}
                  </button>
                  {editId && (
                    <button type="button" onClick={() => { setForm(emptyForm); setEditId(null); }}
                      className="px-4 border border-brand-border text-gray-400 hover:text-white rounded-lg transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Bike List */}
          <div className="lg:col-span-2 space-y-4">
            {bikes.map(bike => (
              <div key={bike._id} className="bg-brand-card border border-brand-border rounded-xl p-4 flex items-center gap-4">
                <img
                  src={bike.imageUrl || "https://placehold.co/80x60/1A1A1A/F97316?text=?"}
                  alt={bike.name}
                  className="w-20 h-16 rounded-lg object-cover border border-brand-border flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-brand-orange text-xs font-body uppercase tracking-wide">{bike.brand}</p>
                  <h3 className="font-display font-bold text-lg text-white">{bike.name}</h3>
                  <p className="text-gray-400 text-sm">₹{bike.price.toLocaleString()} · {bike.engineCapacity}cc · {bike.available ? "✅ Available" : "❌ Sold"}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(bike)} className="text-xs bg-brand-muted border border-brand-border text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(bike._id)} className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "inquiries" && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <p className="text-gray-500 font-body text-center py-16">No inquiries yet.</p>
          ) : inquiries.map(inq => (
            <div key={inq._id} className="bg-brand-card border border-brand-border rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{inq.name}</h3>
                  <p className="text-gray-400 text-sm font-body">{inq.email} {inq.phone && `· ${inq.phone}`}</p>
                  {inq.bike && <p className="text-brand-orange text-xs mt-1 font-body">Bike: {inq.bike.brand} {inq.bike.name}</p>}
                </div>
                <span className="text-gray-600 text-xs font-body">{new Date(inq.createdAt).toLocaleDateString()}</span>
              </div>
              {inq.message && <p className="text-gray-300 text-sm font-body mt-3 pt-3 border-t border-brand-border">{inq.message}</p>}
            </div>
          ))}
        </div>
      )}

      {tab === "accessories" && (
  <div className="grid lg:grid-cols-3 gap-8">
    <div className="lg:col-span-1">
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
        <h2 className="font-display font-bold text-2xl text-white mb-5">ADD ITEM</h2>
        <form onSubmit={handleAccSubmit} className="space-y-3">
          <input placeholder="Name" className={inputCls} value={accForm.name} onChange={e => setAccForm({...accForm, name: e.target.value})} required />
          <input placeholder="Brand" className={inputCls} value={accForm.brand} onChange={e => setAccForm({...accForm, brand: e.target.value})} />
          <select className={inputCls} value={accForm.type} onChange={e => setAccForm({...accForm, type: e.target.value})}>
            <option value="accessory">Accessory</option>
            <option value="gear">Riding Gear</option>
          </select>
          <select className={inputCls} value={accForm.category} onChange={e => setAccForm({...accForm, category: e.target.value})}>
            {["helmet","gloves","jacket","boots","knee-guard","mirror","other"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input placeholder="Price (₹)" type="number" className={inputCls} value={accForm.price} onChange={e => setAccForm({...accForm, price: e.target.value})} required />
          <input placeholder="Image URL" className={inputCls} value={accForm.imageUrl} onChange={e => setAccForm({...accForm, imageUrl: e.target.value})} />
          <textarea placeholder="Description" rows={2} className={`${inputCls} resize-none`} value={accForm.description} onChange={e => setAccForm({...accForm, description: e.target.value})} />
          <label className="flex items-center gap-2 text-gray-300 text-sm font-body cursor-pointer">
            <input type="checkbox" checked={accForm.inStock} onChange={e => setAccForm({...accForm, inStock: e.target.checked})} className="accent-brand-orange" />
            In Stock
          </label>
          <button type="submit" className="w-full bg-brand-orange text-white font-display font-bold py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
            ADD ITEM
          </button>
        </form>
      </div>
    </div>
    <div className="lg:col-span-2 space-y-3">
      {accessories.map(item => (
        <div key={item._id} className="bg-brand-card border border-brand-border rounded-xl p-4 flex items-center gap-4">
          <img src={item.imageUrl || "https://placehold.co/60x60/1A1A1A/F97316?text=?"} alt={item.name}
            className="w-14 h-14 rounded-lg object-cover border border-brand-border flex-shrink-0" />
          <div className="flex-1">
            <p className="text-brand-orange text-xs uppercase font-body">{item.type} · {item.category}</p>
            <h3 className="font-display font-bold text-white">{item.name}</h3>
            <p className="text-gray-400 text-sm">₹{item.price.toLocaleString()} · {item.inStock ? "✅" : "❌"}</p>
          </div>
          <button onClick={async () => { if(confirm("Delete?")) { await api.delete(`/accessories/${item._id}`); fetchAccessories(); }}}
            className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg">
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
}