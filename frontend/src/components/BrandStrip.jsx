const brands = [
  { name: "Honda", emoji: "🔴" },
  { name: "Yamaha", emoji: "🔵" },
  { name: "KTM", emoji: "🟠" },
  { name: "Royal Enfield", emoji: "⚫" },
  { name: "Bajaj", emoji: "🟡" },
  { name: "TVS", emoji: "🟢" },
  { name: "Kawasaki", emoji: "🟢" },
  { name: "Suzuki", emoji: "🔵" },
];

export default function BrandStrip() {
  return (
    <section className="border-y border-brand-border bg-brand-card py-8">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 text-xs font-body tracking-widest uppercase mb-6">Authorized Dealer For</p>
        <div className="flex flex-wrap justify-center gap-6">
          {brands.map(b => (
            <div key={b.name} className="flex items-center gap-2 bg-brand-muted border border-brand-border px-5 py-2.5 rounded-full hover:border-brand-orange transition-colors cursor-default">
              <span>{b.emoji}</span>
              <span className="text-gray-300 font-body text-sm font-medium">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}