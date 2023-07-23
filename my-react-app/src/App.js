import './App.css';
import Routerss from './Routerss';
  import AppContext,{useGc} from './Context'; // Import Gc and useGc individually
import axios from 'axios';
import Addfile from './Addfile';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  
  return (
    <div>
      <AppContext>
        <Routerss />
      </AppContext>
    </div>
  );
}

export default App;
/*
AppContext>
        <Routerss />
      </AppContext>
*/