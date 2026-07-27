import React, { useState } from "react";
import { ShoppingBag, Trash2, Plus, Minus, Tag, Check, ArrowRight } from "lucide-react";

export function InChatCartCard({ cart = [], onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (code === "AURA20") {
      const discountAmount = subtotal * 0.20;
      setAppliedDiscount(discountAmount);
      setDiscountMsg("🎉 20% VIP Promo Discount Applied!");
    } else if (code === "FREESHIP") {
      setAppliedDiscount(15);
      setDiscountMsg("🚚 $15 Free Express Shipping Applied!");
    } else {
      setAppliedDiscount(0);
      setDiscountMsg("⚠️ Invalid Coupon Code. Try AURA20 or FREESHIP!");
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  if (!cart || cart.length === 0) {
    return (
      <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md text-slate-900 text-xs space-y-2">
        <div className="flex items-center gap-2 text-purple-700 font-extrabold">
          <ShoppingBag className="w-4 h-4 text-purple-600" />
          <span>Your Shopping Cart is Empty</span>
        </div>
        <p className="text-slate-600 text-[11px]">
          Ask AI to recommend wireless headphones, smartwatches, or tech gear to start shopping!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md space-y-3 text-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs">
          <ShoppingBag className="w-4 h-4 text-purple-600" />
          <span>In-Chat Interactive Cart Manager</span>
        </div>
        <span className="font-extrabold text-xs text-slate-500">{cart.length} item(s)</span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0 bg-white"
              />
              <div className="min-w-0">
                <h5 className="font-bold text-slate-900 text-xs truncate max-w-[130px]">{item.name}</h5>
                <span className="font-black text-purple-700 text-[11px]">${item.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Quantity Controls & Remove */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="p-1 text-slate-600 hover:text-rose-600"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 font-bold text-xs text-slate-900">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="p-1 text-slate-600 hover:text-purple-600"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Application Form */}
      <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-purple-500" />
          <input
            type="text"
            placeholder="Promo Code (AURA20 / FREESHIP)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 outline-none uppercase font-bold"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
        >
          Apply
        </button>
      </form>

      {discountMsg && (
        <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{discountMsg}</span>
        </div>
      )}

      {/* Summary Totals */}
      <div className="space-y-1 text-xs pt-1 border-t border-slate-200 font-medium">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-emerald-700 font-bold">
            <span>Discount Applied:</span>
            <span>-${appliedDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-100">
          <span>Final Total:</span>
          <span className="text-purple-700">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Proceed to Checkout CTA */}
      <button
        onClick={onProceedToCheckout}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
      >
        <span>Proceed to In-Chat AI Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}
