import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getStudentDetailsNotSubmittedAssignmentByAssignmentIdService } from '../../service/AssignmentService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function AssignmentNotSubmittedStudents() {

    const {id,assignmentid} = useParams();
    const [notSubmittedAssignment, setNotSubmittedAssignment] = useState([]);

    // getStudentDetailsNotSubmittedAssignmentByAssignmentIdService

    const getStudentDetailsNotSubmittedAssignmentByAssignmentId = async ()=>{

        const result = await getStudentDetailsNotSubmittedAssignmentByAssignmentIdService(id,assignmentid);

        // console.log("Students not submitted assignments : ",result.data);

        setNotSubmittedAssignment(result.data);

    }

    useEffect(()=>{

        getStudentDetailsNotSubmittedAssignmentByAssignmentId();

    },[]);

  return (
    <div className='mt-5'>
      <DataTable 
                  value={notSubmittedAssignment}
                  stripedRows
                  showGridlines
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  emptyMessage='No rcords yet'
                  className='p-datatable-sm'>
      
                  <Column field="name" header="Name" sortable></Column>
                  <Column field="email" header="Email" sortable></Column>
                  
              </DataTable>
    </div>
  )
}
