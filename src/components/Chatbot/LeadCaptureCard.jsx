import React, { useState } from "react";
import { UserCheck, Check, Send, Sparkles, MessageCircle, ExternalLink } from "lucide-react";
import { captureCustomerLead } from "../../services/orderService";
import { generateWhatsAppLink } from "../../services/notificationService";

export function LeadCaptureCard({ onLeadCaptured }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Audio & Headphones");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const lead = captureCustomerLead({
      name,
      email,
      phone,
      interestCategory: interest,
      note: "Submitted via AI Lead Collector Form"
    });

    setSubmittedLead(lead);
    setIsSubmitted(true);
    if (onLeadCaptured) {
      onLeadCaptured(lead);
    }
  };

  const savedSettings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");
  const clientPhone = savedSettings.clientPhone || "+15550192831";

  if (isSubmitted && submittedLead) {
    const leadMsg = `🔥 NEW PROSPECT LEAD (#${submittedLead.id})\nName: ${submittedLead.name}\nEmail: ${submittedLead.email}\nPhone: ${submittedLead.phone || 'N/A'}\nInterest: ${submittedLead.interestCategory}`;
    const whatsappUrl = generateWhatsAppLink(clientPhone, leadMsg);

    return (
      <div className="mt-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs space-y-3">
        <div className="flex items-center gap-1.5 font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>VIP Lead Captured & Saved to Database!</span>
        </div>
        <p className="text-[11px] text-slate-300">
          Thank you, <strong>{name}</strong>! An AURA product specialist will email your custom VIP quote to <strong>{email}</strong>.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>📲 Send Lead Alert to WhatsApp ({clientPhone})</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mt-3 p-4 bg-slate-900/90 border border-purple-500/40 rounded-xl shadow-lg space-y-3">
      <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
        <Sparkles className="w-4 h-4" />
        <span>Get Custom VIP Discount & Lead Quote</span>
      </div>
      
      <p className="text-[11px] text-slate-300 leading-normal">
        Enter your contact details below to receive an instant 20% discount code & custom quote:
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your Full Name *"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email Address *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
        />

        <input
          type="tel"
          placeholder="Phone Number (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
        />

        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
        >
          <option value="Audio & Headphones">Audio & Headphones</option>
          <option value="Smart Wearables">Smart Wearables & Watches</option>
          <option value="Mechanical Keyboards">Mechanical Keyboards & Tech</option>
          <option value="Smart Home Gear">Smart Home Gear</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit & Save to Database</span>
        </button>
      </form>
    </div>
  );
}
