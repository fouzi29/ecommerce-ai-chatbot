import React, { useState } from "react";
import { ShoppingBag, Truck, Send, Check, Sparkles } from "lucide-react";
import { placeAiDirectOrder } from "../../services/orderService";

export function AiCheckoutFormCard({ itemToOrder, onOrderPlaced }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = itemToOrder || { id: "prod-1", name: "Aura Pro Wireless ANC Headphones", price: 249.99 };
  const totalAmount = product.price * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !shippingAddress) return;

    const newOrder = placeAiDirectOrder({
      customerName,
      customerEmail,
      customerPhone: customerPhone || "N/A",
      shippingAddress,
      items: [{ id: product.id, name: product.name, price: product.price, quantity }],
      totalAmount
    });

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
  };

  return (
    <div className="mt-3 p-4 bg-slate-900/95 border border-purple-500/40 rounded-xl shadow-xl space-y-3">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-purple-400 font-extrabold text-xs">
          <ShoppingBag className="w-4 h-4 text-purple-400" />
          <span>AI Instant Order Checkout Form</span>
        </div>
        <span className="font-bold text-cyan-400 text-xs">${totalAmount.toFixed(2)}</span>
      </div>

      <p className="text-[11px] text-slate-300 leading-normal">
        Selected: <strong className="text-white">{product.name}</strong> (${product.price.toFixed(2)})
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Full Name *"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            required
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
          />
        </div>

        <div>
          <textarea
            rows={2}
            placeholder="Complete Shipping Address (Street, City, State, ZIP) *"
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Qty:</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white outline-none"
            >
              {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Confirm & Place Order</span>
          </button>
        </div>
      </form>

    </div>
  );
}
