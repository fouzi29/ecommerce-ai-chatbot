import React from "react";
import { Star, ShoppingCart, Bot, Eye } from "lucide-react";

export function ProductCard({ product, onAddToCart, onQuickView, onAskAi }) {
  return (
    <div className="group relative bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 flex flex-direction flex-col">
      
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-violet-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-md shadow-md">
            {product.badge}
          </span>
        )}

        {/* Quick View Hover Actions */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 rounded-full bg-slate-900/90 text-slate-100 hover:bg-violet-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onAskAi(product)}
            className="p-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white transition-all transform hover:scale-110 shadow-lg"
            title="Ask AI Chatbot about this item"
          >
            <Bot className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-violet-400">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-100 text-base line-clamp-1 hover:text-violet-300 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-slate-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 font-semibold text-xs transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}
