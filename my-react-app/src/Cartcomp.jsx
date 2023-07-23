import React from "react";
import './cart.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Addpro from "./Addpro";
export default function Cartcomp(props){
    const nav=useNavigate();
    //console.log("props=="+ JSON.stringify(props));
    JSON.stringify(props);
    var [data,setdata]=React.useState([]);
    var [loading,setloading]=React.useState(true);
    var [show,setshow]=React.useState("");
    React.useEffect(()=>{
          var ndata=async ()=>{
          try{
           var resp=await axios("http://localhost:3001/products/"+props.item.pid);
           var newdata=await resp.data;
           setloading(false);
           //console.log(newdata);
           //console.log(newdata);
           setdata(newdata);
           //console.log(data);
          }
           catch(error){
              console.error();
           }
      }
      ndata();
      
  },[]
    );
    //console.log("xcv====",props.item.pid);
    function delet(){
        console.log("clked");
        var del=async ()=>{
            try{
                var resp=await axios.post("http://localhost:3001/cartdel",{eid:props.eid,pid:props.item.pid});
                var res=await resp.data;
                if(res=="deleted"){
                    setshow("none");
                    //window.location.reload();
                }
                console.log(res);
                //console.log(newdata);
                //console.log(newdata);
                //setdata(newdata);
                //console.log(data);
               }
                catch(error){
                   console.error();
                }
        }
        del();
        props.cb();
    }
    //var [show,setshow]=React.useState(false);
    return (
        <div style={{display:show}}>
            {loading && <div>loading....</div>}
            {!loading && <div className="cartcomp">
               <div><img src={data[0].image} style={{height:200,width:300,marginRight:20}}></img></div>
               <div>
               <h3>{data[0].name}</h3>
               <p>${data[0].price}</p>
                <p>Quantity:{props.item.quantity}</p>
                <button type="button" class="btn btn-success">Buy now</button>
                <button type="button" class="btn btn-danger" onClick={delet}>delete</button>
               </div>
            </div>}
        </div>
    );
}
/*
<div className="details"><img style={{height:200,width:300,marginRight:10}} src={props.item.image}></img>
               <div><h5>{props.item.name}</h5>
               <p>${props.item.price}</p></div></div>
               <div><Addpro item={props.item} addcart={handlecart} /></div>
*/