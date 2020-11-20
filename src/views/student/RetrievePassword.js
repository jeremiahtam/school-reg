import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";

function RetrievePassword(){

  return(
    <div className={`body`}>
    <div className={`container`}>
      <div className={`row justify-content-center`}>
  
        <div className={`col-lg-4 signup-form-box`}>
          <div className="form-heading">Retrieve Password</div>
          <Formik
            initialValues={
              { 
                email: '' 
              }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Email cannot be empty!'),
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
            <Form method="POST" id="retrieve-password-form-student" name="retrieve-password-form-student">
  
              <div className="form-group">                  
                <Field name="email" disabled={isSubmitting} className="form-control" type="text" placeholder="Email" />
                <div className="form-error">
                  <ErrorMessage name="email" />  
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
              ):(" Retrieve Password")}
                 
              </button>
              <div className={"container justify-content-center form-extras"}>
                <div className='row'><span>Login to account. <Link to={`/student/login`}> Login </Link></span></div>
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
export default RetrievePassword;