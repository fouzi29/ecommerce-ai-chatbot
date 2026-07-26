/**
 * Universal Multi-Channel Notification Dispatcher
 * Supports: WhatsApp (Click-to-Chat & CallMeBot Free API), Telegram Bot, Discord Webhook, Custom Webhooks
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
    callMeBotApiKey,
    telegramBotToken,
    telegramChatId,
    discordWebhookUrl,
    whatsappWebhook,
    customWebhookUrl
  } = settings;

  const formattedItems = order.items?.map(i => `• ${i.name} (Qty: ${i.quantity}) - $${i.price.toFixed(2)}`).join("\n") || `• Aura Headphones - $${order.totalAmount.toFixed(2)}`;

  const orderSummaryText = 
`🛍️ *NEW AI ORDER PLACED!*
----------------------------------------
🆔 *Order ID*: ${order.id}
👤 *Customer*: ${order.customerName}
📧 *Email*: ${order.customerEmail}
📞 *Phone*: ${order.customerPhone || 'N/A'}
📍 *Address*: ${order.shippingAddress}

📦 *ITEMS*:
${formattedItems}

💵 *TOTAL*: $${order.totalAmount?.toFixed(2)}
⚡ *Status*: ${order.status}
⏰ *Time*: ${new Date(order.createdAt).toLocaleString()}
----------------------------------------
👉 Admin Dashboard: https://ecommerce-ai-chatbot-fouzi29.vercel.app/?admin=true`;

  const waLink = generateWhatsAppLink(clientPhone, orderSummaryText);
  const results = { whatsappLink: waLink, channelsTriggered: [] };

  // Free CallMeBot Automatic WhatsApp API
  if (clientPhone && callMeBotApiKey) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(orderSummaryText)}&apikey=${encodeURIComponent(callMeBotApiKey)}`;
      fetch(callMeBotUrl, { mode: 'no-cors' }).catch(() => {});
      results.channelsTriggered.push("CallMeBot WhatsApp");
    } catch (err) {
      console.warn("CallMeBot Error:", err);
    }
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
      results.channelsTriggered.push("Telegram");
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
          username: "AURA AI Store Bot",
          embeds: [{
            title: `🛍️ New Order Placed (#${order.id})`,
            color: 0x8b5cf6,
            fields: [
              { name: "Customer Name", value: order.customerName, inline: true },
              { name: "Email", value: order.customerEmail, inline: true },
              { name: "Total", value: `$${order.totalAmount.toFixed(2)}`, inline: true },
              { name: "Address", value: order.shippingAddress, inline: false },
              { name: "Items", value: formattedItems, inline: false }
            ],
            footer: { text: "Engineered by Fouzi • AURA AI Store" },
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
  if (customWebhookUrl || whatsappWebhook) {
    const targetUrl = (customWebhookUrl || whatsappWebhook).trim();
    try {
      await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "order_placed", order, message: orderSummaryText })
      });
      results.channelsTriggered.push("Webhook");
    } catch (err) {
      console.warn("Webhook Error:", err);
    }
  }

  return results;
}

// ----------------------------------------------------
// 2. LEAD NOTIFICATION DISPATCHER
// ----------------------------------------------------
export async function sendLeadNotification(lead, settings = {}) {
  const {
    clientPhone = "+15550192831",
    callMeBotApiKey,
    telegramBotToken,
    telegramChatId,
    discordWebhookUrl,
    customWebhookUrl
  } = settings;

  const leadSummaryText = 
`🔥 *NEW PROSPECT LEAD CAPTURED!*
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

  // CallMeBot Free API
  if (clientPhone && callMeBotApiKey) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(leadSummaryText)}&apikey=${encodeURIComponent(callMeBotApiKey)}`;
      fetch(callMeBotUrl, { mode: 'no-cors' }).catch(() => {});
      results.channelsTriggered.push("CallMeBot WhatsApp");
    } catch (err) {
      console.warn("CallMeBot Error:", err);
    }
  }

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
      console.warn("Telegram Error:", err);
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
            color: 0x06b6d4,
            fields: [
              { name: "Name", value: lead.name, inline: true },
              { name: "Email", value: lead.email, inline: true },
              { name: "Phone", value: lead.phone || 'N/A', inline: true },
              { name: "Interest", value: lead.interestCategory, inline: false },
              { name: "Note", value: lead.note, inline: false }
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

  return results;
}
