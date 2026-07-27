import React from "react";
import { Check, ShoppingCart, Sparkles, Scale } from "lucide-react";

export function ProductComparisonCard({ items, onAddToCart }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md space-y-3 text-slate-900">
      
      {/* Card Header */}
      <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs border-b border-slate-200 pb-2">
        <Scale className="w-4 h-4 text-purple-600" />
        <span>AI Side-by-Side Product Comparison</span>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {items.map((product, idx) => (
          <div
            key={product.id || idx}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover rounded-lg border border-slate-200 bg-white"
              />
              <h5 className="font-extrabold text-slate-900 text-xs line-clamp-1" title={product.name}>
                {product.name}
              </h5>
              <div className="font-black text-purple-700 text-sm">
                ${product.price.toFixed(2)}
              </div>

              {/* Specs & Features List */}
              <div className="space-y-1 pt-1 text-[11px] text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500 font-medium">Category:</span>
                  <span className="font-bold text-slate-900">{product.category}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500 font-medium">Rating:</span>
                  <span className="font-bold text-amber-600">★ 4.9 / 5</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500 font-medium">Stock Status:</span>
                  <span className="font-bold text-emerald-600">In Stock (Express)</span>
                </div>
                <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed pt-0.5">
                  {product.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2 mt-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add {product.name.split(' ')[0]} to Cart</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
