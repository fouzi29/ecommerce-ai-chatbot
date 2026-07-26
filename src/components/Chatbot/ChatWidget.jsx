import React, { useState } from "react";
import { Bot, MessageSquare } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { sendChatMessage } from "../../services/apiService";

export function ChatWidget({
  isOpen,
  onToggleOpen,
  settings,
  onOpenSettings,
  products = [],
  cart = [],
  onAddToCart,
  onQuickView,
  showSettingsButton = true
}) {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "assistant",
      text: "👋 Hi there! I'm **AURA AI**, your personalized e-commerce shopping assistant.\n\nHow can I help you today? You can ask me to recommend gear, check active discount codes, or track your order!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSendMessage = async (text) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const activeKey = settings.provider === "openai" 
        ? settings.openAiKey 
        : settings.provider === "gemini" 
          ? settings.geminiKey 
          : "";

      const activeModel = settings.provider === "openai" 
        ? settings.openAiModel 
        : settings.provider === "gemini" 
          ? settings.geminiModel 
          : "Smart Demo AI";

      const storeContext = {
        products: products.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          description: p.description,
          inStock: p.inStock
        })),
        cart: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await sendChatMessage({
        provider: settings.provider,
        apiKey: activeKey,
        model: activeModel,
        messages: newMessages,
        userQuery: text,
        temperature: settings.temperature,
        systemPrompt: settings.systemPrompt,
        storeContext
      });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: response.text,
        recommendedProductIds: response.recommendedProductIds || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chatbot response error:", error);
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text: `⚠️ **Error**: ${error.message || "Something went wrong while connecting to the AI model."}\n\n*Tip: Check your API Key in Settings or switch back to Smart Demo Mode.*`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "assistant",
        text: "Conversation cleared! How else can I help you today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleDownloadChat = () => {
    const chatExport = JSON.stringify(messages, null, 2);
    const blob = new Blob([chatExport], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aura-chat-transcript-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentModelDisplay = settings.provider === "openai" 
    ? settings.openAiModel 
    : settings.provider === "gemini" 
      ? settings.geminiModel 
      : "Demo Mode";

  return (
    <>
      {/* Floating FAB Button */}
      {!isOpen && (
        <div className="chat-fab-container">
          <button onClick={onToggleOpen} className="chat-fab-button">
            <span className="chat-fab-badge" />
            <Bot className="w-6 h-6 animate-pulse" />
            <span>AI Assistant</span>
          </button>
        </div>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className={`chat-window ${isFullscreen ? "fullscreen" : ""}`}>
          <ChatHeader
            provider={settings.provider}
            model={currentModelDisplay}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            onClearChat={handleClearChat}
            onDownloadChat={handleDownloadChat}
            onCloseChat={onToggleOpen}
            onOpenSettings={onOpenSettings}
            showSettingsButton={showSettingsButton}
          />

          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            products={products}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}
