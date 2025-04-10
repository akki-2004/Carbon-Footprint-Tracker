const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    // ✅ Check if the Authorization header is present
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No authentication token, access denied.' });
    }

    // ✅ Extract token properly
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication token missing or invalid.' });
    }

    // ✅ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }

    // ✅ Find user in DB and validate token existence
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or token mismatch.' });
    }

    // ✅ Attach user & token to request
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error("❌ Authentication Middleware Error:", error.message);
    res.status(500).json({ success: false, message: 'Internal server error in authentication.' });
  }
};

const userAuth = async (req, res, next) => {
  const token = req.cookies?.token; 

  if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, please log in" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
  } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token, please log in again" });
  }
};

module.exports = {auth,userAuth};
