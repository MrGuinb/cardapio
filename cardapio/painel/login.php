produtos.php<?php
session_start();

// Credenciais fixas (pode depois salvar no banco se quiser)
$usuarioCorreto = 'admin';
$senhaCorreta = 'admin123';

if ($_POST['usuario'] === $usuarioCorreto && $_POST['senha'] === $senhaCorreta) {
  $_SESSION['logado'] = true;
  header('Location: painel.html');
} else {
  echo "<script>alert('Usuário ou senha inválidos');window.location='login.html';</script>";
}
?>
