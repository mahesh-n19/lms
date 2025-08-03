import axios from 'axios';

const API_URL = 'http://localhost:8091/api/v1'


export async function getAssignmentsByClassroomIdService(id)
{

    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/classroom-assignment/${id}`;


        const response = await axios.get(url,  {
              headers: {
                'Authorization' : `Bearer ${token}`
                },
            });

            // console.log("API Response : ",response);
            // console.log("API DATA  : ",response.data);
            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}

export async function getStudentAssignmentsByClassroomIdService(id){
    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/assignments/${id}`;


        const response = await axios.get(url,  {
              headers: {
                'Authorization' : `Bearer ${token}`
                },
            });

            // console.log("API Response : ",response);
            // console.log("API DATA  : ",response.data);
            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }


}


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

export async function submitStudentAssignmentService(data)
{
    try{

            const token = sessionStorage.getItem('token');
            const url= `${API_URL}/submit-assignment`;

            const response = await axios.post(url,data, {
                headers : {
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


export async function getSubmittedAssignmentStatusService(id)
{
    try{

            const token = sessionStorage.getItem('token');
            const url= `${API_URL}/submitted-assignment-status/${id}`;

            const response = await axios.get(url, {
                headers : {

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


export async function getAssignmentDetailsByAssignmentIdService(id)
{

    // console.log("API Hittt ");
    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/assignment/${id}`;


        const response = await axios.get(url,  {
              headers: {
                'Authorization' : `Bearer ${token}`
                },
            });

            // console.log("API Response : ",response);
            // console.log("API DATA  : ",response.data);
            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}


export async function getSubmittedAssignmentStudentDetailsService(id)
{


    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/submitted-assignments/${id}`;


        const response = await axios.get(url,  {
              headers: {
                'Authorization' : `Bearer ${token}`
                },
            });

           
            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}


export async function getStudentDetailsNotSubmittedAssignmentByAssignmentIdService(id,assignmentId)
{


    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/not-submitted-student/${id}/${assignmentId}`;


        const response = await axios.get(url,  {
              headers: {
                'Authorization' : `Bearer ${token}`
                },
            });

           
            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}

export async function getStudentDetailsWhoseAssignmentIsGradedByAssignmentIdService(id)
{


    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/graded-student/${id}`;


        const response = await axios.get(url,  {
              headers: {
                'Authorization' : `Bearer ${token}`
                },
            });

           
            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}