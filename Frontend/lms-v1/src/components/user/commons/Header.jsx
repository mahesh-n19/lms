import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    sessionStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='user-header'>
      <img src="/logo.jpg" alt="LOGO" height="98px"/>

      <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}
