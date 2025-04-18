import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal'; // Import the Modal component

const EmailVerify = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState({ visible: false, message: '', type: '' }); // Modal state
  const navigate = useNavigate();

  // Automatically send OTP when page loads
  useEffect(() => {
    axios
      .post('http://localhost:5000/api/auth/send-verify-otp', {}, { withCredentials: true })
      .then(() => {
        setModal({
          visible: true,
          message: 'OTP sent to your email.',
          type: 'success',
        });
      })
      .catch((err) => {
        setModal({
          visible: true,
          message: err.response?.data?.message || 'Failed to send OTP. Please try again.',
          type: 'error',
        });
      });
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/verify-account',
        { otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        setModal({
          visible: true,
          message: 'Email verified successfully! You can now login.',
          type: 'success',
        });
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setModal({
        visible: true,
        message: err.response?.data?.message || 'Invalid OTP. Try again.',
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
      style={{ backgroundImage: "url('/LOGIN1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-black bg-opacity-60 p-12 rounded-lg shadow-lg w-[450px] mt-[-50px]">
        <h2 className="text-4xl font-bold mb-8 text-center">Verify Email</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {message && <p className="text-green-400 text-center mb-4">{message}</p>}

        <form className="flex flex-col" onSubmit={handleVerify}>
          <label className="mb-2 text-xl">Enter OTP</label>
          <input
            type="text"
            className="p-4 mb-5 rounded text-black text-lg"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="bg-blue-500 hover:bg-blue-600 text-white py-4 text-xl rounded transition-all">
            Verify
          </button>
        </form>
      </div>

      {/* Modal */}
      {modal.visible && <Modal message={modal.message} type={modal.type} onClose={closeModal} />}
    </div>
  );
};

export default EmailVerify;
