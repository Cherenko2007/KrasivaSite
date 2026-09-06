<?php
/**
 * KRASIVA — Отправка заявки в Telegram
 * Вариант 3: Форма → Telegram-бот → редирект в Instagram
 *
 * Токен и chat_id берутся из config.php
 * НЕ КОММИТЬ config.php на GitHub!
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Подключаем секретные данные
require_once 'config.php';

// === ПОЛУЧЕНИЕ ДАННЫХ ===
$name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
$phone   = isset($_POST['phone'])   ? trim($_POST['phone'])   : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$date    = isset($_POST['date'])    ? trim($_POST['date'])    : '';

// === ВАЛИДАЦИЯ ===
if (empty($name) || empty($phone) || empty($service)) {
    echo json_encode(['success' => false, 'message' => 'Заполните все обязательные поля']);
    exit;
}

if (strlen($phone) < 7) {
    echo json_encode(['success' => false, 'message' => 'Введите корректный номер телефона']);
    exit;
}

// === ФОРМИРОВАНИЕ СООБЩЕНИЯ ===
$text = "📩 <b>Новая заявка с сайта КРАСИВА</b>\n\n";
$text .= "👤 <b>Имя:</b> " . htmlspecialchars($name) . "\n";
$text .= "📞 <b>Телефон:</b> " . htmlspecialchars($phone) . "\n";
$text .= "💆 <b>Услуга:</b> " . htmlspecialchars($service) . "\n";
$text .= "📅 <b>Желаемая дата:</b> " . ($date ? htmlspecialchars($date) : 'не указана') . "\n";
$text .= "⏰ <b>Время заявки:</b> " . date('d.m.Y H:i') . "\n";
$text .= "🌐 <b>Источник:</b> " . (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'сайт') . "\n";

// === ОТПРАВКА В TELEGRAM ===
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$postData = [
    'chat_id'    => $chatId,
    'text'       => $text,
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true
];

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $url,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($postData),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

// === ОТВЕТ ===
if ($curlErr) {
    echo json_encode(['success' => false, 'message' => 'Ошибка соединения: ' . $curlErr]);
    exit;
}

if ($httpCode !== 200) {
    echo json_encode(['success' => false, 'message' => 'Сервер Telegram недоступен (HTTP ' . $httpCode . ')']);
    exit;
}

$result = json_decode($response, true);
if (!$result || !$result['ok']) {
    $err = isset($result['description']) ? $result['description'] : 'Неизвестная ошибка Telegram';
    echo json_encode(['success' => false, 'message' => 'Ошибка Telegram: ' . $err]);
    exit;
}

// Успех
echo json_encode(['success' => true]);
exit;
