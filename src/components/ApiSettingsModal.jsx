import React, { useState } from "react";
import { X, Key, Cpu, Database, RefreshCw, Check, Sparkles, Server, ShoppingBag, Layers, MessageSquare, Bell, Send, SendHorizontal, MessageCircle } from "lucide-react";
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

  // Multi-Channel Notifications State (WhatsApp, Telegram, Discord, SMS/Webhook)
  const [clientPhone, setClientPhone] = useState(settings.clientPhone || "+15550192831");
  const [telegramBotToken, setTelegramBotToken] = useState(settings.telegramBotToken || "");
  const [telegramChatId, setTelegramChatId] = useState(settings.telegramChatId || "");
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState(settings.discordWebhookUrl || "");
  const [customWebhookUrl, setCustomWebhookUrl] = useState(settings.customWebhookUrl || "");

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
      // Multi-Channel Notifications
      clientPhone,
      telegramBotToken,
      telegramChatId,
      discordWebhookUrl,
      customWebhookUrl
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
    setTelegramBotToken("");
    setTelegramChatId("");
    setDiscordWebhookUrl("");
    setCustomWebhookUrl("");
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
              <h3 className="font-bold text-white text-lg">SaaS Client Multi-Channel Control</h3>
              <p className="text-slate-400 text-xs">Configure AI, DB Sync & Instant Alerts (WhatsApp, Telegram, Discord, SMS)</p>
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
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
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
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
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
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === "notifications"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts & Webhooks</span>
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
                      provider === "demo" ? "bg-purple-600/20 border-purple-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
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
                      provider === "openai" ? "bg-emerald-600/20 border-emerald-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
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
                      provider === "gemini" ? "bg-cyan-600/20 border-cyan-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"
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
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">OpenAI API Key (sk-...)</label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Model</label>
                    <select
                      value={openAiModel}
                      onChange={(e) => setOpenAiModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    >
                      <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                      <option value="gpt-4o">gpt-4o (High Intelligence)</option>
                    </select>
                  </div>
                </div>
              )}

              {provider === "gemini" && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Google Gemini API Key (AIza...)</label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Model</label>
                    <select
                      value={geminiModel}
                      onChange={(e) => setGeminiModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    >
                      <option value="gemini-1.5-flash">gemini-1.5-flash (Ultra-Fast)</option>
                      <option value="gemini-2.0-flash">gemini-2.0-flash (Experimental)</option>
                    </select>
                  </div>
                </div>
              )}
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
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI-CHANNEL ALERTS (WhatsApp, Telegram, Discord, SMS) */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              
              {/* WhatsApp Config */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/30 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>1. WhatsApp 1-Click Instant Alerts</span>
                </h4>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Store Owner WhatsApp Number (with Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Telegram Bot Config */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-cyan-500/30 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <SendHorizontal className="w-4 h-4" />
                  <span>2. Telegram Bot Instant Channel Alerts</span>
                </h4>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Telegram Bot Token (bot...)</label>
                  <input
                    type="password"
                    placeholder="bot123456789:ABCdefGhIJK..."
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Telegram Chat ID / Channel ID</label>
                  <input
                    type="text"
                    placeholder="-100123456789 or @mychannel"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Discord Webhook Config */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-500/30 space-y-3">
                <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <Bell className="w-4 h-4" />
                  <span>3. Discord Channel Webhook Integration</span>
                </h4>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Discord Webhook URL</label>
                  <input
                    type="url"
                    placeholder="https://discord.com/api/webhooks/123456/abcdef..."
                    value={discordWebhookUrl}
                    onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Custom REST Webhook */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-500/30 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Server className="w-4 h-4" />
                  <span>4. Custom REST Webhook / SMS Gateway</span>
                </h4>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Generic Webhook Endpoint URL</label>
                  <input
                    type="url"
                    placeholder="https://yourserver.com/api/webhooks/notifications"
                    value={customWebhookUrl}
                    onChange={(e) => setCustomWebhookUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
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
                  <span>Config Saved!</span>
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
