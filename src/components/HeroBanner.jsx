import React from "react";
import { Bot, Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function HeroBanner({ onOpenChat }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-purple-500/30 p-8 sm:p-12 mb-10 shadow-2xl shadow-purple-950/40 text-white backdrop-blur-xl">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold mb-4 shadow-md">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Gen E-Commerce with Dual AI Integration</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
          Shop Smarter with <br />
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            OpenAI & Gemini AI Assistant
          </span>
        </h1>

        <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-medium">
          Experience personal AI product recommendations, real-time cart intelligence, order tracking, and instant answers powered by GPT-4o and Gemini 2.0 Flash.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <Bot className="w-5 h-5" />
            <span>Try AI Chatbot Assistant</span>
          </button>

          <a
            href="#catalog"
            className="px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all shadow-lg"
          >
            Explore Catalog
          </a>
        </div>

        {/* Feature Badges */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-slate-300 text-xs font-bold">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-400" />
            <span>Free Express &gt;$50</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>30-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-purple-400" />
            <span>OpenAI & Gemini APIs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
