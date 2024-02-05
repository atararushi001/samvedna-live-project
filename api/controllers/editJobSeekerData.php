<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $stmt = $conn->prepare("SELECT * FROM job_seekers where job_seeker_id = ?");
    $stmt->bind_param("s", $_POST['job_seeker_id']);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows < 1) {
        $message = 'Job Seeker does not exist';
        $response = array(
            'success' => false,
            'message' => $message,
        );

        header('Content-Type: application/json');
        $jsonResponse = json_encode($response);
        echo $jsonResponse;
        exit();
    }


    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $name = $_POST['name'];
    $lastName = $_POST['lastName'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $permanentAddress = $_POST['permanentAddress'];
    $currentAddress = $_POST['currentAddress'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $postalCode = $_POST['postalCode'];
    $country = $_POST['country'];
    $contactNumber = $_POST['contactNumber'];
    $whatsappNumber = $_POST['whatsappNumber'];
    $jobAlerts = $_POST['jobAlerts'];
    $homePhone = $_POST['homePhone'];
    $addHomePhone = $_POST['addHomePhone'];
    $qualification = $_POST['qualification'];
    $educationSpecialization = $_POST['educationSpecialization'];
    $experienceAndAppliance = $_POST['experienceAndAppliance'];
    $yesNoQuestion = $_POST['yesNoQuestion'];
    $twoWheeler = $_POST['twoWheeler'];
    $threeWheeler = $_POST['threeWheeler'];
    $car = $_POST['car'];
    $specializationInDisability =  $_POST['specializationInDisability'];
    $jobSeekerId = $_POST['job_seeker_id'];

    $sql = "UPDATE `job_seekers` SET 
    `email`= ?,
    `username`= ?,
    `password`= ?,
    `name`= ?,
    `lastName`= ?,
    `dob`= ?,
    `gender`= ?,
    `permanentAddress`= ?,
    `currentAddress`= ?,
    `city`= ?,
    `state`= ?,
    `postalCode`= ?,
    `country`= ?,
    `contactNumber`= ?,
    `whatsappNumber`= ?,
    `jobAlerts`= ?,
    `homePhone`= ?,
    `addHomePhone`= ?,
    `qualification`= ?,
    `educationSpecialization`= ?,
    `experienceAndAppliance`= ?,
    `yesNoQuestion`= ?,
    `twoWheeler`= ?,
    `threeWheeler`= ?,
    `car`= ?,
    `specializationInDisability`= ? 
    WHERE 
    job_seeker_id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssssssssssssssssssssssssss",
        $email,
        $username,
        $password,
        $name,
        $lastName,
        $dob,
        $gender,
        $permanentAddress,
        $currentAddress,
        $city,
        $state,
        $postalCode,
        $country,
        $contactNumber,
        $whatsappNumber,
        $jobAlerts,
        $homePhone,
        $addHomePhone,
        $qualification,
        $educationSpecialization,
        $experienceAndAppliance,
        $yesNoQuestion,
        $twoWheeler,
        $threeWheeler,
        $car,
        $specializationInDisability,
        $jobSeekerId
    );

    if ($stmt->execute()) {
        $message = "Job Seeker Data Updated successfully";
        $response = array(
            'success' => true,
            'message' => $message,
        );

        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    } else {
        $message = "Job Seeker Data could not be updated";
        $response = array(
            'success' => false,
            'message' => $message,
        );

        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    $stmt->close();

    $conn->close();
}
