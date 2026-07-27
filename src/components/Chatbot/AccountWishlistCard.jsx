import React from "react";
import { Heart, Gift, ShoppingBag, ArrowRight } from "lucide-react";

export function AccountWishlistCard({ onReorderItem }) {
  const wishlistItems = [
    { id: "prod-1", name: "Aura Pro Wireless ANC Headphones", price: 249.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
    { id: "prod-3", name: "Nexus Ultra Smartwatch Gen 5", price: 199.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" }
  ];

  const rewardPoints = 1250;
  const storeCreditDollars = (rewardPoints / 100).toFixed(2);

  return (
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md space-y-3 text-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Account, Wishlist & Loyalty Portal</span>
        </div>
        <span className="font-extrabold text-[11px] text-purple-700">VIP Member</span>
      </div>

      {/* AURA Loyalty Rewards Banner */}
      <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-amber-300 animate-bounce" />
          <div>
            <div className="font-extrabold text-xs">AURA Loyalty Points</div>
            <div className="text-[10px] text-purple-200">{rewardPoints} Points ($${storeCreditDollars} Store Credit)</div>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-amber-400 text-slate-900 font-black text-[10px] rounded-lg uppercase">
          Gold VIP
        </span>
      </div>

      {/* Wishlist Items List */}
      <div>
        <h5 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center justify-between">
          <span>Saved Wishlist Gear ({wishlistItems.length})</span>
        </h5>
        <div className="space-y-1.5">
          {wishlistItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded-lg shrink-0 bg-white" />
                <span className="font-bold text-slate-900 truncate max-w-[140px]">{item.name}</span>
              </div>
              <button
                onClick={() => onReorderItem && onReorderItem(item)}
                className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-lg flex items-center gap-1 shadow-sm"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Buy</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
