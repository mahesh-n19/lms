import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { getAllCountsService } from "../../service/AdminService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {

  const [counts, setCounts] = useState({});
  const teacherRegistrationData = [
  { month: 'Jan', teachers: 4 },
  { month: 'Feb', teachers: 6 },
  { month: 'Mar', teachers: 5 },
  { month: 'Apr', teachers: 8 },
  { month: 'May', teachers: 3 },
  { month: 'Jun', teachers: 7 },
  { month: 'Jul', teachers: 2 },
  { month: 'Aug', teachers: 5 },
];

  const getAllCount = async () => {
    const result = await getAllCountsService();

    console.log("result : ", result.data);

    setCounts(result?.data);
    //  console.log("counts : ",counts)
  };

  useEffect(() => {
    getAllCount();
  }, []);

  return (
    <div className="admin-dashboard container-fluid py-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      {/* Top Stat Cards */}
      <div className="row g-4 mb-4">
        <StatCard
          title="Total Teachers"
          value={counts.teachers}
          color="primary"
        />
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
