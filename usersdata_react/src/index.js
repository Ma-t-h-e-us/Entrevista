import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Pages/login';
import Register from './Pages/regisiter';
import Home from './Pages/home'

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} /> {/* Login */}
        <Route path="/Login" element={<Login />} /> {/* Login */}
        <Route path='registerUser' element={<Register />} /> 
        <Route path='Home' element={<Home/>}/> 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
