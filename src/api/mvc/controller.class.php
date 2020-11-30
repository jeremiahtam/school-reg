<?php
  require_once("model.class.php"); 
  //------------------------------------------
  //  Student Info 
  //----------------------------------------//

  class GetStudentContr extends GetStudentModel{
    public function editStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $id){
      return $this->updateStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $id);
    }
  }
