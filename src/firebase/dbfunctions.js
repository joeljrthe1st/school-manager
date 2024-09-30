import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { app } from "./firebase";
import { getAuth } from 'firebase/auth';

// Initialize Firestore
const db = getFirestore(app);

/**
 * Function to add a user to the Firestore collection
 * @param {string} firstname - First name of the user
 * @param {string} lastname - Last name of the user
 * @param {string} email - Email address of the user
 * @param {string} role - Role of the user (e.g., "admin", "user", etc.)
 * @returns {Promise<void>}
 */
export const addUser = async (firstname, lastname, email, role) => {
  try {
    // Reference to the 'users' collection
    const usersCollectionRef = collection(db, "users");

    // Add a new document to the 'users' collection
    await addDoc(usersCollectionRef, {
      firstname,
      lastname,
      email,
      role,
    });

    console.log("User added successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const fetchUserData = async (email = '') => {
  try {
    // Reference to the 'users' collection
    const usersCollectionRef = collection(db, 'users');

    let q;
    if (email) {
      // Filter by email if provided
      q = query(usersCollectionRef, where('email', '==', email));
    } else {
      // Fetch all users if no email is provided
      q = query(usersCollectionRef);
    }

    // Fetch data from the query
    const querySnapshot = await getDocs(q);

    // Map over the documents and extract data
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID
      ...doc.data(), // Spread the document data
    }));

    console.log('Fetched user data successfully!', users);
    return users;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


export const fetchCurrentUserData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is currently logged in.');
  }

  try {
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where('email', '==', user.email));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))[0]; // Assuming email is unique and we get only one document

    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Function to add a student to the Firestore collection
 * @param {string} firstname - First name of the student
 * @param {string} lastname - Last name of the student
 * @param {string} studentClass - Class of the student
 * @param {string} gender - Gender of the student
 * @param {number} age - Age of the student
 * @param {string} registrationNumber - Registration number of the student
 * @param {object} father - Father’s information (firstName, lastName)
 * @param {object} mother - Mother’s information (firstName, lastName)
 * @param {object} sister - Sister’s information (firstName, lastName) (if any)
 * @param {object} brother - Brother’s information (firstName, lastName) (if any)
 * @param {string} healthStatus - Health status of the student (any health issues)
 * @param {string} role - Role of the student (e.g., prefect, leader)
 * @returns {Promise<void>}
 */
export const addStudent = async (
  firstname,
  lastname,
  studentClass,
  stream,
  gender,
  age,
  registrationNumber,
  father,
  mother,
  sister,
  brother,
  healthStatus,
  role
) => {
  try {
    // Reference to the 'students' collection
    const studentsCollectionRef = collection(db, "students");

    // Add a new document to the 'students' collection
    await addDoc(studentsCollectionRef, {
      firstname,
      lastname,
      studentClass,
      stream,
      gender,
      age,
      registrationNumber,
      father,
      mother,
      sister,
      brother,
      healthStatus,
      role,
    });

    console.log("Student added successfully!");
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};


/**
 * Function to fetch students from the Firestore collection based on student class
 * @param {string} studentClass - Class of the students to fetch. Use "all" to fetch all classes.
 * @returns {Promise<Array>}
 */
// export const fetchStudents = async (studentClass) => {
//   try {
//     // Reference to the 'students' collection
//     const studentsCollectionRef = collection(db, "students");

//     let q;
//     if (studentClass === "all") {
//       // Fetch all students without any filter
//       q = query(studentsCollectionRef);
//     } else {
//       // Filter by class only
//       q = query(studentsCollectionRef, where("studentClass", "==", studentClass));
//     }

//     // Fetch data from the query
//     const querySnapshot = await getDocs(q);

//     // Map over the documents and extract data
//     const students = querySnapshot.docs.map((doc) => ({
//       id: doc.id, // Include document ID
//       ...doc.data(), // Spread the document data
//     }));

//     console.log(`Fetched students successfully!`, students);
//     return students;
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     throw error;
//   }
// };

/**
 * Function to fetch students from the Firestore collection based on student class and stream
 * @param {string} studentClass - Class of the students to fetch. Use "all" to fetch all classes.
 * @param {string} stream - Stream of the students to fetch. Use "all" to fetch all streams.
 * @returns {Promise<Array>}
 */
export const fetchStudents = async (studentClass, stream) => {
  try {
    // Reference to the 'students' collection
    const studentsCollectionRef = collection(db, "students");

    let q;

    if (studentClass === "all" && stream === "all") {
      // Fetch all students without any filters
      q = query(studentsCollectionRef);
    } else if (studentClass === "all") {
      // Fetch students filtered by stream only
      q = query(studentsCollectionRef, where("stream", "==", stream));
    } else if (stream === "all") {
      // Fetch students filtered by class only
      q = query(studentsCollectionRef, where("studentClass", "==", studentClass));
    } else {
      // Fetch students filtered by both class and stream
      q = query(studentsCollectionRef, where("studentClass", "==", studentClass), where("stream", "==", stream));
    }

    // Fetch data from the query
    const querySnapshot = await getDocs(q);

    // Map over the documents and extract data
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID
      ...doc.data(), // Spread the document data
    }));

    console.log(`Fetched students successfully!`, students);
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};


