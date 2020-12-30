import React from 'react'
import TopNav from "./TopNav"
import SideBarNav from "./SideBarNav"
import {useSelector} from 'react-redux'

const DashboardBody = (props) => {
  const navToggleClass = useSelector(state=>state.navToggle.navbarClass)
  return (
    <div className={"wrapper"}>
      <SideBarNav/>
    <div id="content" className={navToggleClass}>
      <TopNav/>
          {props.children}
      </div>      
    </div>
  );
};

export default DashboardBody;