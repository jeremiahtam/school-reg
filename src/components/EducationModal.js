import React, { useState, useCallback } from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Button, Modal} from 'react-bootstrap'
import DatePickerField from "./DatePickerField";
import "react-datepicker/dist/react-datepicker.css";
import {tokenConfirmationHandler} from '../functions/tokenConfirmationHandler';
import axios from 'axios'

function EducationModal(props) {
  const allEduData = props.allEduData; // all the user's education data inputed [array]
  const itemId = props.dataId; //id of item selected to be edited or deleted
  const itemData = allEduData.find(i =>itemId === i.id); //full info of the selected item [object]

  /* date selector states */
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  const {loginErrorStatus} = props;
  /* send data to database */
  const addEducationHandler = useCallback(async(values, setSubmitting)=>{
    const tokenData = await tokenConfirmationHandler('student');
    /* send login error status to Education page */
    loginErrorStatus(tokenData.error);
    if(tokenData.error===false){
      values = {...values,...{
          'studentId' : tokenData.info.data.id,
          'actionType' : 'add-education-entry'
        }
      };
      try{
        const res = await axios({
          url:'http://localhost/school-reg/src/api/education-action.php',
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
  },[loginErrorStatus])

  switch(props.type){
    case 'add-education':      
      return (
        <Modal show={props.showModal} onHide={props.closeModalAction}>
          <Modal.Header closeButton>
            <Modal.Title>Add Education</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={
              { 
                schoolName:'' ,
                startDate:'',
                endDate: ''
              }
            }
            enableReinitialize={true}
            validationSchema={Yup.object({
              schoolName: Yup.string().required('Enter the school name'),
              startDate: Yup.string().required('Enter start date'),
              endDate: Yup.string().required('Enter graduation date')
            })}
            onSubmit={(values, { setSubmitting }) => {     
              setTimeout(() => {
                addEducationHandler(values,setSubmitting)
              }, 400);
            }
          }
        >
        {({
          isSubmitting
        }) => (
          <Form method="POST" id="add-education-form" className="add-education-form" name="add-education-form">
            <Modal.Body>
              <div className=''>
                <div className="form-group">
                  <label className='modal-form-label'>Name of school</label>
                  <Field name="schoolName" disabled={isSubmitting} type='text' className="form-control" placeholder="School Name"/>
                  <div className="form-error">
                    <ErrorMessage name="schoolName" />  
                  </div>            
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label className='modal-form-label'>Start Date</label>
                    <DatePickerField 
                      name="startDate" disabled={isSubmitting} type="text" className="form-control" 
                      placeholderText="DD/MM/YYYY"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      maxDate={new Date()}
                    />  
                    <div className="form-error">
                      <ErrorMessage name="startDate" />  
                    </div>            
                  </div>
                  <div className="form-group col-sm-6">
                    <label className='modal-form-label'>End Date</label>
                    <DatePickerField 
                      name="endDate" disabled={isSubmitting} type="text" className="form-control" 
                      placeholderText="DD/MM/YYYY"
                      selected={endDate}
                      onChange={date => setEndDate(date)}
                      maxDate={new Date()}
                    />
                    <div className="form-error">
                      <ErrorMessage name="endDate" />  
                    </div>            
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className='btn btn-light' onClick={props.closeModalAction} type=''>
                Close
              </Button>
              <button 
                className="btn btn-primary" 
                type="submit" 
                disabled={isSubmitting}
              >
              {isSubmitting ?
              (
                <>
                  <span className="spinner-border spinner-border" role="status" aria-hidden="true"></span>   
                  <span> Processing..</span> 
                </>
              ):(" Edit Entry")}              
              </button>
            </Modal.Footer>
          </Form>
          )}
          </Formik>      
        </Modal>
      )
      case 'edit-education':

        return (
          <Modal show={props.showModal} onHide={props.closeModalAction}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Education</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={
                { 
                  schoolName: itemData ? itemData.schoolName :'' ,
                  startDate: itemData ? itemData.startDate:'',
                  endDate: itemData ? itemData.endDate:''
                  }}
                validationSchema={Yup.object({
                  schoolName: Yup.string().required('Enter the school name'),
                  startDate: Yup.string().required('Enter start date'),
                  endDate: Yup.string().required('Enter graduation date')
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
              <Form method="POST" id="edit-education-form" className="edit-education-form" name="edit-education-form">
                <Modal.Body>
                  <div className=''>
                    <div className="form-group">
                      <label className='modal-form-label'>Name of school</label>
                      <Field name="schoolName" disabled={isSubmitting} type='text' className="form-control" placeholder="School Name"
                      />
                      <div className="form-error">
                        <ErrorMessage name="schoolName" />  
                      </div>            
                    </div>

                    <div className="form-row">
                      <div className="form-group col-sm-6">
                        <label className='modal-form-label'>Start Date</label>
                        <DatePickerField 
                          name="startDate" disabled={isSubmitting} type="text" className="form-control" 
                          placeholderText="DD/MM/YYYY"
                          selected={startDate}
                          onChange={date => setStartDate(date)}
                          maxDate={new Date()}
                        />  
                        <div className="form-error">
                          <ErrorMessage name="startDate" />  
                        </div>            
                      </div>
                      <div className="form-group col-sm-6">
                        <label className='modal-form-label'>Start Date</label>
                        <DatePickerField 
                          name="endDate" disabled={isSubmitting} type="text" className="form-control" 
                          placeholderText="DD/MM/YYYY"
                          selected={endDate}
                          onChange={date => setEndDate(date)}
                          maxDate={new Date()}
                        />
                        <div className="form-error">
                          <ErrorMessage name="endDate" />  
                        </div>            
                      </div>
                    </div>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button className='btn btn-light' onClick={props.closeModalAction} type=''>
                    Close
                  </Button>
                  <button 
                    className="btn btn-primary" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                  {isSubmitting ?
                  (
                    <>
                      <span className="spinner-border spinner-border" role="status" aria-hidden="true"></span>   
                      <span> Processing..</span> 
                    </>
                  ):(" Edit Entry")}              
                  </button>
                </Modal.Footer>

              </Form>
            )}
            </Formik>      
          </Modal>
        )
        case 'delete-education':
          return (
            <>
            <Modal show={props.showModal} onHide={props.closeModalAction}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Education Entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Are you sure you want to delete this entry?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModalAction}>
                  Close
                </Button>
                <Button variant="primary" onClick={props.closeModalAction}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            </>
          )
          default:
      return(
        <div></div>
      )

  }
}

export default EducationModal
