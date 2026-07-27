import React, { useState } from "react";
import { X, Key, Cpu, Database, RefreshCw, Check, Sparkles, Server, ShoppingBag, Layers, Bell, Smartphone, SendHorizontal, MessageCircle, Info, ExternalLink, Code2, Globe, Copy } from "lucide-react";
import { DEFAULT_SYSTEM_PROMPT } from "../data/defaultPrompts";

export function ApiSettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) {
  const [activeTab, setActiveTab] = useState("ai"); // "ai", "embed", "database", "notifications"

  // AI State
  const [provider, setProvider] = useState(settings.provider || "demo");
  const [openAiKey, setOpenAiKey] = useState(settings.openAiKey || "");
  const [geminiKey, setGeminiKey] = useState(settings.geminiKey || "");
  const [openAiModel, setOpenAiModel] = useState(settings.openAiModel || "gpt-4o-mini");
  const [geminiModel, setGeminiModel] = useState(settings.geminiModel || "gemini-1.5-flash");

  // Custom Website Embed Configuration State (Generic example placeholders)
  const [targetDomain, setTargetDomain] = useState(settings.targetDomain || "yourstore.com");
  const [targetStoreName, setTargetStoreName] = useState(settings.targetStoreName || "Your Store Name");
  const [isCopiedEmbed, setIsCopiedEmbed] = useState(false);

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
  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl || "");

  // Automated WhatsApp (TextMeBot Direct API Key / Link Generator), Telegram & Discord State
  const [clientPhone, setClientPhone] = useState(settings.clientPhone || "+8801795657378");
  const [callMeBotApiKey, setCallMeBotApiKey] = useState(settings.callMeBotApiKey || "Lgy1D7Prsd5u");
  const [telegramBotToken, setTelegramBotToken] = useState(settings.telegramBotToken || "");
  const [telegramChatId, setTelegramChatId] = useState(settings.telegramChatId || "");
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState(settings.discordWebhookUrl || "");

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const currentDomain = targetDomain || 'yourstore.com';
  const currentStore = targetStoreName || 'Your Store Name';
  const safeStoreId = currentDomain.replace(/[^a-z0-9]/gi, '-') + '-store';
  const prodApi = customApiUrl || `https://${currentDomain}/api/products.php`;
  const ordApi = customOrderWebhookUrl || `https://${currentDomain}/api/orders.php`;
  const waKey = callMeBotApiKey || 'Lgy1D7Prsd5u';
  const phone = clientPhone || '+8801795657378';

  // Professional Full Multi-Tenant Script Generator
  const generatedEmbedSnippet = `<!-- AURA AI E-Commerce Shopping Assistant for ${currentDomain} -->\n<script \n  src="https://ecommerce-ai-chatbot-ochre.vercel.app/embed.js"\n  data-site-domain="${currentDomain}"\n  data-store-id="${safeStoreId}"\n  data-provider="${provider}"\n  data-whatsapp-key="${waKey}"\n  data-client-phone="${phone}"\n  data-products-api="${prodApi}"\n  data-orders-api="${ordApi}"\n  async>\n</script>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(generatedEmbedSnippet);
    setIsCopiedEmbed(true);
    setTimeout(() => setIsCopiedEmbed(false), 2000);
  };

  const handleDownloadConfigJson = () => {
    const configData = {
      siteDomain: currentDomain,
      storeName: currentStore,
      aiProvider: provider,
      whatsappAlertPhone: phone,
      textmebotApiKey: waKey,
      catalogEndpoint: prodApi,
      orderWebhookEndpoint: ordApi,
      demoApiSampleUrl: "https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/products-demo.json",
      createdAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aura-config-${currentDomain.replace(/[^a-z0-9]/gi, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({
      provider,
      openAiKey,
      geminiKey,
      openAiModel,
      geminiModel,
      showAdminControls: settings.showAdminControls !== undefined ? settings.showAdminControls : true,
      targetDomain,
      targetStoreName,
      dbMode,
      customApiUrl,
      customOrderWebhookUrl,
      customLeadWebhookUrl,
      customApiToken,
      shopifyDomain,
      shopifyAccessToken,
      wooUrl,
      wooConsumerKey,
      supabaseUrl,
      clientPhone,
      callMeBotApiKey,
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
    setTargetDomain("yourstore.com");
    setTargetStoreName("Your Store Name");
    setDbMode("demo");
    setCustomApiUrl("");
    setCustomOrderWebhookUrl("");
    setCustomLeadWebhookUrl("");
    setCustomApiToken("");
    setShopifyDomain("");
    setShopifyAccessToken("");
    setWooUrl("");
    setWooConsumerKey("");
    setSupabaseUrl("");
    setClientPhone("+8801795657378");
    setCallMeBotApiKey("Lgy1D7Prsd5u");
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
              <p className="text-slate-600 text-xs font-semibold">Configure AI Engines, Custom Site Embeds & 5 Database Connectors</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
              activeTab === "ai"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("embed")}
            className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
              activeTab === "embed"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Embed Site</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("database")}
            className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
              activeTab === "database"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>DB & Sync</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
              activeTab === "notifications"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts</span>
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
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">OpenAI API Key (sk-...)</label>
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 font-extrabold flex items-center gap-1"
                    >
                      <span>🔑 Get OpenAI Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="password"
                    placeholder="sk-proj-..."
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                  />
                </div>
              )}

              {provider === "gemini" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">Google Gemini API Key (AIza...)</label>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-700 hover:text-cyan-900 font-extrabold flex items-center gap-1"
                    >
                      <span>🔑 Get Gemini Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                  />
                </div>
              )}
            </>
          )}

          {/* TAB 2: CUSTOM WEBSITE EMBED GENERATOR (FULL PROFESSIONAL SCRIPT SNIPPET) */}
          {activeTab === "embed" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-3">
                <div className="flex items-center justify-between font-black text-blue-900">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Multi-Tenant Professional Embed Generator</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold text-[10px]">
                    Option 1 Full Script
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Client Website Domain</label>
                    <input
                      type="text"
                      placeholder="yourstore.com"
                      value={targetDomain}
                      onChange={(e) => setTargetDomain(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Store / Brand Name</label>
                    <input
                      type="text"
                      placeholder="Your Store Name"
                      value={targetStoreName}
                      onChange={(e) => setTargetStoreName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Generated Embed Code Box */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-extrabold text-slate-800">
                      Professional Multi-Tenant Script Snippet for <span className="text-blue-600 font-black">{currentDomain}</span>:
                    </label>
                    <button
                      type="button"
                      onClick={handleCopyEmbed}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      {isCopiedEmbed ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopiedEmbed ? "Copied Code!" : "1-Click Copy Professional Script"}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed">
                    <pre className="text-cyan-300">{generatedEmbedSnippet}</pre>
                  </div>
                </div>

                {/* Download Config Button */}
                <div className="pt-2 flex items-center justify-between border-t border-blue-200">
                  <span className="text-[11px] text-slate-600 font-medium">
                    Download setup configuration file for <strong>{currentDomain}</strong>:
                  </span>

                  <button
                    type="button"
                    onClick={handleDownloadConfigJson}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-white" />
                    <span>Download aura-config.json</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DATABASE & PLATFORM CONNECTORS */}
          {activeTab === "database" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  Select Product Catalog & Database Sync Source (5 Connectors)
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
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

              {/* Custom REST API Endpoint Configuration Fields */}
              {dbMode === "custom_api" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-cyan-300 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-cyan-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <Server className="w-4 h-4 text-cyan-600" />
                      <span>Custom PHP / MySQL API Setup (e.g. yourstore.com)</span>
                    </h4>
                    <a
                      href="https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/products-demo.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-extrabold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 underline"
                    >
                      <span>📥 Test Demo JSON Payload</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-800 font-extrabold mb-1">
                      1. Products Catalog API Endpoint URL (GET)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/products.php"
                      value={customApiUrl}
                      onChange={(e) => setCustomApiUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      *Returns array of products from MySQL. Demo URL: <code className="text-cyan-700 bg-cyan-100 px-1 rounded">https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/products-demo.json</code>
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-800 font-extrabold mb-1">
                      2. Order Placed Webhook Endpoint URL (POST)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/orders.php"
                      value={customOrderWebhookUrl}
                      onChange={(e) => setCustomOrderWebhookUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-800 font-extrabold mb-1">
                      3. Prospect Lead Captured Webhook Endpoint URL (POST)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourstore.com/api/leads.php"
                      value={customLeadWebhookUrl}
                      onChange={(e) => setCustomLeadWebhookUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Shopify Configuration */}
              {dbMode === "shopify" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-emerald-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <ShoppingBag className="w-4 h-4 text-emerald-600" />
                      <span>Shopify Storefront API Integration</span>
                    </h4>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">Shopify Store Domain</label>
                    <input
                      type="text"
                      placeholder="your-store.myshopify.com"
                      value={shopifyDomain}
                      onChange={(e) => setShopifyDomain(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">Storefront Access Token</label>
                    <input
                      type="password"
                      placeholder="shpat_..."
                      value={shopifyAccessToken}
                      onChange={(e) => setShopifyAccessToken(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* WooCommerce Configuration */}
              {dbMode === "woocommerce" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-indigo-300 space-y-3">
                  <h4 className="text-xs font-black text-indigo-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <ShoppingBag className="w-4 h-4 text-indigo-600" />
                    <span>WooCommerce REST API Integration</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">WordPress Store URL</label>
                    <input
                      type="url"
                      placeholder="https://mywordpressstore.com"
                      value={wooUrl}
                      onChange={(e) => setWooUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">Consumer Key (ck_...)</label>
                    <input
                      type="text"
                      placeholder="ck_123456789..."
                      value={wooConsumerKey}
                      onChange={(e) => setWooConsumerKey(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Supabase Configuration */}
              {dbMode === "supabase" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-teal-300 space-y-3">
                  <h4 className="text-xs font-black text-teal-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Database className="w-4 h-4 text-teal-600" />
                    <span>Supabase PostgreSQL Integration</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">Supabase Project URL</label>
                    <input
                      type="url"
                      placeholder="https://xyzcompany.supabase.co"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AUTOMATED NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              
              {/* TextMeBot Direct Setup */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-emerald-300 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Direct TextMeBot WhatsApp API Key / Link</span>
                  </h4>
                  <a
                    href="https://textmebot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-purple-700 font-extrabold flex items-center gap-1 underline"
                  >
                    <span>💬 Get Free Key on TextMeBot.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                
                <div>
                  <label className="block text-[11px] text-slate-800 font-bold mb-1">
                    Paste Client's TextMeBot API Key or Link (e.g. Lgy1D7Prsd5u)
                  </label>
                  <input
                    type="text"
                    placeholder="https://api.textmebot.com/addphone.php?apikey=Lgy1D7Prsd5u"
                    value={callMeBotApiKey}
                    onChange={(e) => setCallMeBotApiKey(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono font-bold"
                  />
                </div>
              </div>

              {/* Telegram Bot Setup */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-cyan-300 space-y-3">
                <h4 className="text-xs font-black text-cyan-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <SendHorizontal className="w-4 h-4 text-cyan-600" />
                  <span>Telegram Bot Instant Alerts</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">Telegram Bot Token</label>
                    <input
                      type="password"
                      placeholder="123456:ABC-DEF..."
                      value={telegramBotToken}
                      onChange={(e) => setTelegramBotToken(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-800 font-bold mb-1">Telegram Chat ID</label>
                    <input
                      type="text"
                      placeholder="-100123456"
                      value={telegramChatId}
                      onChange={(e) => setTelegramChatId(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Discord Webhook Setup */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-indigo-300 space-y-3">
                <h4 className="text-xs font-black text-indigo-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <Bell className="w-4 h-4 text-indigo-600" />
                  <span>Discord Channel Webhook URL</span>
                </h4>
                <input
                  type="url"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={discordWebhookUrl}
                  onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none font-mono"
                />
              </div>

            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 transition-all cursor-pointer"
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
