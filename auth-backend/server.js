require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1); // Exit the process if the database connection fails
    });
