import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = () => {
    setLoading(true);
    axiosClient.get("/appointments")
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        data.data.forEach(appointment => {
          appointment.type = appointment.type.replace(/_/g, ' ');
        });
        setAppointments(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onDelete = (appointment) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }
    axiosClient.delete(`/appointments/${appointment.id}`)
      .then(() => {
        setNotification("User has been deleted successfully");
        getAppointments();
      });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Appointments</h1>
        <Link to="/appointments/new" className="btn-add">Add New Appointment</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Time</th>
            <th>Information</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading && (
            <tbody>
            <tr>
              <td colSpan="7" className={"text-center"}>Loading...</td>
            </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.customers?.[0]?.name || 'N/A'}</td>
                <td>{appointment.customers?.[0]?.phone || 'N/A'}</td>
                <td>{appointment.time}</td>
                <td>{appointment.information}</td>
                <td>{appointment.type}</td>
                <td>
                  <Link to={'/appointments/' + appointment.id} className="btn-edit">Edit</Link>
                  &nbsp;
                  <button onClick={ev => onDelete(appointment)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}
