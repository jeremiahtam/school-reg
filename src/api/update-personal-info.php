<?php
include_once './mvc/controller.class.php';
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
$firstName = $data->firstName;
$lastName = $data->lastName;
$guardianName = $data->guardianName;
$email = $data->email;
$phoneNum = $data->phoneNumber;
$address = $data->address;

try{
  $getStudentView = new GetStudentView();
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
    $getStudentContr = new GetStudentContr();
    $updateStudentRow = $getStudentContr->editStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $studentId);  
    if($updateStudentRow){
      $output['error'] = false;
      $output['message'] = 'Your personal information was successfully updated';
      $output['data'] = 'Successfully updated';
    }else{
      $output['error'] = true;
      $output['message'] = 'Failed to update. Database error';
      $output['data'] = 'Database execution error';
    }
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