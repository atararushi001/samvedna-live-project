
<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $query = "SELECT *
    FROM jobresume
    LEFT JOIN resumeemployers ON jobresume.res_id = resumeemployers.jobresume_id
    LEFT JOIN positions ON resumeemployers.resumeemployers_id = positions.resumeemployers_id
    LEFT JOIN education ON jobresume.jobresume_id = education.jobresume_id
    LEFT JOIN degrees ON education.education_id = degrees.education_id
    LEFT JOIN military ON jobresume.jobresume_id = military.jobresume_id
    LEFT JOIN militarybranches ON military.military_id  = militarybranches.military_id where res_id  = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $_GET['res_id']);

    try {
        $stmt->execute();

        $result = $stmt->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        $response = array(
            'success' => true,
            'message' => 'job resume found!',
            'job' => $rows,
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
