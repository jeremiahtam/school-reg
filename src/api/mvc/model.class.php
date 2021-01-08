<?php
  include_once "./config/database.php";

  //------------------------------------------
  //  Student Info 
  //----------------------------------------//
  class StudentModel extends DatabaseService{
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
    protected function updateStudentInfoById($firstName,$lastName,$guardianName,$address, $phoneNum, $email, $date, $time, $id){
      $sql = "UPDATE users SET first_name=?,last_name=?,guardian_name=?,address=?,phone_num=?,email=?,date=?,time=? WHERE id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $result = $stmt->execute([$firstName,$lastName,$guardianName,$address,$phoneNum,$email,$date,$time,$id,'no']);
      return $result;
    }
  }
  //------------------------------------------
  //  Admin Info 
  //----------------------------------------//
  class AdminModel extends DatabaseService{
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
  class EducationModel extends DatabaseService{
   
    protected function insertEducationInfo($userId,$schoolName,$startDate,$endDate,$deleted,$date,$time){
      try{
        $sql = "INSERT INTO education(user_id,school_name,start_date,end_date,deleted,date,time) VALUES (?,?,?,?,?,?,?)";
        $stmt = $this->getConnection()->prepare($sql);
        $result = $stmt->execute([$userId,$schoolName,$startDate,$endDate,$deleted,$date,$time]);
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function updateEducationInfo($schoolName,$startDate,$endDate,$date,$time,$editId){
      try{
        $sql = "UPDATE education SET school_name=?,start_date=?,end_date=?,date=?,time=? WHERE id=?";
        $stmt = $this->getConnection()->prepare($sql);
        $result = $stmt->execute([$schoolName,$startDate,$endDate,$date,$time,$editId]);
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function deleteEducationInfo($date,$time,$deleteId){
      try{
        $sql = "UPDATE education SET deleted=?,date=?,time=? WHERE id=?";
        $stmt = $this->getConnection()->prepare($sql);
        $result = $stmt->execute(['yes',$date,$time,$deleteId]);
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }

    protected function getEducationInfo($userId){
      try{
        $sql = "SELECT * FROM education WHERE user_id = ? AND deleted=?";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute([$userId,'no']);
        $result = $stmt->fetchAll();
        return $result;  
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function getEducationInfoRows($userId){
      $sql = "SELECT COUNT(*) FROM education WHERE user_id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$userId,'no']);
      $result = $stmt->fetchColumn();
      return $result;
    }
    protected function getEducationByIdRows($id){
      $sql = "SELECT COUNT(*) FROM education WHERE id = ? AND deleted=?";
      $stmt = $this->getConnection()->prepare($sql);
      $stmt->execute([$id,'no']);
      $result = $stmt->fetchColumn();
      return $result;
    }
  }
  
  //------------------------------------------
  //  Document Info 
  //----------------------------------------//
  class DocumentModel extends DatabaseService{

    protected function checkDocExistByIdNumRows($id){
      try{
        $sql = "SELECT COUNT(*) FROM upload_documents WHERE id = ? AND deleted=?";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute([$id,'no']);
        $result = $stmt->fetchColumn();
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function deleteDocument($date,$time,$deleteId){
      try{
        $sql = "UPDATE upload_documents SET deleted=?,date=?,time=? WHERE id=?";
        $stmt = $this->getConnection()->prepare($sql);
        $result = $stmt->execute(['yes',$date,$time,$deleteId]);
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function insertDocument($studentId,$fileName,$fileCategory,$fileCategoryName,$deleted,$date,$time){
      try{
        $sql = "INSERT INTO upload_documents(student_id,file_name,file_category,file_category_name,deleted,date,time) VALUES (?,?,?,?,?,?,?)";
        $stmt = $this->getConnection()->prepare($sql);
        $result = $stmt->execute([$studentId,$fileName,$fileCategory,$fileCategoryName,$deleted,$date,$time]);
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function checkDocExistNumRows($studentId,$fileCategory){
      try{
        $sql = "SELECT COUNT(*) FROM upload_documents WHERE student_id = ? AND file_category=? AND deleted=?";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute([$studentId, $fileCategory,'no']);
        $result = $stmt->fetchColumn();
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function getDocList($studentId){
      try{
        $sql = "SELECT * FROM upload_documents WHERE student_id = ? AND deleted=?";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute([$studentId,'no']);
        $result = $stmt->fetchAll();
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
    protected function getDocListNumRows($studentId){
      try{
        $sql = "SELECT COUNT(*) FROM upload_documents WHERE student_id = ? AND deleted=?";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute([$studentId,'no']);
        $result = $stmt->fetchColumn();
        return $result;
      }catch(Exception $e){
        throw $e;
      }
    }
  }
  
  ?>