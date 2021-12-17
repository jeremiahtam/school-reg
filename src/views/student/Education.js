import React, { useState, useEffect, useCallback } from 'react'
import { IoMdSchool } from "react-icons/io";
import DashboardBody from '../../components/DashboardBody';
import EducationModal from '../../components/EducationModal';
import { tokenConfirmationHandler } from '../../functions/tokenConfirmationHandler';
import { Redirect } from "react-router-dom";
import { fetchEducationData } from '../../store/actions/education'
import { useDispatch, useSelector } from 'react-redux'

function Education() {

  const dispatch = useDispatch();
  const userEduData = useSelector((state) => state.education.educationData); //get all edu data of user
  const studentEduData = userEduData.data;
  /* validate login token */
  const [loadScreen, setLoadScreen] = useState();
  const [loginError, setLoginError] = useState();

  /* check if the student login token is still relevent */
  useEffect(() => {
    tokenConfirmationHandler('student').then(data => {
      setLoginError(data.error)
      if (data.error === true) {
        setLoadScreen(false)
      } else {
        setLoadScreen(true)
        /* get all education info of user on initial login */
        dispatch(fetchEducationData(data.info.data.id))
      }
    })
    //cleanup function
    return () => {
      setLoadScreen(true)
    };
  }, [dispatch])

  /* modal functionality */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)

  const handleShow = () => {
    setShow(true)
  }

  const [modalType, setModalType] = useState() /* modal type */
  const [modalDataId, setModalDataId] = useState() /* modal dataId */

  /* Modal data handler*/
  const modalDataHandler = useCallback((_dataId, _modalType) => {
    handleShow()
    setModalDataId(_dataId)
    setModalType(_modalType)
    console.log(`${_dataId} ${_modalType}`)
  },[setModalType, setModalDataId])

  /* set login error when validation is carried out in a modal */
  function loginStatusHandler(e) {
    setLoginError(e)
  }
  /* screen render/display */
  if (loadScreen === undefined) {
    //return null;
  };
  if (loginError === true) {
    return <Redirect to='/student/login' />
  }
  return (
    <DashboardBody>
      {(show & userEduData !== '') ?
        <EducationModal
          showModal={show}
          closeModalAction={handleClose}
          type={modalType}
          dataId={modalDataId}
          allEduData={studentEduData ? studentEduData : ''}
          loginErrorStatus={loginStatusHandler}
        /> : ''
      }
      <div className="title">
        <span className='text'><IoMdSchool /> Education</span>
      </div>
      <div className='card'>
        {loadScreen ?
          <>
            <div className='card-title'>Education History</div>
            <div className='card-body'>
              <div className='education-card-body'>
                <div className='row'>
                  <button onClick={() => {
                    setModalType('add-education')/* set modalType */
                    handleShow();
                  }
                  }
                    className='add-button btn btn-sm btn-outline-primary' data-toggle='modal'
                    data-target='#modal'>
                    Add
                  </button>
                </div>
                <div className='row'>
                  {studentEduData &&
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
                          {studentEduData.map((edu, index) => {
                            return (
                              <tr key={edu.id}>
                                <td>{index + 1}</td>
                                <td>{edu.schoolName}</td>
                                <td>{edu.startDate}</td>
                                <td>{edu.endDate}</td>
                                <td><div className='edu-action'
                                  onClick={() =>
                                    modalDataHandler(edu.id, 'edit-education')
                                  }>Edit</div></td>
                                <td><div className='edu-action'
                                  onClick={() => 
                                    modalDataHandler(edu.id, 'delete-education')
                                  }>Delete</div></td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>

                    </div>
                  }

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