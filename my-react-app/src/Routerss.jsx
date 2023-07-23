import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nnav from './Nnav';
import Home from './Home';
import About from './About';
import Youracc from './Youracc';
import Otp from './Otp';
import Login from './Login';
import Signin from './Signin';
import Samp from './Samp';
import AppContext, { useGc } from './Context'; // Import Gc and useGc individually
import Footer from './Footer';
import Cart from './Cart';
import Seller from './Seller';
export default function Routerss() {
  
  return (
    <div>
      <Router>
        <Nnav />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/Signin" element={<Signin />}/>
          <Route path="/youracc" element={<Youracc />}/>
          <Route path="/Samp/:name" element={<Samp />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}
