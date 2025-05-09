import axios from 'axios'

const API_URL = 'http://localhost:8090/api/v1'

export async function loginService(data)
{
    try 
    {

        const url = `${API_URL}/login`

        const body = {
                   'username' : data.username,
                   'password' : data.password
        }
    
        const response = await axios.post(url,body);      
    
        return response.data;
    }
    catch(e)
    {
        console.log('Exception occurred');
        console.log(e);
    }


}
export async function registerService(data){
try {
    const url= `${API_URL}/register`;
    const body={'name':data.name,'email':data.email,'password':data.password};
    const response=await axios.post(url,body);
    return response.data;

} catch (e) {
    console.log('Exception occurred');
    console.log(e);
}
}