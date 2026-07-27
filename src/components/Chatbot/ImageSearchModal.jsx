import React, { useState } from "react";
import { X, Camera, Upload, Sparkles, Check, Search } from "lucide-react";

export function ImageSearchModal({ isOpen, onClose, onSearchWithImage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartSearch = () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onSearchWithImage("Recommend wireless audio gear matching uploaded photo");
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-white border border-purple-200 rounded-3xl max-w-md w-full p-6 relative shadow-2xl overflow-hidden animate-slideUp text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 text-purple-700 font-extrabold text-sm">
            <Camera className="w-5 h-5 text-purple-600" />
            <span>AI Camera & Visual Product Search</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          <p className="text-xs text-slate-600 font-medium">
            Upload a photo of headphones, smartwatches, or tech gear (or scan a barcode) to find matching products in our catalog:
          </p>

          <label className="border-2 border-dashed border-purple-300 hover:border-purple-500 bg-purple-50/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
            {selectedImage ? (
              <img src={selectedImage} alt="Uploaded gear" className="max-h-40 object-contain rounded-xl border border-purple-200 shadow-sm" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-purple-600 mb-2" />
                <span className="font-bold text-xs text-purple-900">Click to upload photo or use smartphone camera</span>
                <span className="text-[10px] text-slate-500 mt-1">Supports JPG, PNG, WEBP</span>
              </>
            )}
            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
          </label>

          {isScanning && (
            <div className="p-3 bg-purple-100 border border-purple-300 rounded-xl text-purple-900 text-xs flex items-center justify-center gap-2 font-bold animate-pulse">
              <Sparkles className="w-4 h-4 text-purple-700 animate-spin" />
              <span>Analyzing product features with AI...</span>
            </div>
          )}

          <button
            onClick={handleStartSearch}
            disabled={!selectedImage || isScanning}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Find Visual Matches in Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
