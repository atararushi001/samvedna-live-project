<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $query = "SELECT * FROM `job` WHERE `recruiters_id` = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $_SESSION['recruiters_id']);

    try {
        $stmt->execute();

        $result = $stmt->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        $response = array(
            'success' => true,
            'message' => 'Jobs found!',
            'jobs' => $rows,
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $stmt->close();
        $conn->close();
    }
}
