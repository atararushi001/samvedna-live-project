<?php
// include "../includes/config.php";

// function handleError($message)
// {
//     http_response_code(500);
//     echo json_encode(array('success' => false, 'message' => $message));
//     exit();
// }

// if ($_SERVER['REQUEST_METHOD'] == "POST") {
//     $search = isset($_POST['search']) ? trim($_POST['search']) : "";
//     $disabilityPercentage = isset($_POST['disabilityPercentage']) ? trim($_POST['disabilityPercentage']) : "";
//     $placeOfWork = isset($_POST['location']) ? trim($_POST['location']) : "";
//     $jobType = isset($_POST['jobType']) ? trim($_POST['jobType']) : "";
//     $searchLike = "%$search%";

//     $query = "SELECT job.*, recruiters.profilePicture 
//     FROM job 
//     JOIN recruiters ON job.recruiters_id = recruiters.recruiters_id 
//     WHERE job.jobDesignation LIKE ? OR job.jobType = ? OR job.placeOfWork = ? OR job.disabilityInfoPercentage = ?";
//     $stmt = $conn->prepare($query);

//     $stmt->bind_param("ssss", $searchLike, $jobType, $placeOfWork, $disabilityPercentage);

//     try {
//         $stmt->execute();

//         $result = $stmt->get_result();
//         $rows = $result->fetch_all(MYSQLI_ASSOC);

//         if (count($rows) == 0) {
//             $response = array(
//                 'success' => false,
//                 'message' => 'No jobs found!',
//             );
//         } else {
//             $response = array(
//                 'success' => true,
//                 'message' => 'Jobs Found!',
//                 'jobs' => $rows,
//             );
//         }

//         header('Content-Type: application/json');
//         echo json_encode($response);
//     } catch (Exception $e) {
//         handleError("Database error: " . $e->getMessage());
//     } finally {
//         $stmt->close();
//         $conn->close();
//     }
// }
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $search = isset($_POST['search']) ? trim($_POST['search']) : "";
    $status = isset($_POST['status']) ? trim($_POST['status']) : "";
    $postedBetweenStart = isset($_POST['postedBetweenStart']) ? trim($_POST['postedBetweenStart']) : "";
    $postedBetweenEnd = isset($_POST['postedBetweenEnd']) ? trim($_POST['postedBetweenEnd']) : "";
    $country = isset($_POST['country']) ? trim($_POST['country']) : "";
    $state = isset($_POST['state']) ? trim($_POST['state']) : "";

    $searchLike = "%$search%";

    $query = "SELECT job.*, recruiters.profilePicture 
    FROM job 
    JOIN recruiters ON job.recruiters_id = recruiters.recruiters_id 
    WHERE job.jobDesignation LIKE ? 
        OR job.job_status = ? 
        OR job.country = ? 
        OR job.state = ? 
        OR job.disabilityInfoPercentage = ?
        OR (job.job_date >= ? AND job.job_date <= ?)";
    $stmt = $conn->prepare($query);

    $stmt->bind_param("sssssss", $searchLike, $status, $country, $state, $disabilityPercentage, $postedBetweenStart, $postedBetweenEnd);

    try {
        $stmt->execute();

        $result = $stmt->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        if (count($rows) == 0) {
            $response = array(
                'success' => false,
                'message' => 'No jobs found!',
            );
        } else {
            $response = array(
                'success' => true,
                'message' => 'Jobs Found!',
                'jobs' => $rows,
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
}
