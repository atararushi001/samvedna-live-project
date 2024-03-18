<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $author = $_POST['author'];

    $stmt = $conn->prepare("UPDATE blogs SET title = ?, author = ?, content = ? WHERE id = ?");
    $stmt->bind_param("ssss", $title, $author, $content, $id);

    if ($stmt->execute()) {
        $response = array(
            "success" => true,
            "message" => "Blog updated successfully"
        );
    } else {
        $response = array(
            "success" => false,
            "message" => "Failed to update blog"
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
} else {
    $response = array(
        "success" => false,
        "message" => "Invalid request method"
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
