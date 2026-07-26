import React from "react";
import { Check, Truck, MessageCircle, ExternalLink } from "lucide-react";
import { generateWhatsAppLink } from "../../services/notificationService";

export function AiOrderPlacementCard({ order }) {
  if (!order) return null;

  const savedSettings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");
  const clientPhone = savedSettings.clientPhone || "+8801755690467";

  const orderMessage = `🛍️ NEW AI ORDER (#${order.id})\nCustomer: ${order.customerName}\nPhone/Email: ${order.customerPhone || order.customerEmail}\nTotal: $${order.totalAmount?.toFixed(2)}\nAddress: ${order.shippingAddress}`;
  const whatsappUrl = generateWhatsAppLink(clientPhone, orderMessage);

  return (
    <div className="mt-3 p-4 bg-white border border-emerald-300 rounded-2xl shadow-md space-y-3 text-slate-900">
      
      <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
        <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs">
          <Check className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full p-0.5" />
          <span>AI Order Placed & Saved to DB!</span>
        </div>
        <span className="font-mono text-xs text-purple-700 font-extrabold">{order.id}</span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-800 font-medium">
        <div className="flex justify-between">
          <span className="text-slate-500 font-normal">Customer:</span>
          <span className="font-extrabold text-slate-900">{order.customerName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 font-normal">Items:</span>
          <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">
            {order.items?.map(i => i.name).join(", ") || "Aura Pro Headphones"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 font-normal">Total Amount:</span>
          <span className="font-black text-emerald-700">${order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>

      {/* Instant 1-Click WhatsApp Alert Button */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>📲 Send WhatsApp Alert ({clientPhone})</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 text-cyan-600" /> Express 2-Day Delivery
        </span>
        <span className="text-purple-700 font-bold">Saved to Admin DB</span>
      </div>

    </div>
  );
}
