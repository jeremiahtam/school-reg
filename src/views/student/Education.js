import React, { useState, useEffect } from 'react'
import {IoMdSchool} from "react-icons/io";
import DashboardBody from '../../components/DashboardBody'
import ModalComp from '../../components/ModalComp'
import {educationData} from '../../data/education'
import {TokenConfirmation} from '../../functions/TokenConfirmation'
import {useHistory} from "react-router-dom";

function Education(){
  const history = useHistory();
  /* check if the student token is still relevent */
  useEffect(() => {
    TokenConfirmation('student').then(data=>{
      if (data.error===true){
        return history.push('/student/login')
      }
    })

  }, [history])
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

  return(
    <DashboardBody>
      <ModalComp
        showModal={show}
        closeModalAction={handleClose}
        type={modalType}
        dataId={modalDataId}
      />
      <div className="title">
        <span className='text'><IoMdSchool/> Education</span>            
      </div>
      <div className='card'>
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
      </div>
    </DashboardBody>
  )
}
export default Education;