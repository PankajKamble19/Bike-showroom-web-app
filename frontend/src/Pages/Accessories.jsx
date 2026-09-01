import { useState, useEffect } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Accessories() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("all");
  const { addToCart } = useCart();

  const categories = ["all", "helmet", "gloves", "mirror", "other"];

  useEffect(() => {
    api.get("/accessories?type=accessory").then(({ data }) => setItems(data)).catch(console.error);
  }, []);

  const filtered = active === "all" ? items : items.filter(i => i.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-brand-orange font-body text-sm tracking-widest uppercase mb-2">Genuine Parts & Add-ons</p>
        <h1 className="font-display font-black text-6xl text-white">ACCESSORIES</h1>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-body capitalize transition-colors border ${
              active === cat
                ? "bg-brand-orange text-white border-brand-orange"
                : "border-brand-border text-gray-400 hover:border-brand-orange hover:text-white"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 font-body text-center py-20">No accessories listed yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(item => (
            <div key={item._id} className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-orange transition-colors group">
              <div className="h-40 overflow-hidden">
                <img
                  src={item.imageUrl || "https://placehold.co/300x200/1A1A1A/F97316?text=🔧"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-500 font-body capitalize bg-brand-muted px-2 py-0.5 rounded-full">{item.category}</span>
                <h3 className="font-display font-bold text-lg text-white mt-2 mb-1">{item.name}</h3>
                {item.brand && <p className="text-gray-500 text-xs font-body mb-2">{item.brand}</p>}
                <p className="text-brand-orange font-display font-bold text-xl mb-3">₹{item.price.toLocaleString()}</p>
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock}
                  className={`w-full py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                    item.inStock
                      ? "bg-brand-orange text-white hover:bg-orange-600"
                      : "bg-brand-muted text-gray-600 cursor-not-allowed"
                  }`}>
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}