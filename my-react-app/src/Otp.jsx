import React from 'react';
import './login.css';
//import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import axios from 'axios';
export default function Opt(){
  const { eid,seteid}=useGc();
  console.log(eid);
    var [otp,setotp]=React.useState("");
   // var [posted,setposted]=React.useState(false);
    var [err,seterr]=React.useState(false);
    const nav=useNavigate();
    const loc=useLocation();
    var data=loc.state.otp;
    console.log( "loc state:  "+loc.state.otp);
    async function sud(e){
        e.preventDefault();
        if(otp==data){
            try{
            var res=await axios.post("http://localhost:3001/otp",{data:loc.state.det});}
            
            catch(error){
                console.error();
            }
            var st=res.data.sts;
            console.log(res.data.dit);
            if(st==="success"){
              seteid(res.data.dit);
          nav("/Home");
            }
            else{
                seterr(true);
            }
        }
        else{
            seterr(true);
        }
        //console.log("hlo");
        //console.log("name:"+name+"  password:"+password);
    }
  return (
    <div className="login-container">
      <form className="login-form"  onSubmit={sud}>
        <em>otp has been sent to your registred email:</em>
        <input type="text" placeholder="Enter Otp" className="login-input"  onChange={(e)=>setotp(e.target.value)} />
        <div className="login-forgot">
          <a href="#" className="login-forgot-link">Otp Not received?</a>
        </div>
        {err && <em style={{color:"red"}}>Invalid</em>}
        <button type="submit" className="login-button">submit</button>
      </form>
    </div>
  );
}
