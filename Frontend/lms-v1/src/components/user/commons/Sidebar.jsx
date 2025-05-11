import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='user-sidebar'>
        <ul className='sidebar-ul'>
          
          <li className='sidebar-li'>
            <img className='sidebar-icons' src='/icons/dashboard.png'/> 
            <NavLink to='/user/dashboard'>Dashboard</NavLink>
          </li>

          <hr />

          <li className='sidebar-li'>
            <img className='sidebar-icons' src='/icons/add.png'/>  
            <NavLink to='/user/join-classroom'>Join Classroom</NavLink>
          </li>

          <hr />
         
        </ul>
    </div>
  )
}
