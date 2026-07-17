import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if it's the legacy admin
    if (decoded.username !== 'admin') {
      const user = await User.findOne({ username: decoded.username, active: true });
      if (!user) {
        return res.status(401).json({ message: 'User account is deactivated or deleted' });
      }
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
