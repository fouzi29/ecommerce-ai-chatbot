/**
 * Serverless Backend Function for 100% Automatic WhatsApp Dispatch
 * Runs on backend with ZERO user interaction / ZERO pop-ups.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone = "+8801755690467", message, apiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const cleanPhone = phone.replace(/[^\d+]/g, '');

  try {
    // 1. CallMeBot Free WhatsApp API (Backend Dispatch)
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey || '123456')}`;
    
    const response = await fetch(callMeBotUrl);
    
    return res.status(200).json({
      success: true,
      message: 'Automated WhatsApp message dispatched successfully via backend server.',
      status: response.status
    });
  } catch (err) {
    console.error("Backend WhatsApp Dispatch Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
