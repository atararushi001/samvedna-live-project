<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $conn->prepare("SELECT * FROM job_seekers where email = ?");
    $stmt->bind_param("s", $_POST['email']);
    $stmt->execute();

    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $message = 'Email already exists';
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

    $sql = "INSERT INTO `job_seekers`(`email`, `username`, `password`, `name`,`lastName`,
     `dob`, `gender`, `permanentAddress`, `currentAddress`,`city`,
      `state`, `postalCode`, `country`, `contactNumber`,`whatsappNumber`,
       `jobAlerts`, `homePhone`, `addHomePhone`, `qualification`,`educationSpecialization`,
        `experienceAndAppliance`, `yesNoQuestion`, `twoWheeler`, `threeWheeler`, `car`, `specializationInDisability`) VALUES
         (?,?,?,?,?,?
         ,?,?,?,?,?,?
         ,?,?,?,?,?,?,
         ?,?,?,?,?,?,
         ?,?)";
         
$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssssssssssssssssssssssss",
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
    $specializationInDisability
);

    
    if (!$stmt->execute()) {
        die('Error in execute statement: ' . $stmt->error);
    } else {
        $message = 'Registration Successful!';
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
}
