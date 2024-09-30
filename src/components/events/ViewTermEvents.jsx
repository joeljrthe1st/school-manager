import React, { useState, useEffect } from 'react';
import { fetchTermEvents } from '../../firebase/dbfunctions';
import './viewterm.css';
const ViewTermEvents = () => {
  const [termEvents, setTermEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');

  const classOptions = ['s1', 's2', 's3', 's4', 's5', 's6']; // Example class options
  const streamOptions = ['A', 'B', 'C','D']; // Example stream options

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchTermEvents(); // Fetch all term events
        setTermEvents(events);
        setFilteredEvents(events); // Initially display all events
      } catch (error) {
        console.error('Error fetching term events:', error);
      }
    };
    loadEvents();
  }, []);

  // Filter events based on selected class and stream
  useEffect(() => {
    const filtered = termEvents.filter(event => {
      return (
        (selectedClass === '' || event.studentClass === selectedClass) &&
        (selectedStream === '' || event.stream === selectedStream)
      );
    });
    setFilteredEvents(filtered);
  }, [selectedClass, selectedStream, termEvents]);

  return (
    <div>
      <h1>View Term Events</h1>

      <div>
        <label>Select Class: </label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">All Classes</option>
          {classOptions.map((classOption) => (
            <option key={classOption} value={classOption}>
              {classOption}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Stream: </label>
        <select value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)}>
          <option value="">All Streams</option>
          {streamOptions.map((streamOption) => (
            <option key={streamOption} value={streamOption}>
              {streamOption}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Filtered Term Events</h2>
        {filteredEvents.length === 0 ? (
          <p>No events available for the selected class and stream.</p>
        ) : (
          <ul>
            {filteredEvents.map((event, index) => (

              <li key={index} className="event-item">
              <div className="event-item-container">
                <img src={event.cover} alt={`${event.eventName} cover`} className="event-cover" />
                <div className="event-details">
                  <strong className="event-name">{event.eventName}</strong>
                  <p className="event-info">Class:{event.studentClass} Stream:{event.stream}</p>
                  <p className="event-info">Venue: {event.venue}</p>
                  <p className="event-info">Date: {event.eventDate}</p>
                  <p className="event-info">Fee: {event.fee ? `UGX ${event.fee}` : 'Free'}</p>
                  <p className="event-info">Teacher On Duty: {event.teacherName}</p>
                </div>
              </div>
            </li>
            
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewTermEvents;
