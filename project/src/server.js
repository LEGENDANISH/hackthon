const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.connectDatabase();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());

        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        });
        this.app.use(limiter);
    }

    async connectDatabase() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1);
        }
    }

    setupRoutes() {
        this.app.use('/api/auth', require('./routes/authRoutes'));
        this.app.use('/api/farms', require('./routes/farmRoutes'));
        this.app.use('/api/crops', require('./routes/cropRoutes'));
        this.app.use('/api/weather', require('./routes/weatherRoutes'));
        this.app.use('/api/iot', require('./routes/iotRoutes'));
    }

    start(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

const server = new Server();
server.start(process.env.PORT || 3000); 