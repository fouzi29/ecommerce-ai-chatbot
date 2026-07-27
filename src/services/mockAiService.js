import { placeAiDirectOrder } from "./orderService";

/**
 * Enterprise 25-Module AI Conversational & Intelligence Engine (Demo Mode)
 */
export async function sendMockAiRequest({ userQuery, storeContext }) {
  await new Promise(resolve => setTimeout(resolve, 400));

  const query = userQuery.toLowerCase();
  const products = storeContext.products || [];
  const cart = storeContext.cart || [];

  let text = "";
  let recommendedProductIds = [];
  let showCheckoutForm = false;
  let itemToOrder = null;
  let showLeadForm = false;
  let showComparison = false;
  let comparisonItems = [];
  let showInChatCart = false;
  let showOrderTracking = false;
  let orderDetails = null;
  let showReturnForm = false;
  let showWishlistCard = false;

  // 1. PRODUCT COMPARISON INTENT ("compare", "versus", "difference")
  if (query.includes("compare") || query.includes("versus") || query.includes("vs") || query.includes("difference")) {
    showComparison = true;
    comparisonItems = products.slice(0, 2);
    text = `⚖️ **AI Side-by-Side Product Comparison**:

Here is a side-by-side specs comparison between **${comparisonItems[0]?.name}** ($${comparisonItems[0]?.price.toFixed(2)}) and **${comparisonItems[1]?.name}** ($${comparisonItems[1]?.price.toFixed(2)}):`;
  }
  // 2. IN-CHAT CART REVIEW ("cart", "checkout", "basket", "my cart")
  else if ((query.includes("cart") || query.includes("basket")) && !query.includes("order")) {
    showInChatCart = true;
    text = `🛍️ **Here is your current Shopping Cart**:

Review your items, apply promo codes (\`AURA20\` for 20% OFF), and proceed to direct AI checkout:`;
  }
  // 3. ORDER TRACKING & INVOICE ("track", "status", "shipment", "invoice", "#au-")
  else if (query.includes("track") || query.includes("status") || query.includes("invoice") || query.includes("#au-")) {
    showOrderTracking = true;
    orderDetails = {
      id: "AU-8821",
      customerName: "Alex Rivera",
      items: [{ name: "Aura Pro Wireless ANC Headphones", price: 249.99, quantity: 1 }],
      totalAmount: 249.99,
      status: "In Transit",
      courier: "Pathao Express Courier",
      trackingNumber: "TRK-99401827",
      estimatedDelivery: "July 28, 2026 (1-2 business days)",
      address: "742 Evergreen Terrace, Springfield"
    };
    text = `📦 **Order Tracking & Invoice Details for #AU-8821**:

Your order is currently **In Transit** via Pathao Express Courier. You can download your official invoice TXT/PDF below:`;
  }
  // 4. RETURNS, EXCHANGES & REFUNDS ("return", "exchange", "refund", "rma")
  else if (query.includes("return") || query.includes("exchange") || query.includes("refund") || query.includes("rma")) {
    showReturnForm = true;
    text = `🔄 **30-Day Hassle-Free Return & Exchange Request**:

Our policy allows returns within 30 days of delivery with free courier pickup. Fill out the quick return form below:`;
  }
  // 5. ACCOUNT, WISHLIST & LOYALTY POINTS ("wishlist", "points", "rewards", "account")
  else if (query.includes("wishlist") || query.includes("points") || query.includes("rewards") || query.includes("loyalty") || query.includes("account")) {
    showWishlistCard = true;
    text = `⭐ **Welcome to your AURA VIP Account Portal**:

You currently have **1,250 AURA Loyalty Points ($12.50 Store Credit)** ready to redeem!`;
  }
  // 6. DIRECT ORDER INTENT ("order", "buy", "purchase", "reserve", "2nd", "second")
  else if (query.includes("order") || query.includes("buy") || query.includes("purchase") || query.includes("reserve") || query.includes("2nd") || query.includes("second") || query.includes("1st") || query.includes("first")) {
    if (query.includes("2nd") || query.includes("second") || query.includes("pods") || query.includes("earbud")) {
      itemToOrder = products.find(p => p.name.toLowerCase().includes("pods") || p.name.toLowerCase().includes("earbud")) || products[1] || products[0];
    } else {
      itemToOrder = products.find(p => query.includes(p.category.toLowerCase()) || p.name.toLowerCase().includes("headphone")) || products[0];
    }

    showCheckoutForm = true;
    text = `🛒 **Selected Product**: **${itemToOrder.name}** ($${itemToOrder.price.toFixed(2)})

Please enter your contact details and shipping address below to place your order:`;
  }
  // 7. PAYMENT & SHIPPING ASSISTANCE ("payment", "cod", "bkash", "nagad", "card", "shipping cost")
  else if (query.includes("payment") || query.includes("pay") || query.includes("cod") || query.includes("shipping")) {
    text = `💳 **Supported Payment & Shipping Options**:

• **Payment Methods**: Cash on Delivery (COD), Visa / MasterCard, bKash, Nagad, Stripe, & PayPal.
• **Shipping Costs**: **Free Express Shipping** on all orders over $75 (Code \`FREESHIP\`)! Standard delivery takes 1-2 business days.`;
  }
  // 8. AUDIO / HEADPHONES INQUIRY
  else if (query.includes("headphone") || query.includes("audio") || query.includes("earbud") || query.includes("photo") || query.includes("camera")) {
    const audioItems = products.filter(p => p.category === "Audio");
    recommendedProductIds = audioItems.map(p => p.id);
    showLeadForm = true;

    text = `🎵 **Recommended Wireless Audio Gear**:

1. **Aura Pro Wireless ANC Headphones** ($249.99) — 40hr battery life & ANC.
2. **Aura Pods Pro Wireless Earbuds** ($159.99) — IPX7 sweatproof & wireless charging.

🎁 Use promo code **\`AURA20\`** for **20% OFF** today! Say *"Order 1st"* or *"Compare headphones and pods"*!`;
  }
  // 9. GENERAL CONVERSATIONAL AI & PROMOTIONS
  else {
    showLeadForm = true;
    text = `👋 Hi! I'm **AURA AI**, your 24/7 Shopping Assistant & Sales Agent.

I can help you:
• **Compare Products**: Say *"Compare headphones and pods"*.
• **Track Order & Invoice**: Say *"Track #AU-8821"*.
• **View Cart & Apply Coupons**: Say *"View my cart"* (Promo code \`AURA20\` for 20% OFF).
• **Returns & Exchanges**: Say *"Return an order"*.

How can I assist your shopping experience today?`;
  }

  return {
    text,
    recommendedProductIds,
    showCheckoutForm,
    itemToOrder,
    showLeadForm,
    showComparison,
    comparisonItems,
    showInChatCart,
    showOrderTracking,
    orderDetails,
    showReturnForm,
    showWishlistCard
  };
}
