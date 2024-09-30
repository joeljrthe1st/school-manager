import React from 'react'
import {AuthProvider} from "./contexts/authContext"
import { useRoutes, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Account from "./components/Account"
import Allstudents from './components/students/Allstudents';
import Addnewstudent from './components/students/Addnewstudent';
import Events from './components/events/Events';
import ViewSchoolDayEvents from './components/events/ViewDailyTimet';
import Attendance from './components/students/Attendance';
import ViewAttendance from './components/students/Viewattendance';
import AddTermEventForm from './components/events/TermEvents';
import Comingsoon from './components/Soon/Comingsoon';

function App() {
  
  const routesArray = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/all-students",
      element: <Allstudents />,
    },
    {
      path: "/add-new-student",
      element: <Addnewstudent />,
    },
    {
      path: "/events",
      element: <Events />,
    },
    {
      path: "/view-events",
      element: <ViewSchoolDayEvents />,
    },
    {
      path: "/attendance",
      element: <Attendance />,
    },
    {
      path: "/view-attendance",
      element: <ViewAttendance />,
    },
    {
      path: "/term-events",
      element: <AddTermEventForm />,
    },
    {
      path: "/coming-soon",
      element: <Comingsoon/>,
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
     
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
