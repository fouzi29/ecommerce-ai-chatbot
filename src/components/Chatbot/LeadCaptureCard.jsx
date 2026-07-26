import React, { useState } from "react";
import { Check, Send, Sparkles, MessageCircle, ExternalLink, AlertCircle } from "lucide-react";
import { captureCustomerLead } from "../../services/orderService";
import { generateWhatsAppLink } from "../../services/notificationService";

export function LeadCaptureCard({ onLeadCaptured }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Audio & Headphones");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return;
    }

    // Dynamic Requirement: At least Email OR Phone MUST be provided!
    if (!email.trim() && !phone.trim()) {
      setErrorMessage("Please enter either an Email Address OR a Phone Number.");
      return;
    }

    const lead = captureCustomerLead({
      name: name.trim(),
      email: email.trim() || "N/A",
      phone: phone.trim() || "N/A",
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
  const clientPhone = savedSettings.clientPhone || "+8801755690467";

  if (isSubmitted && submittedLead) {
    const leadMsg = `🔥 NEW PROSPECT LEAD (#${submittedLead.id})\nName: ${submittedLead.name}\nEmail: ${submittedLead.email}\nPhone: ${submittedLead.phone || 'N/A'}\nInterest: ${submittedLead.interestCategory}`;
    const whatsappUrl = generateWhatsAppLink(clientPhone, leadMsg);

    return (
      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs space-y-3 shadow-sm">
        <div className="flex items-center gap-1.5 font-bold text-emerald-700">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>VIP Lead Captured & Saved to Database!</span>
        </div>
        <p className="text-[11px] text-slate-700 font-medium">
          Thank you, <strong>{name}</strong>! An AURA product specialist will contact you with your custom VIP quote.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
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
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md space-y-3 text-slate-900">
      <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <span>Get Custom VIP Discount & Lead Quote</span>
      </div>
      
      <p className="text-[11px] text-slate-600 leading-normal font-medium">
        Enter your details below to receive an instant 20% discount code & custom quote:
      </p>

      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] flex items-center gap-1.5 font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your Full Name *"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
        />

        <input
          type="email"
          placeholder="Email Address (Email or Phone required) *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
        />

        <input
          type="tel"
          placeholder="Phone Number (Email or Phone required) *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
        />

        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none font-medium"
        >
          <option value="Audio & Headphones">Audio & Headphones</option>
          <option value="Smart Wearables">Smart Wearables & Watches</option>
          <option value="Mechanical Keyboards">Mechanical Keyboards & Tech</option>
          <option value="Smart Home Gear">Smart Home Gear</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit & Save to Database</span>
        </button>
      </form>
    </div>
  );
}
