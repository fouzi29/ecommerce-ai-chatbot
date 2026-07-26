import { placeAiDirectOrder } from "./orderService";

/**
 * Smart Sales Conversion AI Generator for Demo Mode
 * Persuades shoppers to place direct orders or collects minimum lead contact info
 */
export async function sendMockAiRequest({ userQuery, storeContext }) {
  await new Promise(resolve => setTimeout(resolve, 500));

  const query = userQuery.toLowerCase();
  const products = storeContext.products || [];

  let text = "";
  let recommendedProductIds = [];
  let showCheckoutForm = false;
  let itemToOrder = null;
  let showLeadForm = false;

  // 1. DIRECT ORDER INTENT -> Opens Order Checkout Form
  if (query.includes("order") || query.includes("buy") || query.includes("checkout") || query.includes("purchase") || query.includes("reserve")) {
    itemToOrder = products.find(p => query.includes(p.category.toLowerCase()) || p.name.toLowerCase().includes("headphone") || query.includes(p.tags[0])) || products[0];

    showCheckoutForm = true;
    text = `🔥 **Excellent Choice! Let's reserve your order**:

Selected Item: **${itemToOrder.name}** ($${itemToOrder.price.toFixed(2)}).

🎁 **Bonus**: Apply promo code \`AURA20\` for 20% OFF! Please fill out your details below to confirm express delivery:`;
  }
  // 2. LEAD CAPTURE INTENT / QUOTE / BULK / VIP
  else if (query.includes("quote") || query.includes("contact") || query.includes("lead") || query.includes("vip") || query.includes("bulk") || query.includes("discount") || query.includes("promo")) {
    showLeadForm = true;
    text = `🎉 **Exclusive 20% VIP Discount & Custom Quote Request**:

I would love to lock in an exclusive **20% VIP discount code (\`AURA20\`)** and prepare a custom spec sheet for you!

Please enter your contact details below so our team can send your custom VIP quote:`;
  }
  // 3. ORDER TRACKING
  else if (query.includes("track") || query.includes("status") || query.includes("#au-")) {
    text = `📦 **Order Status Lookup**:
Your order **#AU-8821** is currently **In Transit** via Express Courier!

• **Expected Delivery**: July 28, 2026 (1-2 business days)  
• **Shipping Address**: 742 Evergreen Terrace  
• **Items**: 1x *Aura Pro Wireless ANC Headphones*  

Tracking Number: \`TRK-99401827\`.`;
  }
  // 4. AUDIO / HEADPHONES INQUIRY -> High Conversion Pitch & Lead Capture Prompt
  else if (query.includes("headphone") || query.includes("audio") || query.includes("earbud") || query.includes("anc") || query.includes("sound")) {
    const audioItems = products.filter(p => p.category === "Audio");
    recommendedProductIds = audioItems.map(p => p.id);
    showLeadForm = true;

    text = `🎵 **Top Wireless Audio Gear (Limited Stock Alert!)**:

1. **Aura Pro Wireless ANC Headphones** ($249.99) — 40hr battery life, spatial audio & active noise cancellation.
2. **Aura Pods Pro Wireless Earbuds** ($159.99) — IPX7 sweatproof & wireless charging.

💡 **Limited Offer**: Use promo code **\`AURA20\`** for **20% OFF** today!

Say *"Order headphones"* to buy right now, or fill out the quick VIP lead form below so I can reserve your discount!`;
  }
  // 5. TECH / KEYBOARD / WATCH INQUIRY -> High Conversion Pitch & Lead Capture Prompt
  else if (query.includes("keyboard") || query.includes("watch") || query.includes("mouse") || query.includes("tech") || query.includes("gear")) {
    const techItems = products.filter(p => p.category === "Tech" || p.category === "Wearables");
    recommendedProductIds = techItems.slice(0, 2).map(p => p.id);
    showLeadForm = true;

    text = `⚡ **Recommended High-Performance Workstation Gear**:

1. **Nexus Ultra Smartwatch Gen 5** ($199.50) — AMOLED display & 7-day battery.
2. **Luminary Mechanical RGB Keyboard** ($129.99) — Hot-swappable tactile switches.

🎁 Claim **20% OFF** with code **\`AURA20\`**! Say *"Order smartwatch"* to buy directly, or fill out your contact info below to receive a custom quote:`;
  }
  // 6. GENERAL INQUIRY / PERSUASIVE CONVERSION & MINIMUM LEAD COLLECTION
  else {
    showLeadForm = true;
    text = `👋 Hi there! I'm **AURA AI**, your personal shopping assistant.

I can help you:
• **Order Gear Instantly**: Say *"Order Aura Headphones"*.
• **Get 20% OFF Promo Code**: Use code \`AURA20\` at checkout!

Not ready to buy yet? Enter your contact info below to lock in a minimum 20% VIP discount code for your next visit!`;
  }

  return {
    text,
    recommendedProductIds,
    showCheckoutForm,
    itemToOrder,
    showLeadForm
  };
}
