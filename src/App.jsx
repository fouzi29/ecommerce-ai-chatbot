import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ClientGuideBanner } from "./components/ClientGuideBanner";
import { HeroBanner } from "./components/HeroBanner";
import { FeaturesComparisonSection } from "./components/FeaturesComparisonSection";
import { ProductGrid } from "./components/ProductGrid";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/Chatbot/ChatWidget";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { ApiSettingsModal } from "./components/ApiSettingsModal";
import { AdminDashboardModal } from "./components/AdminDashboardModal";
import { UserGuideModal } from "./components/UserGuideModal";

import { PRODUCTS as DEFAULT_PRODUCTS } from "./data/products";
import { DEFAULT_SYSTEM_PROMPT } from "./data/defaultPrompts";
import { fetchLiveProducts } from "./services/databaseService";

const DEFAULT_SETTINGS = {
  provider: "demo",
  openAiKey: "",
  geminiKey: "",
  openAiModel: "gpt-4o-mini",
  geminiModel: "gemini-1.5-flash",
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  temperature: 0.7,
  showAdminControls: true,
  dbMode: "demo",
  clientPhone: "+8801795657378"
};

export function App() {
  // Modal states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamic Catalog State
  const [productsList, setProductsList] = useState(DEFAULT_PRODUCTS);

  // Cart with Safe Try/Catch Parser
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("aura_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to parse cart from localStorage:", e);
      return [];
    }
  });

  // Saved AI & System Settings with Safe Try/Catch Parser
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("aura_ai_settings");
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to parse settings from localStorage:", e);
    }
    return DEFAULT_SETTINGS;
  });

  // Handle Multi-Tenant Embedded URL Attributes (Allows 100+ Multiple Clients on 1 Vercel App!)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("embed") === "true") {
        const whatsappKey = urlParams.get("whatsappKey");
        const clientPhone = urlParams.get("clientPhone");
        const productsApi = urlParams.get("productsApi");
        const ordersApi = urlParams.get("ordersApi");
        const openAiKey = urlParams.get("openAiKey");
        const geminiKey = urlParams.get("geminiKey");
        const provider = urlParams.get("provider");

        setSettings(prev => ({
          ...prev,
          ...(provider && { provider }),
          ...(whatsappKey && { callMeBotApiKey: whatsappKey }),
          ...(clientPhone && { clientPhone }),
          ...(productsApi && { customApiUrl: productsApi, dbMode: "custom_api" }),
          ...(ordersApi && { customOrderWebhookUrl: ordersApi }),
          ...(openAiKey && { openAiKey }),
          ...(geminiKey && { geminiKey })
        }));
      }
    } catch (e) {}
  }, []);

  // Automatically Pop Up User Guide for First Time Visitors!
  useEffect(() => {
    try {
      const hasSeenGuide = localStorage.getItem("aura_has_seen_guide");
      if (!hasSeenGuide) {
        setIsGuideOpen(true);
        localStorage.setItem("aura_has_seen_guide", "true");
      }
    } catch (e) {
      console.warn("LocalStorage access warning:", e);
    }
  }, []);

  // Fetch Live Products whenever DB Settings Change!
  useEffect(() => {
    let isMounted = true;
    fetchLiveProducts(settings).then((liveItems) => {
      if (isMounted && liveItems && liveItems.length > 0) {
        setProductsList(liveItems);
      }
    }).catch(err => {
      console.warn("Fetch live products warning:", err);
    });
    return () => { isMounted = false; };
  }, [settings]);

  // Sync Settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aura_ai_settings", JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aura_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Handle URL Admin Query Parameter (e.g. ?admin=true)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("admin") === "true") {
        setIsAdminOpen(true);
      }
    } catch (e) {}
  }, []);

  // Cart actions
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAskAiAboutProduct = (product) => {
    setSelectedProduct(null);
    setIsChatOpen(true);
  };

  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      (product.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Top Sticky Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        currentProvider={settings.provider}
        showSettingsButton={settings.showAdminControls}
      />

      {/* Main Page Layout */}
      <main className="main-content">
        
        {/* Client User Guide Banner */}
        <ClientGuideBanner
          onOpenChat={() => setIsChatOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Hero Section */}
        <HeroBanner onOpenChat={() => setIsChatOpen(true)} />

        {/* Features Graphical Comparison Matrix Section */}
        <FeaturesComparisonSection />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setSelectedProduct(product)}
          onAskAi={handleAskAiAboutProduct}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* AI Floating Chatbot Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggleOpen={() => setIsChatOpen(!isChatOpen)}
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        products={productsList}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onQuickView={(product) => setSelectedProduct(product)}
        showSettingsButton={settings.showAdminControls}
      />

      {/* Product Quick View Modal */}
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
        onOpenChat={() => {
          setIsCartOpen(false);
          setIsChatOpen(true);
        }}
      />

      {/* SaaS AI & Multi-Channel Settings Modal */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => setSettings(newSettings)}
      />

      {/* Admin Orders & Leads Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Interactive Client User Guide Modal */}
      <UserGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
    </div>
  );
}

export default App;
