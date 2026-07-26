import React, { useState } from "react";
import { Sparkles, Bot, ShoppingCart, Database, ChevronDown, ChevronUp, Code2, Zap, ExternalLink, Bell } from "lucide-react";

export function ClientGuideBanner({ onOpenChat, onOpenSettings }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const FIVERR_PROFILE_URL = "https://www.fiverr.com/s/e6BNbv3";
  const FIVERR_GIG_URL = "https://www.fiverr.com/s/GzVdLez";

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-900/95 via-purple-950/50 to-slate-900/95 border border-purple-500/40 p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white tracking-tight">Client Demonstration & User Guide</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-[11px]">
                Portfolio Edition
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Engineered & Designed by <span className="text-purple-400 font-bold">Fouzi</span> • Dual OpenAI & Gemini AI Architecture
            </p>
          </div>
        </div>

        {/* Action Controls & Hire Me Button */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <a
            href={FIVERR_GIG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:scale-105 transition-all"
          >
            <span>Hire Fouzi on Fiverr</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
          >
            <span>{isExpanded ? "Hide Guide" : "View Client Guide"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Expanded User Guide Cards */}
      {isExpanded && (
        <div className="mt-6 pt-5 border-t border-purple-500/20 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Card 1: AI Engine Controls */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4" />
              <span>1. AI Engines & Provider</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              Test AI models seamlessly. Choose **Smart Demo Mode** for zero-cost testing, or switch to **OpenAI (GPT-4o)** or **Google Gemini (2.0 Flash)**.
            </p>
            <button
              onClick={onOpenSettings}
              className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 underline"
            >
              <span>AI Settings →</span>
            </button>
          </div>

          {/* Card 2: Interactive Assistant & AI Orders */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShoppingCart className="w-4 h-4" />
              <span>2. Direct Orders & Leads</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              Try direct AI order placement 🛍️ (*"Order Aura Headphones"*), lead capture form 👥, voice input 🎙️, and promo codes (<code className="text-cyan-300 bg-slate-900 px-1 rounded">AURA20</code>).
            </p>
            <button
              onClick={onOpenChat}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline"
            >
              <span>AI Widget →</span>
            </button>
          </div>

          {/* Card 3: Database & Platform Integration */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Database className="w-4 h-4" />
              <span>3. Database & Platform Sync</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              Connect to live databases! Supports custom REST APIs (MySQL/Node/PHP), **Shopify**, **WooCommerce**, or **Supabase PostgreSQL**.
            </p>
            <button
              onClick={onOpenSettings}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
            >
              <span>Database Sync →</span>
            </button>
          </div>

          {/* Card 4: WhatsApp & SMS Instant Alerts */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4" />
              <span>4. WhatsApp & SMS Alerts</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              Instant store owner notifications! Automatically sends WhatsApp or SMS alerts whenever an order or customer lead is captured.
            </p>
            <button
              onClick={onOpenSettings}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline"
            >
              <span>Setup Alerts →</span>
            </button>
          </div>

        </div>
      )}

      {/* Developer Credit Footer Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Application Creator: <strong className="text-slate-200">Fouzi</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={FIVERR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
          >
            <span>Fiverr Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href={FIVERR_GIG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            <span>Custom AI Chatbot Gig</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
}
