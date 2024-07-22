const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/user');

// Middleware to authenticate and get the current user
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

// GET all users (for administrative purposes; consider adding authentication/authorization)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    try {
        // Validate request data
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "Email already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save new user
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        // Generate auth token
        const token = newUser.generateAuthToken();

        // Send response
        res.status(201).send({ message: "User created successfully", token });
    } catch (error) {
        console.error("Internal Server Error: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// GET current user
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if (!user) return res.status(404).send({ message: 'User not found.' });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
