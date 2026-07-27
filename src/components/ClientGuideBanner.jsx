import React, { useState } from "react";
import { Zap, ChevronDown, ChevronUp, Code2, ExternalLink, Bot, ShoppingCart, Database, Bell } from "lucide-react";

export function ClientGuideBanner({ onOpenChat, onOpenSettings, onOpenGuide }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const FIVERR_PROFILE_URL = "https://www.fiverr.com/s/e6BNbv3";
  const FIVERR_GIG_URL = "https://www.fiverr.com/s/GzVdLez";

  return (
    <div className="mb-8 rounded-3xl bg-white border border-purple-200 p-5 sm:p-6 shadow-xl text-slate-900 transition-all">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Client Demonstration & User Guide</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-700 font-extrabold text-[11px]">
                Portfolio Edition
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-0.5 font-semibold">
              Engineered & Designed by <span className="text-purple-600 font-extrabold">Fouzi</span> • Dual OpenAI & Gemini AI Architecture
            </p>
          </div>
        </div>

        {/* Action Controls & Connect Button */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <a
            href={FIVERR_GIG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all border border-emerald-500"
          >
            <span className="text-white font-extrabold">Connect on Fiverr</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs border border-slate-300 transition-all"
          >
            <span>{isExpanded ? "Hide Guide" : "View Client Guide"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Expanded User Guide Cards */}
      {isExpanded && (
        <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Card 1: AI Engine Controls */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-purple-200 hover:border-purple-400 transition-all">
            <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>1. AI Engines & Provider</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed mb-3 font-medium">
              Test AI models seamlessly. Choose <strong>Smart Demo Mode</strong> for zero-cost testing, or switch to <strong>OpenAI (GPT-4o)</strong> or <strong>Google Gemini (2.0 Flash)</strong>.
            </p>
            <button
              onClick={onOpenSettings}
              className="text-[11px] font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 underline"
            >
              <span>AI Settings →</span>
            </button>
          </div>

          {/* Card 2: Interactive Assistant & AI Orders */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-cyan-200 hover:border-cyan-400 transition-all">
            <div className="flex items-center gap-2 text-cyan-700 font-extrabold text-xs uppercase tracking-wider mb-2">
              <ShoppingCart className="w-4 h-4 text-cyan-600" />
              <span>2. Direct Orders & Leads</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed mb-3 font-medium">
              Try direct AI order placement 🛍️ (<em>"Order Aura Headphones"</em>), lead capture form 👥, voice input 🎙️, and promo codes (<code className="text-cyan-800 font-bold bg-cyan-100 px-1 rounded">AURA20</code>).
            </p>
            <button
              onClick={onOpenChat}
              className="text-[11px] font-extrabold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 underline"
            >
              <span>AI Widget →</span>
            </button>
          </div>

          {/* Card 3: Database & Platform Integration */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition-all">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>3. Database & Platform Sync</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed mb-3 font-medium">
              Connect to live databases! Supports custom REST APIs (MySQL/Node/PHP), <strong>Shopify</strong>, <strong>WooCommerce</strong>, or <strong>Supabase PostgreSQL</strong>.
            </p>
            <button
              onClick={onOpenSettings}
              className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 underline"
            >
              <span>Database Sync →</span>
            </button>
          </div>

          {/* Card 4: WhatsApp & SMS Instant Alerts */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-amber-200 hover:border-amber-400 transition-all">
            <div className="flex items-center gap-2 text-amber-700 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>4. WhatsApp & SMS Alerts</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed mb-3 font-medium">
              Instant store owner notifications! Automatically sends WhatsApp or SMS alerts whenever an order or customer lead is captured.
            </p>
            <button
              onClick={onOpenSettings}
              className="text-[11px] font-extrabold text-amber-700 hover:text-amber-900 flex items-center gap-1 underline"
            >
              <span>Setup Alerts →</span>
            </button>
          </div>

        </div>
      )}

      {/* Developer Credit Footer Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-purple-600" />
          <span>Application Creator: <strong className="text-slate-900 font-extrabold">Fouzi</strong></span>
        </div>

        <div className="flex items-center gap-3 font-bold">
          <a
            href={FIVERR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Fiverr Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href={FIVERR_GIG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 flex items-center gap-1"
          >
            <span>Custom AI Chatbot Gig</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
}
