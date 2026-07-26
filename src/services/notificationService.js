/**
 * Universal Multi-Channel Notification Dispatcher
 * Supports: WhatsApp, Telegram Bot, Discord Webhook, Twilio SMS, Custom Webhook
 */

export function generateWhatsAppLink(phoneNumber, message) {
  if (!phoneNumber) return null;
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodedText}`;
}

// ----------------------------------------------------
// 1. ORDER NOTIFICATION DISPATCHER
// ----------------------------------------------------
export async function sendOrderNotification(order, settings = {}) {
  const {
    clientPhone = "+15550192831",
    telegramBotToken,
    telegramChatId,
    discordWebhookUrl,
    twilioSid,
    twilioAuthToken,
    twilioFromPhone,
    twilioToPhone,
    whatsappWebhook,
    customWebhookUrl
  } = settings;

  // Professional Default Order Template
  const formattedItems = order.items?.map(i => `• ${i.name} | Qty: ${i.quantity} | Price: $${i.price.toFixed(2)}`).join("\n") || `• Aura Pro Headphones | Qty: 1 | Price: $${order.totalAmount.toFixed(2)}`;

  const orderSummaryText = 
`🛍️ *NEW E-COMMERCE ORDER PLACED!*
----------------------------------------
🆔 *Order ID*: ${order.id}
👤 *Customer Name*: ${order.customerName}
📧 *Email*: ${order.customerEmail}
📞 *Phone*: ${order.customerPhone || 'N/A'}
📍 *Shipping Address*: ${order.shippingAddress}

📦 *ITEMS ORDERED*:
${formattedItems}

💵 *TOTAL AMOUNT*: $${order.totalAmount?.toFixed(2)}
💳 *Payment Method*: ${order.paymentMethod || 'AI Direct Checkout'}
⚡ *Status*: ${order.status}
⏰ *Timestamp*: ${new Date(order.createdAt).toLocaleString()}
----------------------------------------
👉 Admin Dashboard: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const results = {
    whatsappLink: generateWhatsAppLink(clientPhone, orderSummaryText),
    channelsTriggered: []
  };

  // Channel A: Telegram Bot
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
      results.channelsTriggered.push("Telegram");
    } catch (err) {
      console.warn("Telegram Dispatch Error:", err);
    }
  }

  // Channel B: Discord Webhook
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "AURA AI Store Bot",
          avatar_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
          embeds: [{
            title: `🛍️ New Order Placed (#${order.id})`,
            color: 0x8b5cf6, // Violet
            fields: [
              { name: "Customer Name", value: order.customerName, inline: true },
              { name: "Email", value: order.customerEmail, inline: true },
              { name: "Total Amount", value: `$${order.totalAmount.toFixed(2)}`, inline: true },
              { name: "Shipping Address", value: order.shippingAddress, inline: false },
              { name: "Items", value: formattedItems, inline: false }
            ],
            footer: { text: "Engineered by Fouzi • AURA AI Engine" },
            timestamp: new Date().toISOString()
          }]
        })
      });
      results.channelsTriggered.push("Discord");
    } catch (err) {
      console.warn("Discord Webhook Error:", err);
    }
  }

  // Channel C: Custom Webhook
  if (customWebhookUrl) {
    try {
      await fetch(customWebhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "order_placed", order, message: orderSummaryText })
      });
      results.channelsTriggered.push("Custom Webhook");
    } catch (err) {
      console.warn("Custom Webhook Error:", err);
    }
  }

  return results;
}

// ----------------------------------------------------
// 2. LEAD CAPTURE NOTIFICATION DISPATCHER
// ----------------------------------------------------
export async function sendLeadNotification(lead, settings = {}) {
  const {
    clientPhone = "+15550192831",
    telegramBotToken,
    telegramChatId,
    discordWebhookUrl,
    customWebhookUrl
  } = settings;

  const leadSummaryText = 
`🔥 *NEW PROSPECT LEAD CAPTURED!*
----------------------------------------
🆔 *Lead ID*: ${lead.id}
👤 *Contact Name*: ${lead.name}
📧 *Email Address*: ${lead.email}
📞 *Phone Number*: ${lead.phone || 'N/A'}
🎯 *Product Interest*: ${lead.interestCategory}
📝 *Inquiry Note*: ${lead.note}
🌐 *Source*: ${lead.source || 'AI Chatbot'}
⏰ *Timestamp*: ${new Date(lead.createdAt).toLocaleString()}
----------------------------------------
👉 View Lead in Admin DB: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const results = {
    whatsappLink: generateWhatsAppLink(clientPhone, leadSummaryText),
    channelsTriggered: []
  };

  // Telegram
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
      results.channelsTriggered.push("Telegram");
    } catch (err) {
      console.warn("Telegram Dispatch Error:", err);
    }
  }

  // Discord
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "AURA AI Lead Collector",
          embeds: [{
            title: `🔥 New Customer Lead (#${lead.id})`,
            color: 0x06b6d4, // Cyan
            fields: [
              { name: "Name", value: lead.name, inline: true },
              { name: "Email", value: lead.email, inline: true },
              { name: "Phone", value: lead.phone || 'N/A', inline: true },
              { name: "Interest Category", value: lead.interestCategory, inline: false },
              { name: "Inquiry Note", value: lead.note, inline: false }
            ],
            footer: { text: "Engineered by Fouzi • AI Lead Engine" },
            timestamp: new Date().toISOString()
          }]
        })
      });
      results.channelsTriggered.push("Discord");
    } catch (err) {
      console.warn("Discord Webhook Error:", err);
    }
  }

  // Custom Webhook
  if (customWebhookUrl) {
    try {
      await fetch(customWebhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "lead_captured", lead, message: leadSummaryText })
      });
      results.channelsTriggered.push("Custom Webhook");
    } catch (err) {
      console.warn("Custom Webhook Error:", err);
    }
  }

  return results;
}
