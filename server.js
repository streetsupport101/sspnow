const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to DB
connectDB();

// Import Routes
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

// Route Middlewares
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
