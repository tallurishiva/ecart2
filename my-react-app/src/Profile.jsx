import React from "react";
import './profile.css'
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import { useNavigate } from "react-router-dom";
export default function Profile(props){
    const { eid,seteid}=useGc();
    const nav=useNavigate();
    function signout(){
         props.signout();
         seteid("srk");
         nav("/");
    }
    return (
        <div>
            <div className="comp">
                <div className="com" onClick={()=>nav("/youracc")}>Your account</div>
                <div className="com">profile</div>
                <div className="com" onClick={()=>nav("/Cart")}>Cart</div>
                <div className="com">order history</div>
                <div className="com" onClick={signout}>sign out</div>
            </div>
        </div>
    )
}