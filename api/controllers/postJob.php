<?php
header('Content-Type: application/json');

include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $stmt = $conn->prepare("SELECT * FROM recruiters where recruiters_id = ?");
    $stmt->bind_param("s", $_POST['recruiter_id']);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows < 1) {
        $message = 'Recruiter does not exist';
        $response = array(
            'success' => false,
            'message' => $message,
        );

        header('Content-Type: application/json');
        $jsonResponse = json_encode($response);
        echo $jsonResponse;
        exit();
    }

    $recruiterId = $_POST['recruiter_id'];
    $companyName = $_POST['companyName'];
    $website = $_POST['website'];
    $natureOfBusiness = $_POST['natureOfBusiness'];
    $country = $_POST['country'];
    $state = $_POST['state'];
    $city = $_POST['city'];
    $fax = $_POST['fax'];
    $areaCode = $_POST['areaCode'];
    $landline = $_POST['landline'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $employerName = $_POST['employerName'];
    $companyDescription = $_POST['companyDescription'];
    $jobDesignation = $_POST['jobDesignation'];
    $industryCategory = $_POST['industryCategory'];
    $jobTitle = $_POST['jobTitle'];
    $jobType = $_POST['jobType'];
    $dutyDescription = $_POST['dutyDescription'];
    $jobDuration = $_POST['jobDuration'];
    $minimumEducation = $_POST['minimumEducation'];
    $minimumExperience = $_POST['minimumExperience'];
    $salaryMin = $_POST['salaryMin'];
    $salaryMax = $_POST['salaryMax'];
    $workplaceType = $_POST['workplaceType'];
    $placeOfWork = $_POST['placeOfWork'];
    $ageLimit = $_POST['ageLimit'];
    $womenEligible = $_POST['womenEligible'];
    $workingHoursFrom = $_POST['workingHoursFrom'];
    $workingHoursTo = $_POST['workingHoursTo'];
    $vacanciesRegular = $_POST['vacanciesRegular'];
    $vacanciesTemporary = $_POST['vacanciesTemporary'];
    $resumesToBeSent = $_POST['resumesToBeSent'];
    $resumeEmail = $_POST['resumeEmail'];
    $resumeWebsite = $_POST['resumeWebsite'];
    $interviewDetailsDate = $_POST['interviewDetailsDate'];
    $interviewDetailsTime = $_POST['interviewDetailsTime'];
    $interviewDetailsAptitudeTest = $_POST['interviewDetailsAptitudeTest'];
    $interviewDetailsTechnicalTest = $_POST['interviewDetailsTechnicalTest'];
    $interviewDetailsGroupDiscussion = $_POST['interviewDetailsGroupDiscussion'];
    $interviewDetailsPersonalInterview = $_POST['interviewDetailsPersonalInterview'];
    $interviewDetailsTopics = $_POST['interviewDetailsTopics'];
    $interviewDetailsContactPerson = $_POST['interviewDetailsContactPerson'];
    $disabilityInfoType = $_POST['disabilityInfoType'];
    $disabilityInfoPercentage = $_POST['disabilityInfoPercentage'];
    $disabilityInfoAidOrAppliance = $_POST['disabilityInfoAidOrAppliance'];
    $ownVehiclePreferred = $_POST['ownVehiclePreferred'];
    $conveyanceProvided = $_POST['conveyanceProvided'];
    $conveyanceType = $_POST['conveyanceType'];
    $otherInformation = $_POST['otherInformation'];
    $currentDate = date('Y-m-d');

    $query = "INSERT INTO job (
        recruiter_id, companyName, website, natureOfBusiness, country, 
        state, city, fax, areaCode, landline, 
        mobile, email, employerName, companyDescription, jobDesignation, 
        industryCategory, jobTitle, jobType, dutyDescription, jobDuration, 
        minimumEducation, minimumExperience, salaryMin, salaryMax, workplaceType, 
        placeOfWork, ageLimit, womenEligible, workingHoursFrom, workingHoursTo, 
        vacanciesRegular, vacanciesTemporary, resumesToBeSent, resumeEmail, resumeWebsite, 
        interviewDetailsDate, interviewDetailsTime, interviewDetailsAptitudeTest, interviewDetailsTechnicalTest, interviewDetailsGroupDiscussion, 
        interviewDetailsPersonalInterview, interviewDetailsTopics, interviewDetailsContactPerson, disabilityInfoType, disabilityInfoPercentage, 
        disabilityInfoAidOrAppliance, ownVehiclePreferred, conveyanceProvided, conveyanceType, otherInformation, 
        postedOn
    ) VALUES (
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?
    )";

    $stmt2 = $conn->prepare($query);

    $stmt2->bind_param(
        "sssssssssssssssssssssssssssssssssssssssssssssssssss",
        $recruiterId,
        $companyName,
        $website,
        $natureOfBusiness,
        $country,
        $state,
        $city,
        $fax,
        $areaCode,
        $landline,
        $mobile,
        $email,
        $employerName,
        $companyDescription,
        $jobDesignation,
        $industryCategory,
        $jobTitle,
        $jobType,
        $dutyDescription,
        $jobDuration,
        $minimumEducation,
        $minimumExperience,
        $salaryMin,
        $salaryMax,
        $workplaceType,
        $placeOfWork,
        $ageLimit,
        $womenEligible,
        $workingHoursFrom,
        $workingHoursTo,
        $vacanciesRegular,
        $vacanciesTemporary,
        $resumesToBeSent,
        $resumeEmail,
        $resumeWebsite,
        $interviewDetailsDate,
        $interviewDetailsTime,
        $interviewDetailsAptitudeTest,
        $interviewDetailsTechnicalTest,
        $interviewDetailsGroupDiscussion,
        $interviewDetailsPersonalInterview,
        $interviewDetailsTopics,
        $interviewDetailsContactPerson,
        $disabilityInfoType,
        $disabilityInfoPercentage,
        $disabilityInfoAidOrAppliance,
        $ownVehiclePreferred,
        $conveyanceProvided,
        $conveyanceType,
        $otherInformation,
        $currentDate
    );

    $stmt2->execute();

    $message = "Job posted successfully";
    $response = array(
        'success' => true,
        'message' => $message,
    );

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
} else {
    $message = 'Invalid request method';
    $response = array(
        'success' => false,
        'message' => $message,
    );

    header('Content-Type: application/json');
    $jsonResponse = json_encode($response);
    echo $jsonResponse;

    exit();
}
