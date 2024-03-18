<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM blogs WHERE id = ?");
    $stmt->bind_param("s", $id);

    if ($stmt->execute()) {
        $response = array(
            "success" => true,
            "message" => "Blog deleted successfully"
        );
    } else {
        $response = array(
            "success" => false,
            "message" => "Failed to delete blog"
        );
    }

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
