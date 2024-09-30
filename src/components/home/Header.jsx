import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaCheckCircle, FaUser } from 'react-icons/fa';
import './Header.css'; // Import the external CSS file

// Header component
const Header = () => {
  return (
    <>
      {/* Desktop Header */}
      <header className="header desktop">
        <nav>
          <ul className="nav">
            <li>
              <Link to="/home" className="link">
                <FaHome size="16px" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="link">
                <FaCalendarAlt size="16px" />
                Events
              </Link>
            </li>
            <li>
              <Link to="/attendance" className="link">
                <FaCheckCircle size="16px" />
                Attendance
              </Link>
            </li>
            <li>
              <Link to="/account" className="link">
                <FaUser size="16px" />
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Top Tab Navigation */}
      {/* <nav className="top-nav mobile">
      
      </nav> */}

      {/* Mobile Bottom Tab Navigation */}
      <nav className="bottom-nav mobile">
        <ul className="nav">
          <li>
            <Link to="/home" className="link">
              <FaHome size="16px" />
              <span className="label">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/events" className="link">
              <FaCalendarAlt size="16px" />
              <span className="label">Events</span>
            </Link>
          </li>
          <li>
            <Link to="/attendance" className="link">
              <FaCheckCircle size="16px" />
              <span className="label">Attendance</span>
            </Link>
          </li>
          <li>
            <Link to="/account" className="link">
              <FaUser size="16px" />
              <span className="label">Account</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
