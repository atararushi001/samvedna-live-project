<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $query = "SELECT * FROM resumes WHERE resumes.published = 'true'";

    try {
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $resumes = $result->fetch_all(MYSQLI_ASSOC);

        foreach ($resumes as $index => $resume) {
            $resumes[$index]['published'] = $resume['published'] === 'true' ? true : false;
        }

        $stmt->close();

        $response = array(
            'success' => true,
            'message' => 'job resumes found!',
            'resumes' => $resumes,
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $conn->close();
    }
}
