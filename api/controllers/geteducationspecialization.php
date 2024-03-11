<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = mysqli_query($conn, "SELECT * FROM educationspecialization where qualification_id =" . $_GET['qualification_id']);
    echo '<option value="">Select Education Specialization</option>';
    while ($datarow = mysqli_fetch_array($data)) {
        echo '<option value="' . $datarow['education_specialization_id'] . '">' . $datarow['education_specialization_name'] . '</option>';
    }
}
