
import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../../firebase/dbfunctions';
import Header from '../home/Header';
import './AllStudents.css'; // Import the external CSS file
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentClass, setStudentClass] = useState('all');
  const [stream, setStream] = useState('all'); // Add stream state

  const classes = ['all', 's1', 's2', 's3', 's4', 's5', 's6']; // Example classes
  const streams = ['all', 'A', 'B', 'C','D']; // Example streams, replace with your actual streams

  useEffect(() => {
    // Fetch students based on selected class and stream
    setLoading(true);
    fetchStudents(studentClass, stream)
      .then((fetchedStudents) => {
        setStudents(fetchedStudents);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentClass, stream]); // Refetch when class or stream changes

  const handleClassChange = (e) => {
    setStudentClass(e.target.value);
  };

  const handleStreamChange = (e) => {
    setStream(e.target.value);
  };

  if (loading) {
    return <div><Header/> <div className="loading">
    {/* Use CircularProgress loader */}
    <CircularProgress size={30} thickness={4} color="primary" />
  </div></div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <Header />
   
      <div className="all-students">
        <h2 className="title">All Students</h2>

        <div className="filter">
          <label className="filter-label">
            Select Class:
            <select className="class-select" value={studentClass} onChange={handleClassChange}>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'All Classes' : cls.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-label">
            Select Stream:
            <select className="stream-select" value={stream} onChange={handleStreamChange}>
              {streams.map((str) => (
                <option key={str} value={str}>
                  {str === 'all' ? 'All Streams' : str.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>

        {students.length === 0 ? (
          <p className="no-students">No students found.</p>
        ) : (
          <ul className="student-list">
            {students.map((student) => (
              <li key={student.id} className="student-item">
                {student.firstname} {student.lastname}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AllStudents;
