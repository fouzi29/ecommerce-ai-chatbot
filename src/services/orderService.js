import { getStoredOrders, saveStoredOrders, getStoredLeads, saveStoredLeads } from "../data/mockDatabase";
import { sendOrderNotification, sendLeadNotification } from "./notificationService";

/**
 * Service handler for Direct AI Order Placement & Customer Lead Collection
 */

// Place a new Direct Order via AI Chatbot
export function placeAiDirectOrder({
  customerName = "Shopper User",
  customerEmail = "customer@example.com",
  customerPhone = "+1 (555) 000-0000",
  shippingAddress = "742 Evergreen Terrace, Springfield",
  items = [],
  totalAmount = 0
}) {
  const currentOrders = getStoredOrders();
  const orderId = `AU-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    id: orderId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    items: items.length > 0 ? items : [{ id: "prod-1", name: "Aura Pro Headphones", price: 249.99, quantity: 1 }],
    totalAmount: totalAmount > 0 ? totalAmount : 249.99,
    status: "Processing",
    paymentMethod: "AI Instant Direct Checkout",
    createdAt: new Date().toISOString()
  };

  const updatedOrders = [newOrder, ...currentOrders];
  saveStoredOrders(updatedOrders);

  // Trigger Instant WhatsApp & SMS Client Alert
  const savedSettings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");
  sendOrderNotification(newOrder, savedSettings);

  return newOrder;
}

// Capture a new Customer Lead via AI Chatbot
export function captureCustomerLead({
  name = "New Prospect",
  email = "",
  phone = "",
  interestCategory = "General Tech",
  note = "Captured via AI Assistant Chatbot"
}) {
  const currentLeads = getStoredLeads();
  const leadId = `LEAD-${Math.floor(100 + Math.random() * 900)}`;

  const newLead = {
    id: leadId,
    name,
    email,
    phone,
    interestCategory,
    note,
    source: "AI Shopping Assistant",
    status: "New Lead",
    createdAt: new Date().toISOString()
  };

  const updatedLeads = [newLead, ...currentLeads];
  saveStoredLeads(updatedLeads);

  // Trigger Instant WhatsApp & SMS Client Alert
  const savedSettings = JSON.parse(localStorage.getItem("aura_ai_settings") || "{}");
  sendLeadNotification(newLead, savedSettings);

  return newLead;
}

// Export Orders to CSV
export function exportOrdersToCsv(orders = []) {
  if (!orders.length) return;
  const headers = ["Order ID", "Customer Name", "Email", "Items Count", "Total ($)", "Status", "Date"];
  const rows = orders.map(o => [
    o.id,
    `"${o.customerName}"`,
    o.customerEmail,
    o.items?.length || 1,
    o.totalAmount.toFixed(2),
    o.status,
    new Date(o.createdAt).toLocaleDateString()
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  downloadFile(csvContent, `aura-orders-export-${Date.now()}.csv`, "text/csv");
}

// Export Leads to CSV
export function exportLeadsToCsv(leads = []) {
  if (!leads.length) return;
  const headers = ["Lead ID", "Name", "Email", "Phone", "Interest Category", "Status", "Date"];
  const rows = leads.map(l => [
    l.id,
    `"${l.name}"`,
    l.email,
    l.phone || "N/A",
    `"${l.interestCategory}"`,
    l.status,
    new Date(l.createdAt).toLocaleDateString()
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  downloadFile(csvContent, `aura-leads-export-${Date.now()}.csv`, "text/csv");
}

function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
