<?php
include "../includes/config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $stmt = $conn->prepare("DELETE FROM resumes WHERE resume_id  = ?");
        $stmt->bind_param("s", $_POST['resume_id']);
        $stmt->execute();

        if ($conn->affected_rows > 0) {
            $response = array(
                'success' => true,
                'message' => 'Resume deleted!',
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Resume not Found!',
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
