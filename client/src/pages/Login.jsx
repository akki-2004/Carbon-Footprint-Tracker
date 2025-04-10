// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
                alert('Login successful!');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);

                if (!response.data.user.isAccountVerified) {
                    alert('Your email is not verified. Redirecting to email verification.');
                    return navigate('/email-verify');
                }

                localStorage.setItem('authToken', response.data.token);
                navigate('/');
            }
        } catch (err) {
            console.error('Full Axios Error:', err);
            console.error('Error Response:', err.response);
            setError(err.response?.data?.message || 'Login failed. Try again.');
        }
        
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen text-white"
            style={{ backgroundImage: "url('/LOGIN1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="bg-black bg-opacity-60 p-12 rounded-lg shadow-lg w-[-400px] mt-[-200px]">
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
        </div>
    );
};

export default Login;

