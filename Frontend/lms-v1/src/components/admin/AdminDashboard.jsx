import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import {
  getAllTeacherService, 
  getAllStudentsService,
  getAllClassroomsService,
  getAllAssignmentsService
} from '../../service/AdminService'; 
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export default function AdminDashboard() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount,setStudentCount] =useState(0);
  const [classroomCount,setClassroomCount] =useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);


  useEffect(() => {
    const fetchData = async () =>{
      try{
        const [teachers,students,classrooms,assignments]=await Promise.all([
           getAllTeacherService(),
           getAllStudentsService(),
           getAllClassroomsService(),
           getAllAssignmentsService()
        ]);
      setTeacherCount(teachers.length);
      setStudentCount(students.length);
      setClassroomCount(classrooms.length);
      setAssignmentCount(assignments.length);
    }
    catch(error){
      console.error("error fetching dashboard data",error);
    }
  };
  fetchData();
  },[]);

  const recentTeachers = [
    { name: 'Mr. Sharma', subject: 'Math' },
    { name: 'Ms. Kavita', subject: 'Science' },
    { name: 'Mr. Ajay', subject: 'English' }
  ];

  const teacherRegistrationData = [
    { month: 'Jan', teachers: 2 },
    { month: 'Feb', teachers: 5 },
    { month: 'Mar', teachers: 3 },
    { month: 'Apr', teachers: 6 },
    { month: 'May', teachers: 4 },
    { month: 'Jun', teachers: 8 }
  ];

  return (
    <div className="admin-dashboard container-fluid py-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      {/* Top Stat Cards */}
      <div className="row g-4 mb-4">
        <StatCard title="Total Teachers" value={teacherCount} color="primary" />
        <StatCard title="Total Students" value={studentCount} color="success" />
        <StatCard title="Total Classrooms" value={classroomCount} color="info" />
        <StatCard title="Total Assignments" value={assignmentCount} color="warning" />
      </div> 
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="col-md-3">
      <div className={`card stat-card border-${color} shadow-sm`}>
        <div className="card-body text-center">
          <h6 className="text-muted">{title}</h6>
          <h2 className={`text-${color}`}>{value}</h2>
        </div>
      </div>
    </div>
  );
}
