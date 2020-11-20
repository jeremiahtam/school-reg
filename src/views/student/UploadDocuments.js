import React from 'react'
import DashboardBody from '../../components/DashboardBody'
import {IoIosCloudUpload} from "react-icons/io";

function UploadDocuments(){
return(
  <DashboardBody>
  <div className="title">
    <span className='text'><IoIosCloudUpload/> Uploads</span>            
  </div>
  <div className='card'>
    <div className='card-title'>Uploads Files</div>
    <div className='card-body'>
      <div className='education-card-body'>
      
      </div>
    </div>              
  </div>
</DashboardBody>
)
}
export default UploadDocuments;