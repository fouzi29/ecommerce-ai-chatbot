import { placeAiDirectOrder } from "./orderService";

/**
 * Smart Sales Conversion AI Generator for Demo Mode
 * Intelligently handles ordinals ("order 2nd", "buy 1st", "order pods") & product selection
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

  // Detect Order Intent (Words: "order", "buy", "checkout", "purchase", "reserve", "2nd", "second", "1st", "first", "3rd")
  const isOrderIntent = 
    query.includes("order") || 
    query.includes("buy") || 
    query.includes("checkout") || 
    query.includes("purchase") || 
    query.includes("reserve") || 
    query.includes("2nd") || 
    query.includes("second") || 
    query.includes("1st") || 
    query.includes("first") ||
    query.includes("3rd") ||
    query.includes("third");

  if (isOrderIntent) {
    // 1A. Check if 2ND item is requested: "2nd", "second", "pods", "earbud", "watch", "2"
    if (query.includes("2nd") || query.includes("second") || query.includes("pods") || query.includes("earbud") || query.includes("watch") || query.includes(" 2") || query.endsWith(" 2")) {
      itemToOrder = products.find(p => p.name.toLowerCase().includes("pods") || p.name.toLowerCase().includes("earbud") || p.category === "Wearables") || products[1] || products[0];
    }
    // 1B. Check if 3RD item is requested: "3rd", "third", "keyboard", "mouse", "3"
    else if (query.includes("3rd") || query.includes("third") || query.includes("keyboard") || query.includes("mouse") || query.includes(" 3") || query.endsWith(" 3")) {
      itemToOrder = products.find(p => p.name.toLowerCase().includes("keyboard") || p.name.toLowerCase().includes("mouse")) || products[2] || products[0];
    }
    // 1C. 1ST item or explicit keyword match
    else {
      itemToOrder = products.find(p => query.includes(p.category.toLowerCase()) || p.name.toLowerCase().includes("headphone") || (p.tags && p.tags.some(t => query.includes(t)))) || products[0];
    }

    showCheckoutForm = true;
    text = `🛒 **Selected Product**: **${itemToOrder.name}** ($${itemToOrder.price.toFixed(2)})

Great choice! Please fill out your contact details & shipping address below to place your order:`;
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
  // 4. AUDIO / HEADPHONES INQUIRY -> Displays 1st and 2nd items
  else if (query.includes("headphone") || query.includes("audio") || query.includes("earbud") || query.includes("anc") || query.includes("sound")) {
    const audioItems = products.filter(p => p.category === "Audio");
    recommendedProductIds = audioItems.map(p => p.id);
    showLeadForm = true;

    text = `🎵 **Top Wireless Audio Gear Recommendations**:

1. **Aura Pro Wireless ANC Headphones** ($249.99) — 40hr battery life & ANC.
2. **Aura Pods Pro Wireless Earbuds** ($159.99) — IPX7 sweatproof & wireless charging.

💡 **Offer**: Claim **20% OFF** with code **\`AURA20\`**!

Say *"Order 1st"* for Headphones ($249.99) or *"Order 2nd"* for Pods Earbuds ($159.99)!`;
  }
  // 5. TECH / KEYBOARD / WATCH INQUIRY -> Displays Tech items
  else if (query.includes("keyboard") || query.includes("watch") || query.includes("mouse") || query.includes("tech") || query.includes("gear")) {
    const techItems = products.filter(p => p.category === "Tech" || p.category === "Wearables");
    recommendedProductIds = techItems.slice(0, 2).map(p => p.id);
    showLeadForm = true;

    text = `⚡ **Recommended Workstation Gear**:

1. **Nexus Ultra Smartwatch Gen 5** ($199.50) — AMOLED display & 7-day battery.
2. **Luminary Mechanical RGB Keyboard** ($129.99) — Hot-swappable tactile switches.

Say *"Order 1st"* for Smartwatch ($199.50) or *"Order 2nd"* for Keyboard ($129.99)!`;
  }
  // 6. GENERAL FALLBACK
  else {
    showLeadForm = true;
    text = `👋 Hi there! I'm **AURA AI**, your personal shopping assistant.

I can help you:
• **Order Gear**: Say *"Order 1st"* or *"Order 2nd"*.
• **Get 20% OFF Promo Code**: Use code \`AURA20\` at checkout!

Not ready to buy yet? Fill out your info below to lock in a VIP discount code for your next visit!`;
  }

  return {
    text,
    recommendedProductIds,
    showCheckoutForm,
    itemToOrder,
    showLeadForm
  };
}
