import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaCalculator, FaChartBar, FaUsers, FaGlobeAmericas, FaRobot } from 'react-icons/fa';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // optional, if you're storing token
    navigate('/login');
  };

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:px-24 bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-md'>
      <div className='flex items-center space-x-4'>
        <img src={logo} alt='logo' className='w-28 sm:w-32' />
      </div>

      <ul className='hidden sm:flex space-x-6 text-lg'>
        <li className='flex items-center space-x-2 cursor-pointer hover:text-green-400' onClick={() => navigate('/')}> 
          <FaHome /> <span>Home</span>
        </li>
     



        <li className='flex items-center space-x-2 cursor-pointer hover:text-green-400' onClick={() => navigate('/about')}> 
          <FaInfoCircle /> <span>About Us</span>
        </li>
        <li className='flex items-center space-x-2 cursor-pointer hover:text-green-400' onClick={() => navigate('/calculator')}> 
          <FaCalculator /> <span>CFT Calculator</span>
        </li>
        <li className='flex items-center space-x-2 cursor-pointer hover:text-green-400' onClick={() => navigate('/weekly-graph')}> 
          <FaChartBar /> <span>Data Analytics</span>
        </li>
        <li className='flex items-center space-x-1 cursor-pointer hover:text-green-400' onClick={() => navigate('/carbonella')}> 
  <FaRobot />
  <span className='flex items-center space-x-1'>
    <span>Carbonella</span>
    <span className='text-sm animate-bounce'>💫</span>
  </span>
</li> 
        <li className='flex items-center space-x-2 cursor-pointer hover:text-green-400' onClick={() => navigate('/community')}> 
          <FaUsers /> <span>Community</span>
        </li>
      </ul>

      {user ? (
        <div className='flex items-center space-x-4'>
          <span className='text-lg font-medium'>Hi, {user.name} 👋</span>
          <button
            onClick={handleLogout}
            className='border border-white rounded-full px-6 py-2 text-white hover:bg-gray-700 transition-all'
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='border border-white rounded-full px-6 py-2 text-white hover:bg-gray-700 transition-all'
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
