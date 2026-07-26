import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { ProductGrid } from "./components/ProductGrid";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { ApiSettingsModal } from "./components/ApiSettingsModal";
import { ChatWidget } from "./components/Chatbot/ChatWidget";
import { PRODUCTS } from "./data/products";
import { DEFAULT_SYSTEM_PROMPT } from "./data/defaultPrompts";

export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Shopping Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("aura_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true); // Open by default for demo visibility!

  // API Settings state (saved in localStorage)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("aura_ai_settings");
    return saved ? JSON.parse(saved) : {
      provider: "demo",
      openAiKey: "",
      geminiKey: "",
      openAiModel: "gpt-4o-mini",
      geminiModel: "gemini-1.5-flash",
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
      temperature: 0.7
    };
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("aura_cart", JSON.stringify(cart));
  }, [cart]);

  // Save Settings to LocalStorage
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("aura_ai_settings", JSON.stringify(newSettings));
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Ask AI about product trigger
  const handleAskAiAboutProduct = (product) => {
    setIsChatOpen(true);
  };

  // Search filter
  const displayedProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        currentProvider={settings.provider}
      />

      {/* Main Content */}
      <main className="main-content">
        
        {/* Hero Promo Banner */}
        <HeroBanner onOpenChat={() => setIsChatOpen(true)} />

        {/* Product Showcase */}
        <ProductGrid
          products={displayedProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setSelectedProduct(product)}
          onAskAi={handleAskAiAboutProduct}
        />

      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAskAi={handleAskAiAboutProduct}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* API Settings Modal */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Floating AI Chatbot Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggleOpen={() => setIsChatOpen(!isChatOpen)}
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        products={PRODUCTS}
        cart={cart}
        onAddToCart={handleAddToCart}
        onQuickView={(product) => setSelectedProduct(product)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <p>© 2026 AURA AI Store. Built with React, OpenAI API, and Google Gemini API.</p>
        <p className="mt-1 text-slate-600">Created for Client Portfolio & Fiverr Demonstration</p>
      </footer>

    </div>
  );
}
export default App;
