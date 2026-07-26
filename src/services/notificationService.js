/**
 * Service Handler for Instant WhatsApp & SMS Order/Lead Notifications
 */

// Generate a WhatsApp Click-to-Chat Link for instant client messaging
export function generateWhatsAppLink(phoneNumber, message) {
  if (!phoneNumber) return null;
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodedText}`;
}

// Send Instant Order Notification to Client WhatsApp / SMS / Webhook
export async function sendOrderNotification(order, notificationSettings = {}) {
  const { clientPhone, whatsappWebhook, enableWhatsapp = true } = notificationSettings;

  const orderMessage = `🚨 *NEW AI ORDER PLACED!* 🛍️\n\n` +
    `• *Order ID*: ${order.id}\n` +
    `• *Customer*: ${order.customerName}\n` +
    `• *Email*: ${order.customerEmail}\n` +
    `• *Items*: ${order.items?.map(i => `${i.name} (x${i.quantity})`).join(", ") || "Aura Headphones"}\n` +
    `• *Total Amount*: $${order.totalAmount?.toFixed(2)}\n` +
    `• *Status*: ${order.status}\n` +
    `• *Date*: ${new Date(order.createdAt).toLocaleString()}\n\n` +
    `👉 View in Admin Dashboard: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const waLink = generateWhatsAppLink(clientPhone || "+15550192831", orderMessage);

  // Send Webhook if configured
  if (whatsappWebhook) {
    try {
      await fetch(whatsappWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_order", order, message: orderMessage })
      });
    } catch (err) {
      console.warn("WhatsApp Webhook Notification Warning:", err);
    }
  }

  return {
    success: true,
    whatsappLink: waLink,
    message: orderMessage
  };
}

// Send Instant Lead Notification to Client WhatsApp / SMS / Webhook
export async function sendLeadNotification(lead, notificationSettings = {}) {
  const { clientPhone, whatsappWebhook } = notificationSettings;

  const leadMessage = `🔥 *NEW PROSPECT LEAD CAPTURED!* 👥\n\n` +
    `• *Lead ID*: ${lead.id}\n` +
    `• *Name*: ${lead.name}\n` +
    `• *Email*: ${lead.email}\n` +
    `• *Phone*: ${lead.phone || 'N/A'}\n` +
    `• *Interest*: ${lead.interestCategory}\n` +
    `• *Note*: ${lead.note}\n` +
    `• *Date*: ${new Date(lead.createdAt).toLocaleString()}\n\n` +
    `👉 View Lead in Admin DB: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const waLink = generateWhatsAppLink(clientPhone || "+15550192831", leadMessage);

  // Send Webhook if configured
  if (whatsappWebhook) {
    try {
      await fetch(whatsappWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_lead", lead, message: leadMessage })
      });
    } catch (err) {
      console.warn("WhatsApp Webhook Notification Warning:", err);
    }
  }

  return {
    success: true,
    whatsappLink: waLink,
    message: leadMessage
  };
}
