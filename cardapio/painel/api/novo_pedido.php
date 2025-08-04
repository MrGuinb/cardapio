<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require 'conexao.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (
  !isset($data['nome_cliente']) || !isset($data['itens']) ||
  !isset($data['valor_total']) || !isset($data['pagamento'])
) {
  echo json_encode(['status' => 'erro', 'mensagem' => 'Dados incompletos']);
  exit;
}

$stmt = $pdo->prepare("INSERT INTO pedidos (
  nome_cliente, telefone_cliente, endereco, itens, observacoes, valor_total, pagamento
) VALUES (?, ?, ?, ?, ?, ?, ?)");

$stmt->execute([
  $data['nome_cliente'],
  $data['telefone_cliente'],
  $data['endereco'],
  $data['itens'],
  $data['observacoes'],
  $data['valor_total'],
  $data['pagamento']
]);

echo json_encode(['status' => 'ok']);
?>
