<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Ler todos os alunos
        $stmt = $pdo->query('SELECT * FROM alunos');
        $alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($alunos);
        break;

    case 'POST':
        // Criar novo aluno
        $data = json_decode(file_get_contents('php://input'), true);
        $nome = $data['nome'];
        $id_aluno = $data['id_aluno'];
        $email = $data['email'];

        $stmt = $pdo->prepare('INSERT INTO alunos (nome, id_aluno, email) VALUES (?, ?, ?)');
        $stmt->execute([$nome, $id_aluno, $email]);
        echo json_encode(['message' => 'Aluno adicionado com sucesso']);
        break;

    case 'PUT':
        // Atualizar aluno
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $nome = $data['nome'];
        $id_aluno = $data['id_aluno'];
        $email = $data['email'];

        $stmt = $pdo->prepare('UPDATE alunos SET nome = ?, id_aluno = ?, email = ? WHERE id = ?');
        $stmt->execute([$nome, $id_aluno, $email, $id]);
        echo json_encode(['message' => 'Aluno atualizado com sucesso']);
        break;

    case 'DELETE':
        // Excluir aluno
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        $stmt = $pdo->prepare('DELETE FROM alunos WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Aluno excluído com sucesso']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
        break;
}
?>