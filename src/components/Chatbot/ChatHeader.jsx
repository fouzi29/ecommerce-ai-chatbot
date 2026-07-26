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
    <div className="chat-header">
      
      {/* Title & Avatar */}
      <div className="chat-header-info">
        <div className="chat-avatar-status">
          <Bot className="w-5 h-5" />
          <span className="chat-status-dot" />
        </div>
        <div className="chat-header-title">
          <h3>
            <span>AURA AI Assistant</span>
          </h3>
          <p className="flex items-center gap-1">
            <span className="capitalize">{provider === 'demo' ? 'Smart Demo' : provider}</span>
            <span>•</span>
            <span className="font-mono text-[10px] text-violet-400">{model}</span>
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="chat-header-actions">
        {showSettingsButton && (
          <button
            onClick={onOpenSettings}
            className="btn-icon"
            title="Configure API Provider & Models"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onDownloadChat}
          className="btn-icon"
          title="Export Chat Transcript"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={onClearChat}
          className="btn-icon"
          title="Clear Conversation History"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleFullscreen}
          className="btn-icon hidden sm:flex"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onCloseChat}
          className="btn-icon text-rose-400 hover:text-rose-300"
          title="Close Chatbot"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
