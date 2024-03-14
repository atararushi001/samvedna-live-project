<?php
include "../includes/config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $stmt = $conn->prepare("DELETE FROM jobresume WHERE res_id  = ?");
        $stmt->bind_param("s", $_POST['res_id']);
        $stmt->execute();

        $result = $stmt->get_result();

        if(!$result) {
            $response = array(
                'success' => true,
                'message' => 'Job deleted!',
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Job not Found!',
            );
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $stmt->close();
        $conn->close();
    }
} else {
    $response = array(
        'success' => false,
        'message' => 'Invalid request method',
    );

    header('Content-Type: application/json');
    $jsonResponse = json_encode($response);
    echo $jsonResponse;
    exit();
}
