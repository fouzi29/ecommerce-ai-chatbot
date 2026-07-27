# 🚀 AURA AI Chatbot — Client Website Integration & Transfer Guide

> **Prepared by Fouzi**  
> *Complete step-by-step instructions for embedding and transferring the AI Chatbot to any client website (Shopify, WooCommerce, WordPress, Custom HTML/PHP, React, Next.js).*

---

## 📌 4 Seamless Integration Methods

---

### Method A: 1-Line Widget Embed (Any Website — WordPress, Custom HTML, PHP, Shopify, Wix, Webflow)

To embed this AI Assistant on any client website without modifying their core codebase, copy and paste this single script tag right before the closing `</body>` tag:

```html
<!-- AURA AI E-Commerce Shopping Assistant Widget -->
<script 
  src="https://ecommerce-ai-chatbot-ochre.vercel.app/embed.js" 
  data-store-id="client-store-001" 
  data-api-provider="demo" 
  async>
</script>
```

---

### Method B: Shopify & WooCommerce Live Catalog Connection

If your client runs a **Shopify** or **WooCommerce** store:

1. Open the **SaaS AI Settings Modal** (Click the `Smart Demo` / `Settings` button in the top navbar).
2. Under **Database Sync Mode**, select:
   - **Shopify Storefront API**: Enter the Client's Shopify Store Domain (`mystore.myshopify.com`) and Storefront Access Token.
   - **WooCommerce REST API**: Enter Store Domain, Consumer Key (`ck_...`), and Consumer Secret (`cs_...`).
3. Click **Save Settings**. The chatbot will automatically query the client's live inventory, prices, images, and product specs!

---

### Method C: Custom Backend & REST Database Connection (PHP / MySQL / Node.js / Supabase)

For clients with custom backends:

1. In the **SaaS AI Settings Modal**, select **Custom REST API** or **Supabase**.
2. Enter the client's API Base URL (e.g., `https://clientstore.com/api/products`).
3. The chatbot accepts standard JSON product arrays and dispatches orders to `POST https://clientstore.com/api/orders`.

---

### Method D: Complete Repository & Vercel Project Transfer to Client

If the client wants full ownership of the project code and Vercel hosting:

#### 1. Transfer GitHub Repository
1. On GitHub, go to your repository: `https://github.com/fouzi29/ecommerce-ai-chatbot`.
2. Click **Settings** ➔ Scroll to **Danger Zone** ➔ Click **Transfer Ownership**.
3. Enter the client's GitHub username or organization name.

#### 2. Transfer Vercel Project
1. Log in to [Vercel](https://vercel.com).
2. Go to `ecommerce-ai-chatbot-ochre` project settings.
3. Click **Transfer Project** and enter the client's Vercel Account or Team Name.

---

## 💬 Instant Automated Alerts Setup for Client

To ensure the client receives mobile alerts on their phone whenever a customer orders or submits a lead:
- **TextMeBot WhatsApp**: Go to [https://textmebot.com/](https://textmebot.com/), generate an API Key, and paste it into Settings.
- **Telegram Bot**: Enter Bot Token & Chat ID in Settings.
- **Discord Webhook**: Enter Webhook URL in Settings.

---

## 👨‍💻 Support & Custom Integration Services

Need help customizing this chatbot for a client? Connect with Fouzi:
- 👔 **LinkedIn**: [https://www.linkedin.com/in/mdfouzi/](https://www.linkedin.com/in/mdfouzi/)
- 📌 **Fiverr Profile**: [https://www.fiverr.com/s/e6BNbv3](https://www.fiverr.com/s/e6BNbv3)
- 🚀 **Custom AI Chatbot Gig**: [https://www.fiverr.com/s/GzVdLez](https://www.fiverr.com/s/GzVdLez)
