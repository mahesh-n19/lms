
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getJoinedClassroomService } from "../../../service/StudentService";
import "../user.css";

export default function Sidebar() {
  const [joinedClassroom, setJoinedClassroom] = useState([]);

  useEffect(() => {
    const fetchJoinedClassroom = async () => {
      const result = await getJoinedClassroomService();

      console.log("Joined classroom : ",result.data);
      setJoinedClassroom(result.data);
    };

    fetchJoinedClassroom();
  }, []);

  return (
    <div className="student-sidebar">
      <ul className="sidebar-ul">
        <li className="sidebar-li">
          <NavLink to="/user/dashboard" className="sidebar-link">
            <img
              className="sidebar-icon"
              src="/icons/dashboard.png"
              alt="Dashboard"
            />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="sidebar-li">
          <NavLink to="/user/join-classroom" className="sidebar-link">
            <img className="sidebar-icon" src="/icons/add.png" alt="Join" />
            <span>Join Classroom</span>
          </NavLink>
        </li>

        {/* Accordion Section */}
        <li className="sidebar-li mt-3">
          <div className="accordion" id="studentAccordion">
            <div className="accordion-item border-0">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <img
                    src="/icons/classroom.png"
                    alt="Classroom Icon"
                    width="24px"
                    className="me-2"
                  />
                  <span className="text-nowrap">My Classrooms</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#studentAccordion"
              >
                <div className="accordion-body p-0">
                  <ul className="class-list-ul ps-3">
                    {joinedClassroom.map((classroom) => {


                        return (

                           <li className="class-list" key={classroom.classroomId}>
                            <NavLink
                              to={`/user/classroom/${classroom.classroomId}`}
                              className="sidebar-link small"
                            >
                              <img
                                src="/icons/class.png"
                                width="20px"
                                className="me-2"
                              />
                              {classroom.classroomCode} - {classroom.title}
                            </NavLink>
                          </li>
                        );
                    }

                    
                       
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
