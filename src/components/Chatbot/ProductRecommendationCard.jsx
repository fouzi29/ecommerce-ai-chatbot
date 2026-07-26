import React from "react";
import { ShoppingCart, Eye } from "lucide-react";

export function ProductRecommendationCard({ product, onAddToCart, onQuickView }) {
  if (!product) return null;

  return (
    <div className="chat-product-card group hover:border-violet-500/50 transition-all">
      <img
        src={product.image}
        alt={product.name}
        className="chat-product-img"
      />
      <div className="chat-product-details">
        <h4 className="chat-product-title" title={product.name}>{product.name}</h4>
        <div className="chat-product-price">${product.price.toFixed(2)}</div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onAddToCart(product)}
            className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[10px] flex items-center gap-1 transition-all"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[10px] flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
