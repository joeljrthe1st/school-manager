
import React, { useState, useEffect } from 'react';
import { fetchAllAttendance } from '../../firebase/dbfunctions'; // Ensure correct path to dbfunctions
import Header from '../home/Header';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import './ViewAttendance.css';
const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAttendanceRecords = async () => {
      try {
        const records = await fetchAllAttendance();
        console.log('Fetched Attendance Records:', records); // Log the fetched records to check their structure
        setAttendanceRecords(records); // Store fetched records in state
      } catch (err) {
        setError('Failed to fetch attendance records');
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false); // Stop loading state after fetch
      }
    };

    getAttendanceRecords();
  }, []);

  if (loading) {
    return <div>
     
      <div className="loading">
          {/* Use CircularProgress loader */}
          <CircularProgress size={30} thickness={4} color="primary" />
        </div>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // <div>
    
    //   <h2>Attendance Records</h2>
    //   {attendanceRecords.length > 0 ? (
    //     <ul>
    //       {attendanceRecords.map((record) => (
    //         <li key={record.id}>
    //           <strong>Teacher:</strong> {record.teacherName} <br />
    //           <strong>Subject:</strong> {record.subject} <br />
    //           <strong>Class:</strong> {record.studentClass} <br />
    //           <strong>Stream:</strong> {record.stream} <br />
    //           <strong>Students:</strong> 
    //           <ul>
    //             {console.log('Student Data:', record.students)} {/* Log the students data */}
    //             {record.students.map((student, index) => (
    //               <li key={index}>
    //                 {student.firstname} {student.lastname}: {student.status}
    //               </li>
    //             ))}
    //           </ul>
    //           <strong>Date:</strong> {new Date(record.timestamp.seconds * 1000).toLocaleString()}
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No attendance records found</p>
    //   )}
    // </div>
    <div className="attendance-container">
  <h2>Attendance Records</h2>
  {attendanceRecords.length > 0 ? (
    <ul className="attendance-list">
      {attendanceRecords.map((record) => (
        <li key={record.id} className="attendance-record">
          <div className="attendance-info">
            <strong>Teacher:</strong> {record.teacherName} <br />
            <strong>Subject:</strong> {record.subject} <br />
            <strong>Class:</strong> {record.studentClass} <br />
            <strong>Stream:</strong> {record.stream} <br />
            <strong>Date:</strong> {new Date(record.timestamp.seconds * 1000).toLocaleString()}
          </div>
          <div className="attendance-students">
            <strong>Students:</strong>
            <ul>
              {record.students.map((student, index) => (
                <li key={index} className="student-item">
                  {student.firstname} {student.lastname}: 
                  <span className="status-icon">
                    {student.status === 'Present' && <AiOutlineCheckCircle color="green" />}
                    {student.status === 'Absent' && <AiOutlineCloseCircle color="red" />}
                    {student.status === 'Late' && <AiOutlineClockCircle color="orange" />}
                    {student.status === 'Excused' && <AiOutlineExclamationCircle color="blue" />}
                  </span> 
                  {student.status}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No attendance records found</p>
  )}
</div>
  );
};

export default ViewAttendance;
