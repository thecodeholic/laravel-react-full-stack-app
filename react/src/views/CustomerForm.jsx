import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    id: null,
    name: "",
    phone: "",
    instagram: "",
    status: ""
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/customers/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setCustomer(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    const method = customer.id ? 'put' : 'post';
    const url = customer.id ? `/customers/${customer.id}` : '/customers';

    axiosClient[method](url, customer)
      .then(() => {
        setNotification(customer.id ? 'Customer was successfully updated' : 'Customer was successfully created');
        navigate('/customers');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      {customer.id ? <h1>Update User: {customer.name}</h1> : <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
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
              value={customer.name || ""}
              onChange={ev => setCustomer({ ...customer, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={customer.phone || ""}
              onChange={ev => setCustomer({ ...customer, phone: ev.target.value })}
              placeholder="Phone"
            />
            <input
              value={customer.instagram || ""}
              onChange={ev => setCustomer({ ...customer, instagram: ev.target.value })}
              placeholder="Instagram"
            />
            <select
              value={customer.status || ""}
              onChange={ev => setCustomer({ ...customer, status: ev.target.value })}
              placeholder="Customer Status"
              className="select-input"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
