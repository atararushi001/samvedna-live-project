<?php
include '../includes/config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $resumeId = $_POST['res_id '];
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

    $stmt = $conn->prepare("UPDATE jobresume SET resumeName = ?, firstName = ?, lastName = ?, suffix = ?, email = ?, phone = ?, website = ?, linkedin = ?, country = ?, state = ?, city = ?, postalCode = ?, summary = ?, objective = ? WHERE res_id  = ?");

    $stmt->bind_param(
        "ssssssssssssssi",
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
        $resumeId
    );

    if (!$stmt->execute()) {
        die('Error in execute statement: ' . $stmt->error);
    } else {
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM resumeemployers WHERE jobresume_id = ?");
        $stmt->bind_param("i", $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM positions WHERE resumeemployers_id IN (SELECT id FROM resumeemployers WHERE jobresume_id = ?)");
        $stmt->bind_param("i", $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM education WHERE jobresume_id = ?");
        $stmt->bind_param("i", $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM degrees WHERE education_id IN (SELECT id FROM education WHERE jobresume_id = ?)");
        $stmt->bind_param("i", $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM military WHERE jobresume_id = ?");
        $stmt->bind_param("i", $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM militarybranches WHERE military_id IN (SELECT id FROM military WHERE jobresume_id = ?)");
        $stmt->bind_param("i", $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $stmt->close();

        $employers = $_POST['employers'];
        foreach ($employers as $employer) {
            $employerName = $employer['employerName'];
            $positions = $employer['positions'];

            $stmt = $conn->prepare("INSERT INTO resumeemployers (employerName, jobresume_id) VALUES (?, ?)");
            $stmt->bind_param("si", $employerName, $resumeId);
            if (!$stmt->execute()) {
                die('Error in execute statement: ' . $stmt->error);
            }
            $employerId = $stmt->insert_id;
            $stmt->close();

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
                $stmt->close();
            }
        }

        $education = $_POST['education'];
        foreach ($education as $edu) {
            $institutionName = $edu['institutionName'];
            $degrees = $edu['degrees'];

            $stmt = $conn->prepare("INSERT INTO education (institutionName, jobresume_id) VALUES (?, ?)");
            $stmt->bind_param("si", $institutionName, $resumeId);
            if (!$stmt->execute()) {
                die('Error in execute statement: ' . $stmt->error);
            }
            $educationId = $stmt->insert_id;
            $stmt->close();

            foreach ($degrees as $degree) {
                $degreeName = $degree['degree'];
                $educationCompleted = $degree['educationCompleted'];
                $major = $degree['major'];
                $graduationDate = $degree['graduationDate'];
                $additionalInfo = $degree['additionalInfo'];
                $grade = $degree['grade'];
                $outOf = $degree['outOf'];

                $stmt = $conn->prepare("INSERT INTO degrees (degreeName, educationCompleted, major, graduationDate, additionalInfo, grade, outOf, education_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("sssssssi", $degreeName, $educationCompleted, $major, $graduationDate, $additionalInfo, $grade, $outOf, $educationId);
                if (!$stmt->execute()) {
                    die('Error in execute statement: ' . $stmt->error);
                }
                $stmt->close();
            }
        }

        $militaryStatus = $_POST['militaryStatus'];
        $militaryAdditionalInfo = $_POST['militaryAdditionalInfo'];

        $stmt = $conn->prepare("INSERT INTO military (militaryStatus, militaryAdditionalInfo, jobresume_id) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $militaryStatus, $militaryAdditionalInfo, $resumeId);
        if (!$stmt->execute()) {
            die('Error in execute statement: ' . $stmt->error);
        }
        $militaryId = $stmt->insert_id;
        $stmt->close();

        $branches = $_POST['branches'];
        foreach ($branches as $branch) {
            $branchName = $branch['branch'];
            $unit = $branch['unit'];
            $beginningRank = $branch['beginningRank'];
            $endingRank = $branch['endingRank'];
            $startDate = $branch['startDate'];
            $endDate = $branch['endDate'];
            $areaOfExpertise = $branch['areaOfExpertise'];
            $recognition = $branch['recognition'];

            $stmt = $conn->prepare("INSERT INTO militarybranches (branchName, unit, beginningRank, endingRank, startDate, endDate, areaOfExpertise, recognition, military_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssssi", $branchName, $unit, $beginningRank, $endingRank, $startDate, $endDate, $areaOfExpertise, $recognition, $militaryId);
            if (!$stmt->execute()) {
                die('Error in execute statement: ' . $stmt->error);
            }
            $stmt->close();
        }

        $message = 'Data updated successfully';
        $response = array(
            'success' => true,
            'message' => $message,
        );

        header('Content-Type: application/json');
        $jsonResponse = json_encode($response);
        echo $jsonResponse;
    }

    $conn->close();
}
