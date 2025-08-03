// middleware/ensureAuth.js

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/auth/login');
}

module.exports = ensureAuth; // ✅ This is required!
