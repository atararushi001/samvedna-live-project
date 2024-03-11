<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $conn->prepare("SELECT * FROM selfemployment where email = ?");
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
    $name = $_POST['name'];
    $disabilityType = $_POST['disabilityType'];
    $percentage = $_POST['percentage'];
    $education = $_POST['education'];
    $companyName = $_POST['companyName'];
    $companyType = $_POST['companyType'];
    $officeAddress = $_POST['officeAddress'];
    $contactNumber = $_POST['contactNumber'];
    $email = $_POST['email'];
    $professionType = $_POST['professionType'];
    $description = $_POST['description'];
    $experience = $_POST['experience'];
    $assistanceNedeed = $_POST['assistanceNedeed'];

    $sql = "INSERT INTO `selfemployment`(
        `name`, `experience`, `disabilityType`, `percentage`, `education`, 
        `companyName`, `companyType`, `officeAddress`, `contactNumber`, `email`, 
        `professionType`, `description`,`assistanceNedeed`) 
    VALUES (
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?,?
    )";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssssssssssss",
        $name,
        $experience,
        $disabilityType,
        $percentage,
        $education,
        $companyName,
        $companyType,
        $officeAddress,
        $contactNumber,
        $email,
        $professionType,
        $description,
        $assistanceNedeed
    );

    $last_id = $conn->insert_id;
    $count = 0;

    while (isset($_POST['product' . $count])) {
        $sql2 = "INSERT INTO `product_selfemployment`( `ps_details`,`self_employment_id`) VALUES (?,?)";
        $stmt2 = $conn->prepare($sql2);

        $stmt2->bind_param(
            "ss",
            $_POST['product' . $count],
            $last_id
        );

        $count++;
    }

    if (!$stmt->execute() || !$stmt2->execute()) {
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
