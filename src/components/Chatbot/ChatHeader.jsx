import React from "react";
import { Bot, Maximize2, Minimize2, Trash2, Download, X, Settings } from "lucide-react";

export function ChatHeader({
  provider,
  model,
  isFullscreen,
  onToggleFullscreen,
  onClearChat,
  onDownloadChat,
  onCloseChat,
  onOpenSettings,
  showSettingsButton = true
}) {
  return (
    <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-700 text-white p-3.5 px-4 flex items-center justify-between border-b border-purple-500/30 shadow-md">
      
      {/* Title & Avatar */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold backdrop-blur-md">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-purple-700 rounded-full" />
        </div>
        <div>
          <h3 className="font-extrabold text-white text-sm leading-tight">AURA AI Assistant</h3>
          <p className="text-[11px] text-purple-100 flex items-center gap-1 font-medium">
            <span className="capitalize">{provider === 'demo' ? 'Smart Demo' : provider}</span>
            <span>•</span>
            <span className="font-mono text-[10px] text-cyan-200">{model}</span>
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        {showSettingsButton && (
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-purple-100 hover:text-white hover:bg-white/20 transition-colors"
            title="Configure API Provider & Models"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onDownloadChat}
          className="p-1.5 rounded-lg text-purple-100 hover:text-white hover:bg-white/20 transition-colors"
          title="Export Chat Transcript"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={onClearChat}
          className="p-1.5 rounded-lg text-purple-100 hover:text-white hover:bg-white/20 transition-colors"
          title="Clear Conversation History"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-lg text-purple-100 hover:text-white hover:bg-white/20 transition-colors hidden sm:flex"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onCloseChat}
          className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-rose-600/40 transition-colors"
          title="Close Chatbot"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
