import React from 'react'
import DashboardBody from '../../components/DashboardBody'
import {IoMdClipboard} from "react-icons/io";

function Summary(){
return(
  <DashboardBody>
  <div className="title">
    <span className='text'><IoMdClipboard/> Summary</span>            
  </div>
  <div className='card'>
    <div className='card-title'>Application Summary</div>
    <div className='card-body'>
      <div className='education-card-body'>
      
      </div>
    </div>              
  </div>
</DashboardBody>
)
}
export default Summary;