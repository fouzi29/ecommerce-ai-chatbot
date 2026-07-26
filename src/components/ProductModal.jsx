import React from "react";
import { X, Star, ShoppingCart, Bot, CheckCircle2 } from "lucide-react";

export function ProductModal({ product, onClose, onAddToCart, onAskAi }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">{product.category}</span>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">{product.description}</p>

            <div className="mb-4">
              <span className="text-3xl font-extrabold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through ml-3">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Key Features List */}
            {product.features && (
              <div className="mb-6 space-y-1.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highlights:</p>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  onAskAi(product);
                  onClose();
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-violet-300 border border-violet-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                title="Ask AI Assistant about specs"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
