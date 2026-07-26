import React, { useState } from "react";
import { Send, Mic, Sparkles } from "lucide-react";
import { SUGGESTION_CHIPS } from "../../data/defaultPrompts";

export function ChatInput({ onSendMessage, isLoading }) {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleChipClick = (chipText) => {
    // Remove icon prefix if present
    const cleanPrompt = chipText.replace(/^[^\w\s#]+/, '').trim();
    onSendMessage(cleanPrompt);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported on this browser. Try Google Chrome or Microsoft Edge.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div>
      {/* Suggestion Chips */}
      <div className="suggestion-chips scrollbar-none">
        {SUGGESTION_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            className="chip-btn"
            disabled={isLoading}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="chat-input-footer">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            placeholder="Ask AI about headphones, discounts, orders..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="chat-text-input"
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`btn-icon ${isRecording ? 'mic-btn-recording' : ''}`}
            title={isRecording ? "Listening..." : "Click for Voice Input"}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-9 h-9 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
