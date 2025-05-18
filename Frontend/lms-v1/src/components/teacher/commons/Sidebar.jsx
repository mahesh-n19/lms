import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { myCreatedClassroomService } from '../../../service/ClassroomService';

export default function Sidebar() {

  const {myClassroom,setMyClassroom, fetchSidebar,setFetchSidebar} = useAuth();

  // const [createClassroom, setCreatedClassroom] = useState([]);

  const myCreatedClassroom = async ()=>{

      const result = await myCreatedClassroomService();
      console.log("My Created classroom : ",result.data)

      setMyClassroom(result.data);
     

    }

  useEffect(()=>{

      myCreatedClassroom();

  },[fetchSidebar])

  return (
    <div className='teacher-sidebar'>
      
      <ul className='sidebar-ul'>
          <li className='sidebar-li'>
            <img className='sidebar-icons' src='/icons/dashboard.png'/> 
            <NavLink to='/teacher/dashboard'>Dashboard</NavLink> 
          </li>

          <hr />

          <li className='sidebar-li'>
            <img className='sidebar-icons' src='/icons/add.png'/> 
            <NavLink to='/teacher/create-classroom'>Create Classroom</NavLink>
          </li>

          <hr />

          {/* {JSON.stringify(myClassroom)} */}

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
               <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   <div className='my-classroom'>
                        <img src="/icons/classroom.png" alt="Classroom Icon" width="50px" /> 
                        <p>My Classroom</p>
                   </div>
                   
                </button>
              </h2>

              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">

                  <ul className='class-list-ul'>

                        {myClassroom.map((classroom)=>{

                          return <li className='class-list' key={classroom.classRoomId}>

                                    <img src="/icons/class.png" alt="Classroom" width="30px"/>
                                   <NavLink to={`/teacher/classroom/${classroom.classRoomId}`} >{classroom.classRoomCode} - {classroom.title} </NavLink>   
                                      
                                </li>

                        })}

                  </ul>    
                    
                </div>
              </div>

            </div>
          </div>
         
        </ul>

    </div>
  )
}
