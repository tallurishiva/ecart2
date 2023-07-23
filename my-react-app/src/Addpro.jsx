import React from "react";
import Cart from "./Cart";
import axios from "axios";
//import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
export default function Addpro(props){
    var [data,setdata]=React.useState([]);
    React.useEffect(()=>{
        async function getcartinfo(){
            try{
            await axios.post("http://localhost:3001/cartcompquan", { eid:props.eid,pid:props.item.id});
        }
            catch(error){
                console.error();
            }
          }
          getcartinfo();
    },[]);
    var [num,setnum]=React.useState(0);
    var [empty,setempty]=React.useState(true);
        console.log("in addcomp="+props.eid);
    function sub(e){
        setnum(num-1);
        async function sendtocart(){
            try{
            const res=await axios.post("http://localhost:3001/cart", { pid: props.item.id,quantity:num-1,eid:props.eid});
        }
            catch(error){
                console.error();
            }
          }
          sendtocart();
       // console.log(e.target);
        if(num===1){
            setempty(true);
            setnum(0);
        }
    }
    function add(e){
        setnum(num+1);
        async function sendtocart(){
            try{
                const res= await axios.post("http://localhost:3001/cart", { pid: props.item.id,quantity:num+1,eid:props.eid});}
            catch(error){
                console.error();
            }
          }
          sendtocart();
        //props.cart(num);
       // console.log(e.target);
        setempty(false);
    }
    return (<div>
        {empty &&
        <div className="Addtocart init">
            <button onClick={add} type="button" id={props.item.id} value={num}>Add</button>
        </div>}
        {!empty &&
        <div className="Addtocart">
        <button onClick={sub} type="button" id={props.item.id} value={num} >-</button>
        {num}
        <button onClick={add} type="button" id={props.item.id} value={num}>+</button>
        </div>} 
        
    </div>);
}