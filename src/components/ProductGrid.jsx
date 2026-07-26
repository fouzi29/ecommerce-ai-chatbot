import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  activeCategory,
  setActiveCategory,
  onAddToCart,
  onQuickView,
  onAskAi
}) {
  const categories = ["All", "Audio", "Tech", "Wearables", "Smart Home"];

  const filteredProducts = products.filter(product => {
    if (activeCategory === "All") return true;
    return product.category === activeCategory;
  });

  return (
    <section id="catalog" className="scroll-mt-20">
      
      {/* Category Pills & Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Featured Gear Catalog</h2>
          <p className="text-purple-200 text-xs sm:text-sm font-medium">High-performance tech curated for modern lifestyles</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30"
                  : "bg-indigo-950/80 border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-indigo-950/60 rounded-2xl border border-purple-500/30">
          <p className="text-purple-200 font-bold text-sm">No products found matching your search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onAskAi={onAskAi}
            />
          ))}
        </div>
      )}

    </section>
  );
}
