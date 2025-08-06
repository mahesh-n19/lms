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
} from "recharts";

const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const getAllCount = async () => {
    const result = await getAllCountStudentDashboard();

    console.log("result : ", result.data);

    setCounts(result?.data);
    // console.log("counts : ",counts)
  };
  useEffect(() => {
    getAllCount();
  }, []);
  return (
    <>
      <div className="teacher-dashboard container-fluid py-4">
        <h2 className="mb-4 fw-bold">Student Dashboard</h2>

        <div className="row g-4 mb-4">
          <StatCard
            title="All Assignments"
            value={counts.students}
            color="success"
          />
          <StatCard
            title="Total Classrooms"
            value={counts.classrooms}
            color="info"
          />
          
          {/* <StatCard
            title="Total Assignments"
            value={counts.assignments}
            color="warning"
          /> */}

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