/**
 * Function to record attendance for a lesson
 * @param {string} teacher - The teacher taking the lesson
 * @param {string} subject - The subject being taught
 * @param {string} studentClass - Class of the students
 * @param {Array} students - Array of students with attendance status
 * @returns {Promise<void>}
 */
export const recordAttendance = async (teacherName, subject, studentClass, stream, students) => {
  // Check if students is an array
  if (!Array.isArray(students)) {
    throw new Error('Invalid students data. Expected an array but received something else.');
  }

  try {
    // Create a reference to the attendance collection
    const attendanceCollectionRef = collection(db, 'attendance');

    // Add the attendance record to Firestore
    await addDoc(attendanceCollectionRef, {
      teacherName,
      subject,
      studentClass,
      stream,
      students, // List of students with their attendance status
      timestamp: new Date(), // Optional: add timestamp
    });

    console.log('Attendance recorded successfully');
  } catch (error) {
    console.error('Error recording attendance:', error);
    throw error; // Rethrow the error after logging
  }
};

/**
 * Function to fetch attendance records based on class, stream, and subject
 * @param {string} studentClass - The class of the students
 * @param {string} subject - The subject being taught
 * @returns {Promise<Array>} - Returns a promise resolving to an array of attendance records
 */
// export const fetchAttendance = async (studentClass, subject) => {
//   try {
//     const attendanceCollectionRef = collection(db, 'attendance');

//     // Construct query based on the selected class and subject
//     const attendanceQuery = query(
//       attendanceCollectionRef,
//       where('studentClass', '==', studentClass),
//       where('subject', '==', subject)
//     );

//     // Fetch attendance records
//     const querySnapshot = await getDocs(attendanceQuery);

//     // Extract and return attendance data
//     const attendanceRecords = [];
//     querySnapshot.forEach(doc => {
//       attendanceRecords.push({ id: doc.id, ...doc.data() });
//     });

//     console.log('Attendance Records:', attendanceRecords); // Debugging log

//     return attendanceRecords;
//   } catch (error) {
//     console.error('Error fetching attendance:', error);
//     throw error;
//   }
// };
export const fetchAllAttendance = async () => {
  try {
    // Reference to the attendance collection
    const attendanceCollectionRef = collection(db, 'attendance');

    // Fetch all documents in the attendance collection
    const querySnapshot = await getDocs(attendanceCollectionRef);

    // Map over the querySnapshot to get the data of each document
    const attendanceRecords = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));

    console.log('Attendance records fetched successfully');
    return attendanceRecords;
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw error; // Rethrow the error after logging
  }
};



