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
    <section id="catalog" className="scroll-mt-20 my-10">
      
      {/* Category Pills & Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl font-black tracking-tight"
            style={{ color: "#0f172a", opacity: 1 }}
          >
            Featured Gear Catalog
          </h2>
          <p
            className="text-xs sm:text-sm font-semibold"
            style={{ color: "#475569", opacity: 1 }}
          >
            High-performance tech curated for modern lifestyles
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={
                  isActive
                    ? { backgroundColor: "#7c3aed", color: "#ffffff", border: "1px solid #6d28d9" }
                    : { backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #1e293b" }
                }
                className="px-4 py-2 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap shadow-md cursor-pointer"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="font-extrabold text-sm" style={{ color: "#0f172a" }}>No products found matching your search filter.</p>
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
