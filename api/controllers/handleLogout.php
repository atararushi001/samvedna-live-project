<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, multipart/form-data, application/json");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    session_unset();
    session_destroy();

    echo json_encode(array(
        "success" => true,
        "message" => "Logged out successfully"
    ));
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "Invalid request method"
    ));
}
