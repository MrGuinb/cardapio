<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'session_check.php';
require 'conexao.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $stmt = $pdo->query("SELECT * FROM configuracoes LIMIT 1");
  $config = $stmt->fetch(PDO::FETCH_ASSOC);

  $stmt2 = $pdo->query("SELECT * FROM horarios ORDER BY id ASC");
  $horarios = $stmt2->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['configuracoes' => $config, 'horarios' => $horarios]);
  exit;
}

if ($method === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data['nome_loja'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados incompletos']);
    exit;
  }

  $stmt = $pdo->prepare("UPDATE configuracoes SET nome_loja=?, mensagem_whatsapp=?, numero_whatsapp=?, taxa_entrega=?, tempo_estimado=?, status=? WHERE id=1");
  $stmt->execute([
    $data['nome_loja'],
    $data['mensagem_whatsapp'],
    $data['numero_whatsapp'],
    $data['taxa_entrega'],
    $data['tempo_estimado'],
    $data['status']
  ]);

  foreach ($data['horarios'] as $h) {
    $stmt = $pdo->prepare("UPDATE horarios SET abre=?, fecha=?, fechado=? WHERE id=?");
    $stmt->execute([$h['abre'], $h['fecha'], $h['fechado'] ? 1 : 0, $h['id']]);
  }

  echo json_encode(['status' => 'ok']);
  exit;
}
?>
