import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api/v1';

export const getAllTeacherService = async () =>{
    const response = await axios.get(`${BASE_URL}/teachers`);
    return response.data;
};

export const getAllStudentsService = async ()=>{
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data;
}

export const getAllClassroomsService = async () => {
  const response = await axios.get(`${BASE_URL}/classrooms`);
  return response.data;
};

export const getAllAssignmentsService = async () => {
  const response = await axios.get(`${BASE_URL}/assignments`);
  return response.data;
};
