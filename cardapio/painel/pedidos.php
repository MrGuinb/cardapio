<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'conexao.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $stmt = $pdo->query("SELECT * FROM pedidos ORDER BY data_pedido DESC");
  $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($pedidos);
  exit;
}

if ($method === 'DELETE') {
  parse_str(file_get_contents("php://input"), $data);
  $id = intval($data['id']);

  $stmt = $pdo->prepare("DELETE FROM pedidos WHERE id = ?");
  $stmt->execute([$id]);

  echo json_encode(['status' => 'ok']);
  exit;
}
?>
