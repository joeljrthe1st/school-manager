import React, { useState,useEffect } from 'react';
import { createSchoolDayEvents,fetchCurrentUserData } from '../../firebase/dbfunctions';
import Header from '../home/Header';
import ViewSchoolDayEvents from './ViewDailyTimet';

import '../auth/register/Register.css';

function Events() {
  const [eventDate, setEventDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the form visibility
  };

  const [events, setEvents] = useState({
    s1: [
      { period: '7:40am - 9:00am', eventName: '' },
      { period: '9:00am - 10:20am', eventName: '' },
      { period: '10:20am - 10:50am', eventName: 'breakfast' },
      { period: '10:50am - 11:55am', eventName: '' },
      { period: '11:55am - 1:00pm', eventName: '' },
      { period: '1:00pm - 2:00pm', eventName: 'lunch' },
      { period: '2:00pm - 3:30pm', eventName: '' },
      { period: '3:30pm - 5:00pm', eventName: '' },
    ],
    s2: [
      { period: '7:40am - 9:00am', eventName: '' },
      { period: '9:00am - 10:20am', eventName: '' },
      { period: '10:20am - 10:50am', eventName: 'breakfast' },
      { period: '10:50am - 11:55am', eventName: '' },
      { period: '11:55am - 1:00pm', eventName: '' },
      { period: '1:00pm - 2:00pm', eventName: 'lunch' },
      { period: '2:00pm - 3:30pm', eventName: '' },
      { period: '3:30pm - 5:00pm', eventName: '' },
    ],
    s3: [
      { period: '7:40am - 9:00am', eventName: '' },
      { period: '9:00am - 10:20am', eventName: '' },
      { period: '10:20am - 10:50am', eventName: 'breakfast' },
      { period: '10:50am - 11:55am', eventName: '' },
      { period: '11:55am - 1:00pm', eventName: '' },
      { period: '1:00pm - 2:00pm', eventName: 'Lunch' },
      { period: '2:00pm - 3:30pm', eventName: '' },
      { period: '3:30pm - 5:00pm', eventName: '' },
    ],
    s4: [
      { period: '7:40am - 9:00am', eventName: '' },
      { period: '9:00am - 10:20am', eventName: '' },
      { period: '10:20am - 10:50am', eventName: 'breakfast' },
      { period: '10:50am - 11:55am', eventName: '' },
      { period: '11:55am - 1:00pm', eventName: '' },
      { period: '1:00pm - 2:00pm', eventName: 'Lunch' },
      { period: '2:00pm - 3:30pm', eventName: '' },
      { period: '3:30pm - 5:00pm', eventName: '' },
    ],
    s5: [
      { period: '7:40am - 9:00am', eventName: '' },
      { period: '9:00am - 10:20am', eventName: '' },
      { period: '10:20am - 10:50am', eventName: 'breakfast' },
      { period: '10:50am - 11:55am', eventName: '' },
      { period: '11:55am - 1:00pm', eventName: '' },
      { period: '1:00pm - 2:00pm', eventName: 'Lunch' },
      { period: '2:00pm - 3:30pm', eventName: '' },
      { period: '3:30pm - 5:00pm', eventName: '' },
    ],
    s6: [
      { period: '7:40am - 9:00am', eventName: '' },
      { period: '9:00am - 10:20am', eventName: '' },
      { period: '10:20am - 10:50am', eventName: 'breakfast' },
      { period: '10:50am - 11:55am', eventName: '' },
      { period: '11:55am - 1:00pm', eventName: '' },
      { period: '1:00pm - 2:00pm', eventName: 'Lunch' },
      { period: '2:00pm - 3:30pm', eventName: '' },
      { period: '3:30pm - 5:00pm', eventName: '' },
    ],
  });

  const handleEventChange = (classKey, periodIndex, eventName) => {
    const updatedEvents = { ...events };
    updatedEvents[classKey][periodIndex].eventName = eventName;
    setEvents(updatedEvents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSchoolDayEvents(eventDate, events);
      console.log('School day events added successfully');
    } catch (error) {
      console.error('Error adding school day events:', error);
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
    <div>
      <Header/>
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
    
    <form onSubmit={handleSubmit}>
      <label>
        Event Date:
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </label>

      {Object.keys(events).map((classKey) => (
        <div key={classKey}>
          <h3>{classKey.toUpperCase()}</h3>
          {events[classKey].map((period, index) => (
            <div key={index}>
              <label>
                {period.period}:
                <input
                  type="text"
                  value={period.eventName}
                  onChange={(e) => handleEventChange(classKey, index, e.target.value)}
                  placeholder="Enter event name"
                />
              </label>
            </div>
          ))}
        </div>
      ))}

      <button type="submit">Add Events</button>
    </form>):(
    <ViewSchoolDayEvents/>)}
    </div>
    </div>
    </div>
  );
}

export default Events;
