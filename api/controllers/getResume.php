<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $resume_id = $_GET['id'];

    try {
        // Fetch jobresume
        $stmt = $conn->prepare("SELECT * FROM resumes WHERE resume_id = ?");
        $stmt->bind_param("s", $resume_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $resume = $result->fetch_assoc();
        $stmt->close();

        if (!$resume) {
            handleError("No job resume found!");
        }

        // Initialize response object
        $response = array(
            'resume_id' => $resume['resume_id'],
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
            'desiredJobType' => array(),
            'desiredPay' => $resume['desiredPay'],
            'desiredCurrency' => $resume['desiredCurrency'],
            'desiredPaytime' => $resume['desiredPaytime'],
            'additionalPreferences' => $resume['additionalPreferences'],
            'published' => $resume['published'],
        );

        // Fetch employers and positions
        $stmt = $conn->prepare("SELECT employers.*, positions.* FROM employers LEFT JOIN positions ON employers.employer_id = positions.employer_id WHERE employers.resume_id = ?");
        $stmt->bind_param("s", $resume_id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $employerId = $row['employer_id'];
            $employerName = $row['employerName'];
            $position = array(
                'positionTitle' => $row['positionTitle'],
                'startDate' => $row['startDate'],
                'endDate' => $row['endDate'],
                'isCurrentPosition' => $row['isCurrentPosition'] === 'true' ? true : false,
                'jobDescription' => $row['jobDescription'],
                'position_id' => $row['position_id'] // Add position_id to the response for updating purposes
            );

            // Check if employer already exists
            $employerIndex = null;
            foreach ($response['employers'] as $index => $existingEmployer) {
                if ($existingEmployer['employerName'] === $employerName) {
                    $employerIndex = $index;
                    break;
                }
            }

            // If employer exists, add position to its 'positions' array
            // If not, create a new entry for the employer
            if ($employerIndex !== null) {
                $response['employers'][$employerIndex]['positions'][] = $position;
            } else {
                $employer = array(
                    'employerName' => $employerName,
                    'employer_id' => $employerId, // Add employer_id to the response for updating purposes
                    'positions' => array($position)
                );
                $response['employers'][] = $employer;
            }
        }
        $stmt->close();

        // Fetch education and degrees
        $stmt = $conn->prepare("SELECT education.*, degrees.* FROM education LEFT JOIN degrees ON education.institution_id = degrees.institution_id WHERE education.resume_id = ?");
        $stmt->bind_param("s", $resume_id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            // Create a new entry for each degree
            $degree = array(
                'degree' => $row['degree'],
                'educationCompleted' => $row['educationCompleted'],
                'major' => $row['major'],
                'graduationDate' => $row['graduationDate'],
                'additionalInfo' => $row['additionalInfo'],
                'grade' => $row['grade'],
                'outOf' => $row['outOf'],
                'degree_id' => $row['degree_id'] // Add degree_id to the response for updating purposes
            );

            // Add the degree to the education array
            $response['education'][] = array(
                'institutionName' => $row['institutionName'],
                'institution_id' => $row['institution_id'], // Add institution_id to the response for updating purposes
                'degrees' => array($degree)
            );
        }

        $stmt->close();

        // Fetch Military Branches
        $stmt = $conn->prepare("SELECT * FROM branches WHERE resume_id = ?");
        $stmt->bind_param("s", $resume_id);
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
                'recognition' => $row['recognition'],
                'branch_id' => $row['branch_id'] // Add branch_id to the response for updating purposes
            );
            $response['branches'][] = $branch;
        }
        $stmt->close();

        // Fetch Desired Job Types
        $stmt = $conn->prepare("SELECT * FROM job_types WHERE resume_id = ?");
        $stmt->bind_param("s", $resume_id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $response['desiredJobType'][] = $row['jobType'];
        }
        $stmt->close();

        // Set published flag if it exists in the database
        if (isset($resume['published'])) {
            $response['published'] = $resume['published'] === 'true' ? true : false;
        }

        header('Content-Type: application/json');
        echo json_encode(array('success' => true, 'message' => 'Data inserted successfully', 'resume' => $response));
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $conn->close();
    }
}
