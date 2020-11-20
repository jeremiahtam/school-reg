<?php
  require_once("model.class.php");
  # function for base url
  function base_url(){
      if(isset($_SERVER['HTTPS'])){
        $protocal = ($_SERVER['HTTPS'] && $_SERVER['HTTPS']!='off') ? "https":"http";
      }else{
        $protocal = 'http';
      }
      if($_SERVER['SERVER_NAME']=='localhost'){
        return $protocal."://".$_SERVER['SERVER_NAME'].'/vlgnpcportal/';
      }else{
        return $protocal."://".$_SERVER['SERVER_NAME']."/";
      }
    }  
  //---------------------------------------------//
  //  Position suffix
  //---------------------------------------------//
  class Position {
    public static function positionSuffix($number){
      $array = str_split($number);
      $lastDigit = end($array);
      if($number==11 || $number==12 || $number==13){
        $lastDigit = '';
      }
      switch($lastDigit){
        case 1:
          $suffix = 'st';
        break;
        case 2:
          $suffix = 'nd';
        break;
        case 3:
          $suffix = 'rd';
        break;
        default:
          $suffix = 'th';
      break;
      }
      return $suffix;
    }
  }

  //---------------------------------------------//
  //  School Details View
  //---------------------------------------------//
  class SchoolDetailsView extends SchoolDetailsModel{
    public $id;
    public $name;
    public $email;
    public $address;
    public $phoneNumber;
    public $website;
    public $date;
    public $time;
    
    public function schoolDetails(){  
      $row = $this->getSchoolDetails();
      if($row){
        $this->id = html_entity_decode($row['id']);
        $this->name = html_entity_decode($row['name']);
        $this->email = html_entity_decode($row['email']);
        $this->address = html_entity_decode($row['address']);
        $this->phoneNumber = html_entity_decode($row['phone_number']);
        $this->website = html_entity_decode($row['website']);
        $this->date = html_entity_decode($row['date']);
        $this->time = html_entity_decode($row['time']);
      }
      return $row;
    }
  }

  //---------------------------------------------//
  //  Exam Result Type View
  //---------------------------------------------//
  class ExamResultTypeView extends ExamResultTypeModel{
    public $id;
    public $examName;
    public $termId;
    public $schoolFeesCompulsory;
    public $removed;
    public $date;
    public $time;
    
    public function getExamResultTypeInfo($removed,$examTypeId){  
      $row = $this->examResultTypeInfo($removed,$examTypeId);
      if($row){
        $this->id = html_entity_decode($row['id']);
        $this->examName = html_entity_decode($row['exam_name']);
        $this->termId = html_entity_decode($row['term_id']);
        $this->schoolFeesCompulsory = html_entity_decode($row['school_fees_compulsory']);
        $this->removed = html_entity_decode($row['removed']);
        $this->date = html_entity_decode($row['date']);
        $this->time = html_entity_decode($row['time']);
      }
      return $row;
    }
    public function getAllExamResultType($removed){  
      return $this->allExamResultType($removed);
    }
    public function getAllExamResultTypeByTerm($removed,$termId){  
      return $this->allExamResultTypeByTerm($removed,$termId);
    }
    public function examResultTypeNumRows($removed,$examTypeId){  
      return $this-> getExamResultTypeNumRows($removed,$examTypeId);
    }
  }

  //---------------------------------------------//
  //  Terms View
  //---------------------------------------------//
  class TermsInfoView extends TermsInfoModel{
    public $termName;//First, Second
    public $altTerm;//1,2
    
    public function getTerm($removed,$altTerm){  
      $row = $this->altTermsInput($removed,$altTerm);
      if($row){
        $this->termName = html_entity_decode($row['term_name']);
      }
      return $row;
    }
    public function allTerms($removed){  
      $row = $this->getAllTerms($removed);
      return $row;
    }
    public function termNumRows($removed,$altTerm){  
      $row = $this->getTermNumRows($removed,$altTerm);
      return $row;
    }
  }
  //---------------------------------------------//
  //  Navigation View
  //---------------------------------------------//
  class Navigation{

    public function navigationStartPage($page,$recordPerPage){
      $startFrom = ($page - 1) * $recordPerPage;
      return $startFrom;
    }

    //navigation buttons
    public function navigationButtons($navigationType,$page,$totalPages){

      if($totalPages>1){
        echo"
        <nav aria-label='Page navigation' class='".$navigationType."'>
         <ul class='pagination justify-content-end'>
        ";
        
        if($page>1){
          echo"
          <li class='page-item'>
           <a aria-label='Previous' class='pagination_link page-link' id='".($page - 1)."'>
            <span aria-hidden='true'>&larr; Previous</span>
           </a>
          </li>
          ";
          }
          
        echo "
        <li class='page-item disabled'>
           <a class='page-link' tabindex='-1' aria-disabled='true'>
           Page ".$page." of ".$totalPages."
           </a>
        </li>";
        
        if($page!=$totalPages){
          echo"
          <li class='page-item'>
           <a aria-label='Next' class='pagination_link page-link' id='".($page + 1)."'>
            <span aria-hidden='true'>Next &rarr;</span>
           </a>
          </li>
          ";
          }
        echo"
         </ul>
        </nav>
      ";	
      }

    }
  }

?>