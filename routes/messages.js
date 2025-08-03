const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');

console.log("ensureAuth actual:", ensureAuth);

const Message = require('../models/Message');
const User = require('../models/User');



// GET chat with a specific user
router.get('/chat/:id', ensureAuth, async (req, res) => {
  const recipient = await User.findById(req.params.id);
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: req.params.id },
      { sender: req.params.id, receiver: req.user._id }
    ]
  }).sort({ createdAt: 1 });

  res.render('chat', { messages, recipient, user: req.user });
});




// Inbox
router.get('/inbox', ensureAuth, async (req, res) => {
  const messages = await Message.find({ receiver: req.user._id }).populate('sender');
  res.render('messages/inbox', { messages, user: req.user });

});

// Compose message form

router.get('/compose', ensureAuth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.render('messages/compose', { users });
});

// Send message
router.post('/compose', ensureAuth, async (req, res) => {
  console.log("🟢 COMPOSE FORM DATA:", req.body);
  const { receiverId, content } = req.body;

  const message = new Message({
    sender: req.user._id,
    receiver: receiverId,
    content,
  });

  await message.save();
  req.flash('success_msg', 'Message sent!');
  res.redirect('/messages/inbox');
});


// POST message
router.post('/send/:id', ensureAuth, async (req, res) => {
  const { content } = req.body;
  if (!content.trim()) return res.redirect(`/messages/chat/${req.params.id}`);

  await Message.create({
    sender: req.user._id,
    receiver: req.params.id,
    content
  });

  res.redirect(`/messages/chat/${req.params.id}`);
});

module.exports = router;
