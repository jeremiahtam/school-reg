import React,{useEffect, useState, useCallback} from 'react'
import {Redirect} from "react-router-dom";
import {IoIosHome} from "react-icons/io";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import DashboardBody from '../../components/DashboardBody'
import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'

const PersonalInfo = () =>{
  /* validate login token */
  const [loadScreen, setLoadScreen] = useState();
  const [loginError, setLoginError] = useState();
  const [loadPersonalInfoData, setLoadPersonalInfoData] = useState(false)
  /* check if the student token is still relevent */
  useEffect(() => {
     tokenConfirmationHandler('student').then(res=>{
      setLoginError(res.error)
      if(res.error===true){
        setLoadScreen(false)
      }else{        
        setLoadScreen(true)
      }
    })
  }, [])

  /* get data from database */
  const getPersonalInfoHandler = useCallback(async()=>{
      const tokenData = await tokenConfirmationHandler('student');
      if(tokenData.error===false){
        const values = {'studentId':tokenData.info.data.id}
        try{
          const res = await fetch('http://localhost/school-reg/src/api/get-personal-info.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'values':values
            })
          })          
          const resData  = await res.json()
          if(resData.error===false){
              return resData
            }else{
              return resData
            }
        }catch(error){
          return {
            'error':true,
            'message':error
          };
        }    
      }
    },[],
  )
  useEffect(() => {
    getPersonalInfoHandler().then(i=>{
      setLoadPersonalInfoData(true)
      console.log(i)
    })
  })

  /* screen render/display */
  if(loadScreen===undefined) {
    return null;
  };
  if(loginError===true){
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