import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', form);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        alert('Registration successful! Please verify your email.');
        navigate('/email-verify');
      }
    } catch (err) {
      console.log(err);
      
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-white"
      style={{ backgroundImage: "url('/LOGIN1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="bg-black bg-opacity-60 p-12 rounded-lg shadow-lg w-[450px] mt-[-200px]">
        <h2 className="text-5xl font-bold mb-8 text-center">Register</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="flex flex-col" onSubmit={handleRegister}>
          <label className="mb-2 text-xl">Name</label>
          <input type="text" name="name" className="p-4 mb-5 rounded text-black text-lg" placeholder="Enter your name" value={form.name} onChange={handleChange} required />

          <label className="mb-2 text-xl">Email</label>
          <input type="email" name="email" className="p-4 mb-5 rounded text-black text-lg" placeholder="Enter your email" value={form.email} onChange={handleChange} required />

          <label className="mb-2 text-xl">Password</label>
          <input type="password" name="password" className="p-4 mb-6 rounded text-black text-lg" placeholder="Enter your password" value={form.password} onChange={handleChange} required autoComplete='current-password' />

          <button className="bg-green-500 hover:bg-green-600 text-white py-4 text-xl rounded transition-all">
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-lg">
          Already have an account? <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
