import React from "react";
import { X, BookOpen, Bot, ShoppingCart, Database, Bell, ExternalLink, Code2, Server, Terminal, CheckCircle2 } from "lucide-react";

export function UserGuideModal({ isOpen, onClose, onOpenChat, onOpenSettings }) {
  if (!isOpen) return null;

  const FIVERR_PROFILE_URL = "https://www.fiverr.com/s/e6BNbv3";
  const FIVERR_GIG_URL = "https://www.fiverr.com/s/GzVdLez";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-white border border-purple-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp max-h-[85vh] flex flex-col text-slate-900"
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

          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guide Content */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 text-xs">
          
          {/* Section 1: AI Engines */}
          <div className="bg-slate-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-purple-700 flex items-center gap-2 uppercase tracking-wider">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>1. Testing Dual AI Engines (OpenAI vs Gemini vs Smart Demo)</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-sm"
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
          <div className="bg-slate-50 p-4 rounded-xl border border-cyan-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-cyan-700 flex items-center gap-2 uppercase tracking-wider">
                <ShoppingCart className="w-4 h-4 text-cyan-600" />
                <span>2. In-Chat AI Direct Checkout & Prospect Lead Form</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenChat(); }}
                className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-bold shadow-sm"
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

          {/* Section 3: Custom REST API Design & Backend Architecture */}
          <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-300 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-purple-900 flex items-center gap-2 uppercase tracking-wider">
                <Server className="w-4 h-4 text-purple-700" />
                <span>3. Custom REST API Architecture Blueprint (PHP / MySQL / Node.js)</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-bold shadow-sm"
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

            {/* Sub-schema C: POST /api/leads */}
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl space-y-1 font-mono text-[11px]">
              <div className="text-amber-400 font-bold">3. POST /api/leads (Receive Captured Leads)</div>
              <div className="text-slate-400 text-[10px]">// Request Body JSON:</div>
              <pre className="text-amber-300 text-[10px] overflow-x-auto">{`{
  "event": "lead_captured",
  "leadId": "LEAD-101",
  "name": "Michael Scott",
  "email": "m.scott@dundermifflin.com",
  "phone": "+15559981122",
  "interestCategory": "Audio",
  "note": "Interested in bulk discount for 10 units"
}`}</pre>
            </div>
          </div>

          {/* Section 4: WhatsApp & Multi-Channel Alerts */}
          <div className="bg-slate-50 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-amber-700 flex items-center gap-2 uppercase tracking-wider">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>4. Automated WhatsApp, Telegram, & Discord Alerts</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-sm"
              >
                Configure Alerts
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Receive instant alerts on your phone whenever an order or lead is placed via:  
              • <strong>WhatsApp 1-Click Alert Button</strong> & <strong>CallMeBot / UltraMsg Free WhatsApp Gateways</strong>  
              • <strong>Telegram Bot Token & Chat ID</strong>  
              • <strong>Discord Webhook URL</strong>
            </p>
          </div>

        </div>

        {/* Footer & Hire Me CTA */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Code2 className="w-4 h-4 text-purple-600" />
            <span>App Creator: <strong className="text-slate-900 font-extrabold">Fouzi</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={FIVERR_GIG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
            >
              <span>Hire Fouzi on Fiverr</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
