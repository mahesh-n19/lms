import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Render from './components/landing/render'
import {Routes,Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AuthProvider from './context/AuthContext'
import RouteGuard from './context/routeGuard'
import AdminRender from './components/admin/AdminRender'
import UserRender from './components/user/UserRender'
import Dashboard from './components/user/Dashboard'
import JoinClassroom from './components/user/JoinClassroom'

import AdminDashboard from './components/admin/AdminDashboard'
import AddTeacher from './components/admin/AddTeacher'
import TeacherRender from './components/teacher/TeacherRender'


import TeacherDashboard from './components/teacher/TeacherDashboard'
import CreateClassroom from './components/teacher/CreateClassroom'

function App() {
 

  return (
    <>
  <AuthProvider>
      <Routes>

        <Route path='/' element={ <Navigate to='/login' /> } />
        <Route path='/login' element={ <Render /> }/>

        
            
            <Route path='/admin' element={<RouteGuard allowedRoles={['ROLE_ADMIN']}>
                  <AdminRender />
                </RouteGuard>}>

                <Route path='' element={<AdminDashboard />} />
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='add-teacher' element={<AddTeacher />} />
                <Route path='*' element={<AdminDashboard />} />
            </Route>


            <Route path='/user' element={<RouteGuard allowedRoles={['ROLE_USER']}>
                  <UserRender />
                </RouteGuard>}>
                <Route path='' element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='join-classroom' element={<JoinClassroom />} />
                <Route path='*' element={<Dashboard />} />

            </Route>


            <Route path='/teacher' element={<RouteGuard allowedRoles={['ROLE_TEACHER']}>
                  <TeacherRender />
                </RouteGuard>}>
                <Route path='' element={<TeacherDashboard />} />
                <Route path='dashboard' element={<TeacherDashboard />} />
                <Route path='create-classroom' element={<CreateClassroom />} />
                <Route path='*' element={<Dashboard />} />

            </Route>
        

      </Routes>
    </AuthProvider>
      
    </>
  )
}

export default App
