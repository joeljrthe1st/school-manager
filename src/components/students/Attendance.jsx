
import React, { useState, useEffect } from 'react';
import { fetchCurrentUserData, fetchStudents, recordAttendance } from '../../firebase/dbfunctions';
import Header from '../home/Header';
import ViewAttendance from './Viewattendance';
import '../auth/register/Register.css';

const Attendance = () => {
  const [teacherName, setTeacherName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [stream, setStream] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [subject, setSubject] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the form visibility
  };

  // Options for streams and subjects
  const streams = ['A', 'B', 'C', 'D']; // Add stream options here
  const subjects = ['Math', 'English', 'Science', 'History', 'Geography', 'Computer Science'];

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const userData = await fetchCurrentUserData();
        setTeacherName(userData.firstname);
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    getCurrentUserData();
  }, []);

  const handleClassChange = async (e) => {
    const selectedClass = e.target.value;
    setStudentClass(selectedClass);

    if (selectedClass && stream) {
      try {
        const studentsList = await fetchStudents(selectedClass, stream);
        setStudents(studentsList);
        setSelectedStudents(
          studentsList.map((student) => ({
            ...student,
            status: 'Present', // Default status
          }))
        );
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
  };

  const handleStreamChange = async (e) => {
    const selectedStream = e.target.value;
    setStream(selectedStream);

    if (studentClass && selectedStream) {
      try {
        const studentsList = await fetchStudents(studentClass, selectedStream);
        setStudents(studentsList);
        setSelectedStudents(
          studentsList.map((student) => ({
            ...student,
            status: 'Present', // Default status
          }))
        );
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
  };

  const handleAttendanceChange = (index, status) => {
    const updatedStudents = [...selectedStudents];
    updatedStudents[index].status = status;
    setSelectedStudents(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRecording(true);
  
    // Check if students are properly loaded
    if (!Array.isArray(selectedStudents) || selectedStudents.length === 0) {
      alert('No students to record attendance for.');
      setIsRecording(false);
      return;
    }
  
    try {
      await recordAttendance(teacherName, subject, studentClass, stream, selectedStudents);
      alert('Attendance recorded successfully!');
    } catch (error) {
      console.error('Error recording attendance:', error);
      alert('Failed to record attendance.');
    } finally {
      setIsRecording(false);
    }
  };
  
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
    <>
      <Header />
      <div className="Event-container">
        <div className="register-card">
    <div>
      {/* Only show student-related links for teachers */}
      {isTeacher && (
        <>
          <button onClick={toggleFormVisibility}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
        
        </>
      )}
      {/* Only show the reports link for admin */}
      {isAdmin && (
        <>
         
        </>
      )}
      {/* Common links for all roles */}
     
    </div>
      {showForm ? (
     <div>
        <h2>Record Attendance</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <select id="class" value={studentClass} onChange={handleClassChange}>
              <option value="">Select Class</option>
              <option value="s1">S1</option>
              <option value="s2">S2</option>
              <option value="s3">S3</option>
              <option value="s4">S4</option>
              <option value="s5">S5</option>
              <option value="s6">S6</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stream">Stream</label>
            <select id="stream" value={stream} onChange={handleStreamChange}>
              <option value="">Select Stream</option>
              {streams.map((streamOption, index) => (
                <option key={index} value={streamOption}>
                  {streamOption}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {students.length > 0 && (
            <div className="students-list">
              <h3>Students</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{`${student.firstname} ${student.lastname}`}</td>
                      <td>
                        <select
                          value={selectedStudents[index].status}
                          onChange={(e) => handleAttendanceChange(index, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="Excused">Excused</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            type="submit"
            disabled={isRecording}
            className={`submit-btn ${isRecording ? 'disabled' : ''}`}
          >
            {isRecording ? 'Recording Attendance...' : 'Record Attendance'}
          </button>
        </form>
      </div>):(
      <ViewAttendance/>
      )}
    
    </div></div></>
  );
};

export default Attendance;
