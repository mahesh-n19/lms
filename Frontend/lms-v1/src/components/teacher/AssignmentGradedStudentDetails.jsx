import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getStudentDetailsWhoseAssignmentIsGradedByAssignmentIdService } from '../../service/AssignmentService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AssignmentGradedStudentDetails() {

    const {id,assignmentid} = useParams();
    const [gradedStudents, setGradedStudents] = useState([]);


    const getGradedStudentDetailsByAssignmentId = async ()=>{

        const result = await getStudentDetailsWhoseAssignmentIsGradedByAssignmentIdService(assignmentid);
        
        console.log("Graded students : ",result.data);
        setGradedStudents(result.data);
    }

    useEffect(()=>{

        getGradedStudentDetailsByAssignmentId();

    },[]);

  return (
    <div className='mt-5'>
            
        <DataTable 
            value={gradedStudents}
            stripedRows
            showGridlines
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage='No rcords yet'
            className='p-datatable-sm'
        >
                <Column field="name" header="Name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="marks" header="Marks" sortable></Column>
        </DataTable>

    </div>
  )
}
