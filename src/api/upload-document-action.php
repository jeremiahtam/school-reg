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

if($_POST['actionType']){
  
  $actionType = $_POST['actionType'];

  /* check the action type */
  switch($actionType){
    /* upload image*/
    case 'add-document':
      $actionType = $_POST['actionType'];
      $studentId = $_POST['studentId'];
      $fileCategory = $_POST['fileCategory'];
      $email = $_POST['email'];
      //match the category names with their full names
      $catNames=['schoolCert'=>'School Certificate','birthCert'=>'Birth Certificate'];
      $fileCategoryName = $catNames[$fileCategory];//get file category full name

      if (is_uploaded_file($_FILES['selectedFile']['tmp_name'])) {
        //Get MIME type
        $mimeType = mime_content_type($_FILES['selectedFile']['tmp_name']);
        //Allow certain files
        $allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        if (! in_array($mimeType, $allowedFileTypes)) {
            // File type is NOT allowed
            $output['error'] = true;
            $output['message'] = 'Please document must be in .png, .jpeg or .pdf format';
        }else{
          //check max file size
          if($_FILES['selectedFile']['size']>1000000){
            $output['error'] = true;
            $output['message'] = 'Make sure the document is less than 1Mb';
          }else{
            $temp = explode(".", $_FILES["selectedFile"]["name"]);
            $randNum = $studentId.''.md5(rand() + microtime(true));
            $newFileName = $randNum.'.'.end($temp);
            //check if that file name exists aready       
            if(file_exists("../uploadedDocs/" . $newFileName)){
              $output['error'] = true;
              $output['message'] = $_FILES["selectedFile"]["name"]." already exists. Try again.";
            }else{
              //check if document has been uploaded already
              $documentView = new DocumentView();
              $docExist = $documentView->docExistNumRows($studentId,$fileCategory);

              if($docExist>0){
                $output['error'] = true;
                $output['message'] = 'You already uploaded that document';
              }else{
                // Set up destination of the file
                $destination = '../uploadedDocs/'.$newFileName;
                // Now you move/upload your file
                if(move_uploaded_file ($_FILES['selectedFile']['tmp_name'] , $destination)){
                  // File moved to the destination
                  try{
                    $documentContr = new documentContr();
                    $uploadDoc = $documentContr->addDocument($studentId,$newFileName,$fileCategory,$fileCategoryName,'no',$date,$time);

                    if($uploadDoc){
                      $output['error'] = false;
                      $output['message'] = 'Successfully uploaded document';
                      $output['data'] = 'Success: '.$uploadDoc;
                    }else{      
                      $output['error'] = true;
                      $output['message'] = 'Oops! An error occured. Docs upload query issue';
                      $output['data'] = $uploadDoc;
                    }

                  }catch(Exception $e){
                    $errorMessage = $e->getMessage();

                    $output['error'] = true;
                    $output['message'] = 'Technical error. Try again later';
                    $output['data'] = $errorMessage;  
              
                  }

                }else{
                  $output['error'] = true;
                  $output['message'] = 'Oops! File upload was unsuccessful';
                }  
              }
            }
          }
        }    
    }

    break;
  }  
}else{
  $output['error'] = true;
  $output['message'] = 'The action type is not set';

}
echo json_encode($output);

?>