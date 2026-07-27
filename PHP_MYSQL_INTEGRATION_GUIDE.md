# 🐘 PHP & MySQL Live Database Integration Guide for njwade.net

> **Engineered by Fouzi**  
> *Complete production PHP code for connecting njwade.net's MySQL database to the AI Chatbot.*

---

## 📌 1. What is `aura-config-njwade-net.json`?

The `aura-config-njwade-net.json` file is your store's **Master Integration Blueprint**. It contains:
- Your target domain (`njwade.net`)
- Your API endpoints (`https://njwade.net/api/products.php`)
- Your WhatsApp alert key (`Lgy1D7Prsd5u`)
- Database synchronization mode

---

## 💻 2. How `njwade.net` Connects Their PHP + MySQL Database

To allow the AI Chatbot to read live inventory from `njwade.net` and save orders directly into your MySQL database, create 2 small PHP files on your server:

---

### File 1: `api/products.php` (Fetches Live MySQL Catalog)

Create `https://njwade.net/api/products.php`:

```php
<?php
// njwade.net/api/products.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db   = "your_mysql_database_name";
$user = "your_mysql_username";
$pass = "your_mysql_password";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch products from your MySQL products table
    $stmt = $pdo->query("SELECT id, name, price, original_price as originalPrice, category, description, image_url as image, rating, reviews_count as reviewsCount FROM products WHERE stock > 0");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database Connection Failed: " . $e->getMessage()]);
}
?>
```

---

### File 2: `api/orders.php` (Receives AI Chatbot Orders into MySQL)

Create `https://njwade.net/api/orders.php`:

```php
<?php
// njwade.net/api/orders.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['customerName'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid payload"]);
    exit;
}

$host = "localhost";
$db   = "your_mysql_database_name";
$user = "your_mysql_username";
$pass = "your_mysql_password";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert order into MySQL orders table
    $stmt = $pdo->prepare("INSERT INTO orders (order_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW())");
    $stmt->execute([
        $data['orderId'] ?? ('AU-' . rand(1000, 9999)),
        $data['customerName'],
        $data['customerEmail'],
        $data['customerPhone'] ?? '',
        $data['shippingAddress'],
        $data['totalAmount'] ?? 0
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Order recorded successfully in MySQL database!",
        "orderId" => $data['orderId']
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database Insert Failed: " . $e->getMessage()]);
}
?>
```

---

## ⚡ 3. Final Step in SaaS Control Panel

1. Go to your live AI Chatbot application.
2. Click **`Smart Demo`** / **`Settings`** ➔ **`DB & Sync`** tab.
3. Select **`Custom REST API`**.
4. Enter:
   - **Products API URL**: `https://njwade.net/api/products.php`
   - **Order Webhook URL**: `https://njwade.net/api/orders.php`
5. Click **Save SaaS Config**!

Now, any time a customer visits `njwade.net`, the AI Assistant queries their live MySQL catalog and saves orders directly into their MySQL database!
