<?php
include_once './mvc/controller.class.php';
include_once './mvc/view.class.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$output = array(
  "error" => '',
  "message" => '',
  "data" => ''
);
$date = date('Y-m-d');
$time = date('H:i:s');

$actionType = '';
$data = json_decode(file_get_contents("php://input"));
$actionType = $data->actionType;

/* check the action type */
switch($actionType){
  /* if action type is to retrieve personal info */
  case 'get-personal-info':
    $studentId = $data->studentId;
    try{
      $studentView = new StudentView();
      $studentRow = $studentView->studentData($studentId);  
    
      $studentNumRows = $studentView->studentInfoRowsById($studentId);
    
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
          $response[] = array(
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
      
    }catch(Exception $e){
      $errorMessage = $e->getMessage();
    
      $output['error'] = true;
      $output['message'] = $errorMessage;
      $output['data'] = 'An error occured';  
    
    }
  break;

  /* update personal information of applicant */
  case 'update-personal-info':

    $studentId = $data->studentId;
    $firstName = $data->firstName;
    $lastName = $data->lastName;
    $guardianName = $data->guardianName;
    $email = $data->email;
    $phoneNumber = $data->phoneNumber;
    $address = $data->address;
    
    try{
      $studentView = new StudentView();
      $studentNumRows = $studentView->studentInfoRowsById($studentId);
    
      if($studentNumRows==0){
        $output['error'] = true;
        $output['message'] = 'User does not exist';
        $output['data'] = 'Invalid user id';
      }elseif($studentNumRows>1){
        $output['error'] = true;
        $output['message'] = 'More than one exists having same id';
        $output['data'] = 'Please contact backend engineer';
      }else{
        $studentContr = new StudentContr();
        $updateStudentRow = $studentContr->editStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNumber, $email, $date, $time, $studentId);
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
      
    }catch(Exception $e){
      $errorMessage = $e->getMessage();
    
      $output['error'] = true;
      $output['message'] = 'Technical error. Try again later';
      $output['data'] = $errorMessage;  
    }
  break;

  default;
}

/* echo the json outout  */
echo json_encode($output);
?>