const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findById('68682a0de4ca575f2fdfc717').select('+email');
    console.log("Recipient user is:", user);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));

