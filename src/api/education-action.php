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
  /* add education entry of a user to database*/
  case 'add-education-entry':

    $userId = $data->studentId;
    $schoolName = $data->schoolName;
    $startDate = $data->startDate;
    $endDate = $data->endDate;
    $deleted = 'no';

    try{
      $educationContr = new EducationContr();
      $insertEducation = $educationContr->addEducation($userId,$schoolName,$startDate,$endDate,$deleted,$date,$time);
    
      if($insertEducation){
        $output['error'] = false;
        $output['message'] = 'Successfully added new education entry';
        $output['data'] = 'Success: '.$insertEducation;
      }else{      
        $output['error'] = true;
        $output['message'] = 'Oops! An error occured';
        $output['data'] = $insertEducation;
      }
      
    }catch(Exception $e){
      $errorMessage = $e->getMessage();
    
      $output['error'] = true;
      $output['message'] = 'An error occured';
      $output['data'] = $errorMessage;  
    }
  break;

  /* update education entry of applicant */
  case 'edit-education-entry':

    $editId = $data->editId;
    $schoolName = $data->schoolName;
    $startDate = $data->startDate;
    $endDate = $data->endDate;
    $deleted = 'no';

     try{
      $educationView = new EducationView();
      $eduNumRows = $educationView->educationByIdNumRows($editId);

      if($eduNumRows==1){
        $educationContr = new EducationContr();
        $editEducation = $educationContr->editEducationInfo($schoolName,$startDate,$endDate,$date,$time,$editId);

        if($editEducation){
          $output['error'] = false;
          $output['message'] = 'That entry was successfully updated';
          $output['data'] = 'Successfully updated';
        }else{
          $output['error'] = true;
          $output['message'] = 'Failed to update. Database error';
          $output['data'] = 'Database execution error';
        }
      }else{
        $output['error'] = true;
        $output['message'] = 'That entry does not exist';
        $output['data'] = 'That data does not exist';
      }
      
    }catch(Exception $e){
      $errorMessage = $e->getMessage();
    
      $output['error'] = true;
      $output['message'] = $errorMessage;
      $output['data'] = 'An error occured';  
    }

  break;
  
  case 'delete-education-entry':
    $deleteId = $data->deleteId;
    $deleted = 'no';

     try{
      $educationView = new EducationView();
      $eduNumRows = $educationView->educationByIdNumRows($deleteId);

      if($eduNumRows==1){
        $educationContr = new EducationContr();
        $deleteEducation = $educationContr->removeEducationInfo($date,$time,$deleteId);

        if($deleteEducation){
          $output['error'] = false;
          $output['message'] = 'That entry was successfully deleted';
          $output['data'] = 'Successfully deleted';
        }else{
          $output['error'] = true;
          $output['message'] = 'Failed to delete. Database error';
          $output['data'] = 'Database execution error';
        }
      }else{
        $output['error'] = true;
        $output['message'] = 'That entry does not exist';
        $output['data'] = 'That data does not exist';
      }
      
    }catch(Exception $e){
      $errorMessage = $e->getMessage();
    
      $output['error'] = true;
      $output['message'] = $errorMessage;
      $output['data'] = 'An error occured';  
    }
    
  break;
  
  case 'get-education-data':
  
  $studentId = $data->studentId;

  $educationView = new EducationView();
  $eduRow = $educationView->studentEducation($studentId);

  $eduCount = $educationView->studentEducationNumRows($studentId);

  $response = [];
  if($eduCount>0){
    foreach($eduRow as $row){
      $response[] = array(
        'id'=>html_entity_decode($row['id']),
        'userId'=>html_entity_decode($row['user_id']),
        'schoolName'=>html_entity_decode($row['school_name']),
        'startDate'=>html_entity_decode($row['start_date']),
        'endDate'=>html_entity_decode($row['end_date'])
      );
    }  
  }
  //$response = (object) $response;

  $output['error'] = false ;
  $output['message'] = "Successfully retrieved student's education history" ;
  $output['data'] = $response ;
  
  break;
  
  default;
}

/* echo the json outout  */
echo json_encode($output);
?>