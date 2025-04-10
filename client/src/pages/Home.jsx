import React from 'react';

import Header from '../components/Header';
import Navbars from '../components/Navbars';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: "url('/bg_img.png')" }}
    >
      <Navbar />
      <Header />
    </div>
  );
}

export default Home;
