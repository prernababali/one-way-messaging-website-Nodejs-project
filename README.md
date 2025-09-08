# Secure Messaging Web Application

A full-stack messaging platform where users can securely sign up, log in, view their inbox, and exchange direct messages with others. Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, this app showcases secure session-based communication, user authentication, CRUD operations, profile management, and basic one-on-one messaging functionality — all wrapped in a clean Bootstrap interfaces. This project was developed as part of a full-stack assignment with a strong emphasis on secure authentication, real-time user interaction via form-based messaging, session handling, and dynamic views using server-side rendering. It follows a clean MVC-style structure with the use of middleware, flash alerts, and database persistence using **Mongoose ODM** for MongoDB.


## Core Features

### Authentication & Session Management
- Register/login using email and password
- Passwords are securely hashed via `bcryptjs`
- Persistent sessions managed using `express-session` with MongoDB storage

### One-to-One Messaging System
- Authenticated users can view an inbox, select a recipient, and exchange messages
- Chat history is stored and sorted chronologically
- Messages are stored in a separate Mongoose model with sender/receiver references

### User Profile
- Authenticated users can view and update their personal profile (bio, display name)
- Profile page shows current user data with live updates

### Flash Messaging
- Success/error messages are displayed using `connect-flash` for better UX
- Alerts shown on registration, login, logout, and profile updates

### Protected Routes
- Middleware `ensureAuth` restricts access to messaging, profile, and dashboard pages unless logged in



## Screenshots

> **Dashboard**
>  
> ![Dashboard](./screenshots/dashboard.png)

> **Chat Interface**
>  
> ![Chat](./screenshots/chat.png)



## Technologies Used


| Category     | Stack                                  |
|--------------|----------------------------------------|
| Frontend     | EJS (Embedded JavaScript), Bootstrap 5 |
| Backend      | Node.js, Express.js                    |
| Database     | MongoDB + Mongoose                     |
| Auth         | Passport.js (Local Strategy)           |
| Sessions     | express-session + connect-mongo        |
| Flash Alerts | connect-flash                          |



## Folder Structure

messaging-app/

├── app.js

├── .env

├── models/

│ ├── User.js

│ └── Message.js

├── routes/

│ ├── auth.js // Register, login, logout

│ ├── messages.js // Chat system

│ └── profile.js // Profile view and update

├── views/

│ ├── auth/ // login.ejs, register.ejs

│ ├── partials/ // header.ejs, footer.ejs, flash.ejs

│ ├── dashboard.ejs

│ ├── profile.ejs

│ ├── chat.ejs

│ ├── messages/

│ │ ├── inbox.ejs

│ │ └── compose.ejs

│ └── error.ejs

├── public/ // Static assets (CSS, images)

└── package.json


## How It Works

### Authentication Flow
- New users register via `/register`
- On login (`/login`), Passport.js verifies credentials
- `express-session` stores session ID in cookie
- Middleware protects all routes requiring auth

###  Messaging Logic
- Each message has a `sender`, `receiver`, `content`, and `createdAt`
- Messages are retrieved by filtering messages where `req.user` is either sender or receiver
- `/messages/inbox` shows messages received
- `/messages/chat/:id` opens a private conversation thread

###  Profile Update
- Users can update their `bio` via `/profile`
- Bio is stored in the `User` model
- Flash message confirms update with “Profile updated!”


## What You’ll Learn (Talking Points)
1.  How Passport.js helps in secure login workflows

2.  How middleware protects routes and ensures session persistence

3.  How MongoDB is structured for 1-to-1 messaging (sender/receiver with object refs)

4.  How EJS templates dynamically render content based on user and route data

5.  The balance of security, simplicity, and user experience in a form-based app




Developed by Prerana Bubbly as part of a backend full-stack Node.js course assignment.
