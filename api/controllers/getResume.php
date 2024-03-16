<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $res_id = $_GET['res_id'];

    try {
        // Fetch jobresume
        $stmt = $conn->prepare("SELECT * FROM jobresume WHERE res_id = ?");
        $stmt->bind_param("s", $res_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $resume = $result->fetch_assoc();
        $stmt->close();

        if (!$resume) {
            handleError("No job resume found!");
        }

        echo json_encode($resume);
        die();

        // Initialize response object
        $response = array(
            'res_id' => $resume['res_id'],
            'resumeName' => $resume['resumeName'],
            'firstName' => $resume['firstName'],
            'lastName' => $resume['lastName'],
            'suffix' => $resume['suffix'],
            'email' => $resume['email'],
            'phone' => $resume['phone'],
            'website' => $resume['website'],
            'linkedin' => $resume['linkedin'],
            'country' => $resume['country'],
            'state' => $resume['state'],
            'city' => $resume['city'],
            'postalCode' => $resume['postalCode'],
            'summary' => $resume['summary'],
            'objective' => $resume['objective'],
            'employers' => array(),
            'education' => array(),
            'militaryStatus' => $resume['militaryStatus'],
            'militaryAdditionalInfo' => $resume['militaryAdditionalInfo'],
            'branches' => array(),
            'desiredJobType' => json_decode($resume['desiredJobType']),
            'desiredPay' => $resume['desiredPay'],
            'desiredCurrency' => $resume['desiredCurrency'],
            'desiredPaytime' => $resume['desiredPaytime'],
            'additionalPreferences' => $resume['additionalPreferences'],
            'published' => $resume['published'],
        );

        // echo json_encode("Here");
        // die();


        // Fetch employers and positions
        $stmt = $conn->prepare("SELECT resumeemployers.*, positions.* FROM resumeemployers LEFT JOIN positions ON resumeemployers.resumeemployers_id = positions.resumeemployers_id WHERE resumeemployers.jobresume_id = ?");
        $stmt->bind_param("s", $res_id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $employerName = $row['employerName'];
            $position = array(
                'positionTitle' => $row['positionTitle'],
                'startDate' => $row['startDate'],
                'endDate' => $row['endDate'],
                'isCurrentPosition' => $row['isCurrentPosition'],
                'jobDescription' => $row['jobDescription']
            );
            $response['employers'][$employerName]['employerName'] = $employerName;
            $response['employers'][$employerName]['positions'][] = $position;
        }
        $stmt->close();

        // Fetch education and degrees
        $stmt = $conn->prepare("SELECT education.*, degrees.* FROM education LEFT JOIN degrees ON education.education_id = degrees.education_id WHERE education.jobresume_id = ?");
        $stmt->bind_param("s", $res_id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $institutionName = $row['institutionName'];
            $degree = array(
                'degree' => $row['degree'],
                'educationCompleted' => $row['educationCompleted'],
                'major' => $row['major'],
                'graduationDate' => $row['graduationDate'],
                'additionalInfo' => $row['additionalInfo'],
                'grade' => $row['grade'],
                'outOf' => $row['outOf']
            );
            $response['education'][$institutionName]['institutionName'] = $institutionName;
            $response['education'][$institutionName]['country'] = $row['country'];
            $response['education'][$institutionName]['state'] = $row['state'];
            $response['education'][$institutionName]['city'] = $row['city'];
            $response['education'][$institutionName]['degrees'][] = $degree;
        }
        $stmt->close();

        // Fetch military and militarybranches
        $stmt = $conn->prepare("SELECT military.*, militarybranches.* FROM military LEFT JOIN militarybranches ON military.military_id = militarybranches.military_id WHERE military.jobresume_id = ?");
        $stmt->bind_param("s", $res_id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $branch = array(
                'branch' => $row['branch'],
                'unit' => $row['unit'],
                'beginningRank' => $row['beginningRank'],
                'endingRank' => $row['endingRank'],
                'startDate' => $row['startDate'],
                'endDate' => $row['endDate'],
                'areaOfExpertise' => $row['areaOfExpertise'],
                'recognition' => $row['recognition']
            );
            $response['branches'][] = $branch;
        }
        $stmt->close();

        // Set published flag if it exists in the database
        if (isset($resume['published'])) {
            $response['published'] = (bool)$resume['published'];
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $conn->close();
    }
}
