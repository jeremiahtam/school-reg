import React, { useState, useEffect } from 'react'
import {IoMdSchool} from "react-icons/io";
import DashboardBody from '../../components/DashboardBody'
import EducationModal from '../../components/EducationModal'
import {educationData} from '../../data/education'
import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'
import {Redirect} from "react-router-dom";

function Education(){
  /* validate login token */
  const [loadScreen, setLoadScreen] = useState();
  const [loginError, setLoginError] = useState();
  /* check if the student token is still relevent */
  useEffect(() => {
    tokenConfirmationHandler('student').then(data=>{
      setLoginError(data.error)
      if(data.error===true){
        setLoadScreen(false)
      }else{
        setLoadScreen(true)
      }
    })
  }, [])
  /* modal functionality */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)   
  }
  /* modal type */
  const [modalType, setModalType] = useState('')
  /* modal dataId */
  const [modalDataId, setModalDataId] = useState('')

  /* screen render/display */
  if(loadScreen===undefined) {
    //return null;
  };
  if(loginError===true){
    return <Redirect to='/student/login'/>
  }
  return(
    <DashboardBody>
      <EducationModal
        showModal={show}
        closeModalAction={handleClose}
        type={modalType}
        dataId={modalDataId}
      />
      <div className="title">
        <span className='text'><IoMdSchool/> Education</span>            
      </div>
      <div className='card'>
        {loadScreen ?
        <>
        <div className='card-title'>Education History</div>
        <div className='card-body'>
          <div className='education-card-body'>
            <div className='row'>
              <button onClick={
                  ()=>{
                    setModalType('add-education')/* set modalType */
                    handleShow();
                  }
                } 
                className='add-button btn btn-sm btn-outline-dark' data-toggle='modal' data-target='#modal'>Add</button>
            </div>
            <div className='row'>
              <div className='table-responsive'>
                <table className='table table-hover table-sm table-bordered'>
                  <thead className='thead-light'>
                    <tr>
                      <th className=''>No.</th>
                      <th className=''>School Name</th>
                      <th className=''>Start Date</th>
                      <th className=''>End Date</th>
                      <th className=''>Edit</th>
                      <th className=''>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationData.map((edu,index) =>{
                      return(
                        <tr key={edu.id}>
                          <td>{index + 1}</td>
                          <td>{edu.schoolName}</td>
                          <td>{edu.startDate}</td>
                          <td>{edu.endDate}</td>
                          <td><div onClick={
                            ()=>{
                              handleShow();
                              setModalType('edit-education')
                              setModalDataId(edu.id)
                            }
                          }>Edit</div></td>
                          <td><div onClick={
                            ()=>{
                              handleShow();
                              setModalType('delete-education')
                              setModalDataId(edu.id)
                            }
                          }>Delete</div></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

              </div>
                    
            </div>
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
export default Education;