import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal'; // Import the Modal component

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ visible: false, message: '', type: '' }); // State for modal
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

        // Show success modal
        setModal({
          visible: true,
          message: 'Registration successful! Please verify your email.',
          type: 'success',
        });

        setTimeout(() => navigate('/email-verify'), 2000); // Navigate after 2 seconds
      }
    } catch (err) {
      console.log(err);
      
      // Show error modal
      setModal({
        visible: true,
        message: err.response?.data?.message || 'Registration failed.',
        type: 'error',
      });
    }
  };

  const closeModal = () => {
    setModal({ visible: false, message: '', type: '' }); // Close modal
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

      {/* Modal */}
      {modal.visible && <Modal message={modal.message} type={modal.type} onClose={closeModal} />}
    </div>
  );
};

export default Register;
