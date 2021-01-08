import React,{useEffect, useState, useCallback} from 'react'
import {Redirect} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import DashboardBody from '../../components/DashboardBody'
import UploadDocumentModal from '../../components/UploadDocumentModal';
import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'
import {IoIosCloudUpload} from "react-icons/io";
import axios from 'axios'
// import fileDownload from 'js-file-download';

function UploadDocuments(){
  /* validate login token */
  const [loadScreen, setLoadScreen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [uploadDocFormData, setUploadDocFormData] = useState('');//feedback message after upload
  const [uploadDocFormFeedback, setUploadDocFormFeedback]= useState(false);
  const [documentList,setDocumentList] = useState('')

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
        setLoginError(false);
        setLoadScreen(false)
      };
    })
  }, [])
   /* get data from database */
   const getDocumentHandler = useCallback(async()=>{
    const tokenData = await tokenConfirmationHandler('student');
    setLoginError(tokenData.error)
    if(tokenData.error===false){
      const values = {
        'studentId' : tokenData.info.data.id,
        'actionType':'get-document'
      };
      try{
        const res = await axios({
          url:'http://localhost/school-reg/src/api/document-action.php',
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
    getDocumentHandler().then(info=>{
      if(info && !info.error){
        setDocumentList(info.data)
      }
    })
    return()=>{
    
    }
  })

  const uploadDocumentHandler = useCallback(async(values,setSubmitting) => {
    const tokenData = await tokenConfirmationHandler('student');
    setLoginError(tokenData.error)
    if(tokenData.error===false){
      var formData = new FormData();
      formData.append("selectedFile", values.fileDetails)
      formData.append("fileCategory", values.fileCategory)
      formData.append("actionType", "add-document")
      formData.append("studentId", tokenData.info.data.id)
      formData.append("email", tokenData.info.data.email)
      // console.log(formData)
      try{
        const res = await axios({
          url:'http://localhost/school-reg/src/api/upload-document-action.php',
          method:'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          data:formData
        })    
        const resData  = await res.data
        console.log(resData)
        if(resData.error===false){
          setSubmitting(false)
          setUploadDocFormData(resData)
          setUploadDocFormFeedback(true)
          return resData
        }else{
          setSubmitting(false)    
          setUploadDocFormData(resData)
          setUploadDocFormFeedback(true)
          return resData
        }  
      }catch(error){
        setSubmitting(false);
        return {
          'error':true,
          'message':'Fetch Error: '+error
        };
      }
    };
  },[])

  /* modal functionality */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }
  const [modalType, setModalType] = useState('') /* modal type */
  const [modalDataId, setModalDataId] = useState('') /* modal dataId */

  /* set login error when validation is carried out in a modal */
  function loginStatusHandler(e){
    setLoginError(e)
  }

  /* screen render/display */
  if(loadScreen===undefined) {
    //return null;
  };
  if(loginError===true){
    return <Redirect to='/student/login'/>
  }
  return(
    <DashboardBody>
      {(show & documentList!=='') ?
        <UploadDocumentModal
          showModal={show}
          closeModalAction={handleClose}
          type={modalType}
          dataId={modalDataId}
          loginErrorStatus={loginStatusHandler}
          fetchDocumentData={getDocumentHandler}
        />:''
      }

      <div className="title">
        <span className='text'><IoIosCloudUpload/> Uploads</span>            
      </div>
      <div className='card'>
      {loadScreen ?
        <>
          <div className='card-title'>Uploads Files</div>
          <div className='card-body'>
          <div className=''>
            <div className='upload-documents-card-body'>
                <Formik
                  initialValues={{ 
                      fileDetails:'',
                      fileCategory: ''
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    fileDetails: Yup.mixed().required('Select a document'),
                    fileCategory: Yup.string().required('Select the name of document')
                  })}
                  onSubmit={(values, { setSubmitting }) => {     
                    setTimeout(() => {
                      uploadDocumentHandler(values,setSubmitting)
                    }, 400);
                  }}
                >
                {({isSubmitting, setFieldValue}) => (
                <Form>
                  {uploadDocFormFeedback &&
                    <div className={`form-feedback-message ${uploadDocFormData.error ? 'text-danger':'text-success '}`}>
                      {uploadDocFormData.message}
                    </div>
                  }
                  <div className='row'>
                    <div className="form-group col-sm-12 col-md-4">
                      <input type="file" className="form-control-file" id='fileDetails' name='fileDetails'
                        onChange={(event) =>{
                          setFieldValue('fileDetails', event.currentTarget.files[0]);
                        }}
                      />
                      <div className="form-error">
                        <ErrorMessage name="fileDetails"/>
                      </div> 
                                  
                    </div>
                    <div className="form-group col-sm-12 col-md-4">
                      <Field as='select' className="form-control" name='fileCategory' id='fileCategory'>
                        <option value=''>-select document-</option>
                        <option value='schoolCert'>School Certificate</option>
                        <option value='birthCert'>Birth Certificate</option>
                      </Field>
                      <div className="form-error">
                        <ErrorMessage name="fileCategory"/>
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
            <div className='row'>
            {documentList && 
              <div className='table-responsive'>
                <table className='table table-hover table-sm table-bordered'>
                  <thead className='thead-light'>
                    <tr>
                      <th className=''>No.</th>
                      <th className=''>File</th>
                      <th className=''>View</th>
                      <th className=''>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {documentList.map((docs,index) =>{
                    return(
                      <tr key={docs.id}>
                        <td>{index + 1}</td>
                        <td>{docs.fileCategory}</td>
                        <td>
                          <div className='docs-action'
                            // onClick={()=>{
                            //   axios({
                            //     url:`http://localhost/school-reg/src/uploadedDocs/`+docs.fileName, 
                            //     method: 'POST',
                            //     headers: {
                            //       'Content-Type': 'application/json'
                            //     },
                            //     responseType: 'blob',
                            //   }).then(res => {
                            //     fileDownload(res.data, docs.fileCategoryName);
                            //   });
                            // }}
                          >
                            <a href={`http://localhost/school-reg/src/uploadedDocs/`+docs.fileName}>Download</a>
                          </div>
                        </td>
                        <td>
                          <div className='docs-action'
                            onClick={()=>{
                              setModalType('delete-document')/* set modalType */
                              handleShow();
                              setModalDataId(docs.id)
                            }}
                          >Delete</div>
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            }
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