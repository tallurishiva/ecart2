//import React from "react";
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressForm from './Address';
import './youracc.css';
export default function Youracc({ email }) {
    const { eid,seteid}=useGc();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav=useNavigate();
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts/"+eid);
        setAccount(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [email]);

  if (loading) {
    return <div className='loading'><div class="spinner-grow" role="status">
    <span style={{height:500,width:500}} class="sr-only"></span>
  </div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!account) {
    return <div>No account details found for the given email.</div>;
  }
  console.log(account);
  return (
    <div className="AccountDetails" >
      <h2>Account Details</h2>
      <p>Name: {account.Name}</p>
      <p>Email: {account.email}</p>
      <p>phone: {account.phone}</p>
      {account.address.city==="" &&
      <AddressForm/>}
      {account.address.city!=="" &&
      <div>
          <h6>your address:</h6>
           <p>street:{account.address.street}</p>
           <p>city:  { account.address.city}</p>
           <p>state: {account.address.state}</p>
           <p>postalCode:{account.address.postalCode}</p>
        </div>}
      {!account.seller && <a href='#' onClick={()=>{nav("/seller")}}>Become a seller</a>}
      {account.seller && <a href='#'>View your products</a>}
      {/* Display other account details */}
    </div>
  );
}

