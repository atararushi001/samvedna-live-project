<?php
include "../includes/config.php";

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
    JOIN recruiters ON job.recruiter_id = recruiters.recruiters_id 
    WHERE job.jobDesignation LIKE ? 
        OR job.jobStatus = ? 
        OR job.country = ? 
        OR job.state = ? 
        OR (job.postedOn >= ? AND job.postedOn <= ?)";
    $stmt = $conn->prepare($query);

    $stmt->bind_param("ssssss", $searchLike, $status, $country, $state, $postedBetweenStart, $postedBetweenEnd);

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
