import React from 'react'
import { useParams } from 'react-router-dom'

export default function Students() {

    const {id} = useParams();

  return (
    <div>
        <h3>Enrolled Students - {id}</h3>
    </div>
  )
}
