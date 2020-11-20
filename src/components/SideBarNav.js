import React from 'react'
import {Link} from "react-router-dom";
import { IoIosHome, IoIosCloudUpload, IoMdSchool, IoMdClipboard, IoMdInformationCircle } from "react-icons/io";
import {useSelector} from 'react-redux'


const SideBarNav=(props)=> {

  const navToggleClass = useSelector(state=>state.navToggle.navbarClass)

  return(
    <nav id={"sidebar"} className={navToggleClass}>
      <div className="sidebar-header">
        <div className="sidebar-header-text">Welcome Baby</div>
      </div>      
      <ul className="list-unstyled components">
        <p>WELCOME </p>
        <li className=''>
          <Link to={'/student/personal-info'}> <IoIosHome/> Home</Link>
        </li>
        <li className=''>
          <Link to={"/student/education"}><IoMdSchool/> Education</Link>
        </li>
        <li className=''>
          <Link to="/student/upload-documents"><IoIosCloudUpload/> Upload Documents</Link>
        </li>
        <li className=''>
          <Link to="/student/summary"><IoMdClipboard/> Summary</Link>
        </li>
        <li className=''>
          <Link to="/student/status"><IoMdInformationCircle/> Status</Link>
        </li>
      </ul>
      <ul className="list-unstyled CTAs">
        <li>
          <Link to="#" className="logout">Logout</Link>
        </li>
      </ul>
    </nav>  
  )
}
export default SideBarNav