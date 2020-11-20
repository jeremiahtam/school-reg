import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";

function Login(){
return(
  <div className={`body`}>
  <div className={`container`}>
    <div className={`row justify-content-center`}>

      <div className={`col-lg-4 signup-form-box`}>
        <div className="form-heading">Login To Admin Account</div>
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
          <Form method="POST" id="signup-form-student" name="signup-form-student">

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
              <div className='row'><span>Forgotten Password? <Link to={`/admin/retrieve-password`}> Retrieve Password</Link></span></div>
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