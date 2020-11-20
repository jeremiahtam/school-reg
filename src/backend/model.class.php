<?php
  require_once("dbh.inc.php");
  //------------------------------------------
  //  School Details Model
  //----------------------------------------//
  class SchoolDetailsModel extends Dbh{
    protected function getSchoolDetails(){
      $sql = "SELECT * FROM school_details";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([]);
      $result = $stmt->fetch();
      return $result;
    }
    protected function updateSchoolDetails($formName,$formEmail,$formAddress,$formPhoneNumber,$formWebsite,$date,$time){
      $sql = "UPDATE school_details SET name=?,email=?,address=?,phone_number=?,website=?,date=?,time=? WHERE id='1'";
      $stmt = $this->connect()->prepare($sql);
      $result = $stmt->execute([$formName,$formEmail,$formAddress,$formPhoneNumber,$formWebsite,$date,$time]);
      return $result;
    }
  }
  //------------------------------------------
  //  Exam Result Type Model
  //----------------------------------------//
  class ExamResultTypeModel extends Dbh{
    protected function allExamResultType($removed){
      $sql = "SELECT * FROM exam_result_type WHERE removed=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed]);
      $result = $stmt->fetchAll();
      return $result;
    }
    protected function allExamResultTypeByTerm($removed,$termId){
      $sql = "SELECT * FROM exam_result_type WHERE removed=? AND term_id=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed,$termId]);
      $result = $stmt->fetchAll();
      return $result;
    }
    protected function examResultTypeInfo($removed,$examTypeId){
      $sql = "SELECT * FROM exam_result_type WHERE removed=? AND id=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed,$examTypeId]);
      $result = $stmt->fetch();
      return $result;
    }
    protected function getExamResultTypeNumRows($removed,$examTypeId){
      $sql = "SELECT COUNT(*) FROM exam_result_type WHERE removed=? AND id=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed,$examTypeId]);
      $result = $stmt->fetchColumn();
      return $result;
    }
  }


  //------------------------------------------
  //  Terms Model
  //----------------------------------------//
  class TermsInfoModel extends Dbh{
    protected function getTermNumRows($removed,$altTerm){
      $sql = "SELECT COUNT(*) FROM terms WHERE removed=? AND term=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed,$altTerm]);
      $result = $stmt->fetchColumn();
      return $result;
    }
    protected function altTermsInput($removed,$altTerm){
      $sql = "SELECT * FROM terms WHERE removed=? AND term=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed,$altTerm]);
      $result = $stmt->fetch();
      return $result;
    }
    protected function getAllTerms($removed){
      $sql = "SELECT * FROM terms WHERE removed=?";
      $stmt = $this->connect()->prepare($sql);
      $stmt->execute([$removed]);
      $result = $stmt->fetchAll();
      return $result;
    }
  }
?>