import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getClassroomDetailsByClassroomIdService } from '../../service/ClassroomService';

export default function StudentClassroom() {

    const { id } = useParams();

    const [classroomDetails,setClassroomDetails]=useState();

    const getClassroomDetails = async () =>{
        const result=await  getClassroomDetailsByClassroomIdService(id);
        setClassroomDetails(result.data);
       
    }

    useEffect(()=>{

      getClassroomDetails();

    },[id]);

  return (
    <div>
            <div className="container classroom-details">
               <div >
                <h2>{classroomDetails?.title} - {classroomDetails?.classRoomCode}</h2>
                <h4>{classroomDetails?.description}</h4>
              </div>
            </div>
    </div>
  )
}
