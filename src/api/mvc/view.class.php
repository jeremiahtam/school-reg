<?php
  require_once("model.class.php");
  //---------------------------------------------//
  //  Get Student View
  //---------------------------------------------//
  class GetStudentView extends GetStudentModel{
    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $paymentRefNum;
    public $deleted;
    public $date;
    public $time;
    
    public function studentInfo($email){  
      $row = $this->getStudentInfo($email);
      if($row){
        $this->id = html_entity_decode($row['id']);
        $this->firstName = html_entity_decode($row['first_name']);
        $this->lastName = html_entity_decode($row['last_name']);
        $this->email = html_entity_decode($row['email']);
        $this->password = html_entity_decode($row['password']);
        $this->paymentRefNum = html_entity_decode($row['payment_ref_num']);
        $this->deleted = html_entity_decode($row['deleted']);
        $this->date = html_entity_decode($row['date']);
        $this->time = html_entity_decode($row['time']);
      }
      return $row;
    }
    public function studentInfoRows($email){  
      $row = $this->getStudentInfoRows($email);
      return $row;
    }
    public function studentData($id){  
      try{
        $row = $this->getStudentData($id);
        return $row;  
      }catch(Exception $e){
        throw new Exception;
      }
    }
  }

  //---------------------------------------------//
  //  Get Education View
  //---------------------------------------------//
  class GetEducationView extends GetEducationModel{
    public function studentEducation($userId){  
      try{
        $row = $this->getEducationInfo($userId);
        return $row;  
      }catch(Exception $e){
        throw new Exception;
      }
    }
  }
?>