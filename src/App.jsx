import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { ClientGuideBanner } from "./components/ClientGuideBanner";
import { ProductGrid } from "./components/ProductGrid";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { ApiSettingsModal } from "./components/ApiSettingsModal";
import { ChatWidget } from "./components/Chatbot/ChatWidget";
import { PRODUCTS } from "./data/products";
import { DEFAULT_SYSTEM_PROMPT } from "./data/defaultPrompts";
import { fetchLiveProducts } from "./services/databaseService";

export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [liveProducts, setLiveProducts] = useState(PRODUCTS);
  
  // Shopping Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("aura_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const isAdminMode = urlParams.get("admin") === "true" || urlParams.get("settings") === "1";

  // API Settings state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("aura_ai_settings");
    if (saved) return JSON.parse(saved);

    const envOpenAiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
    const envGeminiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

    let defaultProvider = "demo";
    if (envOpenAiKey) defaultProvider = "openai";
    else if (envGeminiKey) defaultProvider = "gemini";

    return {
      provider: defaultProvider,
      openAiKey: envOpenAiKey,
      geminiKey: envGeminiKey,
      openAiModel: "gpt-4o-mini",
      geminiModel: "gemini-1.5-flash",
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
      temperature: 0.7,
      showAdminControls: true,
      dbMode: "demo"
    };
  });

  // Sync Products from Database / Platform when settings change
  useEffect(() => {
    fetchLiveProducts(settings).then(prods => {
      if (prods && prods.length > 0) {
        setLiveProducts(prods);
      }
    });
  }, [settings]);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("aura_cart", JSON.stringify(cart));
  }, [cart]);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("aura_ai_settings", JSON.stringify(newSettings));
  };

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

  const handleAskAiAboutProduct = (product) => {
    setIsChatOpen(true);
  };

  const displayedProducts = liveProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
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
        showSettingsButton={settings.showAdminControls || isAdminMode}
      />

      {/* Main Content */}
      <main className="main-content">
        
        {/* Interactive Client User Guide Banner */}
        <ClientGuideBanner
          onOpenChat={() => setIsChatOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Hero Promo Banner */}
        <HeroBanner onOpenChat={() => setIsChatOpen(true)} />

        {/* Catalog */}
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
        products={liveProducts}
        cart={cart}
        onAddToCart={handleAddToCart}
        onQuickView={(product) => setSelectedProduct(product)}
        showSettingsButton={settings.showAdminControls || isAdminMode}
      />

      {/* Footer with Creator Attribution */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 text-center text-xs text-slate-400">
        <p className="font-semibold text-slate-200">
          AURA E-Commerce AI Chatbot Web App
        </p>
        <p className="mt-1 text-purple-400 font-bold">
          Designed & Developed by Fouzi
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          Powered by OpenAI (GPT-4o) • Google Gemini (2.0 Flash) • Shopify • WooCommerce • Supabase Sync
        </p>
      </footer>

    </div>
  );
}
export default App;
