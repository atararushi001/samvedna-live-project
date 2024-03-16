<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $baseQuery = "SELECT jobresume.*, resumeemployers.*, positions.*, education.*, degrees.*, military.*, militarybranches.*
                    FROM jobresume
                    LEFT JOIN resumeemployers ON jobresume.res_id = resumeemployers.jobresume_id
                    LEFT JOIN positions ON resumeemployers.resumeemployers_id = positions.resumeemployers_id
                    LEFT JOIN education ON jobresume.res_id = education.jobresume_id
                    LEFT JOIN degrees ON education.education_id = degrees.education_id
                    LEFT JOIN military ON jobresume.res_id = military.jobresume_id
                    LEFT JOIN militarybranches ON military.military_id  = militarybranches.military_id";

    $publishedQuery = $baseQuery . " WHERE jobresume.published = true GROUP BY jobresume.res_id";
    $privateQuery = $baseQuery . " WHERE jobresume.published = false GROUP BY jobresume.res_id";


    try {
        $stmt = $conn->prepare($publishedQuery);
        $stmt->execute();
        $result = $stmt->get_result();
        $publishedResumes = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        $stmt = $conn->prepare($privateQuery);
        $stmt->execute();
        $result = $stmt->get_result();
        $privateResumes = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        $response = array(
            'success' => true,
            'message' => 'job resumes found!',
            'publicResumes' => $publishedResumes,
            'privateResumes' => $privateResumes,
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $conn->close();
    }
}
