import React,{useEffect, useState, useCallback} from 'react'
import {Redirect} from "react-router-dom";
import {IoIosHome} from "react-icons/io";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import DashboardBody from '../../components/DashboardBody'
import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'
import axios from 'axios'

const PersonalInfo = () =>{
  /* validate login token */
  const [loadScreen, setLoadScreen] = useState(false);
  const [loginError, setLoginError] = useState();
  const [personalInfoFormData, setPersonalInfoFormData] = useState({'info':''});
  const [personalInfoFormFeedback, setPersonalInfoFormFeedback]= useState();
  /* check if the student token is still relevent */
  useEffect(() => {
     tokenConfirmationHandler('student').then(res=>{
       if(res){
        setLoginError(res.error)
        if(res.error===true){
          setLoadScreen(false)
        }else{        
          setLoadScreen(true)
        }
      }
      return () => { 
        setLoginError();
        setLoadScreen(false)
       };
    })
  }, [])

  /* get data from database */
  const getPersonalInfoHandler = useCallback(async()=>{
      const tokenData = await tokenConfirmationHandler('student');
      setLoginError(tokenData.error)
      if(tokenData.error===false){
        const values = {
          'studentId' : tokenData.info.data.id,
          'actionType':'get-personal-info'
        };
        try{
          const res = await axios({
            url:'http://localhost/school-reg/src/api/personal-info-action.php',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: values
          })
          const resData  = await res.data
          if(resData.error===false){
            return resData
          }else{
            return resData
          }
        }catch(error){
          return {
            'error':true,
            'message':'Fetch Error: '+error
          };
        }    
      }
    },[])
  useEffect(() => {
    getPersonalInfoHandler().then(info=>{
      if(info && !info.error){
        //var dbPersonalInfo = info.data[0];
        setPersonalInfoFormData({'info':info.data[0]})
      }
    })
    return () => { 
      setPersonalInfoFormData({'info':''})
     };
},[getPersonalInfoHandler])


  /* send data to database */
  const updatePersonalInfoHandler = useCallback(async(values, setSubmitting)=>{
    const tokenData = await tokenConfirmationHandler('student');
    setLoginError(tokenData.error)
    if(tokenData.error===false){
      values = {
        ...values,...{
          'studentId' : tokenData.info.data.id,
          'actionType':'update-personal-info'
        }
      };
      try{
        const res = await axios({
          url:'http://localhost/school-reg/src/api/personal-info-action.php',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: values
        })
        const resData  = await res.data
        if(resData.error===false){
          setSubmitting(false);
          return resData
        }else{
          setSubmitting(false);
          return resData
        }
      }catch(error){
        setSubmitting(false);
        return {
          'error':true,
          'message':'Fetch Error: '+error
        };
      }
    }
    setSubmitting(false);
  },[])

  /* screen render/display */
  /* if(loadScreen===undefined) {
    return null;
  }; */
  if(loginError===true){
    return <Redirect to='/student/login'/>
  }
 return(
    <DashboardBody>
      <div className="title">
        <span className='text'><IoIosHome/> Personal Information</span>            
      </div>
      <div className='card'>
        {loadScreen ?
        <>
          <div className='card-title'>Personal Details</div>
            <div className='card-body'>
              <div className='personal-info-card-body'>
                <Formik
                  initialValues={
                    { 
                      firstName:personalInfoFormData.info ? personalInfoFormData.info.firstName:'',
                      lastName: personalInfoFormData.info ? personalInfoFormData.info.lastName:'',
                      address: personalInfoFormData.info ? personalInfoFormData.info.address:'',
                      guardianName: personalInfoFormData.info ? personalInfoFormData.info.guardianName:'',
                      email: personalInfoFormData.info ? personalInfoFormData.info.email:'',
                      phoneNumber: personalInfoFormData.info ? personalInfoFormData.info.phoneNumber:'',
                    }}                  
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                      firstName: Yup.string().required('First name cannot be empty'),
                      lastName: Yup.string().required('Last name cannot be empty'),
                      address: Yup.string().required('Address cannot be empty'),
                      guardianName: Yup.string().required('Guardian name cannot be empty'),
                      email: Yup.string().email('Invalid email address').required('Email cannot be empty!'),
                      phoneNumber: Yup.string().required('Phone number cannot be empty'),
                    })}

                    onSubmit={(values, { setSubmitting }) => {  
                      setTimeout(async () => {                      
                        const formFeedback = await updatePersonalInfoHandler(values,setSubmitting);
                        setPersonalInfoFormFeedback(formFeedback);
                      }, 400);
                    }
                  }
                >
                {({
                  isSubmitting
                }) => (
                  <Form method="POST" id="personal-info-form" className="personal-info-form" name="signup-form-student">
                    <div className=''>
                      {personalInfoFormFeedback &&
                        <div className={`form-feedback-message ${personalInfoFormFeedback.error ? 'text-danger':'text-success '}`}>
                          {personalInfoFormFeedback.message}
                        </div>
                      }
                      <div className="form-row">
                        <label className="form-group col-md-2 label">Full Name</label>
                        <div className="form-group col-md-5">
                          <Field name="firstName" disabled={isSubmitting} type="text" className="form-control" 
                            placeholder="First Name"
                          />
                          <div className="form-error">
                            <ErrorMessage name="firstName" />  
                          </div>            
                        </div>
                        <div className="form-group col-md-5">
                          <Field name="lastName" disabled={isSubmitting} type="text" className="form-control" placeholder="Last Name"
                          />
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
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>   
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
        </>
        :
        <>
          <span className="spinner-border spinner-border-sm center-spinner" role="status" aria-hidden="true"></span>   
        </>
        }

      </div>      
    </DashboardBody>
  )
}
export default PersonalInfo;