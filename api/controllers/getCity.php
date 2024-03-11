<?php
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = mysqli_query($conn, "SELECT * FROM cities where state_id =" . $_GET['state_id']);
    while ($datarow = mysqli_fetch_array($data)) {
        echo '<option value="' . $datarow['id'] . '">' . $datarow['name'] . '</option>';
    }
}
