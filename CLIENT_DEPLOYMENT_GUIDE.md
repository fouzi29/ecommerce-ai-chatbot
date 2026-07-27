# 🚀 Master Client Integration & Multi-Language Backend Guide

> **Prepared by Fouzi**  
> *Centralized Multi-Tenant Setup Blueprint for embedding the AI Chatbot on any client website (PHP, Node.js, Python, Laravel, Shopify, WooCommerce, WordPress).*

---

## ⚡ Option 1: Centralized Multi-Tenant Embed (RECOMMENDED)

You control everything from 1 central Vercel deployment:  
👉 **`https://ecommerce-ai-chatbot-ochre.vercel.app/embed.js`**

When onboarding a new client (**Client 1: `njwade.net`**, **Client 2: `store2.com`**), pass their domain, WhatsApp API Key, and Database URLs directly inside their `<script>` embed tag:

---

### 📋 Copy-Paste Embed Tag for Client 1 (`njwade.net`)

```html
<!-- AURA AI Shopping Assistant for njwade.net -->
<script 
  src="https://ecommerce-ai-chatbot-ochre.vercel.app/embed.js" 
  data-site-domain="njwade.net"
  data-store-id="njwade-net-store"
  data-whatsapp-key="Lgy1D7Prsd5u"
  data-client-phone="+8801795657378"
  data-products-api="https://njwade.net/api/products.php"
  data-orders-api="https://njwade.net/api/orders.php"
  async>
</script>
```

---

### 📋 Copy-Paste Embed Tag for Client 2 (`store2.com`)

```html
<!-- AURA AI Shopping Assistant for store2.com -->
<script 
  src="https://ecommerce-ai-chatbot-ochre.vercel.app/embed.js" 
  data-site-domain="store2.com"
  data-store-id="store2-com-store"
  data-whatsapp-key="CLIENT2_WHATSAPP_KEY"
  data-client-phone="+15550192831"
  data-products-api="https://store2.com/api/products"
  data-orders-api="https://store2.com/api/orders"
  async>
</script>
```

---

## 🐘 Multi-Language Backend Demo Files & Code Templates

To connect a client's custom database, download or copy the starter backend endpoint files from your server:

---

### 1️⃣ PHP & MySQL Starter (`api/products.php` & `api/orders.php`)
📁 **Download File**: `https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/php-demo.php`

```php
<?php
// njwade.net/api/products.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db   = "your_mysql_db";
$user = "your_mysql_user";
$pass = "your_mysql_password";

$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT id, name, price, original_price as originalPrice, category, description, image_url as image, rating, reviews_count as reviewsCount FROM products WHERE stock > 0");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("INSERT INTO orders (order_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW())");
    $stmt->execute([
        $data['orderId'] ?? ('AU-' . rand(1000, 9999)),
        $data['customerName'],
        $data['customerEmail'],
        $data['customerPhone'] ?? '',
        $data['shippingAddress'],
        $data['totalAmount'] ?? 0
    ]);
    echo json_encode(["success" => true, "orderId" => $data['orderId']]);
    exit;
}
?>
```

---

### 2️⃣ Node.js / Express Starter (`node-demo.js`)
📁 **Download File**: `https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/node-demo.js`

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json([
    { id: "prod-1", name: "Aura ANC Headphones", price: 249.99, category: "Audio" }
  ]);
});

app.post('/api/orders', (req, res) => {
  console.log("Order Received:", req.body);
  res.json({ success: true, orderId: req.body.orderId || 'AU-9921' });
});

app.listen(4000, () => console.log('API Server running on 4000'));
```

---

### 3️⃣ Python / Flask Starter (`python-demo.py`)
📁 **Download File**: `https://ecommerce-ai-chatbot-ochre.vercel.app/demo-api/python-demo.py`

```python
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify([
        {"id": "py-1", "name": "Aura Smartwatch", "price": 199.50, "category": "Wearables"}
    ])

@app.route('/api/orders', methods=['POST'])
def receive_order():
    return jsonify({"success": True, "orderId": request.json.get("orderId", "AU-9921")})

if __name__ == '__main__':
    app.run(port=5000)
```

---

## 👨‍💻 Support & Services

Need Fouzi to set up your client's database?
- 👔 **LinkedIn**: [https://www.linkedin.com/in/mdfouzi/](https://www.linkedin.com/in/mdfouzi/)
- 📌 **Fiverr Profile**: [https://www.fiverr.com/s/e6BNbv3](https://www.fiverr.com/s/e6BNbv3)
- 🚀 **Custom AI Chatbot Gig**: [https://www.fiverr.com/s/GzVdLez](https://www.fiverr.com/s/GzVdLez)
