import { placeAiDirectOrder } from "./orderService";

/**
 * Smart Offline Mock AI Generator for Demo Mode
 * Handles Pre-Order Details Collection (Name, Email, Phone, Address), Lead Capture, and Catalog Recommendations
 */
export async function sendMockAiRequest({ userQuery, storeContext }) {
  await new Promise(resolve => setTimeout(resolve, 600));

  const query = userQuery.toLowerCase();
  const products = storeContext.products || [];

  let text = "";
  let recommendedProductIds = [];
  let showCheckoutForm = false;
  let itemToOrder = null;
  let showLeadForm = false;

  // 1. Order Intent Trigger -> Shows Interactive Form to collect Name, Email, Phone, & Address!
  if (query.includes("order") || query.includes("buy") || query.includes("checkout")) {
    // Identify item
    itemToOrder = products.find(p => query.includes(p.category.toLowerCase()) || p.name.toLowerCase().includes("headphone") || query.includes(p.tags[0])) || products[0];

    showCheckoutForm = true;
    text = `🛒 **AI Instant Checkout Details Required**:

Great choice! You selected **${itemToOrder.name}** ($${itemToOrder.price.toFixed(2)}).

Before I place your order, please fill out your contact details & shipping address below:`;
  }
  // 2. Lead Capture Trigger
  else if (query.includes("quote") || query.includes("contact") || query.includes("lead") || query.includes("vip") || query.includes("custom discount") || query.includes("bulk")) {
    showLeadForm = true;
    text = `📋 **VIP Lead & Custom Quote Request**:

I would be happy to prepare a customized quote and exclusive VIP discount code for you! 

Please fill out your contact details below, and our lead collector will save your inquiry directly to the Admin Database:`;
  }
  // 3. Order status lookup
  else if (query.includes("track") || query.includes("status") || query.includes("#au-")) {
    text = `📦 **Order Status Lookup**:
Your order **#AU-8821** is currently **In Transit** via Express Courier!

• **Expected Delivery**: July 28, 2026 (1-2 business days)  
• **Shipping Address**: 742 Evergreen Terrace  
• **Items**: 1x *Aura Pro Wireless ANC Headphones*  

Tracking Number: \`TRK-99401827\`.`;
  }
  // 4. Discount & Promos
  else if (query.includes("discount") || query.includes("promo") || query.includes("code") || query.includes("coupon") || query.includes("sale")) {
    text = `🎉 **Current Active Store Promotions**:

1. **\`AURA20\`** — Save **20% OFF** on any order over $100.
2. **\`FREESHIP\`** — Get **Free Express Shipping** on orders over $75.

Enter the promo code in your Shopping Cart drawer during checkout to claim your discount!`;
  }
  // 5. Audio / Headphones
  else if (query.includes("headphone") || query.includes("audio") || query.includes("earbud") || query.includes("anc")) {
    const audioItems = products.filter(p => p.category === "Audio");
    recommendedProductIds = audioItems.map(p => p.id);
    text = `🎵 **Top Audio Gear Recommendations**:

- **Aura Pro Wireless ANC Headphones** ($249.99) — 40hr battery life & ANC.
- **Aura Pods Pro True Wireless Earbuds** ($159.99) — IPX7 sweatproof.

Say *"Order headphones"* to fill out shipping details and order directly in chat!`;
  }
  // 6. Tech / Keyboards
  else if (query.includes("keyboard") || query.includes("mouse") || query.includes("tech") || query.includes("webcam")) {
    const techItems = products.filter(p => p.category === "Tech");
    recommendedProductIds = techItems.map(p => p.id);
    text = `⚡ **Essential Tech Workstation Gear**:

- **Luminary Mechanical RGB Keyboard** ($129.99)
- **Vortex Precision Gaming Mouse** ($69.99)
- **Horizon 4K HDR Web Camera** ($89.99)`;
  }
  // 7. General Fallback
  else {
    text = `Hello! I'm **AURA AI**, your personalized shopping assistant.

I can help you:
• **Place Direct Orders**: Say *"Order Aura Headphones"*.
• **Request Custom Quotes**: Say *"Request custom quote"*.
• **Recommend Products**: Ask for headphones, keyboards, or smartwatches.
• **Track Packages**: Ask about order \`#AU-8821\`.`;
  }

  return {
    text,
    recommendedProductIds,
    showCheckoutForm,
    itemToOrder,
    showLeadForm
  };
}
