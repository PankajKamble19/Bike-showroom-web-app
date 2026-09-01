import { useState, useEffect } from "react";
import api from "../api/axios";

const staticTestimonials = [
  { _id: "1", name: "Rahul Sharma", bike: "Royal Enfield Classic 350", rating: 5, review: "Best bike buying experience! The team was super helpful and the delivery was smooth. MotoHub is my go-to from now on." },
  { _id: "2", name: "Priya Patel", bike: "Honda CB300R", rating: 5, review: "Got my gear and bike from here. The riding jacket quality is amazing. Highly recommend the accessories section too!" },
  { _id: "3", name: "Arjun Mehta", bike: "KTM Duke 390", rating: 4, review: "Great collection of bikes. The staff helped me compare options. Very transparent pricing with no hidden charges." },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= count ? "text-brand-orange" : "text-gray-700"}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(staticTestimonials);

  useEffect(() => {
    api.get("/testimonials")
      .then(({ data }) => { if (data.length > 0) setReviews(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-brand-orange font-body text-sm tracking-widest uppercase mb-3">What Riders Say</p>
        <h2 className="font-display font-black text-5xl text-white">CUSTOMER REVIEWS</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={r._id} className="bg-brand-card border border-brand-border rounded-2xl p-6 hover:border-brand-orange transition-colors relative">
            <div className="absolute top-4 right-6 text-6xl text-brand-orange/10 font-display font-black">"</div>
            <Stars count={r.rating} />
            <p className="text-gray-300 font-body text-sm leading-relaxed mt-4 mb-6">"{r.review}"</p>
            <div className="flex items-center gap-3 border-t border-brand-border pt-4">
              <div className="w-9 h-9 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange font-display font-bold text-sm">
                {r.name[0]}
              </div>
              <div>
                <p className="text-white font-body font-medium text-sm">{r.name}</p>
                {r.bike && <p className="text-gray-500 text-xs font-body">{r.bike}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}