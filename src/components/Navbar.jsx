import React from "react";
import { ShoppingBag, Bot, Settings, Search, Sparkles } from "lucide-react";

export function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenSettings,
  onOpenChat,
  currentProvider,
  showSettingsButton = true
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-violet-400 bg-clip-text text-transparent">
              AURA
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 ml-2 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
              AI STORE
            </span>
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
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-violet-500 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Admin API Provider Badge & Settings Trigger (Visible if showSettingsButton is true) */}
          {showSettingsButton && (
            <button
              onClick={onOpenSettings}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-xs font-medium text-slate-300 transition-all"
              title="Configure AI Provider & Keys"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="capitalize">{currentProvider === 'demo' ? 'Smart Demo AI' : `${currentProvider} API`}</span>
              <Settings className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}

          {/* Ask AI Assistant Quick Trigger */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-xs shadow-md shadow-violet-600/20 hover:opacity-95 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI Assistant</span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center border-2 border-slate-950 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
