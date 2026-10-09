<?php
/**
 * LaxmiERP PHP API - Configuration Endpoint
 * Handles fetching and updating site contact configuration (Phone, WhatsApp).
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/../data';
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$configFile = $dataDir . '/config.json';

$defaultConfig = [
    'phone' => '+919876543210',
    'whatsapp' => '919876543210',
    'isConfigured' => false
];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (file_exists($configFile)) {
        $content = file_get_contents($configFile);
        $config = json_decode($content, true);
        if ($config) {
            echo json_encode($config);
            exit();
        }
    }
    echo json_encode($defaultConfig);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $whatsapp = isset($input['whatsapp']) ? trim($input['whatsapp']) : '';

    if (empty($phone) || empty($whatsapp)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Phone and WhatsApp are required']);
        exit();
    }

    $updated = [
        'phone' => $phone,
        'whatsapp' => preg_replace('/\D/', '', $whatsapp),
        'isConfigured' => true
    ];

    $fp = fopen($configFile, 'w');
    if ($fp) {
        if (flock($fp, LOCK_EX)) {
            fwrite($fp, json_encode($updated, JSON_PRETTY_PRINT));
            fflush($fp);
            flock($fp, LOCK_UN);
        }
        fclose($fp);
        echo json_encode(['success' => true, 'config' => $updated]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save configuration']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
