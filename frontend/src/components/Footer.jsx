import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-brand-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display font-bold text-3xl text-brand-orange tracking-widest mb-3">
              MOTO<span className="text-white">HUB</span>
            </p>
            <p className="text-gray-400 font-body text-sm leading-relaxed mb-5">
              Your trusted destination for premium bikes, riding gear, and accessories since 2026.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { label: "Instagram", icon: "📸", url: "https://instagram.com" },
                { label: "Facebook",  icon: "👥", url: "https://facebook.com" },
                { label: "YouTube",   icon: "▶️", url: "https://youtube.com" },
                { label: "Twitter",   icon: "🐦", url: "https://twitter.com" },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                  title={s.label}
                  className="w-9 h-9 bg-brand-muted border border-brand-border rounded-lg flex items-center justify-center text-sm hover:border-brand-orange hover:bg-brand-orange/10 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["Accessories", "/accessories"],
                ["Riding Gear", "/gear"],
                ["Login", "/login"],
                ["Sign Up", "/signup"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-gray-400 hover:text-brand-orange font-body text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">CATEGORIES</h4>
            <ul className="space-y-2 text-gray-400 font-body text-sm">
              {["Sports Bikes", "Cruisers", "Commuters", "Helmets", "Jackets", "Riding Boots"].map(c => (
                <li key={c} className="hover:text-brand-orange cursor-default transition-colors">{c}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">CONTACT US</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex gap-3 text-gray-400">
                <span className="flex-shrink-0">📍</span>
                <span>123 MotoHub Lane, Kolhapur, Maharashtra 416416</span>
              </li>
              <li className="flex gap-3 text-gray-400">
                <span>📞</span>
                <a href="tel:+919421540126" className="hover:text-brand-orange transition-colors">+91 94215 40126</a>
              </li>
              <li className="flex gap-3 text-gray-400">
                <span>✉️</span>
                <a href="mailto:hello@motohub.in" className="hover:text-brand-orange transition-colors">hello@motohub.in</a>
              </li>
              <li className="flex gap-3 text-gray-400">
                <span>🕐</span>
                <span>Mon–Sat: 9AM – 7PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs font-body">© 2026 MotoHub. All rights reserved.</p>
          <p className="text-gray-600 text-xs font-body">Made with ❤️ for riders, by riders.</p>
        </div>
      </div>
    </footer>
  );
}