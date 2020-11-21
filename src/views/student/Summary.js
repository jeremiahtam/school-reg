import React,{useEffect} from 'react'
import {useHistory} from "react-router-dom";
import DashboardBody from '../../components/DashboardBody'
import {IoMdClipboard} from "react-icons/io";
import {TokenConfirmation} from '../../functions/TokenConfirmation'

function Summary(){
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