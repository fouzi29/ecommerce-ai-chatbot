import { mockOrders, mockLeads } from "../data/mockDatabase";
import { sendOrderNotification, sendLeadNotification } from "./notificationService";
import { syncOrderToBackend, syncLeadToBackend } from "./databaseService";

// Helper to retrieve saved orders from localStorage
export function getSavedOrders() {
  const saved = localStorage.getItem("aura_db_orders");
  return saved ? JSON.parse(saved) : mockOrders;
}

// Helper to retrieve saved leads from localStorage
export function getSavedLeads() {
  const saved = localStorage.getItem("aura_db_leads");
  return saved ? JSON.parse(saved) : mockLeads;
}

// ----------------------------------------------------
// 1. PLACE DIRECT AI ORDER & SYNC TO CLIENT DB & ALERTS
// ----------------------------------------------------
export function placeAiDirectOrder(orderDetails) {
  const currentOrders = getSavedOrders();

  const newOrder = {
    id: `AU-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: orderDetails.customerName || "Valued Customer",
    customerEmail: orderDetails.customerEmail || "customer@example.com",
    customerPhone: orderDetails.customerPhone || "+15550192831",
    shippingAddress: orderDetails.shippingAddress || "742 Evergreen Terrace, Springfield",
    items: orderDetails.items || [
      { id: "prod-1", name: "Aura Pro Wireless ANC Headphones", price: 249.99, quantity: 1 }
    ],
    totalAmount: orderDetails.totalAmount || 249.99,
    status: "Processing",
    paymentMethod: "AI Instant Direct Checkout",
    createdAt: new Date().toISOString()
  };

  const updatedOrders = [newOrder, ...currentOrders];
  localStorage.setItem("aura_db_orders", JSON.stringify(updatedOrders));

  // Get active SaaS settings
  const settings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");

  // Dispatch multi-channel notifications (WhatsApp, Telegram, Discord)
  sendOrderNotification(newOrder, settings);

  // Dispatch API Sync to client custom database / webhooks (POST /api/orders)
  syncOrderToBackend(newOrder, settings);

  return newOrder;
}

// ----------------------------------------------------
// 2. CAPTURE PROSPECT LEAD & SYNC TO CLIENT DB & ALERTS
// ----------------------------------------------------
export function captureCustomerLead(leadDetails) {
  const currentLeads = getSavedLeads();

  const newLead = {
    id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
    name: leadDetails.name || "Anonymous Prospect",
    email: leadDetails.email || "prospect@example.com",
    phone: leadDetails.phone || "N/A",
    interestCategory: leadDetails.interestCategory || "General Inquiry",
    note: leadDetails.note || "Interested in custom quote / bulk discount",
    source: "AI Chatbot Assistant",
    createdAt: new Date().toISOString()
  };

  const updatedLeads = [newLead, ...currentLeads];
  localStorage.setItem("aura_db_leads", JSON.stringify(updatedLeads));

  // Get active SaaS settings
  const settings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");

  // Dispatch multi-channel notifications
  sendLeadNotification(newLead, settings);

  // Dispatch API Sync to client custom database / webhooks (POST /api/leads)
  syncLeadToBackend(newLead, settings);

  return newLead;
}

// Search Orders
export function searchOrders(query) {
  const orders = getSavedOrders();
  if (!query) return orders;
  const q = query.toLowerCase();
  return orders.filter(
    o =>
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
  );
}

// Export Orders to CSV
export function exportOrdersToCsv() {
  const orders = getSavedOrders();
  const headers = ["Order ID", "Customer Name", "Email", "Phone", "Total Amount", "Status", "Date", "Address"];
  const rows = orders.map(o => [
    o.id,
    `"${o.customerName}"`,
    o.customerEmail,
    o.customerPhone || "N/A",
    `$${o.totalAmount.toFixed(2)}`,
    o.status,
    new Date(o.createdAt).toLocaleDateString(),
    `"${o.shippingAddress}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `aura-orders-export-${Date.now()}.csv`);
  link.click();
}

// Export Leads to CSV
export function exportLeadsToCsv() {
  const leads = getSavedLeads();
  const headers = ["Lead ID", "Name", "Email", "Phone", "Product Interest", "Note", "Source", "Date"];
  const rows = leads.map(l => [
    l.id,
    `"${l.name}"`,
    l.email,
    l.phone || "N/A",
    `"${l.interestCategory}"`,
    `"${l.note}"`,
    l.source,
    new Date(l.createdAt).toLocaleDateString()
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `aura-leads-export-${Date.now()}.csv`);
  link.click();
}
