import React from "react";
import { ShoppingCart, Eye } from "lucide-react";

export function ProductRecommendationCard({ product, onAddToCart, onQuickView }) {
  if (!product) return null;

  return (
    <div className="p-3 bg-white border border-purple-200 hover:border-purple-400 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-3 text-slate-900">
      
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-100"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-extrabold text-slate-900 text-xs truncate" title={product.name}>
          {product.name}
        </h4>
        <div className="font-black text-purple-700 text-xs mt-0.5">
          ${product.price.toFixed(2)}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onAddToCart(product)}
            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm transition-all"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center gap-1 border border-slate-200"
          >
            <Eye className="w-3 h-3 text-slate-600" />
            <span>View</span>
          </button>
        </div>
      </div>

    </div>
  );
}
