import React from "react";
import { X, BookOpen, Bot, ShoppingCart, Database, Bell, ExternalLink, Code2, CheckCircle2, Zap } from "lucide-react";

export function UserGuideModal({ isOpen, onClose, onOpenChat, onOpenSettings }) {
  if (!isOpen) return null;

  const FIVERR_PROFILE_URL = "https://www.fiverr.com/s/e6BNbv3";
  const FIVERR_GIG_URL = "https://www.fiverr.com/s/GzVdLez";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-indigo-950/95 border border-purple-500/40 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp backdrop-blur-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-xl">Interactive Client User Guide</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-[11px]">
                  Fiverr Portfolio Showcase
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-0.5">
                Engineered & Developed by <strong className="text-purple-400">Fouzi</strong> • Complete Feature Walkthrough
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guide Content */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
          
          {/* Section 1: AI Engines */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-purple-400 flex items-center gap-2 uppercase tracking-wider">
                <Bot className="w-4 h-4" />
                <span>1. Testing Dual AI Engines (OpenAI vs Gemini vs Smart Demo)</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600 text-white text-[11px] font-bold border border-purple-400/40"
              >
                AI Settings
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              • <strong>Smart Demo Mode</strong>: Works out-of-the-box with zero setup and zero cost!  
              • <strong>OpenAI (GPT-4o)</strong>: Enter your OpenAI API key (<code className="text-emerald-300">sk-...</code>) in Settings.  
              • <strong>Google Gemini (2.0 Flash)</strong>: Enter your Gemini API key (<code className="text-cyan-300">AIza...</code>) in Settings.
            </p>
          </div>

          {/* Section 2: Direct AI Orders & Leads */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-2 uppercase tracking-wider">
                <ShoppingCart className="w-4 h-4" />
                <span>2. In-Chat AI Direct Checkout & Prospect Lead Form</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenChat(); }}
                className="px-2.5 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600 text-white text-[11px] font-bold border border-cyan-400/40"
              >
                Open Chatbot
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              • <strong>Direct AI Order Checkout</strong>: Say *"Order Aura Headphones"* in chat. An in-chat checkout form asks for Name, Email, Phone, & Address, then places the order (`#AU-9821`)!  
              • <strong>Lead Collector Form</strong>: Say *"Request custom quote"*. Renders a lead capture form and saves to the database.  
              • <strong>Promo Codes & Tracking</strong>: Test active code <code className="text-cyan-300 font-mono">AURA20</code> or track package <code className="text-cyan-300 font-mono">#AU-8821</code>.
            </p>
          </div>

          {/* Section 3: 5 Database Sync Connectors */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>3. 5 Database Sync Connectors (SaaS Mode)</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-white text-[11px] font-bold border border-emerald-400/40"
              >
                DB Sync
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect to any store backend:  
              1. <strong>Default Catalog</strong> (Sample items)  
              2. <strong>Custom REST API</strong> (MySQL / Node.js / PHP)  
              3. <strong>Shopify Storefront API</strong>  
              4. <strong>WooCommerce REST API</strong>  
              5. <strong>Supabase PostgreSQL</strong>
            </p>
          </div>

          {/* Section 4: WhatsApp & Multi-Channel Alerts */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wider">
                <Bell className="w-4 h-4" />
                <span>4. Automated WhatsApp, Telegram, & Discord Alerts</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSettings(); }}
                className="px-2.5 py-1 rounded bg-amber-600/30 hover:bg-amber-600 text-white text-[11px] font-bold border border-amber-400/40"
              >
                Configure Alerts
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Receive instant alerts on your phone whenever an order or lead is placed via:  
              • <strong>WhatsApp 1-Click Alert Button</strong> & <strong>CallMeBot / UltraMsg Free WhatsApp Gateways</strong>  
              • <strong>Telegram Bot Token & Chat ID</strong>  
              • <strong>Discord Webhook URL</strong>
            </p>
          </div>

        </div>

        {/* Footer & Hire Me CTA */}
        <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>App Creator: <strong className="text-white font-bold">Fouzi</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={FIVERR_GIG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
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
