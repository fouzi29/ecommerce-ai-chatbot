import React from "react";
import { X, BookOpen, Bot, ShoppingCart, Database, Bell, ExternalLink, Code2, Server, Key } from "lucide-react";

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export function UserGuideModal({ isOpen, onClose, onOpenChat, onOpenSettings }) {
  if (!isOpen) return null;

  const FIVERR_PROFILE_URL = "https://www.fiverr.com/s/e6BNbv3";
  const FIVERR_GIG_URL = "https://www.fiverr.com/s/GzVdLez";
  const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/mdfouzi/";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-white border border-purple-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp max-h-[85vh] flex flex-col text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-xl">Interactive Client User & API Guide</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-700 font-bold text-[11px]">
                  Fiverr Portfolio Edition
                </span>
              </div>
              <p className="text-slate-600 text-xs mt-0.5">
                Engineered & Developed by <strong className="text-purple-600">Fouzi</strong> • Complete Technical Blueprint
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guide Content */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 text-xs">
          
          {/* Section 1: AI Engines */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-purple-700 flex items-center gap-2 uppercase tracking-wider">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>1. Testing Dual AI Engines (OpenAI vs Gemini vs Smart Demo)</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-sm"
              >
                AI Settings
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              • <strong>Smart Demo Mode</strong>: Works out-of-the-box with zero setup and zero cost!  
              • <strong>OpenAI (GPT-4o)</strong>: Enter your OpenAI API key (<code className="text-purple-700 font-bold bg-purple-100 px-1 rounded">sk-...</code>) in Settings.  
              • <strong>Google Gemini (2.0 Flash)</strong>: Enter your Gemini API key (<code className="text-cyan-700 font-bold bg-cyan-100 px-1 rounded">AIza...</code>) in Settings.
            </p>
          </div>

          {/* Section 2: Direct AI Orders & Leads */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-cyan-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-cyan-700 flex items-center gap-2 uppercase tracking-wider">
                <ShoppingCart className="w-4 h-4 text-cyan-600" />
                <span>2. In-Chat AI Direct Checkout & Prospect Lead Form</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenChat(); }}
                className="px-2.5 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-bold shadow-sm"
              >
                Open Chatbot
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              • <strong>Direct AI Order Checkout</strong>: Say *"Order Aura Headphones"* in chat. An in-chat checkout form asks for Name, Email, Phone, & Address, then places the order (`#AU-9821`)!  
              • <strong>Lead Collector Form</strong>: Say *"Request custom quote"*. Renders a lead capture form and saves to database.  
              • <strong>Promo Codes & Tracking</strong>: Test active code <code className="text-cyan-700 font-bold bg-cyan-100 px-1 rounded">AURA20</code> or track package <code className="text-cyan-700 font-bold bg-cyan-100 px-1 rounded">#AU-8821</code>.
            </p>
          </div>

          {/* Section 3: Custom REST API Architecture Blueprint */}
          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-300 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-purple-900 flex items-center gap-2 uppercase tracking-wider">
                <Server className="w-4 h-4 text-purple-700" />
                <span>3. Custom REST API Architecture Blueprint (PHP / MySQL / Node.js)</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-bold shadow-sm"
              >
                Configure API
              </button>
            </div>

            <p className="text-slate-700 leading-relaxed">
              If your client wants to connect their custom backend (Laravel, PHP, Node.js, Express, Python, MySQL), set up the following 3 standard REST endpoints:
            </p>

            {/* Sub-schema A: GET /api/products */}
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl space-y-1 font-mono text-[11px]">
              <div className="text-cyan-400 font-bold">1. GET /api/products (Fetch Live Store Catalog)</div>
              <div className="text-slate-400 text-[10px]">// Response JSON Array:</div>
              <pre className="text-purple-300 text-[10px] overflow-x-auto">{`[
  {
    "id": "prod-1",
    "name": "Wireless ANC Headphones",
    "category": "Audio",
    "price": 249.99,
    "description": "High-fidelity wireless sound",
    "image": "https://yourstore.com/images/item.jpg"
  }
]`}</pre>
            </div>

            {/* Sub-schema B: POST /api/orders */}
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl space-y-1 font-mono text-[11px]">
              <div className="text-emerald-400 font-bold">2. POST /api/orders (Receive AI Placed Orders)</div>
              <div className="text-slate-400 text-[10px]">// Request Body JSON:</div>
              <pre className="text-emerald-300 text-[10px] overflow-x-auto">{`{
  "event": "order_placed",
  "orderId": "AU-9942",
  "customerName": "Alex Rivera",
  "customerEmail": "alex@example.com",
  "customerPhone": "+15550192831",
  "shippingAddress": "742 Evergreen Terrace",
  "items": [{ "name": "Aura Headphones", "price": 249.99, "quantity": 1 }],
  "totalAmount": 249.99
}`}</pre>
            </div>
          </div>

          {/* Section 4: WhatsApp & Multi-Channel Alerts */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-amber-700 flex items-center gap-2 uppercase tracking-wider">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>4. Automated WhatsApp, Telegram, & Discord Alerts</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-sm"
              >
                Configure Alerts
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Receive instant alerts on your phone whenever an order or lead is placed via:  
              • <strong>TextMeBot & CallMeBot WhatsApp Gateways</strong>  
              • <strong>Telegram Bot Token & Chat ID</strong>  
              • <strong>Discord Webhook URL</strong>
            </p>
          </div>

          {/* Section 5: API Keys & Connectors Directory */}
          <div className="bg-slate-900 text-white p-4.5 rounded-2xl space-y-3 shadow-lg border border-slate-800">
            <h4 className="text-xs font-extrabold text-cyan-400 flex items-center gap-2 uppercase tracking-wider">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>5. 1-Click API Keys & Connectors Directory</span>
            </h4>
            
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Click any link below to obtain your free API keys for instant integration:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 flex items-center justify-between"
              >
                <span>🔑 OpenAI API Keys</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 flex items-center justify-between"
              >
                <span>🔑 Google Gemini API Keys</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://api.textmebot.com/addphone.php"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-purple-300 flex items-center justify-between"
              >
                <span>🔑 TextMeBot WhatsApp Key</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/34644597190"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 flex items-center justify-between"
              >
                <span>📲 CallMeBot WhatsApp (+34644597190)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://help.shopify.com/en/manual/apps/custom-apps"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 flex items-center justify-between"
              >
                <span>🛍️ Shopify Storefront API</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://woocommerce.com/document/woocommerce-rest-api/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 flex items-center justify-between"
              >
                <span>🛍️ WooCommerce REST API</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer & Social CTA */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Code2 className="w-4 h-4 text-purple-600" />
            <span>App Creator: <strong className="text-slate-900 font-extrabold">Fouzi</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={FIVERR_GIG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>Connect on Fiverr</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
