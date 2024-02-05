<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

function checkSession($sessionKey)
{
    if (isset($_SESSION[$sessionKey])) {
        return $_SESSION[$sessionKey];
    } else {
        return null;
    }
}

$response = array(
    'is_logged_in' => false,  // Initially set to false
    'self_employed_id' => checkSession('self_employed_id'),
    'job_seekers_id' => checkSession('job_seekers_id'),
    'recruiters_id' => checkSession('recruiters_id')
);

if (!empty($response['self_employed_id']) || !empty($response['job_seekers_id']) || !empty($response['recruiters_id'])) {
    $response['is_logged_in'] = true;
}

echo json_encode($response);
