<?php
include '../includes/config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $resumeName = $_POST['resumeName'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $suffix = $_POST['suffix'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $website = $_POST['website'];
    $linkedin = $_POST['linkedin'];
    $country = $_POST['country'];
    $state = $_POST['state'];
    $city = $_POST['city'];
    $postalCode = $_POST['postalCode'];
    $summary = $_POST['summary'];
    $objective = $_POST['objective'];

    $stmt = $conn->prepare("INSERT INTO jobresume (resumeName, firstName, lastName, suffix, email, phone, website, linkedin, country, state, city, postalCode, summary, objective) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "ssssssssssssss",
        $resumeName,
        $firstName,
        $lastName,
        $suffix,
        $email,
        $phone,
        $website,
        $linkedin,
        $country,
        $state,
        $city,
        $postalCode,
        $summary,
        $objective
    );

    if (!$stmt->execute()) {
        die('Error in execute statement: ' . $stmt->error);
    } else {


        $lastInsertId = $stmt->insert_id;
        $employers = $_POST['employers'];
        foreach ($employers as $employer) {
            $employerName = $employer['employerName'];
            $positions = $employer['positions'];

            $stmt = $conn->prepare("INSERT INTO resumeemployers (employerName, jobresume_id) VALUES (?, ?)");
            $stmt->bind_param("si", $employerName, $lastInsertId);
            if (!$stmt->execute()) {
                die('Error in execute statement: ' . $stmt->error);
            }

            $employerId = $stmt->insert_id;

            foreach ($positions as $position) {
                $positionTitle = $position['positionTitle'];
                $startDate = $position['startDate'];
                $endDate = $position['endDate'];
                $isCurrentPosition = $position['isCurrentPosition'];
                $jobDescription = $position['jobDescription'];

                $stmt = $conn->prepare("INSERT INTO positions (positionTitle, startDate, endDate, isCurrentPosition, jobDescription, resumeemployers_id) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("sssssi", $positionTitle, $startDate, $endDate, $isCurrentPosition, $jobDescription, $employerId);
                if (!$stmt->execute()) {
                    die('Error in execute statement: ' . $stmt->error);
                }
            }
        }

        $message = 'Data inserted successfully';
        $response = array(
            'success' => true,
            'message' => $message,
        );

        header('Content-Type: application/json');
        $jsonResponse = json_encode($response);
        echo $jsonResponse;
    }

    $stmt->close();
    $conn->close();

    // Add your database insert code here


}
