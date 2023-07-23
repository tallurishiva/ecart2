import React from "react";
import Samp from "./Samp";
import Nav from './Nav';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import {BrowserRouter as Router,Routes, Route, Link ,useNavigate} from 'react-router-dom';
import Addpro from "./Addpro";
import axios from "axios";
export default function Prodects(props){
       const { eid,seteid}=useGc();
      // console.log("eid"+eid);
       const nav=useNavigate();
       //var imgsrc=props.item.image;
       var [cart,setcart]=React.useState(0);
       var [show,setshow]=React.useState(false);
       function handlecart(data){
        setcart(data);
       }
       //console.log("emi:"+props.emi);
      
       console.log("data="+cart);
       function clicked(){
            console.log("i am clicked");
            if(props.item.image==="notfound"){
               var url="/Samp/"+props.item._id;
            }
            else{
            var url="/Samp/"+props.item.id;}
            nav(url);
       }
       console.log("props=="+props.item.image," --",props.item.newimg);
       //const bufferData = props.item.newimg;
       //const dataArray = bufferData.data;
       return (
       <div className="prodects" onClick={clicked}> 
        {props.item.image==="notfound"  && <img src={`props.item.newimg:${props.item.newimg.contentType};base64, ${Buffer.from(props.item.newimg.data).toString('base64')}`} alt={props.item.name} style={{height:300,width:500,borderRadius:10,margin:10}}/>}
        {props.item.image!="notfound" && <img src={props.item.image} alt={props.item.name} style={{height:300,width:500,borderRadius:10,margin:10}}/>}
        <div className="proddet">
        <div>
        <h3>{props.item.name}</h3>
        <p>${props.item.price}</p>
        </div>
        </div>
        
        </div>
       );
}
/*
import React, { useEffect, useState } from "react";
import Samp from "./Samp";
import Nav from './Nav';
import AppContext, { useGc } from './Context';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Addpro from "./Addpro";
import axios from "axios";

export default function Prodects(props) {
  const { eid, seteid } = useGc();
  const nav = useNavigate();
  const [cart, setcart] = useState(0);
  const [show, setshow] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // State variable to hold the image URL

  useEffect(() => {
    // Convert the base64 image to Blob object
    if (props.item.image == "notfound") {
      const imageBlob = b64toBlob(props.item.newimg, 'image/jpeg');
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageSrc(imageUrl);
    }
  }, [props.item.image]);

  function handlecart(data) {
    setcart(data);
  }

  function clicked() {
    if (props.item.image === "notfound") {
      var url = "/Samp/" + props.item._id;
    } else {
      var url = "/Samp/" + props.item.id;
    }
    nav(url);
  }

  return (
    <div className="prodects" onClick={clicked}>
      {imageSrc && (
        <img src={imageSrc} alt={props.item.name} style={{ height: 300, width: 500, borderRadius: 10, margin: 10 }} />
      )}
      {!imageSrc && (
        <img src={props.item.image} alt={props.item.name} style={{ height: 300, width: 500, borderRadius: 10, margin: 10 }} />
      )}
      <div className="proddet">
        <div>
          <h3>{props.item.name}</h3>
          <p>${props.item.price}</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert base64 to Blob object
function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
*/