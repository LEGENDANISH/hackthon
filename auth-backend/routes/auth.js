// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const User = require('../models/User');

const authenticateToken = require('../middleware/authMiddleware');

// Ensure JWT_SECRET is set
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

// Zod schema for signup
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(1, 'First name is required'),
    lastName: zod.string().min(1, 'Last name is required'),
    password: zod.string().min(6, 'Password must be at least 6 characters'),
});

// Zod schema for signin
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6, 'Password must be at least 6 characters'),
});

// Signup Route
router.post('/signup', async (req, res) => {
    const parsed = signupBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid input', errors: parsed.error.format() });
    }

    try {
        console.log("User model:", User);

        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Signin Route
router.post('/signin', async (req, res) => {
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid input', errors: parsed.error.format() });
    }

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Signin successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Protected Route Example
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
