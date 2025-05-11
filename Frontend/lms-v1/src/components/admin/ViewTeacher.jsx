import React, { useEffect, useState } from 'react'
import { getRegisteredTeacherService } from '../../service/AuthService';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'

export default function ViewTeacher() {

  const [teachers, setTeachers] = useState([]);

  useEffect(()=>{

    const fetchRegisteredTeachers = async () =>{
        
      const result = await getRegisteredTeacherService();

      setTeachers(result.data);
     
    }

    fetchRegisteredTeachers();
  },[]);

  return (
    <div>
        <h2>Registered Teachers </h2>


      <div className='container mt-5'>
          <DataTable value={teachers} stripedRows showGridlines size='small'
                      paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                      emptyMessage="No Teacher registered yet"  
          >
              <Column field="name" header="Name"  sortable ></Column>
              <Column field="email" header="Email ID" sortable ></Column>
          </DataTable>
        </div>
    </div>
  )
}
