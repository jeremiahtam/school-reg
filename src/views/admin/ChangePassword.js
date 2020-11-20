import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";

function ChangePassword(){  
  return(
    <div className={`body`}>
      <div className={`container`}>
        <div className={`row justify-content-center`}>

          <div className={`col-lg-4 signup-form-box`}>
            <div className="form-heading">Create New Admin Password</div>
            <Formik
              initialValues={
                { 
                  password:'',
                  confirmPassword:'',
                }}
              validationSchema={Yup.object({
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
                <div className="form-group">                  
                  <Field name="password" disabled={isSubmitting} className="form-control" type="password" placeholder="New Password" />
                  <div className="form-error">
                    <ErrorMessage name="password" />              
                  </div>
                </div>
                <div className="form-group">                
                  <Field name="confirmPassword" disabled={isSubmitting} className="form-control" type="password" placeholder="Confirm New Password" />
                  <div className="form-error">
                    <ErrorMessage name="confirmPassword" />
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
                ):(" Change Password")}
                   
                </button>
                <div className={"container form-extras"}>
                  <div className="row">
                    <span><Link to={`/admin/login`}> Login</Link> to your account.</span>
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
export default ChangePassword;