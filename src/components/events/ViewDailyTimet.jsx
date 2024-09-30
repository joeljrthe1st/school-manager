import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchSchoolDayEvents } from '../../firebase/dbfunctions';
import './ViewSchoolDayEvents.css'; // Import the external CSS file
import Header from '../home/Header';

function ViewSchoolDayEvents() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getEvents = async () => {
      try {
        // Convert the selected date to the required format (e.g., '2024-08-11')
        const eventDate = selectedDate.toISOString().split('T')[0];
        const fetchedEvents = await fetchSchoolDayEvents(eventDate);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setLoading(true); // Show loading while fetching new data
  };

  return (
    <>
      <Header/>
   
    <div className="events-container">
      <h2 className="heading">Select a Date to View Events</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="date-picker"
      />

      {loading ? (
        <p className="loading">Loading events...</p>
      ) : (
        <div className="events-list">
          <h2 className="events-heading">Events for {selectedDate.toDateString()}</h2>
          {events && events.classes ? (
            Object.keys(events.classes).map((classKey) => (
              <div key={classKey} className="class-events">
                <h3 className="class-heading">{classKey.toUpperCase()}</h3>
                {events.classes[classKey].map((period, index) => (
                  <div key={index} className="event-item">
                    <p>
                      <strong>{period.period}:</strong> {period.eventName || "No event"}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="no-events">No events available for the selected date.</p>
          )}
        </div>
      )}
    </div>
    </>
  );
}

export default ViewSchoolDayEvents;
