/**
 * Direct REST implementation for OpenAI Chat Completions API
 */
export async function sendOpenAiRequest({ apiKey, model = "gpt-4o-mini", messages, temperature = 0.7, systemPrompt, storeContext }) {
  if (!apiKey) {
    throw new Error("OpenAI API Key is missing. Please add your key in API Settings or switch to Demo Mode.");
  }

  // Construct context message
  const fullSystemMessage = {
    role: "system",
    content: `${systemPrompt}\n\n[Current Store State Context]:\n${JSON.stringify(storeContext, null, 2)}`
  };

  const formattedMessages = [
    fullSystemMessage,
    ...messages.map(m => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text
    }))
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: model || "gpt-4o-mini",
      messages: formattedMessages,
      temperature: parseFloat(temperature) || 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errMsg = errorData.error?.message || `OpenAI API returned status ${response.status}`;
    throw new Error(errMsg);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "I couldn't process a response from OpenAI.";
  
  return {
    text: content,
    recommendedProductIds: extractRecommendedProductIds(content, storeContext.products)
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
