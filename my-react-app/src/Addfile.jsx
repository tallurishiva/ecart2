/*import React, { useState } from 'react';

const ImageUploader = (props) => {
  const [base64Image, setBase64Image] = useState('');
  //var imagefile=new FormData();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64 = e.target.result;
      props.imag(base64);
      setBase64Image(base64);
    };
    reader.readAsDataURL(file);
    props.imag(file);
    //console.log(event.target.files[0]);
    //imagefile.append("image",event.target.files[0]);
    //console.log(imagefile);
    //props.imag(event.target.files[0]);
  }
  //console.log("file==",base64Image);
  return (
    <div>
      <input type="file" required onChange={handleImageUpload}/>
      {base64Image && <img style={{height:250,width:300}} src={base64Image} alt="Uploaded" />}
    </div>
  );
};
export default ImageUploader;*/
import React, { useState } from "react";
import axios from "axios";

export default function ImageUpload(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData = e.target.result;
      setSelectedImage(imageData);
    };
    props.imag(file);
    reader.readAsDataURL(file);
  };

  const handleImageSubmit = () => {
    // Make an API request to upload the image to the server
    axios
      .post("http://localhost:3001/uploadImage", { image: selectedImage })
      .then((response) => {
        console.log("Image uploaded successfully");
      })
      .catch((error) => {
        console.log("Failed to upload image:", error);
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <img src={selectedImage} alt="Selected" style={{ width: 200, height: 200 }} />
      )}
      <button onClick={handleImageSubmit}>Submit</button>
    </div>
  );
}

