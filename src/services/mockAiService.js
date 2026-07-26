/**
 * Smart Offline Mock AI Generator for Demo Mode
 * Provides instant realistic responses with catalog matching and interactive product cards.
 */
export async function sendMockAiRequest({ userQuery, storeContext }) {
  // Simulate network latency (400ms - 800ms) for realistic feel
  await new Promise(resolve => setTimeout(resolve, 600));

  const query = userQuery.toLowerCase();
  const products = storeContext.products || [];
  const cart = storeContext.cart || [];

  let text = "";
  let recommendedProductIds = [];

  // Order tracking
  if (query.includes("track") || query.includes("order") || query.includes("#au-")) {
    text = `📦 **Order Status Lookup**:
Your order **#AU-8821** is currently **In Transit** via Express Courier!

• **Expected Delivery**: July 28, 2026 (1-2 business days)  
• **Shipping Address**: 742 Evergreen Terrace  
• **Items**: 1x *Aura Pro Wireless ANC Headphones*  

You can track real-time delivery status using carrier tracking number \`TRK-99401827\`. Let me know if you need anything else!`;
  }
  // Discount & Promos
  else if (query.includes("discount") || query.includes("promo") || query.includes("code") || query.includes("coupon") || query.includes("sale")) {
    text = `🎉 **Current Active Store Promotions**:

Here are the active promo codes you can use at checkout right now:

1. **\`AURA20\`** — Save **20% OFF** on any order over $100.
2. **\`FREESHIP\`** — Get **Free Express Shipping** on orders over $75.

Simply enter the promo code in your Shopping Cart drawer during checkout to claim your discount!`;
  }
  // Shipping & Return policy
  else if (query.includes("ship") || query.includes("return") || query.includes("policy") || query.includes("guarantee")) {
    text = `🚚 **Shipping & Return Policy Overview**:

• **Standard Shipping**: FREE on all orders over $50 (2-4 business days).
• **Express Shipping**: $9.99 flat rate for guaranteed 2-day delivery.
• **Return Policy**: 30-Day Hassle-Free Money-Back Guarantee with pre-paid return shipping labels included.

Need to initiate a return or exchange? Contact our team at support@aurastore-demo.com.`;
  }
  // Headphones / Audio
  else if (query.includes("headphone") || query.includes("audio") || query.includes("earbud") || query.includes("music") || query.includes("anc") || query.includes("sound")) {
    const audioItems = products.filter(p => p.category === "Audio");
    recommendedProductIds = audioItems.map(p => p.id);
    text = `🎵 **Top Audio Gear Recommendations**:

Here are our top-rated wireless audio products engineered for immersive sound and active noise isolation:

- **Aura Pro Wireless ANC Headphones** ($249.99) — 40hr battery life, spatial transparency, and industry-leading ANC.
- **Aura Pods Pro True Wireless Earbuds** ($159.99) — IPX7 sweatproof, Qi wireless case, and ultra-compact fit.

Check out the product details below to add them directly to your cart!`;
  }
  // Keyboard / Gaming / Tech
  else if (query.includes("keyboard") || query.includes("mouse") || query.includes("gaming") || query.includes("tech") || query.includes("webcam") || query.includes("camera")) {
    const techItems = products.filter(p => p.category === "Tech");
    recommendedProductIds = techItems.map(p => p.id);
    text = `⚡ **Essential Tech & Gaming Workstation Gear**:

Boost your productivity and gaming setup with our high-performance hardware:

- **Luminary Mechanical RGB Keyboard** ($129.99) — Hot-swappable switches with aircraft-grade aluminum top plate.
- **Vortex Precision Gaming Mouse** ($69.99) — 58g ultra-lightweight shell with 26,000 DPI sensor.
- **Horizon 4K HDR Web Camera** ($89.99) — AI auto-framing and dual stereo microphones.`;
  }
  // Smartwatch / Wearables / Backpack
  else if (query.includes("watch") || query.includes("wearable") || query.includes("fitness") || query.includes("bag") || query.includes("backpack")) {
    const wearableItems = products.filter(p => p.category === "Wearables");
    recommendedProductIds = wearableItems.map(p => p.id);
    text = `⌚ **Wearables & Everyday Carry**:

Designed for active modern lifestyles:

- **Nexus Ultra Smartwatch Gen 5** ($199.50) — ECG monitoring, 50m water resistance, and 7-day battery.
- **Zenith Minimalist Laptop Backpack** ($79.50) — TSA-friendly 16" laptop compartment with integrated USB charge port.`;
  }
  // Cart inquiry
  else if (query.includes("cart") || query.includes("item") || query.includes("buy") || query.includes("checkout")) {
    if (cart.length === 0) {
      text = `🛒 Your Shopping Cart is currently **empty**. Explore our featured collection or ask me for recommendations to add gear to your cart!`;
    } else {
      const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      text = `🛒 **Your Current Shopping Cart** (${cart.reduce((a, b) => a + b.quantity, 0)} items):

${cart.map(item => `• **${item.name}** x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`).join("\n")}

**Estimated Total**: **$${total.toFixed(2)}**  
💡 *Tip: Use promo code \`AURA20\` at checkout if your cart total exceeds $100!*`;
    }
  }
  // General Fallback Search
  else {
    // Try matching any product tag or name
    const matched = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.tags.some(t => query.includes(t)) ||
      p.category.toLowerCase().includes(query)
    );

    if (matched.length > 0) {
      recommendedProductIds = matched.map(p => p.id);
      text = `I found **${matched.length} product(s)** matching your interest in our store:

${matched.map(p => `• **${p.name}** ($${p.price.toFixed(2)}) — ${p.description.slice(0, 75)}...`).join("\n")}

Click below to view or add them directly to your cart!`;
    } else {
      text = `Hello! I'm **AURA AI**, your personalized shopping assistant. 

I can help you with:
• **Product Recommendations**: (e.g. *Best headphones*, *Mechanical keyboards*, *Fitness smartwatches*)
• **Active Discounts**: Ask for promo codes or active sales.
• **Order Tracking**: Enter your order number like \`#AU-8821\`.
• **Store Policies**: Inquire about shipping rates, delivery times, and 30-day returns.

How can I assist your shopping experience today?`;
    }
  }

  return {
    text,
    recommendedProductIds
  };
}
