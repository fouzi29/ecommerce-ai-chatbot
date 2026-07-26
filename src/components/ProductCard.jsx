import React from "react";
import { Star, ShoppingCart, Bot, Eye } from "lucide-react";

export function ProductCard({ product, onAddToCart, onQuickView, onAskAi }) {
  return (
    <div className="group relative bg-slate-900/90 border border-purple-500/25 hover:border-cyan-400/60 rounded-2xl overflow-hidden shadow-xl shadow-slate-950/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col backdrop-blur-xl">
      
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
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-600/90 text-white font-black text-[10px] uppercase tracking-wider shadow-lg backdrop-blur-md border border-purple-400/30">
            {product.badge}
          </span>
        )}

        {/* Quick View Hover Actions */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[4px]">
          <button
            onClick={() => onQuickView(product)}
            className="p-3.5 rounded-full bg-slate-800 text-white hover:bg-purple-600 transition-all transform hover:scale-110 shadow-xl border border-slate-700"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onAskAi(product)}
            className="p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white transition-all transform hover:scale-110 shadow-xl"
            title="Ask AI Chatbot about this item"
          >
            <Bot className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-cyan-400">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-white text-base line-clamp-1 hover:text-cyan-300 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-slate-300 text-xs line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-white border border-purple-400/40 font-bold text-xs transition-all shadow-md"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}
