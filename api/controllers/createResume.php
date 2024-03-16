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
    $militaryStatus = $_POST['militaryStatus'];
    $militaryAdditionalInfo = $_POST['militaryAdditionalInfo'];
    $desiredPay = $_POST['desiredPay'];
    $desiredCurrency = $_POST['desiredCurrency'];
    $desiredPaytime = $_POST['desiredPaytime'];
    $additionalPreferences = $_POST['additionalPreferences'];
    $published = $_POST['published'];

    $stmt = $conn->prepare("INSERT INTO resumes (
        resumeName, firstName, lastName, suffix, email, 
        phone, website, linkedin, country, state, 
        city, postalCode, summary, objective, militaryStatus,
        militaryAdditionalInfo, desiredPay, desiredCurrency, desiredPaytime, additionalPreferences, 
        published) VALUES (
            ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, 
            ?)");
    $stmt->bind_param(
        "sssssssssssssssssssss",
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
        $published
    );
    $stmt->execute();

    $resumeId = $stmt->insert_id;

    // Inserting data into Employers table
    foreach ($_POST['employers'] as $employer) {
        $stmt = $conn->prepare("INSERT INTO employers (employerName) VALUES (?)");
        $stmt->bind_param("s", $employer['employerName']);
        $stmt->execute();

        $employerId = $stmt->insert_id;

        // Inserting data into Positions table
        foreach ($employer['positions'] as $position) {
            $stmt = $conn->prepare("INSERT INTO positions (employer_id, positionTitle, startDate, endDate, isCurrentPosition, jobDescription) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $employerId, $position['positionTitle'], $position['startDate'], $position['endDate'], $position['isCurrentPosition'], $position['jobDescription']);
            $stmt->execute();
        }
    }

    // Inserting data into Education table
    foreach ($_POST['education'] as $education) {
        $stmt = $conn->prepare("INSERT INTO education (institutionName) VALUES (?)");
        $stmt->bind_param("s", $education['institutionName']);
        $stmt->execute();

        $educationId = $stmt->insert_id;

        // Inserting data into Degrees table
        foreach ($education['degrees'] as $degree) {
            $stmt = $conn->prepare("INSERT INTO degrees (degree, educationCompleted, graduationDate, major, additionalInfo, grade, outOf, institution_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssss", $degree['degree'], $degree['educationCompleted'], $degree['graduationDate'], $degree['major'], $degree['additionalInfo'], $degree['grade'], $degree['outOf'], $educationId);
            $stmt->execute();
        }
    }


    // Inserting data into Branches table
    foreach ($_POST['branches'] as $branch) {
        $stmt = $conn->prepare("INSERT INTO branches (branch, unit, beginningRank, endingRank, startDate, endDate, areaOfExpertise, recognition) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $branch['branch'], $branch['unit'], $branch['beginningRank'], $branch['endingRank'], $branch['startDate'], $branch['endDate'], $branch['areaOfExpertise'], $branch['recognition']);
        $stmt->execute();
    }

    // Inserting data into desired_jobs table
    foreach ($_POST['desiredJobType'] as $desiredJob) {
        $stmt = $conn->prepare("INSERT INTO job_types (resume_id, jobType) VALUES (?, ?)");
        $stmt->bind_param("ss", $resumeId, $desiredJob);
        $stmt->execute();
    }

    echo json_encode(array('success' => true, 'message' => 'Data inserted successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method'));
}
