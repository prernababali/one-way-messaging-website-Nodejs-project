const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const User = require('../models/User');

// View profile
router.get('/', ensureAuth, (req, res) => {
  res.render('profile', { user: req.user });
});

// Update profile
router.post('/update', ensureAuth, async (req, res) => {
    console.log("🟢 BODY RECEIVED:", req.body); // ADD THIS
  try {
    const { bio } = req.body;
    const updateData = { bio };

    await User.findByIdAndUpdate(req.user._id, updateData);
    req.flash('success_msg', 'Profile updated!');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Could not update profile');
    res.redirect('/profile');
  }
});


module.exports = router;
