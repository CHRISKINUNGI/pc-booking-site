const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const zxcvbn = require('zxcvbn'); // Import zxcvbn
const User = require('../models/user');

// Redirect to login page
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Registration
router.get('/register', (req, res) => {
  res.render('register', { error: req.query.error, message: req.query.message });
});

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Validate username length
  if (username.length < 8) {
    return res.redirect('/register?error=Username must be at least 8 characters long');
  }

  // Check password strength using zxcvbn
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) { // Adjust threshold as needed
    return res.redirect('/register?error=Password is too weak. Please use a stronger password.');
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.redirect('/register?error=User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role: role || 'user' });
    res.redirect('/login?message=Registration successful! You can now log in.');
  } catch (error) {
    console.error(error);
    res.redirect('/register?error=Server error');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { error: req.query.error, message: req.query.message });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/pcs');
    } else {
      res.redirect('/login?error=Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login?error=Server error');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/pcs?error=Could not log out');
    }
    res.redirect('/login?message=Successfully logged out');
  });
});

module.exports = router;
