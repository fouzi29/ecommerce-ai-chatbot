import React from "react";
import { X, BookOpen, Bot, ShoppingCart, Database, Bell, ExternalLink, Code2, Server, Key, Sparkles, Scale, RefreshCw, Heart, Camera, Mic, BarChart3, Globe, Smartphone, CheckCircle2, ArrowRight, ShieldCheck, Download } from "lucide-react";

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
        className="bg-white border border-purple-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp max-h-[88vh] flex flex-col text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Interactive Graphical User Guide</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-700 font-extrabold text-[11px]">
                  Fiverr Portfolio Edition
                </span>
              </div>
              <p className="text-slate-600 text-xs mt-0.5 font-semibold">
                Engineered & Designed by <strong className="text-purple-600 font-black">Fouzi</strong> • Enterprise AI Blueprint
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Visual Guide Body */}
        <div className="flex-1 overflow-y-auto my-4 space-y-5 pr-1 text-xs">
          
          {/* VISUAL BANNER: Enterprise 25-Module Feature Suite Breakdown */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white p-5 rounded-2xl space-y-3.5 shadow-xl border border-purple-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Enterprise 25-Module AI E-Commerce Suite</span>
              </h4>
              <span className="px-3 py-1 bg-purple-600 text-white font-black text-[10px] rounded-full uppercase shadow-sm">
                24/7 AI Sales Agent
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] font-bold pt-1">
              <div className="flex items-center gap-2 bg-purple-950/80 p-2.5 rounded-xl border border-purple-700 text-purple-100">
                <ShoppingCart className="w-4 h-4 text-purple-300 shrink-0" />
                <span>In-Chat Direct Checkout</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-950/80 p-2.5 rounded-xl border border-purple-700 text-purple-100">
                <Scale className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Side-by-Side Comparison</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-950/80 p-2.5 rounded-xl border border-purple-700 text-purple-100">
                <BarChart3 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Order Tracking & PDF Invoice</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-950/80 p-2.5 rounded-xl border border-purple-700 text-purple-100">
                <RefreshCw className="w-4 h-4 text-amber-300 shrink-0" />
                <span>In-Chat Returns & RMA</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-950/80 p-2.5 rounded-xl border border-purple-700 text-purple-100">
                <Heart className="w-4 h-4 text-rose-300 shrink-0" />
                <span>Wishlist & Loyalty Points</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-950/80 p-2.5 rounded-xl border border-purple-700 text-purple-100">
                <Camera className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Camera Photo & Barcode</span>
              </div>
            </div>
          </div>

          {/* VISUAL STEPPER: 4-Step Client Onboarding & Integration Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>4-Step Quick Integration Roadmap</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* STEP 1 */}
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-purple-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    1
                  </span>
                  <span className="text-[10px] font-extrabold text-purple-700 uppercase bg-purple-200/60 px-2 py-0.5 rounded-md">
                    Test Assistant
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-900 text-xs">Test Live AI Sales Agent</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Click the floating chat button at the bottom-right corner. Type <em>"Compare headphones"</em> or <em>"Order Aura Headphones"</em> to test direct checkout!
                </p>
              </div>

              {/* STEP 2 */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-blue-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    2
                  </span>
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase bg-blue-200/60 px-2 py-0.5 rounded-md">
                    Multi-Tenant
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-900 text-xs">Copy 1-Line Embed Script</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Open the <strong>Embed Site</strong> tab in Settings to generate a complete script tag with client data attributes for zero-setup installation!
                </p>
              </div>

              {/* STEP 3 */}
              <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-200 text-cyan-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    3
                  </span>
                  <span className="text-[10px] font-extrabold text-cyan-700 uppercase bg-cyan-200/60 px-2 py-0.5 rounded-md">
                    Database
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-900 text-xs">Connect Store Database (5 Connectors)</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Sync Shopify Storefront API, WooCommerce REST API, Supabase, or custom PHP/MySQL endpoints (`api/products.php`).
                </p>
              </div>

              {/* STEP 4 */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    4
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase bg-emerald-200/60 px-2 py-0.5 rounded-md">
                    WhatsApp Alerts
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-900 text-xs">Connect WhatsApp Mobile Alerts</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Generate a free key on <strong>TextMeBot.com</strong> to receive instant order notifications directly on your mobile phone!
                </p>
              </div>

            </div>
          </div>

          {/* VISUAL CARDS: Direct Starter Code Download Links */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Download className="w-4 h-4 text-purple-600" />
                <span>Live Starter Code Files for Custom Client Databases</span>
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href="https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/php-demo.php"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-purple-500 font-black text-[11px] text-purple-800 flex items-center justify-between shadow-sm transition-all"
              >
                <span>🐘 PHP / MySQL</span>
                <ExternalLink className="w-3 h-3 text-purple-600" />
              </a>

              <a
                href="https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/node-demo.js"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 font-black text-[11px] text-emerald-800 flex items-center justify-between shadow-sm transition-all"
              >
                <span>🟢 Node / Express</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>

              <a
                href="https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/python-demo.py"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-cyan-500 font-black text-[11px] text-cyan-800 flex items-center justify-between shadow-sm transition-all"
              >
                <span>🐍 Python / Flask</span>
                <ExternalLink className="w-3 h-3 text-cyan-600" />
              </a>

              <a
                href="https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/products-demo.json"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 font-black text-[11px] text-indigo-800 flex items-center justify-between shadow-sm transition-all"
              >
                <span>📦 JSON Payload</span>
                <ExternalLink className="w-3 h-3 text-indigo-600" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenChat();
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>Launch Live AI Chatbot</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-purple-600" />
              <span>Open SaaS Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>Connect with Fouzi</span>
            </a>

            <a
              href={FIVERR_GIG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Connect on Fiverr</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
