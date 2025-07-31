import React from 'react'
import { useParams } from 'react-router-dom';

export default function StudentClassroom() {

    const { id } = useParams();

  return (
    <div>
            <h2>Classroom - {id}</h2>
    </div>
  )
}
