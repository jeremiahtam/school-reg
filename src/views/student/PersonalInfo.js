import React,{useEffect} from 'react'
import {Redirect} from "react-router-dom";
import {IoIosHome} from "react-icons/io";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import DashboardBody from '../../components/DashboardBody'

const PersonalInfo = () =>{

  // get loginInfo from local storage
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));

  if(loginInfo){
    const loginToken = loginInfo.loginToken;
    const userType = loginInfo.userType;
    //if userType is not a student, redirect
    if(userType==='student'){
      if(loginToken){
        //check if it is still valid
        fetch('http://localhost/school-reg/src/api/protected.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'jwt':loginToken
          })
        })
        .then(res=>res.json())
        .then(resData=>{
          if(resData.error===false){
            // return resData;
            console.log(resData)
          }else{
            //redirect
            console.log(resData)
            return <Redirect to='/student/login'/>
          }
        })
        .catch(error=>{
          console.error('Error:',error)
          return <Redirect to='/student/login'/>
        })
      }else{      
        //redirect to login page
        console.log('no login token')
        return <Redirect to='/student/login'/>
      }  
    }else{
      //redirect to login page
      console.log('user not student')
      return <Redirect to='/student/login'/>
    }
  }else{
    //redirect to login page
    console.log('no data in local storage')
    return <Redirect to='/student/login'/>
  }

  return(
    <DashboardBody>
      <div className="title">
        <span className='text'><IoIosHome/> Personal Information</span>            
      </div>
      <div className='card'>
        <div className='card-title'>Personal Details</div>
          <div className='card-body'>
            <div className='personal-info-card-body'>
              <Formik
                initialValues={
                  { 
                    firstName: '' ,
                    lastName:'',
                    address: '' ,
                    guardianName:'',
                    email:'',
                    phoneNumber:'',
                  }}
                  validationSchema={Yup.object({
                    firstName: Yup.string().required('First name cannot be empty'),
                    lastName: Yup.string().required('Last name cannot be empty'),
                    address: Yup.string().required('Address cannot be empty'),
                    guardianName: Yup.string().required('Guardian name cannot be empty'),
                    email: Yup.string().email('Invalid email address').required('Email cannot be empty!'),
                    phoneNumber: Yup.string().required('Phone number cannot be empty'),
                  })}

                  onSubmit={(values, { setSubmitting }) => {  
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }
                }
              >
              {({
                isSubmitting
              }) => (
                <Form method="POST" id="personal-info-form" className="personal-info-form" name="signup-form-student">
                  <div className=''>
                    <div className="form-row">
                      <label className="form-group col-md-2 label">Full Name</label>
                      <div className="form-group col-md-5">
                        <Field name="firstName" disabled={isSubmitting} type="text" className="form-control" placeholder="First Name"/>
                        <div className="form-error">
                          <ErrorMessage name="firstName" />  
                        </div>            
                      </div>
                      <div className="form-group col-md-5">
                        <Field name="lastName" disabled={isSubmitting} type="text" className="form-control" placeholder="Last Name"/>
                        <div className="form-error">
                          <ErrorMessage name="lastName" />  
                        </div>            
                      </div>
                    </div>
                    <div className="form-row">
                      <label className="form-group col-sm-2 label">Address</label>
                      <div className="form-group col-md-10">
                        <Field name="address" disabled={isSubmitting} type="text" className="form-control" placeholder="Residential Addess"/>
                        <div className="form-error">
                          <ErrorMessage name="address" />  
                        </div>            
                      </div>
                    </div>
                    <div className="form-row">
                      <label className="form-group col-sm-2 label">Guardian Name</label>
                      <div className="form-group col-sm-10">
                        <Field name="guardianName" disabled={isSubmitting} type="text" className="form-control" placeholder="Guardian Name"/>
                        <div className="form-error">
                          <ErrorMessage name="guardianName" />  
                        </div>            
                      </div>
                    </div>
                    <div className="form-row">
                      <label className="form-group col-sm-2 label">Contact</label>
                      <div className="form-group col-sm-5">
                        <Field name="email" disabled={isSubmitting} type="emain" className="form-control" placeholder="Email"/>
                        <div className="form-error">
                          <ErrorMessage name="email" />  
                        </div>            
                      </div>
                      <div className="form-group col-sm-5">
                        <Field name="phoneNumber" disabled={isSubmitting} type='digit' className="form-control" placeholder="Phone Number"/>
                        <div className="form-error">
                          <ErrorMessage name="phoneNumber" />  
                        </div>            
                      </div>
                    </div>

                    <button 
                      className="btn btn-light float-right" 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ?
                      (
                        <>
                          <span className="spinner-border spinner-border" role="status" aria-hidden="true"></span>   
                          <span> Processing..</span> 
                        </>
                        ):(" Update Information")}              
                    </button>
                  </div>
                </Form>
              )}
            </Formik>      
          </div>
        </div>              
      </div>      
    </DashboardBody>
  )
}
export default PersonalInfo;