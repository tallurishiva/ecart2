import React, { useRef } from "react";
import Prodects from "./Prodects";
import "./samp.css";
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
//import Addpro from "./Addpro";
//import AuthContext from './AuthContext';
import axios from "axios";
import { Params, useParams } from "react-router-dom";
export const AuthContext = React.createContext();
export default function Samp(){
    const { eid,seteid}=useGc();
    var [added,setadded]=React.useState(false);
    var [quantity,setquantity]=React.useState(1);
    //var [show,setshow]=React.useState(false);
    const {name}=useParams();
    //console.log(name);
    var url="https://course-api.com/react-store-products";
    //var url="https://api.github.com/users";
    var [data,setdata]=React.useState([]);
    var [loading,setloading]=React.useState(true);
    //var [category,setcategory]=React.useState("All");
    //var [empty,setempty]=React.useState(0);
    React.useEffect(()=>{
          var ndata=async ()=>{
          try{
           var resp=await axios("http://localhost:3001/products/"+name);
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
    
    function addtocarts(){
        async function gotocart(){
                try{
                var res=await axios.post("http://localhost:3001/addtocart", {eid:eid,quantity:quantity,pid:data[0].id});
                var rep=res.data
                console.log("POST request successful"+rep);
                }
                catch(error){
                    console.error();
                }
          }
        gotocart();
        setadded(true);
        setTimeout(()=>{
            setadded(false);
        },2000);
        console.log("quan="+quantity)
    }
    //console.log("data=="+data);
    //console.log(data[0]);
  //const AuthContext = React.createContext();
    return (
            <div className="samp">
            {loading && <div>site is loading</div>}
            {!loading && <div>
            <div className="sampcomp">
            <Prodects item={data[0]}/>
            <div className="cartdet">
            <label>quantity:</label>
            <select onChange={(e)=>setquantity(e.target.value)}>
                <option selected>1</option>
                <option>2</option>
                <option>3</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
            </select>
            <button type="button" className="btn btn-success" onClick={addtocarts}>ADD TO CART</button>
            <button type="button" className="btn btn-warning">BUY NOW</button>
            </div>
            </div>
            <h5>About me</h5>
            <p>{data[0].description}</p>
{added && <div class="toast" style={{display:"flex"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <div class="toast-body">
   Item added to cart
  </div>
    <button type="button" class="ml-2 mb-1 close" onClick={()=>setadded(false)} data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>}
            </div>}
    </div>
   
    )
}