import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, open, setOpen } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-md bg-brand-card border-l border-brand-border h-full flex flex-col">
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl text-white">YOUR CART</h2>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 font-body text-center mt-16">Your cart is empty</p>
          ) : cart.map(item => (
            <div key={item._id} className="flex gap-4 bg-brand-muted rounded-xl p-4 border border-brand-border">
              <img
                src={item.imageUrl || "https://placehold.co/80x80/1A1A1A/F97316?text=?"}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-white font-body font-medium text-sm">{item.name}</p>
                <p className="text-brand-orange font-display font-bold">₹{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item._id, item.qty - 1)}
                    className="w-6 h-6 rounded bg-brand-border text-white text-sm hover:bg-brand-orange transition-colors">−</button>
                  <span className="text-white text-sm font-body w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}
                    className="w-6 h-6 rounded bg-brand-border text-white text-sm hover:bg-brand-orange transition-colors">+</button>
                  <button onClick={() => removeFromCart(item._id)}
                    className="ml-auto text-red-400 hover:text-red-300 text-xs font-body">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-brand-border">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400 font-body">Total</span>
              <span className="text-brand-orange font-display font-bold text-2xl">₹{total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-brand-orange text-white font-display font-bold text-lg py-3 rounded-xl hover:bg-orange-600 transition-colors">
              PLACE ORDER
            </button>
            <p className="text-gray-500 text-xs font-body text-center mt-2">Cash on delivery available</p>
          </div>
        )}
      </div>
    </div>
  );
}