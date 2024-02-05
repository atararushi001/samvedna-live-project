<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $query = "SELECT job.*, recruiters.profilePicture 
    FROM job 
    JOIN recruiters ON job.recruiters_id = recruiters.recruiters_id 
    WHERE job.job_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $_GET['job_id']);

    try {
        $stmt->execute();

        $result = $stmt->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        foreach ($rows as $index => $row) {
            $rows[$index]['conveyanceProvided'] = $row['conveyanceProvided'] === 'true' ? true : false;
            $rows[$index]['ownVehiclePreferred'] = $row['ownVehiclePreferred'] === 'true' ? true : false;
            $rows[$index]['interviewDetailsPersonalInterview'] = $row['interviewDetailsPersonalInterview'] === 'true' ? true : false;
            $rows[$index]['interviewDetailsGroupDiscussion'] = $row['interviewDetailsGroupDiscussion'] === 'true' ? true : false;
            $rows[$index]['interviewDetailsTechnicalTest'] = $row['interviewDetailsTechnicalTest'] === 'true' ? true : false;
            $rows[$index]['interviewDetailsAptitudeTest'] = $row['interviewDetailsAptitudeTest'] === 'true' ? true : false;
            $rows[$index]['womenEligible'] = $row['womenEligible'] === 'true' ? true : false;
        }

        $response = array(
            'success' => true,
            'message' => 'Jobs found!',
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
