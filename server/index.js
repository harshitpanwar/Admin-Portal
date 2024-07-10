// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Example CORS configuration allowing all origins with credentials

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  
  }));
  
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/superadmin', require('./routes/superAdminRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api', require('./routes/customerRoutes'));
// MongoDB Connection

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/adminportal';

mongoose.connect(MONGO_URI).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

// after DB connection is successful, create super admin
mongoose.connection.once('open', () => {
    if(process.env.SUPERADMIN_USERNAME && process.env.SUPERADMIN_PASSWORD) {
        const {createSuperAdmin} =  require('./utils/createSuperAdmin');
        createSuperAdmin();
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
