import React, { useState } from "react";
import { X, Key, Cpu, Database, RefreshCw, Check, Sparkles, Server, ShoppingBag, Layers, Bell, Smartphone, SendHorizontal, MessageCircle, Link2 } from "lucide-react";
import { DEFAULT_SYSTEM_PROMPT } from "../data/defaultPrompts";

export function ApiSettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) {
  const [activeTab, setActiveTab] = useState("ai"); // "ai", "database", "notifications"

  // AI State
  const [provider, setProvider] = useState(settings.provider || "demo");
  const [openAiKey, setOpenAiKey] = useState(settings.openAiKey || "");
  const [geminiKey, setGeminiKey] = useState(settings.geminiKey || "");
  const [openAiModel, setOpenAiModel] = useState(settings.openAiModel || "gpt-4o-mini");
  const [geminiModel, setGeminiModel] = useState(settings.geminiModel || "gemini-1.5-flash");
  const [systemPrompt, setSystemPrompt] = useState(settings.systemPrompt || DEFAULT_SYSTEM_PROMPT);
  const [temperature, setTemperature] = useState(settings.temperature || 0.7);

  // Database Integration State & Webhooks (Custom REST API, Shopify, WooCommerce, Supabase)
  const [dbMode, setDbMode] = useState(settings.dbMode || "demo");
  const [customApiUrl, setCustomApiUrl] = useState(settings.customApiUrl || "");
  const [customOrderWebhookUrl, setCustomOrderWebhookUrl] = useState(settings.customOrderWebhookUrl || "");
  const [customLeadWebhookUrl, setCustomLeadWebhookUrl] = useState(settings.customLeadWebhookUrl || "");
  const [customApiToken, setCustomApiToken] = useState(settings.customApiToken || "");

  const [shopifyDomain, setShopifyDomain] = useState(settings.shopifyDomain || "");
  const [shopifyAccessToken, setShopifyAccessToken] = useState(settings.shopifyAccessToken || "");
  const [wooUrl, setWooUrl] = useState(settings.wooUrl || "");
  const [wooConsumerKey, setWooConsumerKey] = useState(settings.wooConsumerKey || "");
  const [wooConsumerSecret, setWooConsumerSecret] = useState(settings.wooConsumerSecret || "");
  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl || "");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(settings.supabaseAnonKey || "");

  // Automated WhatsApp, Telegram & Discord State
  const [clientPhone, setClientPhone] = useState(settings.clientPhone || "+8801795657378");
  const [whatsappGatewayProvider, setWhatsappGatewayProvider] = useState(settings.whatsappGatewayProvider || "callmebot");
  const [callMeBotApiKey, setCallMeBotApiKey] = useState(settings.callMeBotApiKey || "");
  const [ultraMsgInstanceId, setUltraMsgInstanceId] = useState(settings.ultraMsgInstanceId || "");
  const [ultraMsgToken, setUltraMsgToken] = useState(settings.ultraMsgToken || "");
  const [telegramBotToken, setTelegramBotToken] = useState(settings.telegramBotToken || "");
  const [telegramChatId, setTelegramChatId] = useState(settings.telegramChatId || "");
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState(settings.discordWebhookUrl || "");

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({
      provider,
      openAiKey,
      geminiKey,
      openAiModel,
      geminiModel,
      systemPrompt,
      temperature,
      showAdminControls: settings.showAdminControls !== undefined ? settings.showAdminControls : true,
      // DB & API Webhooks
      dbMode,
      customApiUrl,
      customOrderWebhookUrl,
      customLeadWebhookUrl,
      customApiToken,
      shopifyDomain,
      shopifyAccessToken,
      wooUrl,
      wooConsumerKey,
      wooConsumerSecret,
      supabaseUrl,
      supabaseAnonKey,
      // Automated WhatsApp, Telegram & Discord
      clientPhone,
      whatsappGatewayProvider,
      callMeBotApiKey,
      ultraMsgInstanceId,
      ultraMsgToken,
      telegramBotToken,
      telegramChatId,
      discordWebhookUrl
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setProvider("demo");
    setOpenAiKey("");
    setGeminiKey("");
    setOpenAiModel("gpt-4o-mini");
    setGeminiModel("gemini-1.5-flash");
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    setTemperature(0.7);
    setDbMode("demo");
    setCustomApiUrl("");
    setCustomOrderWebhookUrl("");
    setCustomLeadWebhookUrl("");
    setCustomApiToken("");
    setShopifyDomain("");
    setShopifyAccessToken("");
    setWooUrl("");
    setWooConsumerKey("");
    setWooConsumerSecret("");
    setSupabaseUrl("");
    setSupabaseAnonKey("");
    setClientPhone("+8801795657378");
    setWhatsappGatewayProvider("callmebot");
    setCallMeBotApiKey("");
    setUltraMsgInstanceId("");
    setUltraMsgToken("");
    setTelegramBotToken("");
    setTelegramChatId("");
    setDiscordWebhookUrl("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-white border border-purple-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg tracking-tight">SaaS Client Control Panel</h3>
              <p className="text-slate-600 text-xs font-semibold">Configure AI Engines, 5 Database Connectors & Notification Gateways</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "ai"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("database")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "database"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>DB & Sync</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "notifications"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alerts & SMS</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 max-h-[58vh] overflow-y-auto pr-1 text-xs">
          
          {/* TAB 1: AI CONFIGURATION */}
          {activeTab === "ai" && (
            <>
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  Select AI Engine Provider
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider("demo")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      provider === "demo" ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs">Smart Demo</span>
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-[10px] text-slate-600 block leading-tight font-medium">Zero-cost testing</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider("openai")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      provider === "openai" ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs">OpenAI API</span>
                      <Key className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-slate-600 block leading-tight font-medium">GPT-4o & GPT-4o-mini</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider("gemini")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      provider === "gemini" ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs">Google Gemini</span>
                      <Key className="w-4 h-4 text-cyan-600" />
                    </div>
                    <span className="text-[10px] text-slate-600 block leading-tight font-medium">Gemini 2.0 & 1.5 Flash</span>
                  </button>
                </div>
              </div>

              {provider === "openai" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">OpenAI API Key (sk-...)</label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Model Selection</label>
                    <select
                      value={openAiModel}
                      onChange={(e) => setOpenAiModel(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-bold"
                    >
                      <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                      <option value="gpt-4o">gpt-4o (High Intelligence)</option>
                    </select>
                  </div>
                </div>
              )}

              {provider === "gemini" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Google Gemini API Key (AIza...)</label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Model Selection</label>
                    <select
                      value={geminiModel}
                      onChange={(e) => setGeminiModel(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-bold"
                    >
                      <option value="gemini-1.5-flash">gemini-1.5-flash (Ultra-Fast)</option>
                      <option value="gemini-2.0-flash">gemini-2.0-flash (Experimental)</option>
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: DATABASE & PLATFORM CONNECTORS */}
          {activeTab === "database" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  Select Product Catalog & Database Sync Source (5 Connectors)
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
                  <button
                    type="button"
                    onClick={() => setDbMode("demo")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      dbMode === "demo" ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-purple-600 mb-1" />
                    <span className="font-extrabold text-xs block">Default Catalog</span>
                    <span className="text-[10px] text-slate-500">Sample items</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("custom_api")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      dbMode === "custom_api" ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <Server className="w-4 h-4 text-cyan-600 mb-1" />
                    <span className="font-extrabold text-xs block">Custom REST API</span>
                    <span className="text-[10px] text-slate-500">MySQL/Node/PHP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("shopify")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      dbMode === "shopify" ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-600 mb-1" />
                    <span className="font-extrabold text-xs block">Shopify Store</span>
                    <span className="text-[10px] text-slate-500">Storefront API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("woocommerce")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      dbMode === "woocommerce" ? "bg-indigo-50 border-indigo-500 text-indigo-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-indigo-600 mb-1" />
                    <span className="font-extrabold text-xs block">WooCommerce</span>
                    <span className="text-[10px] text-slate-500">WordPress REST API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("supabase")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      dbMode === "supabase" ? "bg-teal-50 border-teal-500 text-teal-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <Database className="w-4 h-4 text-teal-600 mb-1" />
                    <span className="font-extrabold text-xs block">Supabase</span>
                    <span className="text-[10px] text-slate-500">PostgreSQL DB</span>
                  </button>
                </div>
              </div>

              {/* Custom REST API Endpoint Configuration */}
              {dbMode === "custom_api" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-extrabold text-cyan-700 flex items-center gap-1.5">
                    <Server className="w-4 h-4" />
                    <span>Custom Backend Endpoint Setup (PHP / Laravel / Node)</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Products API Endpoint URL (GET)</label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/products"
                      value={customApiUrl}
                      onChange={(e) => setCustomApiUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Order Placed Webhook Endpoint (POST)</label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/orders"
                      value={customOrderWebhookUrl}
                      onChange={(e) => setCustomOrderWebhookUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Lead Captured Webhook Endpoint (POST)</label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/leads"
                      value={customLeadWebhookUrl}
                      onChange={(e) => setCustomLeadWebhookUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">API Authorization Bearer Key</label>
                    <input
                      type="password"
                      placeholder="bearer_token_..."
                      value={customApiToken}
                      onChange={(e) => setCustomApiToken(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Shopify Configuration */}
              {dbMode === "shopify" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shopify Storefront API Integration</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Shopify Store Domain</label>
                    <input
                      type="text"
                      placeholder="your-store.myshopify.com"
                      value={shopifyDomain}
                      onChange={(e) => setShopifyDomain(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Storefront Access Token</label>
                    <input
                      type="password"
                      placeholder="shpat_..."
                      value={shopifyAccessToken}
                      onChange={(e) => setShopifyAccessToken(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* WooCommerce Configuration */}
              {dbMode === "woocommerce" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-extrabold text-indigo-700 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    <span>WooCommerce REST API Integration</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">WordPress Store URL</label>
                    <input
                      type="url"
                      placeholder="https://mywordpressstore.com"
                      value={wooUrl}
                      onChange={(e) => setWooUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Consumer Key (ck_...)</label>
                    <input
                      type="text"
                      placeholder="ck_123456789..."
                      value={wooConsumerKey}
                      onChange={(e) => setWooConsumerKey(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Consumer Secret (cs_...)</label>
                    <input
                      type="password"
                      placeholder="cs_123456789..."
                      value={wooConsumerSecret}
                      onChange={(e) => setWooConsumerSecret(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Supabase Configuration */}
              {dbMode === "supabase" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-extrabold text-teal-700 flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    <span>Supabase PostgreSQL Integration</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Supabase Project URL</label>
                    <input
                      type="url"
                      placeholder="https://xyzcompany.supabase.co"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Supabase Anon Key</label>
                    <input
                      type="password"
                      placeholder="eyJh..."
                      value={supabaseAnonKey}
                      onChange={(e) => setSupabaseAnonKey(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AUTOMATED NOTIFICATIONS (WHATSAPP, TELEGRAM, DISCORD) */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              
              {/* WhatsApp Gateway Setup */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Automated WhatsApp Gateway Setup</span>
                </h4>
                
                <div>
                  <label className="block text-[11px] text-slate-700 font-bold mb-1">Admin Phone Number (with Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+8801795657378"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-700 font-bold mb-1">CallMeBot Free WhatsApp API Key</label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={callMeBotApiKey}
                    onChange={(e) => setCallMeBotApiKey(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Telegram Bot Setup */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-extrabold text-cyan-700 flex items-center gap-1.5">
                  <SendHorizontal className="w-4 h-4 text-cyan-600" />
                  <span>Telegram Bot Instant Alerts</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Telegram Bot Token</label>
                    <input
                      type="password"
                      placeholder="123456:ABC-DEF..."
                      value={telegramBotToken}
                      onChange={(e) => setTelegramBotToken(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-700 font-bold mb-1">Telegram Chat ID</label>
                    <input
                      type="text"
                      placeholder="-100123456"
                      value={telegramChatId}
                      onChange={(e) => setTelegramChatId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Discord Webhook Setup */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-extrabold text-indigo-700 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-indigo-600" />
                  <span>Discord Webhook Instant Alerts</span>
                </h4>
                
                <div>
                  <label className="block text-[11px] text-slate-700 font-bold mb-1">Discord Webhook URL</label>
                  <input
                    type="url"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={discordWebhookUrl}
                    onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 transition-all"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>SaaS Config Saved!</span>
                </>
              ) : (
                <span>Save SaaS Config</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
