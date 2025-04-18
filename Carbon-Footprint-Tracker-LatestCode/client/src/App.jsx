// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUs';
import CarbonFootprintForm from './components/CarbonFootprintForm';
import PixelatedGalaxy from './components/PixelatedGalaxy';
import Layout from './components/Layout';
import WeeklyGraph from './pages/WeeklyGraph'; 

const App = () => {
  return (
    <Routes>
      <Route path="/load" element={<PixelatedGalaxy />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/calculator" element={<CarbonFootprintForm />} />
        <Route path="/weekly-graph" element={<WeeklyGraph />} />

      </Route>
    </Routes>
  );
};

export default App;
