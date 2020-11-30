<?php
include_once './mvc/view.class.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$output = array(
  "error"=>'',
  "message" => '',
 "data"=>''
);

$studentId = '';

$data = json_decode(file_get_contents("php://input"));
$studentId = $data->studentId;

try{
  $getStudentView = new GetStudentView();
  $studentRow = $getStudentView->studentData($studentId);  

  $studentNumRows = $getStudentView->studentInfoRowsById($studentId);

  if($studentNumRows==0){
    $output['error'] = true;
    $output['message'] = 'User does not exist';
    $output['data'] = 'Invalid user id';
  }elseif($studentNumRows>1){
    $output['error'] = true;
    $output['message'] = 'More than one exists having same id';
    $output['data'] = 'Please contact backend engineer';
  }else{
    foreach($studentRow as $row){
      $response[] =     array(
        'id'=>html_entity_decode($row['id']),
        'firstName'=>html_entity_decode($row['first_name']),
        'lastName'=>html_entity_decode($row['last_name']),
        'guardianName'=>html_entity_decode($row['guardian_name']),
        'email'=>html_entity_decode($row['email']),
        'phoneNumber'=>html_entity_decode($row['phone_num']),
        'address'=>html_entity_decode($row['address'])
      );
    }  
    $response = (object) $response;
  
    $output['error'] = false;
    $output['message'] = 'Success';
    $output['data'] = $response;  
  }

  echo json_encode($output);
  
}catch(Exception $e){
  $errorMessage = $e->getMessage();

  $output['error'] = true;
  $output['message'] = $errorMessage;
  $output['data'] = 'An error occured';  

  echo json_encode($output);
}
?>