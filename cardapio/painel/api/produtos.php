<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'session_check.php';
require 'conexao.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    if (isset($_GET['id'])) {
      $stmt = $pdo->prepare("SELECT * FROM produtos WHERE id = ?");
      $stmt->execute([$_GET['id']]);
      echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    } else {
      $stmt = $pdo->query("SELECT * FROM produtos ORDER BY id DESC");
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
    break;

  case 'POST':
    $stmt = $pdo->prepare("INSERT INTO produtos (nome, descricao, preco, imagem_url) VALUES (?, ?, ?, ?)");
    $stmt->execute([$_POST['nome'], $_POST['descricao'], $_POST['preco'], $_POST['imagem_url']]);
    echo json_encode(['status' => 'ok']);
    break;

  case 'PUT':
    parse_str(file_get_contents("php://input"), $_PUT);
    $stmt = $pdo->prepare("UPDATE produtos SET nome=?, descricao=?, preco=?, imagem_url=? WHERE id=?");
    $stmt->execute([$_PUT['nome'], $_PUT['descricao'], $_PUT['preco'], $_PUT['imagem_url'], $_PUT['id']]);
    echo json_encode(['status' => 'updated']);
    break;

  case 'DELETE':
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM produtos WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(['status' => 'deleted']);
    break;
}
