<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file_tmp = $_FILES['cover']['tmp_name'];
    $ext = pathinfo($_FILES['cover']['name'], PATHINFO_EXTENSION);
    $file_name = time() . '.' . $ext;

    move_uploaded_file($file_tmp, "../uploads/covers/" . $file_name);

    $title = $_POST['title'];
    $content = $_POST['content'];
    $cover = $file_name;
    $author = $_POST['author'];

    timezone_open("Asia/Kolkata");
    $published = date("Y-m-d");

    $stmt = $conn->prepare("INSERT INTO blogs (title, cover, author, published, content) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $cover, $author, $published, $content);
    $stmt->execute();

    $response = array(
        "success" => true,
        "message" => "Blog created successfully"
    );

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
} else {
    $response = array(
        "success" => false,
        "message" => "Invalid request method"
    );

    echo json_encode($response);
    exit();
}
