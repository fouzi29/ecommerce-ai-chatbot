import { PRODUCTS } from "../data/products";

/**
 * Universal Database / Platform Fetch Handler
 * Supports: Default Catalog, Custom REST API, Shopify, WooCommerce, Supabase
 */
export async function fetchLiveProducts(dbSettings = {}) {
  const { dbMode } = dbSettings;

  if (!dbMode || dbMode === "demo") {
    return PRODUCTS;
  }

  try {
    // 1. Custom REST API Integration
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

    // 2. Shopify Storefront GraphQL API
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
                    price {
                      amount
                    }
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
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

    // 3. WooCommerce REST API
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

    // 4. Supabase REST API
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

  // Fallback to static catalog if sync fails or credentials incomplete
  return PRODUCTS;
}
