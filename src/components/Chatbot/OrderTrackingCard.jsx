import React from "react";
import { Package, Truck, CheckCircle2, Download, Clock, MapPin } from "lucide-react";

export function OrderTrackingCard({ orderDetails }) {
  const order = orderDetails || {
    id: "AU-8821",
    customerName: "Alex Rivera",
    items: [{ name: "Aura Pro Wireless ANC Headphones", price: 249.99, quantity: 1 }],
    totalAmount: 249.99,
    status: "In Transit",
    courier: "Pathao Express Courier",
    trackingNumber: "TRK-99401827",
    estimatedDelivery: "July 28, 2026 (1-2 business days)",
    address: "742 Evergreen Terrace, Springfield"
  };

  const handleDownloadInvoice = () => {
    // Generate Invoice Text & Open Print/Download Window
    const invoiceContent = `
==================================================
           AURA AI E-COMMERCE OFFICIAL INVOICE
==================================================
Order ID: #${order.id}
Date: ${new Date().toLocaleDateString()}
Customer Name: ${order.customerName}
Shipping Address: ${order.address}
Courier Partner: ${order.courier} (Tracking: ${order.trackingNumber})

--------------------------------------------------
ITEMS ORDERED:
${order.items.map(i => `- ${i.name} x${i.quantity || 1} @ $${i.price?.toFixed(2)}`).join("\n")}
--------------------------------------------------
TOTAL AMOUNT PAID: $${order.totalAmount?.toFixed(2)}
PAYMENT STATUS: Confirmed (Paid)
--------------------------------------------------
Thank you for shopping with AURA AI!
Engineered & Designed by Fouzi
==================================================
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AURA_Invoice_${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-3 p-4 bg-white border border-purple-200 rounded-2xl shadow-md space-y-3 text-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs">
          <Truck className="w-4 h-4 text-purple-600" />
          <span>Live Order Tracking & Shipment Status</span>
        </div>
        <span className="font-mono text-xs text-cyan-700 font-black">#{order.id}</span>
      </div>

      {/* Shipment Timeline Progress Bar */}
      <div className="py-2">
        <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-600 mb-1.5">
          <span className="text-emerald-600">Order Placed</span>
          <span className="text-emerald-600">Processing</span>
          <span className="text-purple-700 font-black">In Transit</span>
          <span className="text-slate-400">Delivered</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
          <div className="h-full bg-emerald-500 w-1/3" />
          <div className="h-full bg-emerald-500 w-1/3" />
          <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 w-1/4 animate-pulse" />
          <div className="h-full bg-slate-200 flex-1" />
        </div>
      </div>

      {/* Order Info Grid */}
      <div className="space-y-1.5 text-xs text-slate-800 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-purple-600" /> Item:
          </span>
          <span className="font-bold text-slate-900 truncate max-w-[180px]">
            {order.items[0]?.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-cyan-600" /> Courier:
          </span>
          <span className="font-bold text-slate-900">{order.courier}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Est. Delivery:
          </span>
          <span className="font-bold text-emerald-700">{order.estimatedDelivery}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" /> Tracking Code:
          </span>
          <span className="font-mono font-bold text-purple-700">{order.trackingNumber}</span>
        </div>
      </div>

      {/* Download Invoice Button */}
      <button
        onClick={handleDownloadInvoice}
        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
      >
        <Download className="w-4 h-4 text-cyan-400" />
        <span>Download Official Invoice TXT / PDF</span>
      </button>

    </div>
  );
}
