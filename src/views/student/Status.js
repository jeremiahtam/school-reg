import React from 'react'
import DashboardBody from '../../components/DashboardBody'
import {IoMdInformationCircle} from "react-icons/io";

function Status(){
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