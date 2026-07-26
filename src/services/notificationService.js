/**
 * Automated WhatsApp & SMS Notification Dispatcher
 * Supports: CallMeBot Free API, UltraMsg / GreenAPI Gateway, Twilio WhatsApp/SMS API, Discord, Telegram
 */

export function generateWhatsAppLink(phoneNumber, message) {
  if (!phoneNumber) return null;
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodedText}`;
}

// ----------------------------------------------------
// 1. AUTOMATED ORDER NOTIFICATION (BACKGROUND DISPATCH)
// ----------------------------------------------------
export async function sendOrderNotification(order, settings = {}) {
  const {
    clientPhone = "+8801755690467",
    whatsappGatewayProvider = "callmebot", // "callmebot", "ultramsg", "twilio", "custom"
    callMeBotApiKey,
    ultraMsgInstanceId,
    ultraMsgToken,
    twilioSid,
    twilioAuthToken,
    twilioFromPhone,
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

  // --- AUTOMATIC BACKGROUND WHATSAPP DISPATCH ---

  // Option 1: CallMeBot Free WhatsApp API (Auto background send)
  if (whatsappGatewayProvider === "callmebot" || callMeBotApiKey) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(orderSummaryText)}&apikey=${encodeURIComponent(callMeBotApiKey || '123456')}`;
      fetch(callMeBotUrl, { mode: 'no-cors' }).catch(() => {});
      results.channelsTriggered.push("CallMeBot WhatsApp (Auto)");
    } catch (err) {
      console.warn("CallMeBot Error:", err);
    }
  }

  // Option 2: UltraMsg WhatsApp Gateway (Auto background send)
  if (whatsappGatewayProvider === "ultramsg" && ultraMsgInstanceId && ultraMsgToken) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const ultraMsgUrl = `https://api.ultramsg.com/${ultraMsgInstanceId}/messages/chat`;
      await fetch(ultraMsgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          token: ultraMsgToken,
          to: cleanPhone,
          body: orderSummaryText
        })
      });
      results.channelsTriggered.push("UltraMsg WhatsApp Gateway");
    } catch (err) {
      console.warn("UltraMsg Error:", err);
    }
  }

  // Option 3: Twilio WhatsApp / SMS API
  if (twilioSid && twilioAuthToken && twilioFromPhone) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const authHeader = "Basic " + btoa(`${twilioSid}:${twilioAuthToken}`);
      
      await fetch(twilioUrl, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          From: twilioFromPhone.startsWith("whatsapp:") ? twilioFromPhone : `whatsapp:${twilioFromPhone}`,
          To: `whatsapp:${cleanPhone}`,
          Body: orderSummaryText
        })
      });
      results.channelsTriggered.push("Twilio WhatsApp/SMS");
    } catch (err) {
      console.warn("Twilio API Error:", err);
    }
  }

  // Option 4: Telegram Bot
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

  // Option 5: Discord Webhook
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
            footer: { text: "Engineered by Fouzi • Automated Admin WhatsApp Gateway" },
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
// 2. AUTOMATED LEAD NOTIFICATION (BACKGROUND DISPATCH)
// ----------------------------------------------------
export async function sendLeadNotification(lead, settings = {}) {
  const {
    clientPhone = "+8801755690467",
    whatsappGatewayProvider = "callmebot",
    callMeBotApiKey,
    ultraMsgInstanceId,
    ultraMsgToken,
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

  // CallMeBot Free API
  if (whatsappGatewayProvider === "callmebot" || callMeBotApiKey) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(leadSummaryText)}&apikey=${encodeURIComponent(callMeBotApiKey || '123456')}`;
      fetch(callMeBotUrl, { mode: 'no-cors' }).catch(() => {});
      results.channelsTriggered.push("CallMeBot WhatsApp (Auto)");
    } catch (err) {
      console.warn("CallMeBot Error:", err);
    }
  }

  // UltraMsg WhatsApp Gateway
  if (whatsappGatewayProvider === "ultramsg" && ultraMsgInstanceId && ultraMsgToken) {
    try {
      const cleanPhone = clientPhone.replace(/[^\d+]/g, '');
      const ultraMsgUrl = `https://api.ultramsg.com/${ultraMsgInstanceId}/messages/chat`;
      await fetch(ultraMsgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          token: ultraMsgToken,
          to: cleanPhone,
          body: leadSummaryText
        })
      });
      results.channelsTriggered.push("UltraMsg WhatsApp Gateway");
    } catch (err) {
      console.warn("UltraMsg Error:", err);
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
          text: leadSummaryText,
          parse_mode: "Markdown"
        })
      });
      results.channelsTriggered.push("Telegram Bot");
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
            footer: { text: "Engineered by Fouzi • Automated Admin WhatsApp Gateway" },
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
