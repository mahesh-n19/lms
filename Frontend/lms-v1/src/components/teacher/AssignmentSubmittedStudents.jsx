import React, { useEffect, useState } from 'react'
import { getSubmittedAssignmentStudentDetailsService } from '../../service/AssignmentService';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AssignmentSubmittedStudents() {

    const {id,assignmentid} = useParams();
     const [submittedAssignment, setSubmittedAssignment] = useState([]);

     const handleAccept = (data)=>{
            console.log(data);
     }
    
    const actionBodyTemplate = (rowData) => {
      return (
              <div className="d-flex gap-2">
                <button className="btn btn-success btn-sm" onClick={() => handleAccept(rowData)}>View</button>
              </div>
            );
    };

    const getSubmittedAssignmentStudentDetails = async ()=>{
    
        const result = await getSubmittedAssignmentStudentDetailsService(assignmentid);
        
        console.log("Submitted students : ",result.data);
        setSubmittedAssignment(result.data);
    
      }

      useEffect(()=>{

        getSubmittedAssignmentStudentDetails();

      },[]);


  return (
    <div className='mt-5'>
        
        <DataTable 
            value={submittedAssignment}
            stripedRows
            showGridlines
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage='No teachers registered yet'
            className='p-datatable-sm'>

            <Column field="name" header="Name" sortable></Column>
            <Column field="submissionDate" header="Submitted On" sortable></Column>
            <Column header="View" body={actionBodyTemplate}></Column>
        </DataTable>

    </div>
  )
}
