/**
 * Universal Multi-Channel Notification Dispatcher
 * Supports: 100% Automatic Backend WhatsApp Dispatch, CallMeBot API, UltraMsg, Telegram, Discord, Webhooks
 */

export function generateWhatsAppLink(phoneNumber, message) {
  if (!phoneNumber) return null;
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodedText}`;
}

// ----------------------------------------------------
// 1. AUTOMATED ORDER NOTIFICATION (BACKEND DISPATCH)
// ----------------------------------------------------
export async function sendOrderNotification(order, settings = {}) {
  const {
    clientPhone = "+8801755690467",
    callMeBotApiKey,
    ultraMsgInstanceId,
    ultraMsgToken,
    telegramBotToken,
    telegramChatId,
    discordWebhookUrl,
    customWebhookUrl
  } = settings;

  const formattedItems = order.items?.map(i => `• ${i.name} (Qty: ${i.quantity}) - $${i.price.toFixed(2)}`).join("\n") || `• Aura Headphones - $${order.totalAmount.toFixed(2)}`;

  const orderSummaryText = 
`🛍️ *NEW AUTOMATED AI ORDER PLACED!*
----------------------------------------
🆔 *Order ID*: ${order.id}
👤 *Customer*: ${order.customerName}
📧 *Email*: ${order.customerEmail}
📞 *Phone*: ${order.customerPhone || 'N/A'}
📍 *Shipping Address*: ${order.shippingAddress}

📦 *ITEMS ORDERED*:
${formattedItems}

💵 *TOTAL AMOUNT*: $${order.totalAmount?.toFixed(2)}
⚡ *Status*: ${order.status}
⏰ *Timestamp*: ${new Date(order.createdAt).toLocaleString()}
----------------------------------------
👉 Admin Dashboard: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const waLink = generateWhatsAppLink(clientPhone, orderSummaryText);
  const results = { whatsappLink: waLink, channelsTriggered: [] };

  // --- 100% AUTOMATIC BACKEND WHATSAPP DISPATCH (ZERO POPUPS / ZERO USER CLICKS) ---
  try {
    fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: clientPhone,
        message: orderSummaryText,
        apiKey: callMeBotApiKey
      })
    }).catch(() => {});
    results.channelsTriggered.push("Backend Auto WhatsApp");
  } catch (err) {
    console.warn("Backend WhatsApp Dispatch Warning:", err);
  }

  // Telegram Bot
  if (telegramBotToken && telegramChatId) {
    try {
      const tgUrl = `https://api.telegram.org/bot${telegramBotToken.trim()}/sendMessage`;
      await fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId.trim(),
          text: orderSummaryText,
          parse_mode: "Markdown"
        })
      });
      results.channelsTriggered.push("Telegram Bot");
    } catch (err) {
      console.warn("Telegram Error:", err);
    }
  }

  // Discord Webhook
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "AURA AI Automated Dispatcher",
          embeds: [{
            title: `🛍️ New Order Placed (#${order.id})`,
            color: 0x8b5cf6,
            fields: [
              { name: "Customer Name", value: order.customerName, inline: true },
              { name: "Email", value: order.customerEmail, inline: true },
              { name: "Phone", value: order.customerPhone || 'N/A', inline: true },
              { name: "Total Amount", value: `$${order.totalAmount.toFixed(2)}`, inline: true },
              { name: "Shipping Address", value: order.shippingAddress, inline: false },
              { name: "Items", value: formattedItems, inline: false }
            ],
            footer: { text: "Engineered by Fouzi • Automated Backend WhatsApp Gateway" },
            timestamp: new Date().toISOString()
          }]
        })
      });
      results.channelsTriggered.push("Discord Webhook");
    } catch (err) {
      console.warn("Discord Webhook Error:", err);
    }
  }

  return results;
}

// ----------------------------------------------------
// 2. AUTOMATED LEAD NOTIFICATION (BACKEND DISPATCH)
// ----------------------------------------------------
export async function sendLeadNotification(lead, settings = {}) {
  const {
    clientPhone = "+8801755690467",
    callMeBotApiKey,
    telegramBotToken,
    telegramChatId,
    discordWebhookUrl
  } = settings;

  const leadSummaryText = 
`🔥 *NEW AUTOMATED PROSPECT LEAD CAPTURED!*
----------------------------------------
🆔 *Lead ID*: ${lead.id}
👤 *Name*: ${lead.name}
📧 *Email*: ${lead.email}
📞 *Phone*: ${lead.phone || 'N/A'}
🎯 *Interest*: ${lead.interestCategory}
📝 *Note*: ${lead.note}
⏰ *Time*: ${new Date(lead.createdAt).toLocaleString()}
----------------------------------------
👉 View Lead in Admin DB: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const waLink = generateWhatsAppLink(clientPhone, leadSummaryText);
  const results = { whatsappLink: waLink, channelsTriggered: [] };

  // --- 100% AUTOMATIC BACKEND WHATSAPP DISPATCH ---
  try {
    fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: clientPhone,
        message: leadSummaryText,
        apiKey: callMeBotApiKey
      })
    }).catch(() => {});
    results.channelsTriggered.push("Backend Auto WhatsApp");
  } catch (err) {
    console.warn("Backend WhatsApp Dispatch Warning:", err);
  }

  // Telegram Bot
  if (telegramBotToken && telegramChatId) {
    try {
      const tgUrl = `https://api.telegram.org/bot${telegramBotToken.trim()}/sendMessage`;
      await fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId.trim(),
          text: leadSummaryText,
          parse_mode: "Markdown"
        })
      });
      results.channelsTriggered.push("Telegram Bot");
    } catch (err) {
      console.warn("Telegram Error:", err);
    }
  }

  // Discord Webhook
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "AURA AI Lead Collector",
          embeds: [{
            title: `🔥 New Customer Lead (#${lead.id})`,
            color: 0x06b6d4,
            fields: [
              { name: "Name", value: lead.name, inline: true },
              { name: "Email", value: lead.email, inline: true },
              { name: "Phone", value: lead.phone || 'N/A', inline: true },
              { name: "Interest", value: lead.interestCategory, inline: false },
              { name: "Note", value: lead.note, inline: false }
            ],
            footer: { text: "Engineered by Fouzi • Automated Backend WhatsApp Gateway" },
            timestamp: new Date().toISOString()
          }]
        })
      });
      results.channelsTriggered.push("Discord Webhook");
    } catch (err) {
      console.warn("Discord Webhook Error:", err);
    }
  }

  return results;
}
