<?php
  require_once("model.class.php"); 
  //---------------------------------------------//
  //  School Details Controller  
  //---------------------------------------------//
  class SchoolDetailsContr extends SchoolDetailsModel{
    public function editSchoolDetails($formName,$formEmail,$formAddress,$formPhoneNumber,$formWebsite,$date,$time){
      return $this->updateSchoolDetails($formName,$formEmail,$formAddress,$formPhoneNumber,$formWebsite,$date,$time);
    }
  }
