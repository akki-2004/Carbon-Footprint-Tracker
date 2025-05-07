import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import logo from '../assets/logo.svg';

const Navbars = () => {
  const navigate = useNavigate();

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:px-24 bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-md'>
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='w-28 sm:w-32' />
      </div>
      
      <ul className='flex space-x-6 text-lg'>
        <li className='flex items-center space-x-2 cursor-pointer hover:text-green-400' onClick={() => navigate('/')}> 
          <FaHome /> <span>Home</span>
        </li>
      </ul>
      
      <button
        onClick={() => navigate('/login')}
        className='border border-white rounded-full px-6 py-2 text-white hover:bg-gray-700 transition-all'
      >
        Login
      </button>
    </nav>
  );
};

export default Navbars;