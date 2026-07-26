import React from "react";
import { Check, ShoppingBag, Truck, MapPin } from "lucide-react";

export function AiOrderPlacementCard({ order }) {
  if (!order) return null;

  return (
    <div className="mt-3 p-4 bg-slate-900/90 border border-emerald-500/40 rounded-xl shadow-lg space-y-2">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
          <Check className="w-4 h-4 bg-emerald-500/20 rounded-full p-0.5" />
          <span>AI Direct Order Placed & Saved to Database!</span>
        </div>
        <span className="font-mono text-[10px] text-purple-400 font-bold">{order.id}</span>
      </div>

      <div className="space-y-1 text-[11px] text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-400">Customer:</span>
          <span className="font-semibold text-white">{order.customerName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Items Ordered:</span>
          <span className="font-semibold text-white">
            {order.items?.map(i => i.name).join(", ") || "Aura Pro Headphones"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Total Amount:</span>
          <span className="font-bold text-emerald-400">${order.totalAmount?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Status:</span>
          <span className="font-bold text-purple-400">{order.status}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Truck className="w-3 h-3 text-cyan-400" /> Express 2-Day Delivery
        </span>
        <span>Saved to Admin DB</span>
      </div>

    </div>
  );
}
