const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Passport config
require("./config/passport-config")(passport); // ✅ correct way


const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ✅ This is correct




// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);





// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());




// After app.use(flash());
app.use((req, res, next) => {

  res.locals.messages = req.flash(); // ✅ This adds all messages
  next();
});


// Make user object available in all views (including partials)
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


console.log("auth:", typeof require("./routes/auth"));       // should be 'function' (router is a function)
console.log("messages:", typeof require("./routes/messages")); // should be 'function'
console.log("profile:", typeof require("./routes/profile"));   // should be 'function'

// Routes
app.use("/auth", require("./routes/auth")); // ✅ CORRECT — assuming your file is named 'auth.js'
app.use("/messages", require("./routes/messages"));
app.use("/profile", require("./routes/profile"));


app.get('/', (req, res) => {
  res.render('home');
});


// ✅ Add this BELOW home route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});



app.get("/force-error", (req, res) => {
  res.render("error", { message: "This is a test error page." });
});



// 404 handler
// Error handler (keep this at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: err.message });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

