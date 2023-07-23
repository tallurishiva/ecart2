import React from "react";
export default function Users(){
    var [user,setuser]=React.useState([]);
    var [newusers,setnewusers]=React.useState(user);
    var [search,setsearch]=React.useState("");
    var url="https://api.github.com/users";
    var url1="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=aaefc445754da1f7f1ea5961a8351dff";
    React.useEffect(()=>{
              var data=async ()=>{
              try{
              var resp=await fetch(url);
              var newdata=await resp.json();
              setuser(newdata);
              //setnewusers(newdata);
              //console.log(user);
            }
              catch(error){
                console.error();
              }
        }
        data();
    },[user]);
    function searched(e){
       //e.preventDefault();
       setsearch(e.target.value);
        console.log(search);
        setnewusers(user.filter(item=> item.login.includes(search)));
        console.log(newusers);
    }
    
    //var newusers=user.filter(item=> item.login.includes(""));
    //console.log(newusers);
    //item.name.toLowerCase().includes(searchTerm.toLowerCase()
    return ( <div>
        <div className="search"><input type="text" placeholder="search" onChange={searched}/></div>
        <div className="Sidebar">
        {newusers.map(ur=>{
        return <li style={{listStyle:"none"}}>
            <img src={ur.avatar_url} alt={ur.login} style={{width:500,height:500,borderRadius:20,margin:50}}/>
            <h1  style={{margin:50,marginTop:0}}>{ur.login}</h1>
            </li>
       })}
    </div></div>);
}
/*  {user.map(ur=>{
        return <li style={{listStyle:"none"}}>
            <img src={ur.avatar_url} alt={ur.login} style={{width:500,height:500,borderRadius:20,margin:50}}/>
            <h1  style={{margin:50,marginTop:0}}>{ur.login}</h1>
            </li>
       })}*/