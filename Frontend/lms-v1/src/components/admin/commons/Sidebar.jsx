import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='admin-sidebar'>
      
      <ul>
          <li>
            <NavLink to='/admin/dashboard' >Dashboard</NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-teacher' >Add Teacher</NavLink>
          </li> 
          <li>
            <NavLink to='/admin/view-teacher' >View Teacher</NavLink>  
          </li> 
      </ul>

    </div>
  )
}
