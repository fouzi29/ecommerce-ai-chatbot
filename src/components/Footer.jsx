import React from "react";
import { Sparkles, ExternalLink, Code2, Heart } from "lucide-react";

export function Footer({ onOpenSettings, onOpenAdmin, onOpenGuide }) {
  const FIVERR_PROFILE_URL = "https://www.fiverr.com/s/e6BNbv3";
  const FIVERR_GIG_URL = "https://www.fiverr.com/s/GzVdLez";

  return (
    <footer className="mt-20 border-t border-purple-500/20 bg-slate-950/90 backdrop-blur-xl text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">AURA AI STORE</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Next-Generation E-Commerce Chatbot Solution with dual OpenAI & Gemini AI integrations, automated WhatsApp alerts, and multi-channel DB sync.
            </p>
            <p className="text-[11px] font-bold text-purple-300">
              Engineered & Designed by <span className="text-cyan-300 font-extrabold">Fouzi</span>
            </p>
          </div>

          {/* Quick Access */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><button onClick={onOpenGuide} className="hover:text-cyan-300">📖 Interactive User Guide</button></li>
              <li><button onClick={onOpenAdmin} className="hover:text-purple-300">📊 Admin Dashboard (?admin=true)</button></li>
              <li><button onClick={onOpenSettings} className="hover:text-emerald-300">⚙️ AI & DB SaaS Control Panel</button></li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider mb-3">Powered By</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• OpenAI GPT-4o & GPT-4o-mini</li>
              <li>• Google Gemini 2.0 & 1.5 Flash</li>
              <li>• Automated WhatsApp Gateway</li>
              <li>• Shopify, WooCommerce, & Supabase DB</li>
            </ul>
          </div>

          {/* Connect & Collaborate */}
          <div className="space-y-3 bg-purple-950/40 p-4 rounded-xl border border-purple-500/30">
            <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Connect on Fiverr</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Explore custom AI Chatbot integrations for your e-commerce store or web platform with Fouzi!
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={FIVERR_GIG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Explore AI Chatbot Gig</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={FIVERR_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 hover:text-white font-semibold text-[11px]"
              >
                <span>Fiverr Profile</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <span>© 2026 AURA AI E-Commerce Store. Engineered by Fouzi. All rights reserved.</span>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>for Global SaaS Clients</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
