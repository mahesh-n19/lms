import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPendingEnrollmentByClassroomIdService } from '../../service/StudentService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Students() {

    const {id} = useParams();

    const [pendingEnrollments,setPendingEnrollments] = useState([]);
    const statusBodyTemplate = (rowData) => {
    return rowData.status === 'D' ? 'Pending' : 
           rowData.status === 'R' ? 'Rejected' : rowData.status;
    };

    const actionBodyTemplate = (rowData) => {
      return (
    <div className="d-flex gap-2">
      <button className="btn btn-success btn-sm" onClick={() => handleAccept(rowData)}>Accept</button>
      <button className="btn btn-danger btn-sm" onClick={() => handleReject(rowData)}>Reject</button>
    </div>
  );
};

    useEffect(()=>{

      // getPendingEnrollmentByClassroomIdService

      
      const getPendingEnrollmentsByClassroomId = async ()=>{
            
        const result = await getPendingEnrollmentByClassroomIdService(id);
            
        console.log("Pending Enrollments : ",result.data);

        setPendingEnrollments(result.data);
      
            
      }
            
          getPendingEnrollmentsByClassroomId();

    },[]);

  return (
    <div>
        <h3>Enrolled Students - {id}</h3>

        <div className='container mt-5'>
                        <DataTable value={pendingEnrollments} stripedRows showGridlines size='small'
                                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                                    emptyMessage="No Pending enrollments"  
                        >
                            <Column field="studentName" header="Student Name"  sortable ></Column>
                            
                            <Column field="status" header="Status" sortable body={statusBodyTemplate}></Column>
                            <Column header="Action" body={actionBodyTemplate}></Column>
                        </DataTable>
        </div>

    </div>
  )
}
