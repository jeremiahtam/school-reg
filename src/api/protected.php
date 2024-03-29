<?php
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$secret_key = "YOUR_SECRET_KEY";
$jwt = null;

$data = json_decode(file_get_contents("php://input"));
$jwt = $data->jwt;

if($jwt){
  try {
    $decoded = JWT::decode($jwt, $secret_key, array('HS256'));
    // Access is granted. Add code of the operation here 
    echo json_encode(array(
      "error" => false,
      "message" => "Access granted.",
      "info"=>$decoded
    ));
  }catch (Exception $e){
    http_response_code(401);
    echo json_encode(array(
      "error" => true,
      "message" => $e->getMessage(),
    ));
  }
}else{
  echo json_encode(array(
    "error" => true,
    "message" => "Empty token sent.",
  ));

}
?>