<?php
require 'session_check.php';
require 'conexao.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $stmt = $pdo->query("SELECT * FROM categorias ORDER BY id DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    break;

  case 'POST':
    $stmt = $pdo->prepare("INSERT INTO categorias (nome) VALUES (?)");
    $stmt->execute([$_POST['nome']]);
    echo json_encode(['status' => 'ok']);
    break;

  case 'PUT':
    parse_str(file_get_contents("php://input"), $_PUT);
    $stmt = $pdo->prepare("UPDATE categorias SET nome=? WHERE id=?");
    $stmt->execute([$_PUT['nome'], $_PUT['id']]);
    echo json_encode(['status' => 'updated']);
    break;

  case 'DELETE':
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM categorias WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(['status' => 'deleted']);
    break;
}
?>

