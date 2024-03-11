<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "samvedna";

$conn = new mysqli($servername, $username, $password, $dbname);
session_start();

if ($conn->connect_error) {
    die("Connection failed :");
}

?>