
import React, { useEffect, useState } from 'react';
import { fetchCurrentUserData } from '../../firebase/dbfunctions';
import Logout from '../auth/Logout';
import Header from '../home/Header';
import { FaUser } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import './Account.css'; // Import the external CSS file

function Account() {
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

  if (loading) return (
    <>
      <Header/>
      <div className="account-container">
        <div className="loading">
          {/* Use CircularProgress loader */}
          <CircularProgress size={30} thickness={4} color="primary" />
        </div>
      </div>
    </>
  );

  if (error) return (
    <div>
      <Header/>
      <div className="error">Error: {error}</div>
      <Logout/>
    </div>
  );

  return (
    <>
      <Header/>
      <div className="account-container">
        <div className="account-info">
          <FaUser size="50px" className="profile-icon"/>
          <h2 className="heading">Account Information</h2>
          {userData ? (
            <div className="user-details">
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>First Name:</strong> {userData.firstname}</p>
              <p><strong>Last Name:</strong> {userData.lastname}</p>
              <p><strong>Role:</strong> {userData.role}</p>
              <Logout/>
            </div>
          ) : (
            <>
              <p>No user data available.</p>
              <Logout/>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Account;
