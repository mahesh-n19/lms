import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='teacher-sidebar'>
      
      <ul>
          <li>
            
            <NavLink to='/teacher/dashboard'>Dashboard</NavLink>
            
          </li>
          <li>
            <NavLink to='/teacher/create-classroom'>Create Classroom</NavLink>
          </li>
         
        </ul>

    </div>
  )
}
