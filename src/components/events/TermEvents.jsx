import React, { useState,useEffect } from 'react';
import { addTermEvent,fetchCurrentUserData } from '../../firebase/dbfunctions';

import Header from '../home/Header';
import ViewTermEvents from './ViewTermEvents';
import '../auth/register/Register.css';

const AddTermEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [fee, setFee] = useState('');
  const [venue, setVenue] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [stream, setStream] = useState('');
  const [teacher, setTeacher] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTermEvent(eventName, eventDate, fee, venue, studentClass, stream, teacher);
      alert('Term event added successfully!');
      // Clear form fields after submission
      setEventName('');
      setEventDate('');
      setFee('');
      setVenue('');
      setStudentClass('');
      setStream('');
      setTeacher('');
    } catch (error) {
      console.error('Error adding term event:', error);
      alert('Error adding event. Please try again.');
    }
  };

  const [showForm, setShowForm] = useState(false);
  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the form visibility
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
    <Header/>
    <main className="Event-container">
  
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

    <form className="register-form"onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Fee (if applicable)</label>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Venue</label>
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
          <label>
            Class:
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              <option value="s1">S1</option>
              <option value="s2">S2</option>
              <option value="s3">S3</option>
              <option value="s4">S4</option>
              <option value="s5">S5</option>
              <option value="s6">S6</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Stream:
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              required
            >
              <option value="">Select Stream</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              
            </select>
          </label>
        </div>
        <div className="form-group">
        <label>Teacher</label>
        <input
          type="text"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Term Event</button>
    </form>):(
        <ViewTermEvents/>
    )}</div>
    </main>
    </>
  );
};

export default AddTermEventForm;
