<?php
include "../includes/config.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $stmt = $conn->prepare(
            "SELECT 
            j.job_id, 
            j.companyName,
            j.jobDesignation,
            j.jobType,
            j.city,
            j.disabilityInfoPercentage,
            j.disabilityInfoType,
            j.dutyDescription,
            r.profilePicture,
            c.name as cityname
        FROM 
            job j
        INNER JOIN 
            recruiters r 
        ON 
            j.recruiter_id = r.recruiters_id
        join cities as c on j.city = c.id
        ORDER BY 
            j.job_id 
        DESC;"
        );
        $stmt->execute();

        $result = $stmt->get_result();

        $jobs = array();

        while ($row = $result->fetch_assoc()) {
            $jobs[] = $row;
        }

        $response = array(
            'success' => true,
            'message' => 'Jobs found!',
            'jobs' => $jobs,
        );

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
