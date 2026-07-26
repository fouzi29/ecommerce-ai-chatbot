import React, { useState } from "react";
import { Send, Mic } from "lucide-react";
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

  const handleChipClick = (chip) => {
    const queryToSend = typeof chip === "object" ? (chip.query || chip.label) : chip;
    onSendMessage(queryToSend);
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
    <div className="chat-input-bar">
      {/* Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 scrollbar-none">
        {SUGGESTION_CHIPS.map((chip, idx) => {
          const label = typeof chip === "object" ? chip.label : chip;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-100 text-purple-700 font-bold text-xs whitespace-nowrap border border-purple-200 transition-all shrink-0"
              disabled={isLoading}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI about headphones, discounts, orders..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-slate-100 border border-slate-200 focus:border-purple-500 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
        />

        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-purple-600 ${isRecording ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100'}`}
          title={isRecording ? "Listening..." : "Click for Voice Input"}
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-md"
          title="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
