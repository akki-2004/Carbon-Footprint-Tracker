// File: src/App.jsx

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
import AiBot from './AIModel/AiBot';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import ChatPage from './pages/ChatPage';
import Community from './pages/Community';
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <Routes>
      <Route path="/load" element={<PixelatedGalaxy />} />
      <Route path="/carbonella" element={<AiBot />} />
      <Route path="/chat" element={<ChatPage />} />

      {/* All these pages share the main Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/calculator" element={<CarbonFootprintForm />} />
        <Route path="/weekly-graph" element={<WeeklyGraph />} />
        <Route path="/community" element={<Community />} />

        {/* NEW: standalone leaderboard test route */}
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default App;