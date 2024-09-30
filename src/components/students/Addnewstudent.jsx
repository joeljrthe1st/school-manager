
import React, { useState } from 'react';
import { addStudent } from '../../firebase/dbfunctions';
import Header from '../home/Header';
import './AddNewStudent.css'; // Import the external CSS file
import AllStudents from './Allstudents';

function AddNewStudent() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentStream, setStudentStream] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  // Family members
  const [fatherFirstName, setFatherFirstName] = useState('');
  const [fatherLastName, setFatherLastName] = useState('');
  const [motherFirstName, setMotherFirstName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [sisterFirstName, setSisterFirstName] = useState('');
  const [sisterLastName, setSisterLastName] = useState('');
  const [brotherFirstName, setBrotherFirstName] = useState('');
  const [brotherLastName, setBrotherLastName] = useState('');

  const [healthStatus, setHealthStatus] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStudent(
        firstname,
        lastname,
        studentClass,
        studentStream,
        gender,
        age,
        registrationNumber,
        { firstName: fatherFirstName, lastName: fatherLastName },
        { firstName: motherFirstName, lastName: motherLastName },
        { firstName: sisterFirstName, lastName: sisterLastName },
        { firstName: brotherFirstName, lastName: brotherLastName },
        healthStatus,
        role
      );
      setMessage('Student added successfully!');
      // Clear the form after successful submission
      setFirstname('');
      setLastname('');
      setStudentClass('');
      setStudentStream('');
      setGender('');
      setAge('');
      setRegistrationNumber('');
      setFatherFirstName('');
      setFatherLastName('');
      setMotherFirstName('');
      setMotherLastName('');
      setSisterFirstName('');
      setSisterLastName('');
      setBrotherFirstName('');
      setBrotherLastName('');
      setHealthStatus('');
      setRole('');
    } catch (error) {
      setMessage('Error adding student. Please try again.');
      console.error(error);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the form visibility
  };

  return (
    <>
     <Header />
     <button onClick={toggleFormVisibility}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
      {showForm ? (
    <div className="container">
     
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
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
        <div>
          <label>
            Stream:
            <select
              value={studentStream}
              onChange={(e) => setStudentStream(e.target.value)}
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
        <div>
          <label>
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Registration Number:
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Father's First Name:
            <input
              type="text"
              value={fatherFirstName}
              onChange={(e) => setFatherFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Father's Last Name:
            <input
              type="text"
              value={fatherLastName}
              onChange={(e) => setFatherLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mother's First Name:
            <input
              type="text"
              value={motherFirstName}
              onChange={(e) => setMotherFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Mother's Last Name:
            <input
              type="text"
              value={motherLastName}
              onChange={(e) => setMotherLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Sister's First Name (if any):
            <input
              type="text"
              value={sisterFirstName}
              onChange={(e) => setSisterFirstName(e.target.value)}
            />
          </label>
          <label>
            Sister's Last Name (if any):
            <input
              type="text"
              value={sisterLastName}
              onChange={(e) => setSisterLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Brother's First Name (if any):
            <input
              type="text"
              value={brotherFirstName}
              onChange={(e) => setBrotherFirstName(e.target.value)}
            />
          </label>
          <label>
            Brother's Last Name (if any):
            <input
              type="text"
              value={brotherLastName}
              onChange={(e) => setBrotherLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Health Status:
            <input
              type="text"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add Student</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>):(
      <AllStudents/>
    )}
    </>
  );
}

export default AddNewStudent;
