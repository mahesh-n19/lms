import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { getAssignmentDetailsByAssignmentIdService, getSubmittedAssignmentStudentDetailsService } from '../../service/AssignmentService';

export default function ViewAssignment() {

  const {id,assignmentid} = useParams();

  const [assignment,setAssignment] = useState({});

 

 


  useEffect(()=>{

    const getAssigmentDetailsByAssignmentId = async ()=>{

      const result = await getAssignmentDetailsByAssignmentIdService(assignmentid);

      setAssignment(result);

    }

    getAssigmentDetailsByAssignmentId();
  

  },[]);

  return (
    <div className='view-assignment-container'>
          <div className='container'>
              <h3>Title : {assignment.title}</h3>
              <p>Description : {assignment.description}</p>
              <p>Due Date : {assignment.dueDate}</p>
              <p>Max Marks : {assignment.marks}</p>

              <a href={`http://localhost:8093/api/v1/download-assignment/${assignmentid}`}>
                
                <img src="/icons/pdf-icon.png"  width="50px" height="50px"/> Assignment.pdf

              </a>
          </div>

          <div className='container'> 
            <div  style={{display:"flex", gap:"15px"}}>
              <NavLink className='btn btn-primary' to={`/teacher/classroom/${id}/view-assignment/${assignmentid}`}>Submitted</NavLink>
              <NavLink className='btn btn-danger' to={`/teacher/classroom/${id}/view-assignment/${assignmentid}/not-submitted`}>Not Submitted</NavLink>
              <NavLink className='btn btn-warning' to={`/teacher/classroom/${id}/view-assignment/${assignmentid}/graded`}>Graded</NavLink>
            </div>
              <Outlet />

          </div>
            

            {/* {assignment} */}

    </div>
  )
}

