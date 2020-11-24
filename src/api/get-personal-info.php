<?php
include_once './mvc/view.class.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$studentId = '';

$data = json_decode(file_get_contents("php://input"));
$studentId = $data->studentId;
$response = array();

try{
  $getStudentView = new GetStudentView();
  $studentRow = $getStudentView->studentData($studentId);  
  foreach($studentRow as $row){
    $response[] =     array([
      'id'=>$row['id'],
      'firstName'=>$row['first_name'],
      'lastName'=>$row['last_name'],
      'guardianName'=>$row['guardian_name'],
      'email'=>$row['email'],
      'phoneNum'=>$row['phone_num'],
      'address'=>$row['address']
    ]);
  }
  echo json_encode($response);
  
}catch(Exception $e){
  $errorMessage = $e->getMessage();
  echo json_encode(
    array(
      "error"=>true,
      "message" => $errorMessage,
      "data"=>null
    )
  );
}
?>