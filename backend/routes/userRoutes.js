const express = require('express');
const { userAuth } = require('../middleware/auth.js'); // ✅ Fix the import
const { getUserData } = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);

module.exports = userRouter;
