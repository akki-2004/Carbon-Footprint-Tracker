import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '' });
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/send-reset-otp', { email: form.email });
      alert('OTP sent to your email.');
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP.');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/reset-password', form);
      if (response.data.success) {
        alert('Password reset successful! Login now.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password.');
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen text-white"
      style={{ backgroundImage: "url('/LOGIN1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="bg-black bg-opacity-60 p-12 rounded-lg shadow-lg w-[450px] mt-[-550px]">
        <h2 className="text-4xl font-bold mb-8 text-center">Reset Password</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="flex flex-col" onSubmit={handleReset}>
          <label className="mb-2 text-xl">Email</label>
          <input type="email" name="email" className="p-4 mb-5 rounded text-black text-lg" placeholder="Enter email" value={form.email} onChange={handleChange} required />

          {otpSent && (
            <>
              <label className="mb-2 text-xl">OTP</label>
              <input type="text" name="otp" className="p-4 mb-5 rounded text-black text-lg" placeholder="Enter OTP" value={form.otp} onChange={handleChange} required />

              <label className="mb-2 text-xl">New Password</label>
              <input type="password" name="newPassword" className="p-4 mb-6 rounded text-black text-lg" placeholder="Enter new password" value={form.newPassword} onChange={handleChange} required />
            </>
          )}

          {!otpSent ? (
            <button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 text-xl rounded transition-all" onClick={sendOtp}>
              Send OTP
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-600 text-white py-4 text-xl rounded transition-all">
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
