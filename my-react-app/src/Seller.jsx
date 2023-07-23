import React,{useRef} from "react";
import './seller.css'
import axios from "axios";
import Addfile from './Addfile';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import FileDisplay from "./FileDisplay";
export default function(){
    const { eid,seteid}=useGc();
    var [showreq,setshowreq]=React.useState(false);
    var [added,setadded]=React.useState(false);
    var [showoldpr,setshowoldpr]=React.useState(false);
    var [shownp,setshownp]=React.useState(false);
    var [image,setimage]=React.useState({}); 
    const [Name,setName] = React.useState("");
    const [company,setcompany] =React.useState(""); 
    const [price,setprice] =React.useState(""); 
    const [description,setdescription] = React.useState("");
    const [shipping,setshipping] = React.useState("");
    const data = new FormData();
    const handleSubmit = file => {
      
      const encodeImage = (mimetype, arrayBuffer) => {
          let u8 = new Uint8Array(arrayBuffer)
          const b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
          return "data:"+mimetype+";base64,"+b64encoded;
      }
  
      const uploadImage = async () => {
        
        data.append('file', file);
        data.append('filename', file.name);
        data.append('eid', eid);
        data.append('name', Name);
        data.append('price', price);
        data.append('file', image);
        data.append('company', company);
        data.append('description', description);
        data.append('category', shipping);
        // POST request
        const result = await axios.post('http://localhost:3001/addpro', data, { 
                                          headers: { 'Content-Type': 'multipart/form-data'}
        });
        // console.log(result);
        const dataURL = encodeImage(result.data.mimetype, result.data.buffer.data);
        // console.log(dataURL);
        //setAvatars([...avatars, {name: result.data.name, url: dataURL}]);
        console.log("sent successfully");
      }
      uploadImage();
    };
    /*function submit(e){
      e.preventDefault();
      const publish= async () => {
        try {
          const formData = new FormData();
          formData.append('eid', eid);
          formData.append('name', Name);
          formData.append('price', price);
          formData.append('file', image);
          formData.append('company', company);
          formData.append('description', description);
          formData.append('category', shipping);

          //const response = await axios.post("http://localhost:3001/addpro",{eid:eid,name:Name,price:price,file:image,company:company,description:description,category:shipping},{

          
          //const response = await axios.post("http://localhost:3001/addpro",{file:image},{
          const response = await axios.post("http://localhost:3001/addpro",formData,{
          headers: {
            'Content-Type': 'application/json',
            }});
          //setAccount(response.data);
          //setLoading(false);
          console.log("published");
            }
        catch (error) {
          console.log(error.message);
          //setLoading(false);
        }
      };
  
      publish();
      setadded(true);
      setTimeout(()=>{
          setadded(false);
      },2000);
    }
    function images(data){
      setimage(data);
    }*/
    //console.log(Name,"-- ",company," -- ",price," -- ",description," -- ",shipping," -- ",image);
    return (
        <div className="seller">
            <div className="comp">
                <div className="comps">
                <h3>Your present order requests:</h3>
                <button className="button" onClick={()=>{setshowreq(!showreq)}}>{!showreq && <span>+</span>}{showreq && <span>-</span>}</button>
                </div>
                {showreq && <div>sfgewyhf</div>}
                </div>
            <div className="comp">
            <div className="comps"><h3>Your old products:</h3><button className="button" onClick={()=>{setshowoldpr(!showoldpr)}}>{!showoldpr && <span>+</span>}{showoldpr && <span>-</span>}</button></div>
            {showoldpr && <div>sfgewyhf</div>}
            </div>
            <div className="comp">
            <div className="comps"><h3>Add new product:</h3>
             <button className="button" onClick={()=>{setshownp(!shownp)}}>{!shownp && <span>+</span>}{shownp && <span>-</span>}</button></div>
            {shownp &&     <div className="form">
      <form >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e)=>{setName(e.target.value)}} required placeholder="Product Name" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" onChange={(e)=>{setprice(e.target.value)}} required placeholder="Price" />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input type="text" id="company" onChange={(e)=>{setcompany(e.target.value)}} required placeholder="Company" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" onChange={(e)=>{setdescription(e.target.value)}} required placeholder="Write about the product"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Category:</label>
          <input type="text" id="shipping" onChange={(e)=>{setshipping(e.target.value)}} required placeholder="Will it be available for shipping?" />
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Images:</label>
          <label>
                <input type="file" name="avatar" onChange={e => handleSubmit(e.target.files[0])}/>
                Choose file to upload
            </label>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
      {added && <div class="toast" style={{display:"flex"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <div class="toast-body">
   Product Successfully added
  </div>
    <button type="button" class="ml-2 mb-1 close" onClick={()=>setadded(false)} data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>}
    </div>
                }
            </div>
        </div>
    );
}
/*
<Addfile imag={images}/>
*/