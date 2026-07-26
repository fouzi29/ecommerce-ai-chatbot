import React, { useState } from "react";
import { X, Key, Cpu, Database, RefreshCw, Check, Sparkles, Server, ShoppingBag, Layers, MessageSquare, Bell, SendHorizontal, MessageCircle, Smartphone } from "lucide-react";
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

  // Automated WhatsApp & SMS Notification Gateway State
  const [clientPhone, setClientPhone] = useState(settings.clientPhone || "+8801755690467");
  const [whatsappGatewayProvider, setWhatsappGatewayProvider] = useState(settings.whatsappGatewayProvider || "callmebot"); // "callmebot", "ultramsg", "twilio"
  const [callMeBotApiKey, setCallMeBotApiKey] = useState(settings.callMeBotApiKey || "");
  const [ultraMsgInstanceId, setUltraMsgInstanceId] = useState(settings.ultraMsgInstanceId || "");
  const [ultraMsgToken, setUltraMsgToken] = useState(settings.ultraMsgToken || "");
  const [twilioSid, setTwilioSid] = useState(settings.twilioSid || "");
  const [twilioAuthToken, setTwilioAuthToken] = useState(settings.twilioAuthToken || "");
  const [twilioFromPhone, setTwilioFromPhone] = useState(settings.twilioFromPhone || "");
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
      // Automated WhatsApp & SMS
      clientPhone,
      whatsappGatewayProvider,
      callMeBotApiKey,
      ultraMsgInstanceId,
      ultraMsgToken,
      twilioSid,
      twilioAuthToken,
      twilioFromPhone,
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
    setClientPhone("+8801755690467");
    setWhatsappGatewayProvider("callmebot");
    setCallMeBotApiKey("");
    setUltraMsgInstanceId("");
    setUltraMsgToken("");
    setTwilioSid("");
    setTwilioAuthToken("");
    setTwilioFromPhone("");
    setTelegramBotToken("");
    setTelegramChatId("");
    setDiscordWebhookUrl("");
    setCustomWebhookUrl("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-indigo-950/95 border border-purple-500/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">SaaS Client Control Panel</h3>
              <p className="text-slate-300 text-xs">Configure AI Engines, 5 DB Sync Options & Automated WhatsApp Gateway</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 mb-6 bg-slate-900/90 p-1.5 rounded-xl border border-purple-500/30 shadow-inner">
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
            <span>AI Engine</span>
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
            <span>Auto WhatsApp/SMS</span>
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
                      provider === "demo" ? "bg-purple-600/30 border-purple-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Smart Demo</span>
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[10px] text-slate-300 block leading-tight">Zero API key needed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider("openai")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      provider === "openai" ? "bg-emerald-600/30 border-emerald-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">OpenAI API</span>
                      <Key className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-slate-300 block leading-tight">GPT-4o & GPT-4o-mini</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider("gemini")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      provider === "gemini" ? "bg-cyan-600/30 border-cyan-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Google Gemini</span>
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] text-slate-300 block leading-tight">Gemini 2.0 & 1.5 Flash</span>
                  </button>
                </div>
              </div>

              {provider === "openai" && (
                <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">OpenAI API Key (sk-...)</label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Model</label>
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
                <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Google Gemini API Key (AIza...)</label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Model</label>
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
                  Select Product & Order Data Source (5 Connectors)
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDbMode("demo")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "demo" ? "bg-purple-600/30 border-purple-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-purple-400 mb-1" />
                    <span className="font-bold text-xs block">Default Catalog</span>
                    <span className="text-[10px] text-slate-300">Built-in sample items</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("custom_api")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "custom_api" ? "bg-cyan-600/30 border-cyan-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Server className="w-4 h-4 text-cyan-400 mb-1" />
                    <span className="font-bold text-xs block">Custom REST API</span>
                    <span className="text-[10px] text-slate-300">MySQL/Node/PHP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("shopify")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "shopify" ? "bg-emerald-600/30 border-emerald-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="font-bold text-xs block">Shopify Store</span>
                    <span className="text-[10px] text-slate-300">Storefront API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("woocommerce")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "woocommerce" ? "bg-amber-600/30 border-amber-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400 mb-1" />
                    <span className="font-bold text-xs block">WooCommerce</span>
                    <span className="text-[10px] text-slate-300">WP REST API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbMode("supabase")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dbMode === "supabase" ? "bg-indigo-600/30 border-indigo-400 text-white" : "bg-slate-900/80 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Database className="w-4 h-4 text-indigo-400 mb-1" />
                    <span className="font-bold text-xs block">Supabase DB</span>
                    <span className="text-[10px] text-slate-300">PostgreSQL</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTOMATED WHATSAPP & SMS DISPATCHER */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              
              {/* Store Owner Phone */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>Admin WhatsApp / Phone Number</span>
                </h4>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Store Owner WhatsApp Number (with Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+8801755690467"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Automatic WhatsApp Gateway Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-3">
                <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>Automated Background WhatsApp Gateway</span>
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWhatsappGatewayProvider("callmebot")}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      whatsappGatewayProvider === "callmebot" ? "bg-emerald-600/30 border-emerald-400 text-white" : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    <span className="font-bold block">CallMeBot</span>
                    <span className="text-[9px] text-slate-300">Free WhatsApp API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWhatsappGatewayProvider("ultramsg")}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      whatsappGatewayProvider === "ultramsg" ? "bg-purple-600/30 border-purple-400 text-white" : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    <span className="font-bold block">UltraMsg</span>
                    <span className="text-[9px] text-slate-300">WhatsApp Gateway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWhatsappGatewayProvider("twilio")}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      whatsappGatewayProvider === "twilio" ? "bg-cyan-600/30 border-cyan-400 text-white" : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    <span className="font-bold block">Twilio SMS</span>
                    <span className="text-[9px] text-slate-300">WhatsApp / SMS API</span>
                  </button>
                </div>

                {whatsappGatewayProvider === "callmebot" && (
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">CallMeBot Free WhatsApp API Key (Get at callmebot.com)</label>
                    <input
                      type="password"
                      placeholder="123456"
                      value={callMeBotApiKey}
                      onChange={(e) => setCallMeBotApiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                  </div>
                )}

                {whatsappGatewayProvider === "ultramsg" && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">UltraMsg Instance ID</label>
                      <input
                        type="text"
                        placeholder="instance12345"
                        value={ultraMsgInstanceId}
                        onChange={(e) => setUltraMsgInstanceId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">UltraMsg Token</label>
                      <input
                        type="password"
                        placeholder="token_abc123..."
                        value={ultraMsgToken}
                        onChange={(e) => setUltraMsgToken(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                  </div>
                )}

                {whatsappGatewayProvider === "twilio" && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">Twilio Account SID</label>
                      <input
                        type="text"
                        placeholder="AC_123456789..."
                        value={twilioSid}
                        onChange={(e) => setTwilioSid(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">Twilio Auth Token</label>
                      <input
                        type="password"
                        placeholder="auth_token_..."
                        value={twilioAuthToken}
                        onChange={(e) => setTwilioAuthToken(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Telegram Bot */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <SendHorizontal className="w-4 h-4" />
                  <span>Telegram Bot Automatic Alerts</span>
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
                    placeholder="-100123456789"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
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
