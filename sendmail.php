<?php

$to = "enquiry@indussteels.com,dhanushya@o3mdm.com";

$name = $_POST['Applicant_Name'];
$phone = $_POST['Mobile_Contact'];
$company = $_POST['Registered_Company_Name'];
$city = $_POST['City'];
$state = $_POST['State'];

$subject = "New Indus Dealer Enquiry";

$message = "
New Dealer Application

Name: $name
Phone: $phone
Company: $company
City: $city
State: $state
";

$headers = "From: noreply@indussteels.com";

if(mail($to,$subject,$message,$headers)){
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(["status"=>"error"]);
}
?>
