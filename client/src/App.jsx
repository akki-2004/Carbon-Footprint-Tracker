import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUs' ;
import  CarbonFootprintCalculator  from './pages/CarbonFootprintCalculator';
import CarbonFootprintForm from './components/CarbonFootprintForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/about' element={<AboutUs />} />  
        <Route path='/calculator' element={<CarbonFootprintForm />} />
      </Routes>
    </div>
  );
};

export default App;
