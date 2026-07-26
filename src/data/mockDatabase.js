/**
 * Persistent Data Store for AI Placed Orders & Captured Customer Leads
 */

const DEFAULT_ORDERS = [
  {
    id: "AU-9821",
    customerName: "Alex Rivera",
    customerEmail: "alex.rivera@example.com",
    customerPhone: "+1 (555) 234-5678",
    shippingAddress: "742 Evergreen Terrace, Springfield, IL",
    items: [
      { id: "prod-1", name: "Aura Pro Wireless ANC Headphones", price: 249.99, quantity: 1 }
    ],
    totalAmount: 249.99,
    status: "Processing",
    paymentMethod: "AI Direct Checkout (Credit Card)",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "AU-9820",
    customerName: "Sarah Connor",
    customerEmail: "sarah.c@example.com",
    customerPhone: "+1 (555) 876-5432",
    shippingAddress: "100 Ocean Drive, Miami, FL",
    items: [
      { id: "prod-3", name: "Luminary Mechanical RGB Keyboard", price: 129.99, quantity: 1 }
    ],
    totalAmount: 129.99,
    status: "Completed",
    paymentMethod: "AI Direct Checkout",
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const DEFAULT_LEADS = [
  {
    id: "LEAD-101",
    name: "Michael Scott",
    email: "m.scott@dundermifflin.com",
    phone: "+1 (555) 998-1122",
    interestCategory: "Audio & Noise Canceling",
    note: "Interested in bulk discount for 10 Aura Headphones.",
    source: "AI Chatbot Assistant",
    status: "New Lead",
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: "LEAD-102",
    name: "Jessica Alba",
    email: "jessica@honest.com",
    phone: "+1 (555) 334-9988",
    interestCategory: "Smart Wearables",
    note: "Requested VIP promo code for Smartwatch Gen 5.",
    source: "AI Chatbot Lead Form",
    status: "Contacted",
    createdAt: new Date(Date.now() - 129600000).toISOString()
  }
];

// Helper functions for persistent LocalStorage DB
export function getStoredOrders() {
  const saved = localStorage.getItem("aura_db_orders");
  return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
}

export function saveStoredOrders(orders) {
  localStorage.setItem("aura_db_orders", JSON.stringify(orders));
}

export function getStoredLeads() {
  const saved = localStorage.getItem("aura_db_leads");
  return saved ? JSON.parse(saved) : DEFAULT_LEADS;
}

export function saveStoredLeads(leads) {
  localStorage.setItem("aura_db_leads", JSON.stringify(leads));
}
