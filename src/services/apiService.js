import { sendOpenAiRequest } from "./openaiService";
import { sendGeminiRequest } from "./geminiService";
import { sendMockAiRequest } from "./mockAiService";

/**
 * Central API router that handles OpenAI, Google Gemini, and Mock AI mode.
 */
export async function sendChatMessage({
  provider = "demo",
  apiKey = "",
  model = "",
  messages = [],
  userQuery = "",
  temperature = 0.7,
  systemPrompt = "",
  storeContext = {}
}) {
  try {
    // 1. Demo Mode
    if (provider === "demo" || !provider) {
      return await sendMockAiRequest({ userQuery, storeContext });
    }

    // 2. OpenAI Provider
    if (provider === "openai") {
      if (!apiKey) {
        throw new Error("OpenAI API Key is missing. Please click API Settings in the top bar to set your key, or select Demo Mode.");
      }
      return await sendOpenAiRequest({
        apiKey,
        model: model || "gpt-4o-mini",
        messages,
        temperature,
        systemPrompt,
        storeContext
      });
    }

    // 3. Google Gemini Provider
    if (provider === "gemini") {
      if (!apiKey) {
        throw new Error("Google Gemini API Key is missing. Please click API Settings in the top bar to set your key, or select Demo Mode.");
      }
      return await sendGeminiRequest({
        apiKey,
        model: model || "gemini-1.5-flash",
        messages,
        temperature,
        systemPrompt,
        storeContext
      });
    }

    // Fallback to mock AI
    return await sendMockAiRequest({ userQuery, storeContext });
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}
