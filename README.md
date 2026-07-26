# 🛍️ AURA E-Commerce AI Chatbot (OpenAI + Google Gemini Integration)

A modern, high-performance **E-Commerce Web Application** featuring an advanced **Dual-Engine AI Shopping Assistant Chatbot**. Built with React, Vite, Tailwind CSS concepts, and direct REST integrations for **OpenAI (GPT-4o)** and **Google Gemini (Gemini 2.0 / 1.5 Flash)** APIs.

Designed specifically as a **premium Fiverr portfolio demo** and production-ready starter template.

---

## ✨ Core Features

### 🤖 1. Dual AI Engine & Smart Demo Mode
- **OpenAI API Integration**: Supports `gpt-4o`, `gpt-4o-mini`, `gpt-3.5-turbo`.
- **Google Gemini API Integration**: Supports `gemini-2.0-flash`, `gemini-1.5-flash`, `gemini-1.5-pro`.
- **Smart Demo Mode**: Intelligent offline fallback engine with catalog awareness. Evaluates product searches, promo codes, shipping policies, and order tracking out-of-the-box **without needing any API keys**!
- **In-App API Settings Modal**: Easily enter, test, and save OpenAI & Gemini API keys securely in browser `localStorage`.

### 🛒 2. Full E-Commerce Store UI
- **Interactive Product Catalog**: High-resolution showcase across Audio, Smart Wearables, Tech Workstation, and Smart Home categories.
- **Real-Time Cart Intelligence**: Add items to cart, adjust quantities, apply active promo codes (`AURA20`, `FREESHIP`), calculation of subtotal, discounts, and shipping.
- **Celebratory Checkout**: Confetti explosion effect on mock checkout completion.
- **Product Detail Modal**: Highlighting key specifications, stock levels, and direct "Ask AI About Specs" trigger buttons.

### 💬 3. Advanced Chatbot Capabilities
- **Store-Aware AI Knowledge**: Feeds live catalog data, cart items, promo codes, and return policies dynamically into AI system prompts.
- **Inline Product Cards**: Chatbot renders clickable product cards inside conversation messages with instant **"Add to Cart"** buttons.
- **Voice-to-Text Dictation**: Integrated Web Speech API microphone for voice input.
- **Text-to-Speech (Read Aloud)**: Native speech synthesis to listen to assistant answers aloud.
- **Export & Manage**: Download full conversation transcript as `.json`, clear history, or switch to Fullscreen focus mode.

---

## 📁 Repository Structure

```
aichatbot/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Header with search, cart badge & settings trigger
│   │   ├── HeroBanner.jsx           # Promo hero section
│   │   ├── ProductGrid.jsx          # Category filters & product cards
│   │   ├── ProductCard.jsx          # Individual product showcase item
│   │   ├── ProductModal.jsx         # Detailed item view
│   │   ├── CartDrawer.jsx           # Slide-out shopping cart & checkout
│   │   ├── ApiSettingsModal.jsx     # OpenAI & Gemini API configuration
│   │   └── Chatbot/
│   │       ├── ChatWidget.jsx       # Floating FAB & main chat orchestrator
│   │       ├── ChatHeader.jsx       # Header controls & provider model badges
│   │       ├── ChatMessages.jsx     # Message list, Markdown, Read Aloud
│   │       ├── ChatInput.jsx        # Input bar, Voice Dictation, Suggestion Chips
│   │       └── ProductRecommendationCard.jsx # Rendered inline product inside chat
│   ├── data/
│   │   ├── products.js              # Catalog items & store details
│   │   └── defaultPrompts.js        # System prompts & suggestion chips
│   ├── services/
│   │   ├── apiService.js            # Unified AI API router
│   │   ├── openaiService.js         # Direct OpenAI REST fetch client
│   │   ├── geminiService.js         # Direct Google Gemini REST fetch client
│   │   └── mockAiService.js         # Offline demo AI fallback generator
│   ├── styles/
│   │   ├── index.css                # Global design system & theme tokens
│   │   └── chatbot.css              # Chatbot specific animations & styling
│   ├── App.jsx                      # Master state container
│   └── main.jsx                     # Application entry point
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18+` or `v20+` installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-ai-chatbot.git
   cd ecommerce-ai-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

---

## 🔑 How to Configure OpenAI & Gemini API Keys

1. Click the **Settings** icon (or **Smart Demo AI** pill) in the top Navigation Bar.
2. Select your desired engine provider:
   - **Smart Demo**: Test immediately without entering keys.
   - **OpenAI API**: Enter your OpenAI API Key starting with `sk-...` and select model (`gpt-4o-mini` or `gpt-4o`).
   - **Google Gemini API**: Enter your Gemini API Key starting with `AIza...` and select model (`gemini-1.5-flash` or `gemini-2.0-flash`).
3. Click **Save API Config**. Keys are stored safely in browser `localStorage`.

---

## 📤 Deploying to GitHub & Hosting (Vercel / Netlify / GitHub Pages)

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - E-Commerce AI Chatbot Web App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-ai-chatbot.git
git push -u origin main
```

### Deploy to Vercel (Recommended)
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Click **Deploy**.

---

## 💼 Fiverr Presentation Tips for Clients

- **Instant Demo**: Keep the app on **Smart Demo Mode** as default so clients can click around and ask questions immediately without needing an API key setup.
- **Showcase Customization**: Highlight that the system prompt, store catalog, and discount rules can be easily tailored to any client niche (fashion, gadgets, electronics, SaaS).
- **Dual API Choice**: Emphasize that clients can choose between lower-cost Gemini Flash or OpenAI GPT-4o models depending on their budget.
