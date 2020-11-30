<?php
  include_once "./config/database.php";

  //------------------------------------------
  //  Student Info 
  //----------------------------------------//
  class GetStudentModel extends DatabaseService{
    protected function getStudentData($id){
      $sql = "SELECT * FROM users WHERE id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$id,'no']);
      $result = $stmt->fetchAll();
      return $result;
    }
    protected function getStudentInfo($email){
      $sql = "SELECT * FROM users WHERE email = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$email,'no']);
      $result = $stmt->fetch();
      return $result;
    }
    protected function getStudentInfoRows($email){
      $sql = "SELECT COUNT(*) FROM users WHERE email = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$email,'no']);
      $result = $stmt->fetchColumn();
      return $result;
    }
    protected function getStudentInfoRowsById($id){
      $sql = "SELECT COUNT(*) FROM users WHERE id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$id,'no']);
      $result = $stmt->fetchColumn();
      return $result;
    }
    protected function updateStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $id){
      $sql = "UPDATE users SET first_name=?,last_name=?,guardian_name=?,address=?,phone_num=?,email=? WHERE id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $result = $stmt->execute([$firstName,$lastName,$guardianName,$address,$phoneNum,$email,$id,'no']);
      return $result;
    }
  }
  //------------------------------------------
  //  Admin Info 
  //----------------------------------------//
  class GetAdminModel extends DatabaseService{
    protected function getAdminInfo($email){
      $sql = "SELECT * FROM _admin WHERE email = ? AND deleted=? LIMIT 0,1";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$email,'no']);
      $result = $stmt->fetch();
      return $result;
    }
    protected function getAminInfoRows($email){
      $sql = "SELECT COUNT(*) FROM _admin WHERE email = ? AND deleted=? LIMIT 0,1";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$email,'no']);
      $result = $stmt->fetchColumn();
      return $result;
    }
  }
  //------------------------------------------
  //  Education Model 
  //----------------------------------------//
  class GetEducationModel extends DatabaseService{
   
    protected function getEducationInfo($userId){
      try{
        $sql = "SELECT * FROM education WHERE user_id = ? AND deleted=?";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute([$userId,'no']);
        $result = $stmt->fetchAll();
        return $result;  
      }catch(Exception $e){
        throw new Exception;
      }
    }
    protected function getEducationInfoRows($userId){
      $sql = "SELECT COUNT(*) FROM education WHERE user_id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$userId,'no']);
      $result = $stmt->fetchColumn();
      return $result;
    }
  }
  ?>