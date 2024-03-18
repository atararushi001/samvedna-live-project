<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file_tmp = $_FILES['profilePicture']['tmp_name'];
    $ext = pathinfo($_FILES['profilePicture']['name'], PATHINFO_EXTENSION);
    $file_name = time() . '.' . $ext;

    move_uploaded_file($file_tmp, "../uploads/profilePictures/" . $file_name);


    $stmt = $conn->prepare("SELECT * FROM job_seekers WHERE email = ?");
    $stmt->bind_param("s", $_POST['email']);
    $stmt->execute();

    $results = $stmt->get_result();

    if ($results->num_rows > 0) {
        $message = 'Account already exists as a job seeker. Please login to continue.';
        $response = array(
            'success' => false,
            'message' => $message,
        );

        header('Content-Type: application/json');
        $jsonResponse = json_encode($response);
        echo $jsonResponse;
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM recruiters where email = ?");
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

    $profilePicture = $file_name;
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    $company = $_POST['company'];
    $designation = $_POST['designation'];
    $contactNumber = $_POST['contactNumber'];
    $country = $_POST['country'];
    $state = $_POST['state'];
    $city = $_POST['city'];

    $stmt = $conn->prepare("INSERT INTO `recruiters`(`profilePicture`, `name`, `email`, `password`,  `company`, `designation`, `contactNumber`, `country`, `state`, `city`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "ssssssssss",
        $profilePicture,
        $name,
        $email,
        $password,
        $company,
        $designation,
        $contactNumber,
        $country,
        $state,
        $city
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
