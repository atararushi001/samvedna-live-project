<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if resume ID is provided
    if (!isset($_POST['resume_id']) || empty($_POST['resume_id'])) {
        echo json_encode(array('success' => false, 'message' => 'Resume ID is required for updating.'));
        exit;
    }

    $resumeId = $_POST['resume_id'];

    // Check if the resume exists
    $checkStmt = $conn->prepare("SELECT * FROM resumes WHERE resume_id = ?");
    $checkStmt->bind_param("s", $resumeId);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(array('success' => false, 'message' => 'Resume not found.'));
        exit;
    }

    $checkStmt->close();

    $publishedQuery = $conn->prepare("SELECT published FROM resumes WHERE resume_id = ?");
    $publishedQuery->bind_param("s", $resumeId);
    $publishedQuery->execute();
    $publishedResult = $publishedQuery->get_result();

    $publishedRow = $publishedResult->fetch_assoc();
    $publishedOn = null;

    if ($publishedRow['published'] === 'false' && $_POST['published'] === 'true') {
        date_default_timezone_set('Asia/Kolkata');
        $publishedOn = date('Y/m/d');
    }

    // Resume exists, proceed with update
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
    $militaryStatus = $_POST['militaryStatus'];
    $militaryAdditionalInfo = $_POST['militaryAdditionalInfo'];
    $desiredPay = $_POST['desiredPay'];
    $desiredCurrency = $_POST['desiredCurrency'];
    $desiredPaytime = $_POST['desiredPaytime'];
    $additionalPreferences = $_POST['additionalPreferences'];
    $published = $_POST['published'];

    // Prepare and execute the SQL UPDATE statement for resumes table
    $stmt = $conn->prepare("UPDATE resumes SET
        resumeName = ?, firstName = ?, lastName = ?, suffix = ?, email = ?, 
        phone = ?, website = ?, linkedin = ?, country = ?, state = ?, 
        city = ?, postalCode = ?, summary = ?, objective = ?, militaryStatus = ?,
        militaryAdditionalInfo = ?, desiredPay = ?, desiredCurrency = ?, desiredPaytime = ?, additionalPreferences = ?, 
        published = ?, published_on = ? WHERE resume_id = ?");
    $stmt->bind_param(
        "sssssssssssssssssssssss",
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
        $objective,
        $militaryStatus,
        $militaryAdditionalInfo,
        $desiredPay,
        $desiredCurrency,
        $desiredPaytime,
        $additionalPreferences,
        $published,
        $publishedOn,
        $resumeId
    );
    $stmt->execute();

    // Handle updating employers and positions table
    foreach ($_POST['employers'] as &$employer) {
        $employerName = $employer['employerName'];
        $employerId = $employer['employer_id'] ?? null; // get the employer ID, or null if it's not set

        if ($employerId) {
            // If the employer ID is set, update the existing employer record
            $updateEmployerStmt = $conn->prepare("UPDATE employers SET employerName = ? WHERE employer_id = ?");
            $updateEmployerStmt->bind_param("ss", $employerName, $employerId);
            $updateEmployerStmt->execute();
        } else {
            // If the employer ID is not set, insert a new employer record
            $insertEmployerStmt = $conn->prepare("INSERT INTO employers (employerName, resume_id) VALUES (?, ?)");
            $insertEmployerStmt->bind_param("ss", $employerName, $resumeId);
            $insertEmployerStmt->execute();

            // Get the ID of the newly inserted employer record
            $employerId = $conn->insert_id;
            $employer['employer_id'] = $employerId; // update the employer record in the $_POST array with the new employer ID
        }

        // Handle positions for this employer
        foreach ($employer['positions'] as &$position) {
            $positionTitle = $position['positionTitle'];
            $startDate = $position['startDate'];
            $endDate = $position['endDate'];
            $isCurrentPosition = $position['isCurrentPosition'];
            $jobDescription = $position['jobDescription'];
            $positionId = $position['position_id'] ?? null; // get the position ID,or null if it's not set

            if ($positionId) {
                // If the position ID is set, update the existing position record
                $updatePositionStmt = $conn->prepare("UPDATE positions SET positionTitle = ?, startDate = ?, endDate = ?, isCurrentPosition = ?, jobDescription = ? WHERE position_id = ?");
                $updatePositionStmt->bind_param("ssssss", $positionTitle, $startDate, $endDate, $isCurrentPosition, $jobDescription, $positionId);
                $updatePositionStmt->execute();
            } else {
                // If the position ID is not set, insert a new position record
                $insertPositionStmt = $conn->prepare("INSERT INTO positions (employer_id, positionTitle, startDate, endDate, isCurrentPosition, jobDescription) VALUES (?, ?, ?, ?, ?, ?)");
                $insertPositionStmt->bind_param("ssssss", $employerId, $positionTitle, $startDate, $endDate, $isCurrentPosition, $jobDescription);
                $insertPositionStmt->execute();

                // Get the ID of the newly inserted position record
                $positionId = $conn->insert_id;
                $position['position_id'] = $positionId; // update the position record in the $_POST array with the new position ID
            }
        }
    }

    unset($employer, $position); // unset the references to the last elements of the arrays

    $postEmployerIds = array_column($_POST['employers'], 'employer_id');
    $postPositionIds = [];
    foreach ($_POST['employers'] as $employer) {
        $postPositionIds = array_merge($postPositionIds, array_column($employer['positions'], 'position_id'));
    }

    // Get all the employer and position IDs from the database
    $dbEmployerIds = array_column($conn->query("SELECT employer_id FROM employers")->fetch_all(MYSQLI_ASSOC), 'employer_id');
    $dbPositionIds = array_column($conn->query("SELECT position_id FROM positions")->fetch_all(MYSQLI_ASSOC), 'position_id');

    // Find the IDs that are in the database but not in the $_POST data
    $employerIdsToDelete = array_diff($dbEmployerIds, $postEmployerIds);
    $positionIdsToDelete = array_diff($dbPositionIds, $postPositionIds);

    // Delete the employers and positions with these IDs
    foreach ($employerIdsToDelete as $id) {
        $conn->query("DELETE FROM employers WHERE employer_id = $id");
    }
    foreach ($positionIdsToDelete as $id) {
        $conn->query("DELETE FROM positions WHERE position_id = $id");
    }

    // Handle Updating Education and Institutions Table
    // Education
    foreach ($_POST['education'] as &$education) {
        $educationId = $education['institution_id'] ?? null; // get the education ID, or null if it's not set

        if ($educationId) {
            // If the education ID is set, update the existing education record
            $updateEducationStmt = $conn->prepare("UPDATE education SET institutionName = ? WHERE institution_id = ?");
            $updateEducationStmt->bind_param("ss", $education['institutionName'], $educationId);
            $updateEducationStmt->execute();
        } else {
            // If the education ID is not set, insert a new education record
            $insertEducationStmt = $conn->prepare("INSERT INTO education (institutionName, resume_id) VALUES (?, ?)");
            $insertEducationStmt->bind_param("ss", $education['institutionName'], $resumeId);
            $insertEducationStmt->execute();

            // Get the ID of the newly inserted education record
            $educationId = $conn->insert_id;
            $education['institution_id'] = $educationId; // update the education record in the $_POST array with the new education ID
        }

        // Handle degrees for this education
        foreach ($education['degrees'] as &$degree) {
            $degreeId = $degree['degree_id'] ?? null; // get the degree ID, or null if it's not set

            if ($degreeId) {
                // If the degree ID is set, update the existing degree record
                $updateDegreeStmt = $conn->prepare("UPDATE degrees SET degree = ?, educationCompleted = ?, graduationDate = ?, major = ?, additionalInfo = ?, grade = ?, outOf = ? WHERE degree_id = ?");
                $updateDegreeStmt->bind_param("ssssssss", $degree['degree'], $degree['educationCompleted'], $degree['graduationDate'], $degree['major'], $degree['additionalInfo'], $degree['grade'], $degree['outOf'], $degreeId);
                $updateDegreeStmt->execute();
            } else {
                // If the degree ID is not set, insert a new degree record
                $insertDegreeStmt = $conn->prepare("INSERT INTO degrees (institution_id, degree, educationCompleted, graduationDate, major, additionalInfo, grade, outOf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $insertDegreeStmt->bind_param("isssssss", $educationId, $degree['degree'], $degree['educationCompleted'], $degree['graduationDate'], $degree['major'], $degree['additionalInfo'], $degree['grade'], $degree['outOf']);
                $insertDegreeStmt->execute();

                // Get the ID of the newly inserted degree record
                $degreeId = $conn->insert_id;
                $degree['degree_id'] = $degreeId; // update the degree record in the $_POST array with the new degree ID
            }
        }
    }

    unset($education, $degree); // unset the references to the last elements of the arrays

    $postEducationIds = array_column($_POST['education'], 'institution_id');
    $postDegreeIds = [];
    foreach ($_POST['education'] as $education) {
        $postDegreeIds = array_merge($postDegreeIds, array_column($education['degrees'], 'degree_id'));
    }

    // Get all the education and degree IDs from the database
    $dbEducationIds = array_column($conn->query("SELECT institution_id FROM education")->fetch_all(MYSQLI_ASSOC), 'institution_id');
    $dbDegreeIds = array_column($conn->query("SELECT degree_id FROM degrees")->fetch_all(MYSQLI_ASSOC), 'degree_id');

    // Find the IDs that are in the database but not in the $_POST data
    $educationIdsToDelete = array_diff($dbEducationIds, $postEducationIds);
    $degreeIdsToDelete = array_diff($dbDegreeIds, $postDegreeIds);

    // Delete the educations and degrees with these IDs
    foreach ($educationIdsToDelete as $id) {
        $conn->query("DELETE FROM education WHERE institution_id = $id");
    }
    foreach ($degreeIdsToDelete as $id) {
        $conn->query("DELETE FROM degrees WHERE degree_id = $id");
    }

    // Handle updating branches table
    // Branches
    foreach ($_POST['branches'] as &$branch) {
        $branchId = $branch['branch_id'] ?? null; // get the branch ID, or null if it's not set

        if ($branchId) {
            // If the branch ID is set, update the existing branch record
            $updateBranchStmt = $conn->prepare("UPDATE branches SET branch = ?, unit = ?, beginningRank = ?, endingRank = ?, startDate = ?, endDate = ?, areaOfExpertise = ?, recognition = ? WHERE branch_id = ?");
            $updateBranchStmt->bind_param("sssssssss", $branch['branch'], $branch['unit'], $branch['beginningRank'], $branch['endingRank'], $branch['startDate'], $branch['endDate'], $branch['areaOfExpertise'], $branch['recognition'], $branchId);
            $updateBranchStmt->execute();
        } else {
            // If the branch ID is not set, insert a new branch record
            $insertBranchStmt = $conn->prepare("INSERT INTO branches (resume_id, branch, unit, beginningRank, endingRank, startDate, endDate, areaOfExpertise, recognition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $insertBranchStmt->bind_param("sssssssss", $resumeId, $branch['branch'], $branch['unit'], $branch['beginningRank'], $branch['endingRank'], $branch['startDate'], $branch['endDate'], $branch['areaOfExpertise'], $branch['recognition']);
            $insertBranchStmt->execute();

            // Get the ID of the newly inserted branch record
            $branchId = $conn->insert_id;
            $branch['branch_id'] = $branchId; // update the branch record in the $_POST array with the new branch ID
        }
    }

    unset($branch); // unset the reference to the last element of the array

    $postBranchIds = array_column($_POST['branches'], 'branch_id');

    // Get all the branch IDs fromthe database
    $dbBranchIds = array_column($conn->query("SELECT branch_id FROM branches")->fetch_all(MYSQLI_ASSOC), 'branch_id');

    // Find the IDs that are in the database but not in the $_POST data
    $branchIdsToDelete = array_diff($dbBranchIds, $postBranchIds);

    // Delete the branches with these IDs
    foreach ($branchIdsToDelete as $id) {
        $conn->query("DELETE FROM branches WHERE branch_id = $id");
    }

    // Handle updating job_types table
    if (isset($_POST['desiredJobType']) && is_array($_POST['desiredJobType'])) {
        foreach ($_POST['desiredJobType'] as $jobType) {
            // Prepare and execute the SQL UPDATE statement for job_types table
            $updateJobTypeStmt = $conn->prepare("SELECT * FROM job_types WHERE resume_id = ?");
            $updateJobTypeStmt->bind_param("s", $resumeId);
            $updateJobTypeStmt->execute();
            $result = $updateJobTypeStmt->get_result();

            $row = $result->fetch_assoc();
            if ($row['jobType'] !== $jobType) {
                $updateJobTypeStmt = $conn->prepare("UPDATE job_types SET jobType = ? WHERE resume_id = ?");
                $updateJobTypeStmt->bind_param("ss", $jobType, $resumeId);
                $updateJobTypeStmt->execute();
            }

            $updateJobTypeStmt->close();
        }
    }

    echo json_encode(array('success' => true, 'message' => 'Resume updated successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method'));
}
