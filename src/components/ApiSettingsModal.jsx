import React, { useState } from "react";
import { X, Key, Cpu, Database, RefreshCw, Check, Sparkles, Server, ShoppingBag, Layers, MessageSquare, Phone, Bell, Send } from "lucide-react";
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

  // Database Integration State
  const [dbMode, setDbMode] = useState(settings.dbMode || "demo");
  const [customApiUrl, setCustomApiUrl] = useState(settings.customApiUrl || "");
  const [customApiToken, setCustomApiToken] = useState(settings.customApiToken || "");
  const [shopifyDomain, setShopifyDomain] = useState(settings.shopifyDomain || "");
  const [shopifyAccessToken, setShopifyAccessToken] = useState(settings.shopifyAccessToken || "");
  const [wooUrl, setWooUrl] = useState(settings.wooUrl || "");
  const [wooConsumerKey, setWooConsumerKey] = useState(settings.wooConsumerKey || "");
  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl || "");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(settings.supabaseAnonKey || "");

  // WhatsApp & SMS Notification State
  const [clientPhone, setClientPhone] = useState(settings.clientPhone || "+15550192831");
  const [enableWhatsapp, setEnableWhatsapp] = useState(settings.enableWhatsapp !== undefined ? settings.enableWhatsapp : true);
  const [whatsappWebhook, setWhatsappWebhook] = useState(settings.whatsappWebhook || "");
  const [twilioSid, setTwilioSid] = useState(settings.twilioSid || "");

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
      // DB
      dbMode,
      customApiUrl,
      customApiToken,
      shopifyDomain,
      shopifyAccessToken,
      wooUrl,
      wooConsumerKey,
      supabaseUrl,
      supabaseAnonKey,
      // Notifications
      clientPhone,
      enableWhatsapp,
      whatsappWebhook,
      twilioSid
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
    setCustomApiToken("");
    setShopifyDomain("");
    setShopifyAccessToken("");
    setWooUrl("");
    setWooConsumerKey("");
    setSupabaseUrl("");
    setSupabaseAnonKey("");
    setClientPhone("+15550192831");
    setEnableWhatsapp(true);
    setWhatsappWebhook("");
    setTwilioSid("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-slate-950 border border-purple-500/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">SaaS Client Control Panel</h3>
              <p className="text-slate-400 text-xs">Configure AI Engines, DB Sync & Instant WhatsApp Alerts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 mb-6 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "ai"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Provider</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("database")}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "database"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>DB Sync</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "notifications"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>WhatsApp / SMS</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 max-h-[58vh] overflow-y-auto pr-1">
          
          {/* TAB 1: AI CONFIGURATION */}
          {activeTab === "ai" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select AI Engine Provider
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider("demo")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      provider === "demo"
                        ? "bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-600/20"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Smart Demo</span>
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 block leading-tight">Zero API key needed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider("openai")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      provider === "openai"
                        ? "bg-emerald-600/20 border-emerald-500 text-white shadow-md shadow-emerald-600/20"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">OpenAI API</span>
                      <Key className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 block leading-tight">GPT-4o & GPT-4o-mini</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider("gemini")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      provider === "gemini"
                        ? "bg-cyan-600/20 border-cyan-500 text-white shadow-md shadow-cyan-600/20"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Google Gemini</span>
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 block leading-tight">Gemini 2.0 & 1.5 Flash</span>
                  </button>
                </div>
              </div>

              {provider === "openai" && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">OpenAI API Key (sk-...)</label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model</label>
                    <select
                      value={openAiModel}
                      onChange={(e) => setOpenAiModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    >
                      <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                      <option value="gpt-4o">gpt-4o (High Intelligence)</option>
                      <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    </select>
                  </div>
                </div>
              )}

              {provider === "gemini" && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Gemini API Key (AIza...)</label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model</label>
                    <select
                      value={geminiModel}
                      onChange={(e) => setGeminiModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    >
                      <option value="gemini-1.5-flash">gemini-1.5-flash (Ultra-Fast)</option>
                      <option value="gemini-2.0-flash">gemini-2.0-flash (Experimental)</option>
                      <option value="gemini-1.5-pro">gemini-1.5-pro (Reasoning)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Custom E-Commerce System Prompt
                </label>
                <textarea
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none leading-relaxed"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Creativity Temperature</span>
                  <span className="text-purple-400 font-mono">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-purple-600 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </>
          )}

          {/* TAB 2: DATABASE INTEGRATION */}
          {activeTab === "database" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Product & Order Data Source
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDbMode("demo")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "demo" ? "bg-purple-600/20 border-purple-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-purple-400 mb-1" />
                    <span className="font-bold text-xs block">Default Catalog</span>
                    <span className="text-[10px] text-slate-400">Sample store items</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("custom_api")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "custom_api" ? "bg-cyan-600/20 border-cyan-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Server className="w-4 h-4 text-cyan-400 mb-1" />
                    <span className="font-bold text-xs block">Custom REST API</span>
                    <span className="text-[10px] text-slate-400">MySQL/Node/PHP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("shopify")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "shopify" ? "bg-emerald-600/20 border-emerald-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="font-bold text-xs block">Shopify Store</span>
                    <span className="text-[10px] text-slate-400">Storefront API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("woocommerce")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "woocommerce" ? "bg-amber-600/20 border-amber-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400 mb-1" />
                    <span className="font-bold text-xs block">WooCommerce</span>
                    <span className="text-[10px] text-slate-400">WP REST API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("supabase")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "supabase" ? "bg-indigo-600/20 border-indigo-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Database className="w-4 h-4 text-indigo-400 mb-1" />
                    <span className="font-bold text-xs block">Supabase DB</span>
                    <span className="text-[10px] text-slate-400">PostgreSQL</span>
                  </button>
                </div>
              </div>

              {dbMode === "custom_api" && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" />
                    <span>Custom Backend API Connection</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Products API Endpoint URL</label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/products"
                      value={customApiUrl}
                      onChange={(e) => setCustomApiUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {dbMode === "shopify" && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shopify Storefront Connection</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Shopify Store Domain</label>
                    <input
                      type="text"
                      placeholder="your-shop.myshopify.com"
                      value={shopifyDomain}
                      onChange={(e) => setShopifyDomain(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WHATSAPP & SMS INSTANT NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/30 space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp & SMS Client Alerts</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Whenever an order is placed via AI or a new customer lead is captured, receive instant alerts directly to your phone or WhatsApp!
                </p>

                <div>
                  <label className="block text-[11px] font-bold text-slate-200 mb-1">
                    Store Owner WhatsApp / Phone Number (with Country Code)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Example: +15550192831 or +447700900077</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-200 mb-1">
                    Custom WhatsApp Webhook URL (UltraMsg / Twilio / GreenAPI / CallMeBot)
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.ultramsg.com/instance/messages/chat"
                    value={whatsappWebhook}
                    onChange={(e) => setWhatsappWebhook(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enableWhatsapp"
                    checked={enableWhatsapp}
                    onChange={(e) => setEnableWhatsapp(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="enableWhatsapp" className="text-xs font-semibold text-slate-200 cursor-pointer">
                    Enable 1-Click WhatsApp Instant Chat Alerts
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
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
