(function () {
  // Prevent duplicate initialization
  if (window.__AURA_AI_EMBED_INITIALIZED__) return;
  window.__AURA_AI_EMBED_INITIALIZED__ = true;

  // Extract configuration from script data attributes
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const siteDomain = currentScript?.getAttribute('data-site-domain') || 'njwade.net';
  const storeId = currentScript?.getAttribute('data-store-id') || 'custom-store';
  const provider = currentScript?.getAttribute('data-provider') || 'demo';
  const vercelAppUrl = 'https://ecommerce-ai-chatbot-ochre.vercel.app';

  // Create iframe container for floating widget
  const container = document.createElement('div');
  container.id = 'aura-ai-widget-container';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 440px;
    height: 640px;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 40px);
    z-index: 999999;
    border: none;
    background: transparent;
    pointer-events: none;
  `;

  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.src = `${vercelAppUrl}/?embed=true&domain=${encodeURIComponent(siteDomain)}&storeId=${encodeURIComponent(storeId)}&provider=${encodeURIComponent(provider)}`;
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    pointer-events: auto;
    border-radius: 24px;
  `;
  iframe.title = 'AURA AI Shopping Assistant';

  container.appendChild(iframe);

  // Append widget when DOM is ready
  if (document.body) {
    document.body.appendChild(container);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(container);
    });
  }
})();
