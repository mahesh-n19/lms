import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='admin-sidebar'>
      
      <ul className='sidebar-ul'>
          <li className='sidebar-li'>

              <img className='sidebar-icons' src='/icons/dashboard.png'/> 
              <NavLink to='/admin/dashboard' >Dashboard</NavLink>

          </li>

          <hr />

          <li className='sidebar-li'>

              <img className='sidebar-icons' src='/icons/add.png'/>  
              <NavLink to='/admin/add-teacher' >Add Teacher</NavLink>
          </li> 

          <hr />

          <li className='sidebar-li'>
             <img className='sidebar-icons' src='/icons/eye.png'/>
            <NavLink to='/admin/view-teacher' >View Teacher</NavLink>  
          </li> 
      </ul>

    </div>
  )
}
