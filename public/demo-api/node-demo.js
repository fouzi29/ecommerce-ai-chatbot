/**
 * Production Node.js / Express Starter Endpoint for AI Chatbot
 * Run: node node-demo.js
 */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample Product Catalog Array
const sampleProducts = [
  {
    id: "prod-101",
    name: "Wireless ANC Headphones Pro",
    price: 249.99,
    category: "Audio",
    description: "Active noise canceling headphones with 40h battery.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    rating: 4.9,
    reviewsCount: 310
  }
];

// 1. GET /api/products
app.get('/api/products', (req, res) => {
  res.json(sampleProducts);
});

// 2. POST /api/orders
app.post('/api/orders', (req, res) => {
  const order = req.body;
  console.log('🛍️ New Order Received from AI Chatbot:', order);
  res.json({ success: true, orderId: order.orderId || 'AU-9921' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js AI Chatbot API Server running on port ${PORT}`);
});
