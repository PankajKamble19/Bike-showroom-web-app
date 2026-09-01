import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function BikeDetails() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);

  useEffect(() => {
    api.get(`/bikes/${id}`).then(({ data }) => setBike(data)).catch(console.error);
  }, [id]);

  if (!bike) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={bike.imageUrl || "https://placehold.co/600x400/1A1A1A/F97316?text=No+Image"}
            alt={bike.name}
            className="w-full rounded-2xl border border-brand-border object-cover"
          />
        </div>
        <div>
          <p className="text-brand-orange font-body text-sm tracking-widest uppercase mb-2">{bike.brand}</p>
          <h1 className="font-display font-black text-5xl text-white mb-4">{bike.name}</h1>
          <p className="font-display font-bold text-4xl text-brand-orange mb-6">₹{bike.price.toLocaleString()}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              ["Engine", `${bike.engineCapacity} cc`],
              ["Mileage", `${bike.mileage} kmpl`],
              ["Status", bike.available ? "Available" : "Sold Out"],
            ].map(([label, val]) => (
              <div key={label} className="bg-brand-card border border-brand-border rounded-xl p-4">
                <p className="text-gray-500 text-xs font-body mb-1">{label}</p>
                <p className="text-white font-medium font-body">{val}</p>
              </div>
            ))}
          </div>

          {bike.description && (
            <p className="text-gray-400 font-body leading-relaxed mb-8">{bike.description}</p>
          )}

          <Link
            to={`/inquiry/${bike._id}`}
            className="block w-full bg-brand-orange text-white text-center font-display font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition-colors"
          >
            BOOK / INQUIRE NOW
          </Link>
        </div>
      </div>
    </div>
  );
}