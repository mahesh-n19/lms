import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassroomDetailsByClassroomIdService } from "../../service/ClassroomService";

export default function Classroom() {
  const { id } = useParams();
  const [classroomDetails,setClassroomDetails]=useState();
  const getClassroomDetails = async () =>{
    const result=await  getClassroomDetailsByClassroomIdService(id);
    setClassroomDetails(result.data);
    console.log(result);
  }
  useEffect(() => {
    getClassroomDetails();
  }, []);
  return (
    <div>
      <h2>{classroomDetails?.title} - {classroomDetails?.classRoomCode}</h2>
      <h4>{classroomDetails?.description}</h4>
    </div>
  );
}
