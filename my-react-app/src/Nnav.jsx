import React from "react";
import { useNavigate } from "react-router-dom";
import './newnav.css';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import Profile from "./Profile";
export default function Nnav(){
    const nav=useNavigate();
    const { eid,seteid}=useGc();
    console.log("in nav="+eid);
    var [show,setshow]=React.useState(false);
    var [dis,setdis]=React.useState(true);
    React.useEffect(() => {
      if (eid !== "srk") {
        setdis(false);
      }
    }, [eid]);
    function tosignout(){
      setdis(true);
    }
    return (
        <div className="Nnav">
           <div className="logo" onClick={()=>nav("/Home")}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-amd" viewBox="0 0 16 16">
  <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0H.334ZM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2V9.72Z"/>
</svg>
<h1 className="logoname">FurniGo</h1>
</div>
  <div className="feat">
    <div onClick={()=>nav("/Home")} className="navlinks">Home</div>
    <div  onClick={()=>nav("/About")}  className="navlinks">About</div>
    <div  onClick={()=>nav("/About")}  className="navlinks">Contact Us</div>
    {dis && <button type="button" className="btn btn-primary" onClick={()=>nav("/")}>Login</button>}
    {dis && <button type="button" class="btn btn-light" onClick={()=>nav("/Signin")}>SignUp</button>}
    {!dis && <div onClick={()=>nav("/Cart")} className="profilelogo"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg></div>}
    {!dis && <div className="profilelogo" onClick={()=>{setshow(!show)}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></div>}
   {show && <div className="profile" onMouseLeave={()=>{setshow(!show)}}><Profile signout={tosignout}/></div>}
  </div>
        </div>
    );
}