<?php
/**
 * Production PHP + MySQL Starter Endpoint for AI Chatbot
 * Supported Endpoints:
 *   - GET /api/products.php -> Returns live MySQL catalog array
 *   - POST /api/orders.php   -> Inserts in-chat AI orders into MySQL
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db   = "your_mysql_database_name";
$user = "your_mysql_username";
$pass = "your_mysql_password";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $requestMethod = $_SERVER['REQUEST_METHOD'];

    // 1. GET PRODUCTS CATALOG
    if ($requestMethod === 'GET') {
        $stmt = $pdo->query("SELECT id, name, price, original_price as originalPrice, category, description, image_url as image, rating, reviews_count as reviewsCount FROM products WHERE stock > 0");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
        exit;
    }

    // 2. POST ORDER FROM AI CHATBOT
    if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['customerName'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid payload"]);
            exit;
        }

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
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database Error: " . $e->getMessage()]);
}
?>
