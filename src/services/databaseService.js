import { PRODUCTS } from "../data/products";

/**
 * Universal Database / Platform Sync & Webhook Dispatcher
 * Supports: Default Catalog, Custom REST API (PHP/MySQL/Node.js), Shopify, WooCommerce, Supabase
 */

// 1. FETCH LIVE PRODUCTS FROM CLIENT DATABASE
export async function fetchLiveProducts(dbSettings = {}) {
  const { dbMode } = dbSettings;

  if (!dbMode || dbMode === "demo") {
    return PRODUCTS;
  }

  try {
    // Custom REST API Integration (GET /api/products)
    if (dbMode === "custom_api" && dbSettings.customApiUrl) {
      const response = await fetch(dbSettings.customApiUrl, {
        headers: {
          "Authorization": dbSettings.customApiToken ? `Bearer ${dbSettings.customApiToken}` : "",
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : data.products || PRODUCTS;
      }
    }

    // Shopify Storefront GraphQL API
    if (dbMode === "shopify" && dbSettings.shopifyDomain && dbSettings.shopifyAccessToken) {
      const shopifyUrl = `https://${dbSettings.shopifyDomain}/api/2023-07/graphql.json`;
      const query = `{
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              variants(first: 1) {
                edges {
                  node {
                    price { amount }
                  }
                }
              }
              images(first: 1) {
                edges {
                  node { url }
                }
              }
            }
          }
        }
      }`;

      const response = await fetch(shopifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": dbSettings.shopifyAccessToken
        },
        body: JSON.stringify({ query })
      });

      if (response.ok) {
        const result = await response.json();
        const edges = result.data?.products?.edges || [];
        return edges.map((e, idx) => ({
          id: e.node.id || `shopify-${idx}`,
          name: e.node.title,
          category: "Shopify Gear",
          price: parseFloat(e.node.variants?.edges?.[0]?.node?.price?.amount || 99.99),
          image: e.node.images?.edges?.[0]?.node?.url || PRODUCTS[0].image,
          description: e.node.description || "Official item from Shopify store catalog.",
          inStock: true,
          tags: ["shopify", "store"]
        }));
      }
    }

    // WooCommerce REST API
    if (dbMode === "woocommerce" && dbSettings.wooUrl) {
      const wooEndpoint = `${dbSettings.wooUrl.replace(/\/$/, '')}/wp-json/wc/v3/products?consumer_key=${dbSettings.wooConsumerKey}`;
      const response = await fetch(wooEndpoint);
      if (response.ok) {
        const items = await response.json();
        return items.map(item => ({
          id: `woo-${item.id}`,
          name: item.name,
          category: item.categories?.[0]?.name || "WooCommerce",
          price: parseFloat(item.price || 49.99),
          image: item.images?.[0]?.src || PRODUCTS[0].image,
          description: item.short_description?.replace(/<[^>]*>?/gm, '') || item.name,
          inStock: item.in_stock,
          tags: ["woocommerce", "wp"]
        }));
      }
    }

    // Supabase REST API
    if (dbMode === "supabase" && dbSettings.supabaseUrl && dbSettings.supabaseAnonKey) {
      const supabaseEndpoint = `${dbSettings.supabaseUrl.replace(/\/$/, '')}/rest/v1/products?select=*`;
      const response = await fetch(supabaseEndpoint, {
        headers: {
          "apikey": dbSettings.supabaseAnonKey,
          "Authorization": `Bearer ${dbSettings.supabaseAnonKey}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data.length > 0 ? data : PRODUCTS;
      }
    }
  } catch (err) {
    console.warn("DB / Platform Sync Warning:", err);
  }

  return PRODUCTS;
}

// 2. DISPATCH PLACED ORDER DATA TO CLIENT DATABASE / WEBHOOK (POST /api/orders)
export async function syncOrderToBackend(order, dbSettings = {}) {
  const { customOrderWebhookUrl, customApiUrl, customApiToken } = dbSettings;
  const targetUrl = customOrderWebhookUrl || (customApiUrl ? `${customApiUrl.replace(/\/products\/?$/, '')}/orders` : null);

  if (!targetUrl) return;

  try {
    await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": customApiToken ? `Bearer ${customApiToken}` : ""
      },
      body: JSON.stringify({
        event: "order_placed",
        orderId: order.id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        shippingAddress: order.shippingAddress,
        items: order.items,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt
      })
    });
  } catch (err) {
    console.warn("Order Sync Warning:", err);
  }
}

// 3. DISPATCH PROSPECT LEAD DATA TO CLIENT DATABASE / WEBHOOK (POST /api/leads)
export async function syncLeadToBackend(lead, dbSettings = {}) {
  const { customLeadWebhookUrl, customApiUrl, customApiToken } = dbSettings;
  const targetUrl = customLeadWebhookUrl || (customApiUrl ? `${customApiUrl.replace(/\/products\/?$/, '')}/leads` : null);

  if (!targetUrl) return;

  try {
    await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": customApiToken ? `Bearer ${customApiToken}` : ""
      },
      body: JSON.stringify({
        event: "lead_captured",
        leadId: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        interestCategory: lead.interestCategory,
        note: lead.note,
        source: lead.source,
        createdAt: lead.createdAt
      })
    });
  } catch (err) {
    console.warn("Lead Sync Warning:", err);
  }
}
