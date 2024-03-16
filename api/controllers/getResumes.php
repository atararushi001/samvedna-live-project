<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $baseQuery = "SELECT * FROM resumes";

    $publishedQuery = $baseQuery . " WHERE resumes.published = 'true' GROUP BY resumes.resume_id";
    $privateQuery = $baseQuery . " WHERE resumes.published = 'false' GROUP BY resumes.resume_id";


    try {
        $stmt = $conn->prepare($publishedQuery);
        $stmt->execute();
        $result = $stmt->get_result();
        $publishedResumes = $result->fetch_all(MYSQLI_ASSOC);

        foreach ($publishedResumes as $index => $resume) {
            $publishedResumes[$index]['published'] = $resume['published'] === 'true' ? true : false;
        }

        $stmt->close();

        $stmt = $conn->prepare($privateQuery);
        $stmt->execute();
        $result = $stmt->get_result();
        $privateResumes = $result->fetch_all(MYSQLI_ASSOC);

        foreach ($privateResumes as $index => $resume) {
            $privateResumes[$index]['published'] = $resume['published'] === 'true' ? true : false;
        }

        $stmt->close();


        $response = array(
            'success' => true,
            'message' => 'job resumes found!',
            'publicResumes' => $publishedResumes,
            'privateResumes' => $privateResumes
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $conn->close();
    }
}
