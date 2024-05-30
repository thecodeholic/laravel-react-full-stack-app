import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function AppointmentForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({
    id: null,
    information: "",
    time: "",
    type: ""
  });
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext()

  const onSubmit = ev => {
    ev.preventDefault();
    const formattedAppointment = {
      ...appointment,
      time: toOriginalFormat(appointment.time)
    };

    if (appointment.id) {
      axiosClient.put(`/appointments/${appointment.id}`, formattedAppointment)
        .then(() => {
          setNotification("User has been updated successfully")
          navigate('/appointments');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/appointments/`, formattedAppointment)
        .then(() => {
          setNotification("User has been created successfully")
          navigate('/appointments');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const toDateTimeLocal = (dateTimeString) => {
    // Assuming dateTimeString is in the format '30-05-2024 12:44'
    const [date, time] = dateTimeString.split(' ');
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}T${time}`;
  };

  const toOriginalFormat = (dateTimeLocalString) => {
    // Assuming dateTimeLocalString is in the format '2024-05-30T12:44'
    const [date, time] = dateTimeLocalString.split('T');
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year} ${time}`;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/appointments/${id}`)
        .then(({data}) => {
          setLoading(false);
          console.log(data);
          data.time = toDateTimeLocal(data.time);
          setAppointment(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <>
      {appointment.id ? <h1>Update Appointment</h1> : <h1>Create Appointment</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">Loading...</div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              type="datetime-local"
              value={appointment.time || ""}
              onChange={ev => setAppointment({...appointment, time: ev.target.value})}
              placeholder="Time"
            />
            <input
              value={appointment.information || ""}
              onChange={ev => setAppointment({...appointment, information: ev.target.value})}
              placeholder="Appointment Information"
            />
            <select
              value={appointment.type || ""}
              onChange={ev => setAppointment({...appointment, type: ev.target.value})}
              placeholder="Appointment Type"
              className="select-input"
            >
              <option value="">Select Type</option>
              <option value="fitting">Fitting</option>
              <option value="new_customer">New Customer</option>
              <option value="last_fitting">Last Fitting</option>
            </select>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
