import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import BikeCard from "../components/BikeCard";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import BrandStrip from "../components/BrandStrip";

export default function Home() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bikes").then(({ data }) => setBikes(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-brand-orange font-body text-sm tracking-widest uppercase mb-4">Premium Selection · Est. 2018</p>
        <h1 className="font-display font-black text-7xl md:text-9xl text-white leading-none mb-6">
          FIND YOUR<br /><span className="text-brand-orange">RIDE</span>
        </h1>
        <p className="text-gray-400 font-body max-w-lg mx-auto mb-8">
          Browse our curated collection of premium motorcycles. Built for the road, designed for legends.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#bikes" className="bg-brand-orange text-white font-display font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors">
            BROWSE BIKES
          </a>
          <Link to="/gear" className="border border-brand-border text-gray-300 hover:border-brand-orange hover:text-white font-display font-bold px-8 py-3 rounded-xl transition-colors">
            RIDING GEAR
          </Link>
        </div>
      </div>

      {/* Brand Strip */}
      <BrandStrip />

      {/* Bikes Section */}
      <div id="bikes" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-orange font-body text-xs tracking-widest uppercase mb-2">Fresh Arrivals</p>
            <h2 className="font-display font-black text-5xl text-white">OUR BIKES</h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-body">Loading bikes...</div>
        ) : bikes.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-body">No bikes listed yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map(bike => <BikeCard key={bike._id} bike={bike} />)}
          </div>
        )}
      </div>

      {/* Accessories CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/accessories" className="bg-gradient-to-r from-brand-card to-brand-muted border border-brand-border rounded-2xl p-8 hover:border-brand-orange transition-colors group">
            <p className="text-brand-orange text-xs font-body tracking-widest uppercase mb-2">New Stock</p>
            <h3 className="font-display font-black text-4xl text-white mb-2 group-hover:text-brand-orange transition-colors">ACCESSORIES</h3>
            <p className="text-gray-400 font-body text-sm">Mirrors, grips, phone mounts and more →</p>
          </Link>
          <Link to="/gear" className="bg-gradient-to-r from-brand-muted to-brand-card border border-brand-border rounded-2xl p-8 hover:border-brand-orange transition-colors group">
            <p className="text-brand-orange text-xs font-body tracking-widest uppercase mb-2">Ride Safe</p>
            <h3 className="font-display font-black text-4xl text-white mb-2 group-hover:text-brand-orange transition-colors">RIDING GEAR</h3>
            <p className="text-gray-400 font-body text-sm">Helmets, jackets, boots & knee guards →</p>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}