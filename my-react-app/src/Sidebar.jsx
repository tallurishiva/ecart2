import React from "react";
export default function Sidebar(){
    var [pos,setpos]=React.useState(0);
    function move(event){
        //console.log(event.clientX+"--"+event.clientY);
        setpos=event.clientX;
        //document.querySelector(".Sidebar").classList;
        document.querySelector(".Sidebar").innerHTML("<p>hello,<p>");
        //console.log(document.querySelector(".Sidebar").addEventListener());
    }
    return (<div className="Sidebar" draggable onDrag={move}>
       <h1>its judt beginning</h1>
    </div>);
}