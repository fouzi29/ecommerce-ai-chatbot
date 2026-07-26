import React, { useState } from "react";
import { X, Key, Cpu, Sliders, ShieldCheck, RefreshCw, Check, Sparkles } from "lucide-react";
import { DEFAULT_SYSTEM_PROMPT } from "../data/defaultPrompts";

export function ApiSettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) {
  const [provider, setProvider] = useState(settings.provider || "demo");
  const [openAiKey, setOpenAiKey] = useState(settings.openAiKey || "");
  const [geminiKey, setGeminiKey] = useState(settings.geminiKey || "");
  const [openAiModel, setOpenAiModel] = useState(settings.openAiModel || "gpt-4o-mini");
  const [geminiModel, setGeminiModel] = useState(settings.geminiModel || "gemini-1.5-flash");
  const [systemPrompt, setSystemPrompt] = useState(settings.systemPrompt || DEFAULT_SYSTEM_PROMPT);
  const [temperature, setTemperature] = useState(settings.temperature || 0.7);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({
      provider,
      openAiKey,
      geminiKey,
      openAiModel,
      geminiModel,
      systemPrompt,
      temperature
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setProvider("demo");
    setOpenAiKey("");
    setGeminiKey("");
    setOpenAiModel("gpt-4o-mini");
    setGeminiModel("gemini-1.5-flash");
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    setTemperature(0.7);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-slate-950 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Provider & API Settings</h3>
              <p className="text-slate-400 text-xs">Configure OpenAI, Gemini API keys or test Smart Demo Mode</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select AI Engine Provider
            </label>
            <div className="grid grid-cols-3 gap-3">
              
              <button
                type="button"
                onClick={() => setProvider("demo")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === "demo"
                    ? "bg-violet-600/20 border-violet-500 text-white shadow-md shadow-violet-600/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">Smart Demo</span>
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">Zero API key needed</span>
              </button>

              <button
                type="button"
                onClick={() => setProvider("openai")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === "openai"
                    ? "bg-emerald-600/20 border-emerald-500 text-white shadow-md shadow-emerald-600/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">OpenAI API</span>
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">GPT-4o & GPT-4o-mini</span>
              </button>

              <button
                type="button"
                onClick={() => setProvider("gemini")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === "gemini"
                    ? "bg-cyan-600/20 border-cyan-500 text-white shadow-md shadow-cyan-600/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">Google Gemini</span>
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">Gemini 2.0 & 1.5 Flash</span>
              </button>

            </div>
          </div>

          {/* OpenAI Key & Model */}
          {provider === "openai" && (
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">OpenAI API Key (sk-...)</label>
                <input
                  type="password"
                  placeholder="sk-proj-..."
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model</label>
                <select
                  value={openAiModel}
                  onChange={(e) => setOpenAiModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                  <option value="gpt-4o">gpt-4o (High Intelligence)</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                </select>
              </div>
            </div>
          )}

          {/* Gemini Key & Model */}
          {provider === "gemini" && (
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Gemini API Key (AIza...)</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="gemini-1.5-flash">gemini-1.5-flash (Ultra-Fast)</option>
                  <option value="gemini-2.0-flash">gemini-2.0-flash (Experimental)</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (Reasoning)</option>
                </select>
              </div>
            </div>
          )}

          {/* System Prompt Customization */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Custom E-Commerce System Prompt
            </label>
            <textarea
              rows={4}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-violet-500 rounded-xl p-3 text-xs text-slate-200 outline-none leading-relaxed"
            />
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1.5">
              <span>Creativity Temperature</span>
              <span className="text-violet-400 font-mono">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-violet-600 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save API Config</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
