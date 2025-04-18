import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal'; // Import the Modal component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modal, setModal] = useState({ visible: false, message: '', type: '' }); // State for modal
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);

                if (!response.data.user.isAccountVerified) {
                    setModal({
                        visible: true,
                        message: 'Your email is not verified. Redirecting to email verification.',
                        type: 'error',
                    });
                    return navigate('/email-verify');
                }

                localStorage.setItem('authToken', response.data.token);
                setModal({
                    visible: true,
                    message: 'Login successful! Redirecting...',
                    type: 'success',
                });

                setTimeout(() => navigate('/load'), 2000); // Navigate after 2 seconds
            }
        } catch (err) {
            console.error('Full Axios Error:', err);
            console.error('Error Response:', err.response);

            setModal({
                visible: true,
                message: err.response?.data?.message || 'Login failed. Try again.',
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
                <h2 className="text-5xl font-bold mb-8 text-center">Login</h2>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                <form className="flex flex-col" onSubmit={handleLogin}>
                    <label className="mb-2 text-xl">Email</label>
                    <input
                        type="email"
                        className="p-4 mb-5 rounded text-black text-lg"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="mb-2 text-xl">Password</label>
                    <input
                        type="password"
                        className="p-4 mb-6 rounded text-black text-lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="bg-green-500 hover:bg-green-600 text-white py-4 text-xl rounded transition-all">
                        Login
                    </button>
                </form>

                <p className="mt-5 text-center text-lg">
                    Don't have an account? <a href="/register" className="text-blue-400">Sign up</a>
                </p>
                <p className="mt-3 text-center text-lg">
                    Forgot password? <a href="/reset-password" className="text-blue-400">Reset</a>
                </p>
            </div>

            {/* Modal */}
            {modal.visible && <Modal message={modal.message} type={modal.type} onClose={closeModal} />}
        </div>
    );
};

export default Login;
