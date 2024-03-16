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
        $publishedOn = date('Y-m-d');
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

    // Handle updating employers table
    foreach ($_POST['employers'] as $employer) {
        $employerId = $employer['employer_id']; // Assuming you have employer ID in the form
        $employerName = $employer['employerName'];

        $updateEmployerStmt = $conn->prepare("UPDATE employers SET employerName = ? WHERE employer_id = ?");
        $updateEmployerStmt->bind_param("ss", $employerName, $employerId);
        $updateEmployerStmt->execute();
    }

    // Handle updating positions table
    foreach ($_POST['employers'] as $employer) {
        foreach ($employer['positions'] as $position) {
            $positionId = $position['position_id']; // Assuming you have position ID in the form
            $positionTitle = $position['positionTitle'];
            $startDate = $position['startDate'];
            $endDate = $position['endDate'];
            $isCurrentPosition = $position['isCurrentPosition'];
            $jobDescription = $position['jobDescription'];

            $updatePositionStmt = $conn->prepare("UPDATE positions SET positionTitle = ?, startDate = ?, endDate = ?, isCurrentPosition = ?, jobDescription = ? WHERE position_id = ?");
            $updatePositionStmt->bind_param("ssssss", $positionTitle, $startDate, $endDate, $isCurrentPosition, $jobDescription, $positionId);
            $updatePositionStmt->execute();
        }
    }

    // Handle updating education table
    if (isset($_POST['education']) && is_array($_POST['education'])) {
        foreach ($_POST['education'] as $education) {
            $educationId = $education['institution_id']; // Assuming you have education ID in the form
            $institutionName = $education['institutionName'];

            // Prepare and execute the SQL UPDATE statement for education table
            $updateEducationStmt = $conn->prepare("UPDATE education SET institutionName = ? WHERE institution_id = ?");
            $updateEducationStmt->bind_param("ss", $institutionName, $educationId);
            $updateEducationStmt->execute();

            // Update degrees information
            if (isset($education['degrees']) && is_array($education['degrees'])) {
                foreach ($education['degrees'] as $degree) {
                    $degreeId = $degree['degree_id']; // Assuming you have degree ID in the form
                    $degreeValue = $degree['degree'];
                    $educationCompleted = $degree['educationCompleted'];
                    $graduationDate = $degree['graduationDate'];
                    $major = $degree['major'];
                    $additionalInfo = $degree['additionalInfo'];
                    $grade = $degree['grade'];
                    $outOf = $degree['outOf'];

                    // Prepare and execute the SQL UPDATE statement for degrees table
                    $updateDegreeStmt = $conn->prepare("UPDATE degrees SET degree = ?, educationCompleted = ?, graduationDate = ?, major = ?, additionalInfo = ?, grade = ?, outOf = ? WHERE degree_id = ?");
                    $updateDegreeStmt->bind_param("ssssssss", $degreeValue, $educationCompleted, $graduationDate, $major, $additionalInfo, $grade, $outOf, $degreeId);
                    $updateDegreeStmt->execute();
                }
            }
        }
    }

    // Handle updating branches table
    if (isset($_POST['branches']) && is_array($_POST['branches'])) {
        foreach ($_POST['branches'] as $branch) {
            $branchId = $branch['branch_id']; // Assuming you have branch ID in the form
            $branchName = $branch['branch'];
            $unit = $branch['unit'];
            $beginningRank = $branch['beginningRank'];
            $endingRank = $branch['endingRank'];
            $startDate = $branch['startDate'];
            $endDate = $branch['endDate'];
            $areaOfExpertise = $branch['areaOfExpertise'];
            $recognition = $branch['recognition'];

            // Prepare and execute the SQL UPDATE statement for branches table
            $updateBranchStmt = $conn->prepare("UPDATE branches SET branch = ?, unit = ?, beginningRank = ?, endingRank = ?, startDate = ?, endDate = ?, areaOfExpertise = ?, recognition = ? WHERE branch_id = ?");
            $updateBranchStmt->bind_param("sssssssss", $branchName, $unit, $beginningRank, $endingRank, $startDate, $endDate, $areaOfExpertise, $recognition, $branchId);
            $updateBranchStmt->execute();
        }
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
