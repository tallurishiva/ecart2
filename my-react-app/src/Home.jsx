import React from "react";
import Nav from "./Nav";
//import { useLocation } from 'react-router-dom';
//import AuthContext from './AuthContext';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import Prodpage from './Prodpage';
export const AuthContext = React.createContext();
export default function Home(){
    const { eid,seteid}=useGc();
    console.log("eid"+eid);
    return (
            <div>
                <Prodpage/>
            </div>
    );
}
