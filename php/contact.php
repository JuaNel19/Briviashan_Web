<?php
/**
 * BRIVIASHAN AGROEXPORTACIONES EIRL
 * B2B Form Handler for cPanel PHP Server
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// 1. Sanitizar y obtener los campos del formulario
$name     = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8') : '';
$company  = isset($_POST['company']) ? htmlspecialchars(trim($_POST['company']), ENT_QUOTES, 'UTF-8') : '';
$country  = isset($_POST['country']) ? htmlspecialchars(trim($_POST['country']), ENT_QUOTES, 'UTF-8') : '';
$email    = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone    = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8') : '';
$product  = isset($_POST['product']) ? htmlspecialchars(trim($_POST['product']), ENT_QUOTES, 'UTF-8') : '';
$quantity = isset($_POST['quantity']) ? htmlspecialchars(trim($_POST['quantity']), ENT_QUOTES, 'UTF-8') : '';
$message  = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';

if (!$name || !$email) {
    echo json_encode(['success' => false, 'message' => 'Por favor ingrese su nombre y correo corporativo válido.']);
    exit;
}

// 2. Configurar correo de destino en tu cPanel (Cambia este correo por el tuyo)
$to = "calidad@briviashan.com"; 
$subject = "=?UTF-8?B?" . base64_encode("Nueva Cotización Internacional - " . $name) . "?=";

// 3. Construir mensaje en texto plano
$body  = "NUEVA SOLICITUD DE COTIZACIÓN INTERNACIONAL - BRIVIASHAN\n";
$body .= "=======================================================\n\n";
$body .= "Nombre Completo: " . $name . "\n";
$body .= "Empresa / Importadora: " . $company . "\n";
$body .= "País de Destino: " . $country . "\n";
$body .= "Correo Corporativo: " . $email . "\n";
$body .= "WhatsApp / Teléfono: " . $phone . "\n";
$body .= "Producto / Presentación: " . $product . "\n";
$body .= "Cantidad Estimada: " . $quantity . "\n\n";
$body .= "Mensaje / Requerimientos:\n" . $message . "\n\n";
$body .= "-------------------------------------------------------\n";
$body .= "Enviado desde el sitio web oficial https://" . $_SERVER['HTTP_HOST'] . "\n";

// 4. Cabeceras del correo
$host = $_SERVER['HTTP_HOST'];
$headers  = "From: BRIVIASHAN Web <no-reply@" . $host . ">\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 5. Enviar correo usando mail() nativo de cPanel
if (@mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Solicitud enviada con éxito.']);
} else {
    echo json_encode(['success' => false, 'message' => 'No se pudo enviar el correo desde el servidor. Verifique la configuración de correo en cPanel.']);
}
