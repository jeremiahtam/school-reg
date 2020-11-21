import React, { useEffect } from 'react'
import DashboardBody from '../../components/DashboardBody'
import {TokenConfirmation} from '../../functions/TokenConfirmation'
import {useHistory} from "react-router-dom";
import {IoMdInformationCircle} from "react-icons/io";

function Status(){
  const history = useHistory();
  /* check if the student token is still relevent */
  useEffect(() => {
    TokenConfirmation('student').then(data=>{
      if (data.error===true){
        return history.push('/student/login')
      }
    })

  }, [history])
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