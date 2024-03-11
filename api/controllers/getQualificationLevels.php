<?php

include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $data = mysqli_query($conn, "SELECT * FROM qualificationlevel");
    echo '<option value="">Select Qualification Level</option>';
    while ($datarow = mysqli_fetch_array($data)) {
        echo '<option value="' . $datarow['qualification_id'] . '">' . $datarow['qualification_name'] . '</option>';
    }
}
