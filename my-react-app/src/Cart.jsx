import React from "react";
import Cartcomp from "./Cartcomp";
import './cart.css';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import axios from "axios";
import imag from "./_50ec4cf5-3974-4b2d-97c3-97d901b1d3fc-removebg-preview.png";
export default function Cart(){
    const { eid,seteid}=useGc();
    var [data, setdata] = React.useState([]);
    var [empty, setempty] = React.useState(false);
    var [chan,setchan]=React.useState(0);
    React.useEffect(() => {
        var fetchData = async () => {
            try {
                var resp = await axios.post("http://localhost:3001/cartcomp",{eid:eid});
                var newdata = await resp.data;
                console.log(newdata[0].p_id);
                if(newdata[0].p_id.length===0){
                    setempty(true);
                }
                else{
                //console.log(newdata);
                setdata(newdata[0].p_id);}
            } catch(error){
                console.error(error);
            }
        }
        fetchData();
    }, [chan]);
    function cb(){
        setchan(chan+1);
    }
    return (
        <div className="Cart">
            {empty && <div className="emty"><img src={imag} alt="emptycart"></img>
            <h1>Your cart is empty</h1>
</div>}
            {!empty && data.map(item=><Cartcomp item={item} eid={eid} cb={cb}/>)}
        </div>

    );             
}