import React, { useState } from 'react';
import './AddressForm.css';
import axios from 'axios';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
const AddressForm = () => {
    const { eid,seteid}=useGc();
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchAccountDetails = async () => {
        try {
          const response = await axios.post("http://localhost:3001/useraddress",{eid:eid,address:address});
          //setAccount(response.data);
            alert("your address updated");
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchAccountDetails();
    // Handle form submission logic here
    console.log(address);
  };

  return (
    <div className="AddressForm">
      <h4>Enter Address</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddressForm;
