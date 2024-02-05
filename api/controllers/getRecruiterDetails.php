<?php
    include '../includes/config.php';

    $recruiter_id = $_GET['recruiter_id'];

    $sql = "SELECT * FROM recruiter WHERE recruiter_id = '$recruiter_id'";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();

    $recruiter = array(
        'recruiter_id' => $row['recruiter_id'],
        'recruiter_name' => $row['recruiter_name'],
        'recruiter_email' => $row['recruiter_email'],
        'recruiter_phone' => $row['recruiter_phone'],
        'recruiter_address' => $row['recruiter_address'],
        'recruiter_city' => $row['recruiter_city'],
        'recruiter_state' => $row['recruiter_state'],
        'recruiter_country' => $row['recruiter_country'],
        'recruiter_zipcode' => $row['recruiter_zipcode'],
        'recruiter_logo' => $row['recruiter_logo'],
        'recruiter_website' => $row['recruiter_website'],
        'recruiter_description' => $row['recruiter_description'],
        'recruiter_industry' => $row['recruiter_industry'],
        'recruiter_type' => $row['recruiter_type'],
        'recruiter_size' => $row['recruiter_size'],
        'recruiter_founded' => $row['recruiter_founded'],
        'recruiter_specialities' => $row['recruiter_specialities'],
        'recruiter_facebook' => $row['recruiter_facebook'],
        'recruiter_twitter' => $row['recruiter_twitter'],
        'recruiter_linkedin' => $row['recruiter_linkedin'],
        'recruiter_googleplus' => $row['recruiter_googleplus'],
        'recruiter_instagram' => $row['recruiter_instagram'],
        'recruiter_youtube' => $row['recruiter_youtube'],
        'recruiter_pinterest' => $row['recruiter_pinterest'],
        'recruiter_tumblr' => $row['recruiter_tumblr'],
        'recruiter_vimeo' => $row['recruiter_vimeo'],
        'recruiter_snapchat' => $row['recruiter_snapchat'],
        'recruiter_dribbble' => $row['recruiter_dribbble'],
        'recruiter_github' => $row['recruiter_github'],
        'recruiter_skype' => $row['recruiter_skype'],
        'recruiter_website2' => $row['recruiter_website2'],
        'recruiter_website3' => $row['recruiter_website3'],
        'recruiter_website4' => $row['recruiter_website4'],
        'recruiter_website5' => $row['recruiter_website5'],
        'recruiter_website6' => $row['recruiter_website6'],
        'recruiter_website7' => $row['recruiter_website7'],
    );
?>