import { useState, useEffect } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const gearIcons = { jacket: "🧥", boots: "👢", "knee-guard": "🦺", gloves: "🧤", helmet: "⛑️", other: "🛡️" };

export default function RidingGear() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("all");
  const { addToCart } = useCart();

  const categories = ["all", "jacket", "boots", "knee-guard", "helmet", "gloves"];

  useEffect(() => {
    api.get("/accessories?type=gear").then(({ data }) => setItems(data)).catch(console.error);
  }, []);

  const filtered = active === "all" ? items : items.filter(i => i.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-brand-card to-brand-muted border border-brand-border rounded-3xl p-10 mb-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 text-9xl flex items-center justify-center">🏍️</div>
        <p className="text-brand-orange font-body text-sm tracking-widest uppercase mb-3">Ride Safe. Ride Loud.</p>
        <h1 className="font-display font-black text-6xl text-white mb-4">RIDING GEAR</h1>
        <p className="text-gray-400 font-body max-w-md">Premium protective gear for every rider. Don't hit the road without the right armor.</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-body capitalize transition-colors border ${
              active === cat
                ? "bg-brand-orange text-white border-brand-orange"
                : "border-brand-border text-gray-400 hover:border-brand-orange hover:text-white"
            }`}>
            {gearIcons[cat] || "🛡️"} {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 font-body text-center py-20">No riding gear listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item._id} className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-orange transition-all group hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-52 overflow-hidden relative">
                <img
                  src={item.imageUrl || `https://placehold.co/400x300/1A1A1A/F97316?text=${gearIcons[item.category]}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-body px-2 py-1 rounded-full capitalize">
                  {gearIcons[item.category]} {item.category}
                </div>
              </div>
              <div className="p-5">
                {item.brand && <p className="text-brand-orange text-xs font-body tracking-widest uppercase mb-1">{item.brand}</p>}
                <h3 className="font-display font-bold text-xl text-white mb-2">{item.name}</h3>
                {item.description && <p className="text-gray-500 text-sm font-body mb-3 line-clamp-2">{item.description}</p>}
                <div className="flex items-center justify-between">
                  <p className="font-display font-bold text-2xl text-brand-orange">₹{item.price.toLocaleString()}</p>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                      item.inStock
                        ? "bg-brand-orange text-white hover:bg-orange-600"
                        : "bg-brand-muted text-gray-600 cursor-not-allowed"
                    }`}>
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}