import React from 'react';
import './footer.css';
import { useNavigate } from 'react-router-dom';
function Footer(){
    var nav=useNavigate();
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item" onClick={()=>{nav("/Home")}}>Home</li>
          <li className="nav-item"onClick={()=>{nav("/Home")}}>Features</li>
          <li className="nav-item" onClick={()=>{nav("/About")}}>About</li>
          <li className="nav-item" onClick={()=>{nav("/Home")}}>FAQs</li>
          <li className="nav-item" onClick={()=>{nav("/About")}}>Contact Us</li>
        </ul>
        <p className="text-center text-body-secondary">© 2023 Company, Inc</p>
      </footer>
    </div>
  );
}

export default Footer;
