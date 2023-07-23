import React from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
//import { useContext } from 'react';
//import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import axios from "axios";
export default function SignInPage() {
  
    var [name,setname]=React.useState("");
    var [email,setemail]=React.useState("");
    var [password,setpassword]=React.useState("");
    var [number,setnumber]=React.useState("");
    var [err,seterr]=React.useState(false);
    const nav=useNavigate();
    async function sud(event){
        event.preventDefault();
        //console.log("name:"+name+"  password:"+password +" email:"+email);
        try{
        var find= await axios.post("http://localhost:3001/signup",{name:name,email:email,password:password,number:number})}
        catch(error){
            console.error();
        }
        //console.log("find:"+find.data.otp);
        if(find.data!=="err"){
            nav("/otp",{state:{otp:find.data.otp,det:{name:name,email:email,password:password,number:number}}});
        }
        else{
            seterr(true);
        }
    }  
  return (
    <div className="signin-container">
      <h2 className="signin-header">Sign In</h2>
      <form className="signin-form" onSubmit={sud}>
        <input type="text" placeholder="Name" value={name} className="signin-input" onChange={(e)=>setname(e.target.value)} />
        <input type="email" placeholder="Email"value={email} className="signin-input" onChange={(e)=>setemail(e.target.value)} />
        <input type="password" placeholder="Password"value={password} className="signin-input" onChange={(e)=>setpassword(e.target.value)} />
        <input type="tel" placeholder="Phone Number" value={number} className="signin-input" onChange={(e)=>setnumber(e.target.value)}/>
        {err && <em>email already in existance</em>}
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
}
