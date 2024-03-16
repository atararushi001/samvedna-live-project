<?php

include "../includes/config.php";



if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $company =$_GET['company'];
  

    $query = "SELECT * FROM `recruiters` WHERE`company` = ?)";
    $stmt = $conn->prepare($query);

    $stmt->bind_param("s", $company);

    try {
        $stmt->execute();

        $result = $stmt->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        if (count($rows) == 0) {
            $response = array(
                'success' => false,
                'message' => 'No Company found!',
            );
        } else {
            $response = array(
                'success' => true,
                'message' => 'Company Found!',
                'jobs' => $rows,
            );
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $stmt->close();
        $conn->close();
    }
}
