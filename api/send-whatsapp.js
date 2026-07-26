/**
 * Vercel Serverless Function for 100% Automatic Backend WhatsApp Dispatch
 * Dispatches automated messages directly from server side with ZERO user interaction.
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

  const { phone = "+8801795657378", message, apiKey } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Message payload is required' });
  }

  const cleanPhone = phone.replace(/[^\d+]/g, '');

  try {
    // 1. CallMeBot Automated Backend WhatsApp Dispatch
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey || '123456')}`;
    
    const response = await fetch(callMeBotUrl);
    
    return res.status(200).json({
      success: true,
      message: 'Automated WhatsApp notification dispatched successfully from backend server.',
      phone: cleanPhone,
      status: response.status
    });
  } catch (err) {
    console.error("Backend WhatsApp Dispatch Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
