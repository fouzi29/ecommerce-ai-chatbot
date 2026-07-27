import React from "react";
import { ShoppingBag, Bot, Settings, Search, Sparkles, Database, BookOpen } from "lucide-react";

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenSettings,
  onOpenAdmin,
  onOpenGuide,
  onOpenChat,
  currentProvider,
  showSettingsButton = true
}) {
  const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/mdfouzi/";

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-purple-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Creator */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                AURA
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                AI STORE
              </span>
            </div>
            <a 
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-slate-400 hover:text-cyan-400 block -mt-0.5"
            >
              Created by <span className="text-cyan-400 font-bold underline">Fouzi (LinkedIn)</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search wireless headphones, keyboards, smartwatch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500/60 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* LinkedIn Profile Button */}
          <a
            href={LINKEDIN_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 text-xs font-bold text-blue-300 hover:text-white transition-all shadow-md"
            title="View Fouzi's LinkedIn Profile"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* User Guide Trigger */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 border border-cyan-500/40 text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-md"
            title="Open Interactive Client User Guide"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>User Guide</span>
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-xs font-bold text-purple-300 hover:text-white transition-all shadow-md"
            title="Open Admin Orders & Leads Dashboard"
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Admin DB</span>
          </button>

          {/* AI Settings Trigger */}
          {showSettingsButton && (
            <button
              onClick={onOpenSettings}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-md"
              title="Configure AI Provider & Keys"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="capitalize">{currentProvider === 'demo' ? 'Smart Demo' : `${currentProvider}`}</span>
              <Settings className="w-3.5 h-3.5 text-purple-400" />
            </button>
          )}

          {/* Ask AI Assistant Trigger */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI Assistant</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 transition-all shadow-md"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center border-2 border-slate-950 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
