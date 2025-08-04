<?php
$host = 'localhost';
$db   = 'gdbtech_cardapio';
$user = 'gdbtech_cardapio';
$pass = 'otavio1003';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>
