/**
 * Direct REST implementation for Google Gemini API
 */
export async function sendGeminiRequest({ apiKey, model = "gemini-1.5-flash", messages, temperature = 0.7, systemPrompt, storeContext }) {
  if (!apiKey) {
    throw new Error("Google Gemini API Key is missing. Please add your key in API Settings or switch to Demo Mode.");
  }

  const cleanModel = model.includes("gemini") ? model : "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey.trim()}`;

  const fullSystemPrompt = `${systemPrompt}\n\n[Current Store Catalog & Cart Context]:\n${JSON.stringify(storeContext, null, 2)}`;

  // Convert chat messages to Gemini role format ('user' and 'model')
  const contents = messages.map(m => ({
    role: m.sender === "user" ? "user" : "model",
    parts: [{ text: m.text }]
  }));

  const payload = {
    system_instruction: {
      parts: [{ text: fullSystemPrompt }]
    },
    contents: contents,
    generationConfig: {
      temperature: parseFloat(temperature) || 0.7,
      maxOutputTokens: 1000
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errMsg = errorData.error?.message || `Google Gemini API returned status ${response.status}`;
    throw new Error(errMsg);
  }

  const data = await response.json();
  const textCandidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!textCandidate) {
    throw new Error("No text response received from Google Gemini.");
  }

  return {
    text: textCandidate,
    recommendedProductIds: extractRecommendedProductIds(textCandidate, storeContext.products)
  };
}

function extractRecommendedProductIds(text, products = []) {
  if (!text || !products.length) return [];
  const matches = [];
  const lowerText = text.toLowerCase();
  
  products.forEach(p => {
    if (lowerText.includes(p.name.toLowerCase()) || lowerText.includes(p.id.toLowerCase())) {
      matches.push(p.id);
    }
  });
  
  return [...new Set(matches)];
}
