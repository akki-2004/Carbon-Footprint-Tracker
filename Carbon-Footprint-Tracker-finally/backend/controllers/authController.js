const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel.js');
const userModel = require('../models/userModel.js'); 

const transporter = require('../config/nodemailer.js');

// **Register Function**
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          

        try {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to this website',
                text: `Welcome to the website. Your account has been created with email: ${email}`
            };
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Email sending error:', emailError.message);
        }

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// **Login Function**
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified 
            }
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// **Logout Function**
const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// **Send OTP for Email Verification**
// ✅ Send OTP to user's email
const sendVerifyOtp = async (req, res) => {
    try {
        console.log("📩 OTP route hit!");
        console.log("Middleware User Object in sendVerifyOtp:", req.user);

        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing from token" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. It will expire in 24 hours.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("✅ OTP sent to:", user.email);
        } catch (emailError) {
            console.error('🚨 Email sending error:', emailError.message);
            return res.status(500).json({ success: false, message: "Failed to send OTP email" });
        }

        res.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.error("🚨 sendVerifyOtp error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Verify Email with OTP
const verifyEmail = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp !== req.body.otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();

        res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error("🚨 verifyEmail error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    resetPassword,
    sendResetOtp
};
