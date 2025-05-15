import React from 'react'
import { useParams } from 'react-router-dom'

export default function Classroom() {

    const {id} = useParams();

  return (
    <div>
        <h2>Classroom - {id}</h2>
    </div>
  )
}
