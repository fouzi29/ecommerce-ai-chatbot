import React, { useState } from "react";
import { Send, Mic, Camera } from "lucide-react";
import { SUGGESTION_CHIPS } from "../../data/defaultPrompts";

export function ChatInput({ onSendMessage, onOpenImageSearch, isLoading }) {
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

  const isCanSend = inputText.trim().length > 0 && !isLoading;

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
              className="px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs whitespace-nowrap border border-purple-200 transition-all shrink-0 shadow-sm"
              disabled={isLoading}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
        {/* Camera / Photo Upload Button */}
        <button
          type="button"
          onClick={onOpenImageSearch}
          className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all shrink-0 shadow-sm"
          title="Camera & Image Search"
        >
          <Camera className="w-4 h-4 text-purple-600" />
        </button>

        <input
          type="text"
          placeholder="Ask AI about headphones, compare, track order..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all min-w-0"
        />

        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-2 rounded-xl border border-slate-200 shrink-0 transition-all shadow-sm ${
            isRecording ? 'bg-rose-100 border-rose-300 text-rose-600 animate-pulse' : 'bg-slate-50 text-slate-600 hover:text-purple-600 hover:bg-purple-50'
          }`}
          title={isRecording ? "Listening..." : "Click for Voice Input"}
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Send Button with High-Contrast Solid Gradient Background & Visible White Icon */}
        <button
          type="submit"
          disabled={!isCanSend}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-md ${
            isCanSend
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-purple-600 text-white opacity-85 cursor-not-allowed"
          }`}
          title="Send Message"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}
