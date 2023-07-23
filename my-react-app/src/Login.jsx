import React from 'react';
import './login.css';
import axios from 'axios';
import AppContext, { useGc } from './Context';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
   const { eid,seteid}=useGc();
   
    console.log("nasmded="+eid);
    var [name,setname]=React.useState("");
   // var [posted,setposted]=React.useState(false);
    var [password,setpassword]=React.useState("");
    var [err,seterr]=React.useState(false);
    const nav=useNavigate();
    async function sud(e){
        //preventdefault()
        //setposted(true);
        e.preventDefault();
        try {
          var res= await axios.post("http://localhost:3001/login", { email: name, password: password });
          console.log(res.data);
          if(res.data==="success"){
            seteid(name);
            nav("/Home");
        }
        else{
            seterr(true);
        }
        } catch (error) {
          console.error("Error occurred while sending the request:", error);
        }
        //console.log("hlo");
        //console.log("name:"+name+"  password:"+password);
    }
  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={sud}>
    <input type="email" placeholder="Email" className="login-input" autoComplete="none" value={name} onChange={(e)=>setname(e.target.value)} />
        <input type="password" placeholder="Password" className="login-input" value={password} onChange={(e)=>setpassword(e.target.value)} />
        <div className="login-forgot">
          <a href="#" className="login-forgot-link">Forgot password?</a>
        </div>
        {err && <em>email and password doesn't match</em>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
