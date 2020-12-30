<?php
  require_once("model.class.php"); 
  //------------------------------------------
  //  Student Info 
  //----------------------------------------//

  class StudentContr extends StudentModel{
    public function editStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $date, $time, $id){
      return $this->updateStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $date, $time, $id);
    }
  }
  class EducationContr extends EducationModel{
    public function addEducation($userId,$schoolName,$startDate,$endDate,$deleted,$date,$time){
      return $this->insertEducationInfo($userId,$schoolName,$startDate,$endDate,$deleted,$date,$time);
    }
    public function editEducationInfo($schoolName,$startDate,$endDate,$date,$time,$editId){
      return $this->updateEducationInfo($schoolName,$startDate,$endDate,$date,$time,$editId);
    }
    public function removeEducationInfo($date,$time,$deleteId){
      return $this->deleteEducationInfo($date,$time,$deleteId);
    }
  }