export const createSchoolDayEvents = async (eventDate, events) => {
  try {
    // Reference to the 'schoolEvents' collection
    const schoolEventsCollectionRef = collection(db, "schoolEvents");

    // Prepare the data structure for the day's events
    const dayEvents = {
      eventDate,
      classes: events, // This will be an object with each class and their events
      createdAt: new Date().toISOString(),
    };

    // Add a new document to the 'schoolEvents' collection
    await addDoc(schoolEventsCollectionRef, dayEvents);

    console.log("School day events created successfully!");
  } catch (error) {
    console.error("Error creating school day events:", error);
    throw error;
  }
};


/**
 * Function to fetch school day events for a specific date
 * @param {string} eventDate - The date of the events to fetch (e.g., '2024-08-11')
 * @returns {Promise<Object>} - Returns the events for the specified date or an empty object if no events found
 */
export const fetchSchoolDayEvents = async (eventDate) => {
  try {
    // Reference to the 'schoolEvents' collection
    const schoolEventsCollectionRef = collection(db, "schoolEvents");

    // Create a query to find the document for the specific date
    const q = query(schoolEventsCollectionRef, where("eventDate", "==", eventDate));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Check if a document exists
    if (!querySnapshot.empty) {
      // Assuming only one document is returned for the date
      const eventDoc = querySnapshot.docs[0];
      return eventDoc.data();
    } else {
      // No events found for the specified date
      console.log("No events found for the specified date.");
      return {};
    }
  } catch (error) {
    console.error("Error fetching school day events:", error);
    throw error;
  }
};


/**
 * Function to add a term event to the Firestore collection
 * @param {string} eventName - Name of the event
 * @param {string} eventDate - Date of the event (e.g., '2024-08-11')
 * @param {number} [fee] - Fee for the event (if applicable, optional)
 * @param {string} venue - Venue of the event
 * @param {string} studentClass - Class for which the event is organized (e.g., 'S1', 'S2', etc.)
 * @param {string} stream - Stream of the students (optional)
 * @param {string} teacherName - Name of the teacher responsible for the event
 * @returns {Promise<void>}
 */
export const addTermEvent = async (eventName, eventDate, fee, venue, studentClass, stream, teacherName) => {
  try {
    // Reference to the 'termEvents' collection
    const termEventsCollectionRef = collection(db, "termEvents");

    // Prepare the event data
    const eventData = {
      eventName,
      eventDate,
      fee: fee || null, // Optional fee, if not provided, it will be null
      venue,
      studentClass,
      stream: stream || "all", // Default to "all" if no stream is provided
      teacherName,
      createdAt: new Date().toISOString(),
    };

    // Add a new document to the 'termEvents' collection
    await addDoc(termEventsCollectionRef, eventData);

    console.log("Term event added successfully!");
  } catch (error) {
    console.error("Error adding term event:", error);
    throw error;
  }
};

/**
 * Function to fetch term events from the Firestore collection based on class and stream
 * @param {string} studentClass - Class of the students for the event. Use "all" to fetch all classes.
 * @param {string} stream - Stream of the students for the event. Use "all" to fetch all streams.
 * @returns {Promise<Array>}
 */
export const fetchTermEvents = async (studentClass = "all", stream = "all") => {
  try {
    // Reference to the 'termEvents' collection
    const termEventsCollectionRef = collection(db, "termEvents");

    let q;

    if (studentClass === "all" && stream === "all") {
      // Fetch all term events without any filters
      q = query(termEventsCollectionRef);
    } else if (studentClass === "all") {
      // Fetch term events filtered by stream only
      q = query(termEventsCollectionRef, where("stream", "==", stream));
    } else if (stream === "all") {
      // Fetch term events filtered by class only
      q = query(termEventsCollectionRef, where("studentClass", "==", studentClass));
    } else {
      // Fetch term events filtered by both class and stream
      q = query(termEventsCollectionRef, where("studentClass", "==", studentClass), where("stream", "==", stream));
    }

    // Fetch data from the query
    const querySnapshot = await getDocs(q);

    // Map over the documents and extract data
    const termEvents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID
      ...doc.data(), // Spread the document data
    }));

    console.log("Fetched term events successfully!", termEvents);
    return termEvents;
  } catch (error) {
    console.error("Error fetching term events:", error);
    throw error;
  }
};