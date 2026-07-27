import React from "react";
import { Sparkles, CheckCircle2, XCircle, Bot, ShoppingCart, Scale, Truck, RefreshCw, Smartphone, Camera, Mic, BarChart3, Database, Zap } from "lucide-react";

export function FeaturesComparisonSection() {
  const comparisonData = [
    {
      feature: "In-Chat Direct Order Checkout",
      aura: "Instant in-chat checkout with address & phone validation (#AU-9942)",
      traditional: "Redirects customer away to separate checkout pages",
      icon: ShoppingBag
    },
    {
      feature: "Side-by-Side Spec Comparison",
      aura: "Interactive visual comparison tables for 2-3 products",
      traditional: "Plain text answers with missing technical specs",
      icon: Scale
    },
    {
      feature: "Live Shipment Tracking & PDF Invoices",
      aura: "Real-time timeline progress bar + 1-click PDF invoice download",
      traditional: "Static tracking links requiring external logins",
      icon: Truck
    },
    {
      feature: "In-Chat Returns & Exchange Requests",
      aura: "In-chat RMA return request form + automated pickup scheduling",
      traditional: "Manual email support tickets with slow response times",
      icon: RefreshCw
    },
    {
      feature: "Automated WhatsApp, Telegram & Discord Alerts",
      aura: "Instant background alerts sent to store owner's mobile phone",
      traditional: "No mobile alerts or slow email-only notifications",
      icon: Smartphone
    },
    {
      feature: "Camera Photo & Barcode Search",
      aura: "Snap photo on smartphone camera to search visual catalog matches",
      traditional: "Text query search only",
      icon: Camera
    },
    {
      feature: "Voice Input & Audio TTS Responses",
      aura: "Web Speech API voice input + audio read-aloud playback",
      traditional: "Keyboard typing only",
      icon: Mic
    },
    {
      feature: "Multi-Store & Database Sync (5 Connectors)",
      aura: "Shopify, WooCommerce, Supabase, MySQL/PHP, & Custom REST APIs",
      traditional: "Locked into single proprietary platform",
      icon: Database
    },
    {
      feature: "Real-Time BI Analytics & Human Takeover",
      aura: "CSAT metrics, conversion rates, & live chat human handoff",
      traditional: "Basic conversation logs without analytics",
      icon: BarChart3
    }
  ];

  return (
    <section className="my-16 scroll-mt-20" id="features">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-700 font-extrabold text-xs shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Enterprise 25-Module AI Capabilities</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Why AURA AI Outperforms Traditional Chatbots
        </h2>
        
        <p className="text-slate-600 text-sm font-semibold leading-relaxed">
          Transform your e-commerce store with an autonomous 24/7 AI Sales Agent engineered by <span className="text-purple-600 font-black">Fouzi</span>.
        </p>
      </div>

      {/* Feature Suite Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-xl space-y-3 hover:border-purple-400 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-black text-slate-900">24/7 Autonomous Sales Agent</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            Acts as a dedicated sales representative. Recommends gear, answers complex specs, applies promo codes (<code className="text-purple-700 font-bold bg-purple-100 px-1 rounded">AURA20</code>), and converts browsers into buyers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-cyan-200 shadow-xl space-y-3 hover:border-cyan-400 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-600/30">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-black text-slate-900">In-Chat Frictionless Checkout</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            Shoppers complete their purchase inside the chat window. Collects customer name, email, phone, and address with 100% data validation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-xl space-y-3 hover:border-emerald-400 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Instant Multi-Channel Alerts</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            Sends 100% background mobile alerts to TextMeBot WhatsApp, Telegram Bot, & Discord Webhooks whenever an order or prospect lead is captured.
          </p>
        </div>
      </div>

      {/* Graphical Comparison Table */}
      <div className="bg-white rounded-3xl border border-purple-200 shadow-2xl overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-slate-950 text-white p-4 text-xs font-black uppercase tracking-wider items-center border-b border-slate-800">
          <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Capability / Feature</span>
          </div>
          <div className="col-span-4 sm:col-span-4 text-purple-400 font-extrabold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>AURA AI 25-Module Suite</span>
          </div>
          <div className="col-span-3 sm:col-span-4 text-slate-400 font-bold">
            <span>Traditional FAQ Chatbot</span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {comparisonData.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div key={idx} className="grid grid-cols-12 p-4 text-xs items-center hover:bg-purple-50/50 transition-colors">
                
                {/* Feature Column */}
                <div className="col-span-5 sm:col-span-4 font-black text-slate-900 flex items-center gap-2 pr-2">
                  <Icon className="w-4 h-4 text-purple-600 shrink-0 hidden sm:block" />
                  <span>{row.feature}</span>
                </div>

                {/* AURA AI Column */}
                <div className="col-span-4 sm:col-span-4 text-purple-950 font-extrabold flex items-start gap-2 pr-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{row.aura}</span>
                </div>

                {/* Traditional Chatbot Column */}
                <div className="col-span-3 sm:col-span-4 text-slate-500 font-medium flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-snug hidden sm:inline">{row.traditional}</span>
                  <span className="leading-snug sm:hidden">Limited</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
