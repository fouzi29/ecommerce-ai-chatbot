import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (appliedPromo?.code === "AURA20" && subtotal >= 100) {
    discountAmount = subtotal * 0.20;
  } else if (appliedPromo?.code === "FREESHIP") {
    discountAmount = 0; // free ship
  }

  const shippingFee = (subtotal > 50 || appliedPromo?.code === "FREESHIP") ? 0 : 9.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === "AURA20") {
      if (subtotal < 100) {
        setPromoError("Promo code AURA20 requires a subtotal of at least $100.");
        setAppliedPromo(null);
      } else {
        setAppliedPromo({ code: "AURA20", discountText: "20% OFF" });
        setPromoError("");
      }
    } else if (code === "FREESHIP") {
      setAppliedPromo({ code: "FREESHIP", discountText: "FREE EXPRESS SHIPPING" });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try AURA20 or FREESHIP!");
      setAppliedPromo(null);
    }
  };

  const handleCheckout = () => {
    setIsCheckedOut(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onClearCart();
      setIsCheckedOut(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col z-50 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-violet-400" />
            <h3 className="font-bold text-white text-base">Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isCheckedOut ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs mb-4">
              Thank you for shopping at AURA! Your order tracking details will be sent to your email.
            </p>
            <span className="text-violet-400 text-xs font-mono">Order #AU-{Math.floor(1000 + Math.random() * 9000)}</span>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-slate-700 mb-3" />
            <p className="text-slate-300 font-semibold text-sm mb-1">Your cart is empty</p>
            <p className="text-slate-500 text-xs max-w-xs mb-6">Explore our catalog or ask our AI assistant for top recommendations.</p>
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-950" />
                  
                  <div className="flex-1 min-width-0">
                    <h4 className="font-semibold text-slate-100 text-xs line-clamp-1">{item.name}</h4>
                    <span className="text-violet-400 font-bold text-xs">${item.price.toFixed(2)}</span>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Code & Summary Footer */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
              
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. AURA20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg pl-8 pr-3 py-2 text-xs text-white uppercase outline-none"
                  />
                </div>
                <button type="submit" className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg">
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2 rounded-lg">
                  <span>Applied: {appliedPromo.code} ({appliedPromo.discountText})</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-xs underline font-bold">Remove</button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-rose-400">{promoError}</p>
              )}

              {/* Total breakdown */}
              <div className="space-y-1.5 pt-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-slate-200 font-semibold">{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-violet-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 hover:opacity-95"
              >
                <span>Complete Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
