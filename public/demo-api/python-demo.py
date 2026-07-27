"""
Production Python / Flask Starter Endpoint for AI Chatbot
Run: python python-demo.py
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SAMPLE_PRODUCTS = [
    {
        "id": "py-101",
        "name": "Aura Smartwatch Gen 5",
        "price": 199.50,
        "category": "Wearables",
        "description": "AMOLED health tracker with ECG and GPS.",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        "rating": 4.8,
        "reviewsCount": 180
    }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(SAMPLE_PRODUCTS)

@app.route('/api/orders', methods=['POST'])
def receive_order():
    order_data = request.json
    print("🛍️ Order Received:", order_data)
    return jsonify({"success": True, "orderId": order_data.get("orderId", "AU-9921")})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
