import React,{useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import DashboardBody from '../../components/DashboardBody'
import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'
import {IoIosCloudUpload} from "react-icons/io";

function UploadDocuments(){
  /* validate login token */
  const [loadScreen, setLoadScreen] = useState(false);
  const [loginError, setLoginError] = useState();
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
 

  const uploadDocumentHandler = (values,setSubmitting) => {
    let data = new FormData();
    
    };
  /* screen render/display */
  if(loadScreen===undefined) {
    //return null;
  };
  if(loginError===true){
    return <Redirect to='/student/login'/>
  }
  return(
    <DashboardBody>
      <div className="title">
        <span className='text'><IoIosCloudUpload/> Uploads</span>            
      </div>
      <div className='card'>
      {loadScreen ?
        <>
          <div className='card-title'>Uploads Files</div>
          <div className='card-body'>
            <div className='upload-documents-card-body'>

              <Formik
                initialValues={
                  { 
                    documentUpload: ''
                  }
                }
                enableReinitialize={true}
                validationSchema={Yup.object({
                  documentUpload: Yup.string().required('Enter graduation date')
                })}
                onSubmit={(values, { setSubmitting }) => {     
                  setTimeout(() => {
                    uploadDocumentHandler(values,setSubmitting)
                  }, 400);
                }}
              >
              {({
                isSubmitting
              }) => (
                <Form>
                  <div className='row'>
                    <div className="form-group col-sm-12 col-md-4">
                      <Field type="file" className="form-control-file" id="documentUpload" name='documentUpload'/>
                      <div className="form-error">
                        <ErrorMessage name="schoolName"/>
                      </div>                
                    </div>
                    <div className="form-group col-sm-12 col-md-4">
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>-select document-</option>
                        <option>School Certificate</option>
                        <option>Birth Certificate</option>
                      </select>
                      <div className="form-error">
                        <ErrorMessage name="schoolName"/>
                      </div>                
                    </div>
                    <div className="form-group col-sm-12 col-md-4">
                      <button 
                        className="btn btn-primary" 
                        type="submit" 
                        disabled={isSubmitting}
                      >
                      {isSubmitting ?
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>   
                        <span> Processing..</span> 
                      </>
                      : "Upload" 
                      }              
                      </button>
                    </div>
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
export default UploadDocuments;