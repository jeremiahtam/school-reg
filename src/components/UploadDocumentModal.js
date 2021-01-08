import React, { useCallback} from 'react'
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {Button, Modal} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import {tokenConfirmationHandler} from '../functions/tokenConfirmationHandler';
import axios from 'axios'

function UploadDocumentModal(props) {
  const itemId = props.dataId; //id of item selected to be edited or deleted

  /* destructure props for some dependencies */
  const {loginErrorStatus,closeModalAction, fetchDocumentData} = props;

  /* Submit  the values to database*/
  const submitDocumentInfo = useCallback(async(values,setSubmitting)=>{
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
      setSubmitting(false);
      return resData
    }catch(error){
      setSubmitting(false);
      return {
        'error':true,
        'message':'Fetch Error: '+error
      };
    }

  },[])

  /* Delete Document Handler */
  const deleteDocumentHandler = useCallback(async(setSubmitting)=>{
    const tokenData = await tokenConfirmationHandler('student');
    loginErrorStatus(tokenData.error);//send login error status to UploadDocument page
    if(tokenData.error===false){
      const values = {
          'studentId' : tokenData.info.data.id,
          'deleteId' : itemId,
          'actionType' : 'delete-education-entry'
      };
      const submitResData = await submitDocumentInfo(values,setSubmitting)
      //if no error, fetch the new data 
      if(submitResData.error===false){
        fetchDocumentData();        
      }
      console.log(submitResData)
    }
    setSubmitting(false);
    closeModalAction()
  },[loginErrorStatus,submitDocumentInfo,itemId, fetchDocumentData,closeModalAction])

  switch(props.type){
    case 'delete-document':
      return (
        <Modal show={props.showModal} onHide={props.closeModalAction}>
        {itemId?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delete Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this entry?
            </Modal.Body>
            <Modal.Footer>
              <Formik
                initialValues={{}}
                enableReinitialize={true}
                validationSchema={Yup.object({})}
                onSubmit={( values, { setSubmitting }) => {                    
                  setTimeout(() => {
                    //alert(values)
                    deleteDocumentHandler(setSubmitting);
                  }, 400);
                }}
              >
                {({
                  isSubmitting
                }) => (
                  <Form>
                    <Button variant="btn-light" onClick={props.closeModalAction}>
                      Close
                    </Button>

                    <Button type='submit' variant="primary">
                    {isSubmitting? 
                      <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>   
                      <span> Processing..</span> 
                      </>
                      :
                      "Delete"
                    }
                    </Button>
                  </Form>
                )
              }
              </Formik> 
            </Modal.Footer>
          </>
          :
          <span className="spinner-border spinner-border-sm modal-spinner" role="status" aria-hidden="true"></span>   
        }
        </Modal>
      )
    default:

    return(
      <div></div>
    )
  }
}

export default UploadDocumentModal
