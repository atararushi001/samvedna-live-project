<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];

    $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $blog = $result->fetch_assoc();

    $response = array(
        "success" => true,
        "blog" => $blog
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
