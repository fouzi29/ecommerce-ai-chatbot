import React, { useState } from "react";
import { ShoppingBag, Send, AlertCircle } from "lucide-react";
import { placeAiDirectOrder } from "../../services/orderService";
import { generateWhatsAppLink } from "../../services/notificationService";

export function AiCheckoutFormCard({ itemToOrder, onOrderPlaced }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const product = itemToOrder || { id: "prod-1", name: "Aura Pro Wireless ANC Headphones", price: 249.99 };
  const totalAmount = product.price * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return;
    }

    if (!shippingAddress.trim()) {
      setErrorMessage("Please enter your Shipping Address.");
      return;
    }

    // Dynamic Requirement: At least Email OR Phone MUST be provided!
    if (!customerEmail.trim() && !customerPhone.trim()) {
      setErrorMessage("Please enter either an Email Address OR a Phone Number.");
      return;
    }

    const newOrder = placeAiDirectOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim() || "N/A",
      customerPhone: customerPhone.trim() || "N/A",
      shippingAddress: shippingAddress.trim(),
      items: [{ id: product.id, name: product.name, price: product.price, quantity }],
      totalAmount
    });

    // Get active WhatsApp settings & auto-open WhatsApp link!
    const savedSettings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");
    const clientPhone = savedSettings.clientPhone || "+8801755690467";
    const orderMessage = `🛍️ NEW AI ORDER (#${newOrder.id})\nCustomer: ${newOrder.customerName}\nPhone/Email: ${newOrder.customerPhone || newOrder.customerEmail}\nTotal: $${newOrder.totalAmount?.toFixed(2)}\nAddress: ${newOrder.shippingAddress}`;
    const whatsappUrl = generateWhatsAppLink(clientPhone, orderMessage);

    // Auto-open WhatsApp in new tab!
    if (whatsappUrl) {
      try {
        window.open(whatsappUrl, "_blank");
      } catch (err) {
        console.warn("Auto WhatsApp pop-up blocked:", err);
      }
    }

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
  };

  return (
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md text-slate-900 space-y-3">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs">
          <ShoppingBag className="w-4 h-4 text-purple-600" />
          <span>AI Direct Order Checkout Form</span>
        </div>
        <span className="font-black text-cyan-700 text-xs">${totalAmount.toFixed(2)}</span>
      </div>

      <p className="text-[11px] text-slate-600 leading-normal font-medium">
        Selected: <strong className="text-slate-900">{product.name}</strong> (${product.price.toFixed(2)})
      </p>

      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] flex items-center gap-1.5 font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Full Name *"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="email"
            placeholder="Email Address *"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
          />
        </div>

        <div>
          <textarea
            rows={2}
            placeholder="Complete Shipping Address (Street, City, State, ZIP) *"
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Qty:</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 outline-none font-bold"
            >
              {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Confirm & Auto-Send WhatsApp</span>
          </button>
        </div>
      </form>

    </div>
  );
}
