import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const[loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    setLoading(true);
    axiosClient.get("/customers")
      .then(({data})=>{
        setLoading(false);
        console.log(data);
        setCustomers(data.data);
      })
      .catch(()=>{
        setLoading(false);
      })
  }

  const onDelete = (customer) => {
    if(!window.confirm("Are you sure you want to delete this appointment?")){
      return
    }
    axiosClient.delete(`/customers/${customer.id}`)
      .then(()=>{
        setNotification("User has been deleted successfully")
        getCustomers();
      })
  }



  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Customers</h1>
        <Link to="/customers/new" className="btn-add">Add New Customer</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Instagram</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          {loading && <tbody>
          <tr>
            <td colSpan="5" className={"text-center"}>Loading...</td>
          </tr>
          </tbody>
          }
          {!loading && <tbody>
          {customers.map(customer=>(
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.instagram}</td>
              <td>{customer.status}</td>
              <td>
                <Link to={'/customers/' + customer.id} className="btn-edit">Edit</Link>
                &nbsp;
                <button onClick={ev => onDelete(customer)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  )
}
