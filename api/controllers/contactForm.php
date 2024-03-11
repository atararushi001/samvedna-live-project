<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 
    $name = $_POST['name'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];
    $message = $_POST['message'];

    $sql = "INSERT INTO `contact_query`( `name`, `email`, 
    `contact`, `address`, `message`) 
    VALUES (?,?,?,?,?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssss",
        $name,
        $email,
        $contact,
        $address,
        $message,
    );


    if (!$stmt->execute()) {
        die('Error in execute statement: ' . $stmt->error);
    } else {
        $message = 'Query Sent Successfully!';
        $response = array(
            'success' => true,
            'message' => $message,
        );

        header('Content-Type: application/json');
        $jsonResponse = json_encode($response);
        echo $jsonResponse;
    }

    $stmt->close();

    $conn->close();
}