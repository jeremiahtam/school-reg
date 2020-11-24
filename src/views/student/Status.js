import React, { useEffect, useState } from 'react'
import DashboardBody from '../../components/DashboardBody'
import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'
import {Redirect} from "react-router-dom";
import {IoMdInformationCircle} from "react-icons/io";

function Status(){
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

  /* screen render/display */
  if(loadScreen===undefined) {
    return null;
  };
  if(loginError===true){
    return <Redirect to='/student/login'/>
  }
  return(
    <DashboardBody>
      <div className="title">
        <span className='text'><IoMdInformationCircle/> Status</span>            
      </div>
      <div className='card'>
        <div className='card-title'>Admission Status</div>
        <div className='card-body'>
          <div className='education-card-body'>
          
          </div>
        </div>              
      </div>
    </DashboardBody>
  )
}
export default Status;