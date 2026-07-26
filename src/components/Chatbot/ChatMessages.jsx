import React, { useEffect, useRef } from "react";
import { Bot, User, Volume2, Sparkles } from "lucide-react";
import { ProductRecommendationCard } from "./ProductRecommendationCard";

export function ChatMessages({
  messages,
  isLoading,
  products = [],
  onAddToCart,
  onQuickView
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#`_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      // Simple Markdown Parsing
      let formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      if (line.trim().startsWith("• ") || line.trim().startsWith("- ")) {
        return (
          <li key={idx} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[•-]\s*/, '') }} />
        );
      }

      return (
        <p key={idx} className="min-h-[1rem]" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="chat-messages-area">
      
      {/* Welcome Card */}
      <div className="chat-welcome-banner">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 mb-2">
          <Sparkles className="w-4 h-4" />
        </div>
        <h4>Welcome to AURA AI Shopping Assistant</h4>
        <p>Ask for product recommendations, discount codes, track orders (#AU-8821), or store policies!</p>
      </div>

      {/* Message List */}
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-row ${msg.sender}`}>
          <div className="chat-row-avatar">
            {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>

          <div className="chat-bubble">
            <div>{renderFormattedText(msg.text)}</div>

            {/* Render Recommended Product Cards */}
            {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
              <div className="mt-3 space-y-2">
                {msg.recommendedProductIds.map((pId) => {
                  const prod = products.find((p) => p.id === pId);
                  return (
                    <ProductRecommendationCard
                      key={pId}
                      product={prod}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                    />
                  );
                })}
              </div>
            )}

            {/* Read Aloud Button for AI Responses */}
            {msg.sender === "assistant" && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
                <button
                  onClick={() => speakText(msg.text)}
                  className="text-[10px] text-slate-400 hover:text-violet-400 flex items-center gap-1 transition-colors"
                  title="Read message aloud"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Listen</span>
                </button>
                <span className="chat-time">{msg.time || "Just now"}</span>
              </div>
            )}

            {msg.sender === "user" && (
              <div className="chat-time">{msg.time || "Just now"}</div>
            )}
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="chat-row assistant">
          <div className="chat-row-avatar">
            <Bot className="w-4 h-4" />
          </div>
          <div className="chat-bubble">
            <div className="typing-dots">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
