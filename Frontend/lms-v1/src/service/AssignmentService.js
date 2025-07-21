import axios from 'axios';

const API_URL = 'http://localhost:8091/api/v1'


export async function createAssignmentService(data)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/create-assignment`;

             
             const response = await axios.post(
              'http://localhost:8091/api/v1/create-assignment',
             data,
             {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            },
            })
            
             return response.data;

    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}

