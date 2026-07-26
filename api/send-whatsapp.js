/**
 * Vercel Serverless Function for 100% Automatic Backend WhatsApp & SMS Dispatch
 * Supports: TextMeBot (Token format: Lgy1D7Prsd5u) & CallMeBot (Numeric key format)
 */

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { phone = "8801755690467", message, apiKey } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Message payload is required' });
  }

  const cleanPhone = phone.replace(/[^\d]/g, '');
  const key = (apiKey || "").trim();

  try {
    let gatewayUrl = "";
    let providerName = "";

    // 1. TextMeBot Gateway (Alphanumeric Token e.g. Lgy1D7Prsd5u)
    if (key.length >= 8 && /[a-zA-Z]/.test(key)) {
      providerName = "TextMeBot";
      gatewayUrl = `https://api.textmebot.com/send.php?recipient=${cleanPhone}&apikey=${encodeURIComponent(key)}&text=${encodeURIComponent(message)}`;
    } 
    // 2. CallMeBot Gateway (Numeric API Key e.g. 123456)
    else {
      providerName = "CallMeBot";
      gatewayUrl = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(key || '123456')}`;
    }

    const response = await fetch(gatewayUrl);
    const responseText = await response.text();

    return res.status(200).json({
      success: response.ok,
      provider: providerName,
      message: `Automated ${providerName} request processed by server.`,
      phone: cleanPhone,
      status: response.status,
      gatewayResponse: responseText
    });
  } catch (err) {
    console.error("Backend WhatsApp/SMS Dispatch Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
