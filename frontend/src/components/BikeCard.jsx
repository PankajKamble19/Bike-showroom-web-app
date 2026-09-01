import { Link } from "react-router-dom";

export default function BikeCard({ bike }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-orange transition-colors group">
      <div className="relative overflow-hidden h-48">
        <img
          src={bike.imageUrl || "https://placehold.co/600x400/1A1A1A/F97316?text=No+Image"}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 right-3 text-xs font-body font-medium px-2 py-1 rounded-full ${
          bike.available ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
        }`}>
          {bike.available ? "Available" : "Sold Out"}
        </span>
      </div>

      <div className="p-5">
        <p className="text-brand-orange text-xs font-body font-medium tracking-widest uppercase mb-1">{bike.brand}</p>
        <h3 className="font-display font-bold text-xl text-white mb-3">{bike.name}</h3>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-brand-muted rounded-lg px-3 py-2">
            <p className="text-gray-500 text-xs">Engine</p>
            <p className="text-white text-sm font-medium">{bike.engineCapacity} cc</p>
          </div>
          <div className="bg-brand-muted rounded-lg px-3 py-2">
            <p className="text-gray-500 text-xs">Mileage</p>
            <p className="text-white text-sm font-medium">{bike.mileage} kmpl</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-display font-bold text-2xl text-brand-orange">
            ₹{bike.price.toLocaleString()}
          </p>
          <Link
            to={`/bikes/${bike._id}`}
            className="bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-body hover:bg-orange-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}