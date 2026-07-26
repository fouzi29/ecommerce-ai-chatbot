import React from "react";
import { Star, ShoppingCart, Bot, Eye } from "lucide-react";

export function ProductCard({ product, onAddToCart, onQuickView, onAskAi }) {
  return (
    <div className="group relative bg-gradient-to-b from-indigo-950/90 to-purple-950/80 border border-purple-500/30 hover:border-cyan-400/60 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/25 flex flex-col">
      
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-indigo-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-600/90 text-white font-black text-[10px] uppercase tracking-wider backdrop-blur-md shadow-lg border border-purple-400/30">
            {product.badge}
          </span>
        )}

        {/* Quick View Hover Actions */}
        <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[4px]">
          <button
            onClick={() => onQuickView(product)}
            className="p-3.5 rounded-full bg-indigo-900 text-white hover:bg-purple-600 transition-all transform hover:scale-110 shadow-xl border border-purple-400/30"
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
          <div className="flex items-center justify-between text-xs text-purple-200 mb-1.5 font-bold">
            <span className="text-cyan-300">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{product.rating}</span>
              <span className="text-purple-300">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-white text-base line-clamp-1 hover:text-cyan-300 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-purple-200 text-xs line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-4 pt-4 border-t border-purple-500/20 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-purple-300 line-through ml-2">
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
