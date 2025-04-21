import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='user-sidebar'>
        <ul>
          <li>
            
            <NavLink to='/user/dashboard'>Dashboard</NavLink>
            
          </li>
          <li>
            <NavLink to='/user/join-classroom'>Join Classroom</NavLink>
          </li>
         
        </ul>
    </div>
  )
}
