const express =require('express')
const { 
    isAuthenticated, 
    login, 
    logout, 
    register, 
    resetPassword, 
    sendResetOtp, 
    sendVerifyOtp, 
    verifyEmail 
  } = require('../controllers/authController');
const {userAuth} =require( '../middleware/auth.js');

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
// authRouter.post('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);
console.log(register, login, logout, sendVerifyOtp, sendResetOtp); // Should not log `undefined`

module.exports= authRouter;