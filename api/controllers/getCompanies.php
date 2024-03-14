
<?php
include "../includes/config.php";

function handleError($message)
{
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => $message));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $query = " SELECT * FROM `recruiters`";
    $stmt = $conn->prepare($query);

    try {
        $stmt->execute();

        $result = $stmt->get_result();
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        $response = array(
            'success' => true,
            'message' => 'Companies resume found!',
            'job' => $rows,
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        handleError("Database error: " . $e->getMessage());
    } finally {
        $stmt->close();
        $conn->close();
    }
}
