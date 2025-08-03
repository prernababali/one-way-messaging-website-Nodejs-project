const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Show login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Show register page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Register handle
router.post('/register', async (req, res) => {
    console.log('FORM DATA:', req.body);

  const { username, email, password, password2 } = req.body;
  const errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', { errors, username, email, password, password2 });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.push({ msg: 'Email is already registered' });
      return res.render('auth/register', { errors, username, email, password, password2 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { errors: [{ msg: 'Something went wrong' }] });
  }
});

// Login handle
router.post('/login', (req, res, next) => {
     console.log("BODY:", req.body); 
  passport.authenticate('local', {
    successRedirect: '/messages/inbox',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;
