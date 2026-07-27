import React, { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, Send } from "lucide-react";

export function ReturnRequestCard({ onReturnSubmitted }) {
  const [orderId, setOrderId] = useState("#AU-8821");
  const [returnReason, setReturnReason] = useState("Wrong Size / Color");
  const [pickupAddress, setPickupAddress] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [returnId, setReturnId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!pickupAddress.trim()) {
      setError("Please enter your Pickup Address.");
      return;
    }

    const newRmaId = `RMA-${Math.floor(10000 + Math.random() * 90000)}`;
    setReturnId(newRmaId);
    setIsSubmitted(true);
    if (onReturnSubmitted) {
      onReturnSubmitted({ rmaId: newRmaId, orderId, returnReason, pickupAddress });
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs space-y-2.5 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Return Request Submitted ({returnId})</span>
        </div>
        <p className="text-[11px] text-slate-700 leading-normal">
          Our courier partner will pick up your return package from <strong>{pickupAddress}</strong> within 24–48 hours. Store credit/refund will be processed upon inspection!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md space-y-3 text-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs">
          <RefreshCw className="w-4 h-4 text-purple-600" />
          <span>In-Chat Return & Exchange Request</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">30-Day Policy</span>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] flex items-center gap-1 font-bold">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Order ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Reason for Return / Exchange</label>
          <select
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none font-medium"
          >
            <option value="Wrong Size / Color">Wrong Size / Color</option>
            <option value="Defective / Damaged Item">Defective / Damaged Item</option>
            <option value="Item Not as Described">Item Not as Described</option>
            <option value="Changed Mind">Changed Mind</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Pickup Address *</label>
          <textarea
            rows={2}
            placeholder="Complete street address for courier pickup..."
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Return Request</span>
        </button>
      </form>

    </div>
  );
}
