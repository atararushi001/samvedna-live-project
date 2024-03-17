<?php
include "../includes/config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $stmt = $conn->prepare("UPDATE job SET jobStatus = 1 - jobStatus WHERE job_id = ?");
        $stmt->bind_param("s", $_POST['job_id']);
        $stmt->execute();

        $affectedRows = $stmt->affected_rows;

        if ($affectedRows > 0) {
            $response = array(
                'success' => true,
                'message' => 'Job status changed!',
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Job not found or status already updated!',
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
