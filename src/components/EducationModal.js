import React, { useState } from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {educationData} from '../data/education'
import {Button, Modal} from 'react-bootstrap'
import DatePickerField from "./DatePickerField";
import "react-datepicker/dist/react-datepicker.css";
 

function EducationModal(props) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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
                schoolName: '' ,
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
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
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
                      placeholderText="Start Date"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                    />  
                    <div className="form-error">
                      <ErrorMessage name="startDate" />  
                    </div>            
                  </div>
                  <div className="form-group col-sm-6">
                    <label className='modal-form-label'>Start Date</label>
                    <DatePickerField 
                      name="endDate" disabled={isSubmitting} type="text" className="form-control" 
                      placeholderText="End Date"
                      selected={endDate}
                      onChange={date => setEndDate(date)}
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
        /* Get information about the data to be edited */
        const editedData = educationData.find(data=>data.id === props.dataId)

        return (
          <Modal show={props.showModal} onHide={props.closeModalAction}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Education</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={
                { 
                  schoolName: '' ,
                  startDate:'',
                  endDate: '' 
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
                        value={editedData.schoolName}
                      />
                      <div className="form-error">
                        <ErrorMessage name="schoolName" />  
                      </div>            
                    </div>

                    <div className="form-row">
                      <div className="form-group col-sm-6">
                        <label className='modal-form-label'>Start Date</label>
                        <Field name="startDate" disabled={isSubmitting} type="text" className="form-control" placeholder="Start Date"
                          value={editedData.startDate}
                        />
                        <div className="form-error">
                          <ErrorMessage name="startDate" />  
                        </div>            
                      </div>
                      <div className="form-group col-sm-6">
                        <label className='modal-form-label'>Start Date</label>
                        <Field name="endDate" disabled={isSubmitting} type="text" className="form-control" placeholder="End Date"
                          value={editedData.endDate}
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
