import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import { logAudit } from '../lib/audit.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: { success: false, message: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

router.post('/login', loginLimiter, async (req, res) => {
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
    await logAudit({ action: 'auth.login_success', entityType: 'user', entityId: user._id, user });
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
    await logAudit({ action: 'auth.login_success', entityType: 'user', entityId: 'legacy_admin', user: { username } });
    return res.json({
      success: true,
      token,
      user: { username, role: 'super_admin', departmentId: null, displayName: 'Super Admin' },
    });
  }

  await logAudit({ action: 'auth.login_failed', entityType: 'user', entityId: username, meta: { reason: 'Invalid credentials' } });
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.post('/verify', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.json({ valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username !== 'admin') {
      const user = await User.findOne({ username: decoded.username, active: true });
      if (!user) return res.json({ valid: false });
    }
    return res.json({ valid: true, user: decoded });
  } catch {
    return res.json({ valid: false });
  }
});

export default router;
