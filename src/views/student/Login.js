import React,{useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link, Redirect} from "react-router-dom";

function Login(){
  //login errors returned from the backend
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  return(
  <div className='body'>
  <div className='container'>
    <div className='row justify-content-center'>

      <div className='col-lg-4 signup-form-box'>
        <div className="form-heading">Login To Account</div>
        <Formik
          initialValues={
            { 
              email: '' ,
              password:''
            }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email cannot be empty!'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .min(8,"Must be more than eight characters")
              .required('Password cannot be empty'),
          })}

          onSubmit={(values, { setSubmitting }) => {  
            //add userType to the form data to be sent
            values = {...values,...{'userType':'student'}}
            setTimeout(async () => {
              try{
                //make api call to login to user account
               const response = await fetch('http://localhost/school-reg/src/api/login.php',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(values, null, 2)
                })
                const resData = await response.json();
                //if there is an authentication error
                if(resData.error===true){
                  setLoginErrorMessage(resData.message)
                }else if(resData.error===false){
                  //empty the error message
                  setLoginErrorMessage('')
                  //get the token and userType and save it in localStorage
                  const storeLocally = {
                    'loginToken':resData.jwt,
                    'userType':resData.userType
                  }
                  const loginInfo = JSON.stringify(storeLocally);
                  localStorage.setItem('loginInfo',loginInfo)
                  //redirect to PersonalInfo.js
                  return <Redirect to='/student/personal-info'/>
                }
              }catch(e){
                //throw e
              }
              setSubmitting(false);
            }, 400);
          }
        }
        >
        {({
          isSubmitting        
        }) => (
          <Form method="POST" id="signup-form-student" name="signup-form-student">
            <div className="form-error">
              {loginErrorMessage}
            </div>
            <div className="form-group">                  
              <Field name="email" disabled={isSubmitting} className="form-control" type="text" placeholder="Email" />
              <div className="form-error">
                <ErrorMessage name="email" />  
              </div>            
            </div>

            <div className="form-group">
              <Field name="password" disabled={isSubmitting} className="form-control" type="password" placeholder="Password" />
              <div className="form-error">
                <ErrorMessage name="password" />              
              </div>
            </div>

            <button 
              className="btn btn-primary btn-block btn-lg" 
              type="submit" 
              disabled={isSubmitting}
            >
            {isSubmitting ?
            (
              <>
              <span className="spinner-border spinner-border" role="status" aria-hidden="true"></span>   
              <span> Processing..</span> 
            </>
            ):(" Login")}
               
            </button>
            <div className={"container justify-content-center form-extras"}>
              <div className='row'><span>{`Don't have an account?`} <Link to={`/student`}> Signup </Link></span></div>
              <div className='row'><span>Forgotten Password? <Link to={`/student/retrieve-password`}> Retrieve Password</Link></span></div>
            </div> 
         </Form>)}
        </Formik>
      </div>          
    </div>

    <div className="row justify-content-center form-footer">
      <div>An <a href='http://www.oncliqsupport.com'> oncliqsupport </a> production</div>
    </div>

  </div>
</div>
)
}
export default Login;