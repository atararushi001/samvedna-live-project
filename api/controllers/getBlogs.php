<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM blogs");
    $stmt->execute();

    $result = $stmt->get_result();
    $blogs = $result->fetch_all(MYSQLI_ASSOC);

    $response = array(
        "success" => true,
        "blogs" => $blogs
    );

    $stmt->close();

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
