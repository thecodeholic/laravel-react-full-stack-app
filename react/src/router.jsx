import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Appointments from "./views/Appointments.jsx";
import AppointmentForm from "./views/AppointmentForm.jsx";
import Customers from "./views/Customers.jsx";
import CustomerForm from "./views/CustomerForm.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/appointments',
        element: <Appointments />
      },
      {
        path:'/appointments/new',
        element: <AppointmentForm  key="appointmentCreate" />
      },
      {
        path:'/appointments/:id',
        element: <AppointmentForm  key="appointmentUpdate" />
      },
      {
        path: '/customers',
        element: <Customers />
      },
      {
        path:'/customers/new',
        element: <CustomerForm  key="customersCreate" />
      },
      {
        path:'/customers/:id',
        element: <CustomerForm  key="customersUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
