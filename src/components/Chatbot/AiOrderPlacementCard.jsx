import React from "react";
import { Check, ShoppingBag, Truck, MessageCircle, ExternalLink } from "lucide-react";
import { generateWhatsAppLink } from "../../services/notificationService";

export function AiOrderPlacementCard({ order }) {
  if (!order) return null;

  const savedSettings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");
  const clientPhone = savedSettings.clientPhone || "+15550192831";

  const orderMessage = `🛍️ NEW AI ORDER (#${order.id})\nCustomer: ${order.customerName} (${order.customerEmail})\nTotal: $${order.totalAmount?.toFixed(2)}\nAddress: ${order.shippingAddress}`;
  const whatsappUrl = generateWhatsAppLink(clientPhone, orderMessage);

  return (
    <div className="mt-3 p-4 bg-slate-900/95 border border-emerald-500/40 rounded-xl shadow-lg space-y-3">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
          <Check className="w-4 h-4 bg-emerald-500/20 rounded-full p-0.5" />
          <span>AI Order Placed & Saved to DB!</span>
        </div>
        <span className="font-mono text-[10px] text-purple-400 font-bold">{order.id}</span>
      </div>

      <div className="space-y-1 text-[11px] text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-400">Customer:</span>
          <span className="font-semibold text-white">{order.customerName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Items:</span>
          <span className="font-semibold text-white">
            {order.items?.map(i => i.name).join(", ") || "Aura Pro Headphones"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Total Amount:</span>
          <span className="font-bold text-emerald-400">${order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>

      {/* Instant 1-Click WhatsApp Alert Button */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>📲 Click to Send WhatsApp Alert ({clientPhone})</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Truck className="w-3 h-3 text-cyan-400" /> Express 2-Day Delivery
        </span>
        <span>Saved to Admin DB</span>
      </div>

    </div>
  );
}
