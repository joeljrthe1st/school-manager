import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { FaUsers,FaBook,FaBookOpen,FaChalkboardTeacher,FaUserShield,FaCog,FaEnvelope, FaUserPlus, FaCalendarAlt, FaCheckCircle, FaChartBar } from 'react-icons/fa';
import './Home.css';
import { fetchCurrentUserData } from '../../firebase/dbfunctions';
import ViewTermEvents from '../events/ViewTermEvents';

function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchCurrentUserData();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Conditional rendering based on user role
  const isTeacher = userData?.role === 'teacher';
  const isParent = userData?.role === 'parent';
  const isAdmin = userData?.role === 'admin';

  return (
    <div>
      <Header />
      <div className="home">
      <div>
    <h1>Dashboard</h1>
    {/* <h1>Hello, {userData.firstname}</h4> */}
    <div>
      <p>Welcome to the Al-tech School Management System. Here you can manage students, classes, assignments, and more.</p>
      {/* Additional content for Home */}
      <div className="dashboard-widgets">
       <ViewTermEvents/>
        <div className="widget">
          
          <h2>Recent Announcements</h2>
          {/* Code to display recent announcements */}
        </div>
        
      </div>
    </div>
  </div>
  <nav>
    <ul className="nav-list">
      {/* Only show student-related links for teachers */}
      {isTeacher && (
        <>
          <li>
            <Link to="/all-students" className="nav-link">
              <FaUsers size="24px" />
              Students
            </Link>
          </li>
          <li>
            <Link to="/add-new-student" className="nav-link">
              <FaUserPlus size="24px" />
              Add Students
            </Link>
          </li>
          <li>
            <Link to="/coming-soon" className="nav-link">
              <FaChalkboardTeacher size="24px" />
              Manage Classes
            </Link>
          </li>
          <li>
            <Link to="/coming-soon" className="nav-link">
              <FaBook size="24px" />
              Assignments
            </Link>
          </li>
        </>
      )}
      {/* Only show the reports link for admin */}
      {isAdmin && (
        <>
          <li>
            <Link to="/coming-soon" className="nav-link">
              <FaChartBar size="24px" />
              Reports
            </Link>
          </li>
          <li>
            <Link to="/coming-soon" className="nav-link">
              <FaUserShield size="24px" />
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/coming-soon" className="nav-link">
              <FaCog size="24px" />
              School Settings
            </Link>
          </li>
        </>
      )}
      {/* Common links for all roles */}
      <li>
        <Link to="/term-events" className="nav-link">
          <FaCalendarAlt size="24px" />
          Events
        </Link>
      </li>
      <li>
        <Link to="/view-attendance" className="nav-link">
          <FaCheckCircle size="24px" />
          View Attendance
        </Link>
      </li>
      <li>
        <Link to="/coming-soon" className="nav-link">
          <FaBookOpen size="24px" />
          Gradebook
        </Link>
      </li>
      <li>
        <Link to="/coming-soon" className="nav-link">
          <FaEnvelope size="24px" />
          Communication
        </Link>
      </li>
    </ul>
  </nav>

 
</div>

   </div>
  );
}

export default Home;
