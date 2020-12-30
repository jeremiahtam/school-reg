import React,{} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";

function Register(){  

  return(
    <div className={`body`}>
      <div className={`container`}>
        <div className='row justify-content-center'>

          <div className='ccol-sm-8 col-md-6 col-lg-4 signup-form-box'>
            <div className="form-heading">Register Here</div>
            <Formik
              initialValues={
                { 
                  firstName: '', 
                  lastName: '', 
                  email: '' ,
                  password:'',
                  confirmPassword:'',
                  refNumber:''
                }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('First name cannot be empty'),
                lastName: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Last name cannot be empty'),
                email: Yup.string().email('Invalid email address').required('Email cannot be empty!'),
                password: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .min(8,"Must be more than eight characters")
                  .required('Password cannot be empty'),
                confirmPassword: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Password cannot be empty')
                  .test('passwords-match', 'Passwords must match', function(value) {
                    return this.parent.password === value;
                  }),
                refNumber: Yup.string().required('Enter Reference Number'),
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
              values,
              errors,
              status,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              setFieldValue,
              handleSubmit,
              props,
            }) => (
              <Form method="POST" id="login-form-student" name="login-form-student">
                <div className="row">
                  <div className="form-group col-sm-12 col-md-6">                  
                    <Field name="firstName" disabled={isSubmitting} className="form-control" type="text" placeholder="First Name" />
                    <div className="form-error">
                      <ErrorMessage name="firstName" />              
                    </div>
                  </div>
                  <div className="form-group col-sm-12 col-md-6">                
                    <Field name="lastName" disabled={isSubmitting} className="form-control" type="text" placeholder="Last Name" />
                    <div className="form-error">
                      <ErrorMessage name="lastName" />
                    </div>              
                  </div>
                </div>

                <div className="form-group">                  
                  <Field name="email" disabled={isSubmitting} className="form-control" type="text" placeholder="Email" />
                  <div className="form-error">
                    <ErrorMessage name="email" />  
                  </div>            
                </div>

                <div className="row">
                  <div className="form-group col-sm-12 col-md-6">                  
                    <Field name="password" disabled={isSubmitting} className="form-control" type="password" placeholder="Password" />
                    <div className="form-error">
                      <ErrorMessage name="password" />              
                    </div>
                  </div>
                  <div className="form-group col-sm-12 col-md-6">                
                    <Field name="confirmPassword" disabled={isSubmitting} className="form-control" type="password" placeholder="Confirm Password" />
                    <div className="form-error">
                      <ErrorMessage name="confirmPassword" />
                    </div>              
                  </div>
                </div>

                <div className="form-group">                  
                  <Field name="refNumber" disabled={isSubmitting} className="form-control" type="text" placeholder="Payment Reference Number" />
                  <div className="form-error">
                    <ErrorMessage name="refNumber"/>  
                  </div>            
                </div>
                
                <button 
                  className="btn btn-primary btn-block" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                {isSubmitting ?
                (
                  <>
                  <span className="spinner-border spinner-border" role="status" aria-hidden="true"></span>   
                  <span> Processing..</span> 
                </>
                ):(" Submit Registration")}
                   
                </button>
                <div className={"container form-extras"}>
                  <div className="row">
                    <span>Alreaady have an account? <Link to={`/student/login`}> Login</Link></span>
                  </div>
                </div> 
              </Form>)}
            </Formik>
          </div>          
        </div>

        <div className="row justify-content-center form-footer">
          <span>An <a href='http://www.oncliqsupport.com'> oncliqsupport </a> production</span>
        </div>

      </div>
    </div>
  )
}
export default Register;