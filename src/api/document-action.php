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

switch($actionType){
  case 'get-document':     
    $studentId = $data->studentId;
  try{
    $documentView = new DocumentView();
    $docs = $documentView ->fetchDocList($studentId);  
  
    $docsNumRows = $documentView ->fetchDocListNumRows($studentId); 
  
    if($docsNumRows>0){

      foreach($docs as $row){
        $response[] = array(
          'id'=>html_entity_decode($row['id']),
          'studentId'=>html_entity_decode($row['student_id']),
          'fileName'=>html_entity_decode($row['file_name']),
          'fileCategory'=>html_entity_decode($row['file_category']),
          'fileCategoryName'=>html_entity_decode($row['file_category_name'])
        );
      }  
      // $response = (object) $response;
    
      $output['error'] = false;
      $output['message'] = 'Success';
      $output['data'] = $response;    
    }else{
      $output['error'] = true;
      $output['message'] = 'No documents available';
      $output['data'] = 'This user does not have any documnt uploaded';
    }
  }catch(Exception $e){
    $errorMessage = $e->getMessage();
  
    $output['error'] = true;
    $output['message'] = $errorMessage;
    $output['data'] = 'An error occured';  
  
  } 
  break;

  case 'delete-education-entry':     
    $studentId = $data->studentId;
    $deleteId = $data->deleteId;

  try{
    $documentView = new DocumentView();
    $docsNumRows = $documentView->docExistByIdNumRows($deleteId);  
    
    if($docsNumRows==1){
      
      $documentContr = new DocumentContr();
      $deleteRes = $documentContr->removeDocument($date,$time,$deleteId);

      if($deleteRes){
        $output['error'] = false;
        $output['message'] = 'Successfully deleted that document';          
      }else{
        $output['error'] = true;
        $output['message'] = 'Oops! Something went wrong.';  
        $output['data'] = $deleteRes;
      }
    }else{
      $output['error'] = true;
      $output['message'] = 'No documents available';
      $output['data'] = 'This document does not exist';
    }
  }catch(Exception $e){
    $errorMessage = $e->getMessage();
  
    $output['error'] = true;
    $output['message'] = $errorMessage;
    $output['data'] = 'An error occured';  
  
  } 
  break;
}
  
echo json_encode($output);
?>