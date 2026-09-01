import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count, setOpen } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-brand-card border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-2xl text-brand-orange tracking-widest">
          MOTO<span className="text-white">HUB</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-brand-orange font-body text-sm transition-colors">Home</Link>
          <Link to="/accessories" className="text-gray-300 hover:text-brand-orange font-body text-sm transition-colors">Accessories</Link>
          <Link to="/gear" className="text-gray-300 hover:text-brand-orange font-body text-sm transition-colors">Riding Gear</Link>
          {user?.role === "admin" && (
            <Link to="/dashboard" className="text-gray-300 hover:text-brand-orange font-body text-sm transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="relative text-gray-300 hover:text-brand-orange transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm font-body hidden md:block">
                {user.role === "admin" ? "🔧" : "👤"} {user.name}
              </span>
              <button onClick={() => { logout(); navigate("/"); }}
                className="border border-brand-border text-gray-300 hover:border-brand-orange px-4 py-1.5 rounded-lg text-sm font-body transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-brand-orange text-white px-5 py-1.5 rounded-lg text-sm font-body hover:bg-orange-600 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}