import React, { useEffect, useState } from "react";
import { getAllCountTeacherDashboard } from "../../service/TeacherService";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TeacherDashboard() {
  const [counts, setCounts] = useState({});
  const getAllCount = async () => {
    const result = await getAllCountTeacherDashboard();

    console.log("result : ", result.data);

    setCounts(result?.data);
    // console.log("counts : ",counts)
  };
  useEffect(() => {
    getAllCount();
  }, []);
  const teacherRegistrationData = [
    { month: "Jan", teachers: 4 },
    { month: "Feb", teachers: 6 },
    { month: "Mar", teachers: 5 },
    { month: "Apr", teachers: 8 },
    { month: "May", teachers: 3 },
    { month: "Jun", teachers: 7 },
    { month: "Jul", teachers: 2 },
    { month: "Aug", teachers: 5 },
  ];

  return (
    <>
      <div className="teacher-dashboard container-fluid py-4">
        <h2 className="mb-4 fw-bold">Teacher Dashboard</h2>

        {/* Top Stat Cards */}
        <div className="row g-4 mb-4">
          <StatCard
            title="Total Students"
            value={counts.students}
            color="success"
          />
          <StatCard
            title="Total Classrooms"
            value={counts.classrooms}
            color="info"
          />
          <StatCard
            title="Total Assignments"
            value={counts.assignments}
            color="warning"
          />
        </div>
        <div className="card shadow-sm p-3 mb-4">
          <h5>Monthly Teacher Registrations</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teacherRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="teachers" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
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

export default TeacherDashboard;
