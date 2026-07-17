import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, active: true });
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
        departmentId: user.departmentId,
        displayName: user.displayName,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({
      success: true,
      token,
      user: {
        username: user.username,
        role: user.role,
        departmentId: user.departmentId,
        displayName: user.displayName,
      },
    });
  }

  const isLegacyAdmin = username === 'admin';
  const isMatch = process.env.ADMIN_PASSWORD_HASH
    ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    : false;

  if (isLegacyAdmin && isMatch) {
    const token = jwt.sign(
      { username, role: 'super_admin', departmentId: null, displayName: 'Super Admin', isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({
      success: true,
      token,
      user: { username, role: 'super_admin', departmentId: null, displayName: 'Super Admin' },
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.post('/verify', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.json({ valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true, user: decoded });
  } catch {
    return res.json({ valid: false });
  }
});

export default router;
