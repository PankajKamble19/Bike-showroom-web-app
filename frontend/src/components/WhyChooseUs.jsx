const stats = [
  { icon: "🏍️", value: "500+", label: "Bikes Sold" },
  { icon: "⭐", value: "4.9", label: "Average Rating" },
  { icon: "🔧", value: "Free", label: "First Service" },
  { icon: "📦", value: "2-Day", label: "Accessories Delivery" },
];

const features = [
  { icon: "🛡️", title: "Certified Bikes Only", desc: "Every bike is inspected and certified before listing." },
  { icon: "💳", title: "Easy EMI Options", desc: "Flexible financing with leading banks starting at 0% interest." },
  { icon: "🔄", title: "7-Day Return Policy", desc: "Not satisfied? Return within 7 days, no questions asked." },
  { icon: "📞", title: "Dedicated Support", desc: "Our experts are available 7 days a week for assistance." },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map(s => (
          <div key={s.label} className="bg-brand-card border border-brand-border rounded-2xl p-6 text-center hover:border-brand-orange transition-colors">
            <div className="text-3xl mb-2">{s.icon}</div>
            <p className="font-display font-black text-4xl text-brand-orange">{s.value}</p>
            <p className="text-gray-400 text-sm font-body mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:pr-12">
          <p className="text-brand-orange font-body text-sm tracking-widest uppercase mb-3">Why MotoHub?</p>
          <h2 className="font-display font-black text-5xl text-white leading-tight mb-6">
            THE MOST TRUSTED<br />BIKE SHOWROOM
          </h2>
          <p className="text-gray-400 font-body leading-relaxed">
            We've been serving riders since 2018. From your first commuter to your dream superbike, MotoHub is your one-stop destination for bikes, gear, and accessories.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {features.map(f => (
            <div key={f.title} className="flex gap-4 bg-brand-card border border-brand-border rounded-xl p-4 hover:border-brand-orange transition-colors">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-display font-bold text-lg text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm font-body">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}