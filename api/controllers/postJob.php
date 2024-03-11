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
    $address = $_POST['address'];
    $fax = $_POST['fax'];
    $areaCode = $_POST['areaCode'];
    $landline = $_POST['landline'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $employerName = $_POST['employerName'];
    $companyDescription = $_POST['companyDescription'];
    $jobDesignation = $_POST['jobDesignation'];
    $jobType = $_POST['jobType'];
    $dutyDescription = $_POST['dutyDescription'];
    $essentialQualificationEssential = $_POST['essentialQualificationEssential'];
    $essentialQualificationDesirable = $_POST['essentialQualificationDesirable'];
    $ageLimit = $_POST['ageLimit'];
    $womenEligible = $_POST['womenEligible'];
    $workingHoursFrom = $_POST['workingHoursFrom'];
    $workingHoursTo = $_POST['workingHoursTo'];
    $vacanciesRegular = $_POST['vacanciesRegular'];
    $vacanciesTemporary = $_POST['vacanciesTemporary'];
    $payAndAllowances = $_POST['payAndAllowances'];
    $placeOfWork = $_POST['placeOfWork'];
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



    $query = "INSERT INTO job (
            recruiters_id, companyName, website, natureOfBusiness, address, 
            fax, areaCode, landline, mobile, email, 
            employerName, companyDescription, jobDesignation, jobType, dutyDescription, 
            essentialQualificationEssential, essentialQualificationDesirable, ageLimit, womenEligible, workingHoursFrom, 
            workingHoursTo, vacanciesRegular, vacanciesTemporary, payAndAllowances, placeOfWork, 
            resumesToBeSent, resumeEmail, resumeWebsite, interviewDetailsDate, interviewDetailsTime, 
            interviewDetailsAptitudeTest, interviewDetailsTechnicalTest, interviewDetailsGroupDiscussion, interviewDetailsPersonalInterview, interviewDetailsTopics, 
            interviewDetailsContactPerson, disabilityInfoType, disabilityInfoPercentage, disabilityInfoAidOrAppliance, ownVehiclePreferred, 
            conveyanceProvided, conveyanceType, otherInformation) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    $stmt2 = $conn->prepare($query);

    $stmt2->bind_param(
        "sssssssssssssssssssssssssssssssssssssssssss",
        $recruiterId,
        $companyName,
        $website,
        $natureOfBusiness,
        $address,
        $fax,
        $areaCode,
        $landline,
        $mobile,
        $email,
        $employerName,
        $companyDescription,
        $jobDesignation,
        $jobType,
        $dutyDescription,
        $essentialQualificationEssential,
        $essentialQualificationDesirable,
        $ageLimit,
        $womenEligible,
        $workingHoursFrom,
        $workingHoursTo,
        $vacanciesRegular,
        $vacanciesTemporary,
        $payAndAllowances,
        $placeOfWork,
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
        $otherInformation
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
