<?php
include_once './mvc/view.class.php';
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$email = '';
$password = '';
$userType = '';

/* get json data */ 
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;
$userType = $data->userType;

/* validation depending on $userType value */
switch($userType){
  case 'student':

    $getStudentView = new GetStudentView();
    $numRows = $getStudentView->studentInfoRows($email);
    
    if($numRows > 0){
      $getStudentView->studentInfo($email);
    
      $dbId = $getStudentView->id;
      $dbPassword = $getStudentView->password;
      $dbFirstname = $getStudentView->firstName;
      $dbLastname = $getStudentView->lastName;
      $dbEmail = $getStudentView->email;

      if(password_verify($password, $dbPassword)) {
        $secret_key = "YOUR_SECRET_KEY";
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim; //not before in seconds
        $expire_claim = $issuedat_claim + 22000; // expire time in seconds
        $token = array(
          "iss" => $issuer_claim,
          "aud" => $audience_claim,
          "iat" => $issuedat_claim,
          "nbf" => $notbefore_claim,
          "exp" => $expire_claim,
          "data" => array(
            "id" => $dbId,
            "firstname" => $dbFirstname,
            "lastname" => $dbLastname,
            "email" => $dbEmail,
            "userType"=>$userType
          )
        );    
        http_response_code(200);
    
        $jwt = JWT::encode($token, $secret_key);
        echo json_encode(
          array(
            "error"=>false,
            "message" => "Successful login.",
            "userType"=>$userType,
            "jwt" => $jwt
          )
        );
      }else{
        http_response_code(401);
        echo json_encode(array(
          "error"=>true,
          "message" => "Login failed. Invalid email or password."
        ));
      }
    }else{
      echo json_encode(array(
        "error"=>true,
        "message"=>"Login failed. Invalid email or password."
      ));  
    }
  break;
  
  default:
    echo json_encode(array(
      "error"=>true,
      "message"=>"Unrecognised user."
    ));   
  break;
}

?>