import React, { useEffect, useState } from "react";
import { getAllCountStudentDashboard } from "../../service/StudentService";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";



const Dashboard = () => {
  const COLORS = ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14', '#ffc107', '#20c997'];
 const [counts, setCounts] = useState({});
   const [studentName, setStudentName] = useState("");
 
   const getAllCount = async () => {
     try {
       const result = await getAllCountStudentDashboard();
       console.log("result : ", result.data);
 
       setCounts(result?.data);
 
       // Extract teacher name (extra key)
       const allowedKeys = ["assignments_count", "classrooms_count", "assignemt_marks"];
       const extraKeys = Object.keys(result.data).filter(
         (key) => !allowedKeys.includes(key)
       );
 
       console.log("This is teacher name: ", extraKeys);
 
       // Set the first extra key as teacher name
       if (extraKeys.length > 0) {
         setStudentName(extraKeys[0]);
       }
     } catch (error) {
       console.error("Error fetching count data", error);
     }
   };
 
   useEffect(() => {
     getAllCount();
   }, []);
  let teacherRegistrationData = [
  { month: "Jan", teachers: 10 },
  { month: "Feb", teachers: 15 },
  { month: "Mar", teachers: 8 },
  ]
  return (
    <>
      <div className="teacher-dashboard container-fluid py-4">
        <h2 className="mb-4 fw-bold"><br /> Welcome, {studentName}</h2>

        <div className="row g-4 mb-4">
          <StatCard
            title="All Assignments"
            value={counts.assignments_count
}
            color="success"
          />
          <StatCard
            title="Total Classrooms"
            value={counts.classrooms_count}
            color="info"
          />
          
          <StatCard
            title="Total Assignments Marks"
            value={counts.assignemt_marks}
            color="warning"
          />

        </div>
        <div className="card shadow-sm p-3 mb-4">
  <h5>Student Performance</h5>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={teacherRegistrationData}
        dataKey="teachers"
        nameKey="month"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {teacherRegistrationData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
      </div>
    </>
  );
};

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

export default Dashboard;
