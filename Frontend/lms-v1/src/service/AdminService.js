import axios from 'axios';

const BASE_URL = 'http://localhost:8091/api/v1';

export const getAllCountsService = async () =>{
    // const response = await axios.get(`${BASE_URL}/get-count`);
    // return response.data;

    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${BASE_URL}/get-count`;


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
        return e.response;
    }

};

