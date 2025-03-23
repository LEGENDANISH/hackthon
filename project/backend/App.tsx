const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crop');
const weatherRoutes = require('./routes/weather');
const irrigationRoutes = require('./routes/irrigation');
const analyticsRoutes = require('./routes/analytics');
const iotRoutes = require('./routes/iot');

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/iot', iotRoutes);
