const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Guard = require("../models/securityGuardModel");

exports.authenticate = async (req, res, next) => {
  try {
    
    const token = req.cookies['Society-Management'] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization denied, no token provided' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    let user = await User.findById(decoded.userId);

 
  if (!user) {
    user = await Guard.findById(decoded.userId);
  }

  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User or Guard not found' });
  }

    
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


exports.IsResident = (req, res, next) => {
      
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
  }

  
  if (req.user.role === "resident") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
  }
};
  
  exports.IsSecurity = (req, res, next) => {
      
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
    }
  
    
    if (req.user.role === "security") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
    }
  };
  