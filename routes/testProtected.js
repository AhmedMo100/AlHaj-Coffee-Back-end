const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: 'Welcome, authenticated user',
        user: req.user
    });
});

router.get('/admin', protect, allowRoles('admin'), (req, res) => {
    res.status(200).json({
        message: 'Welcome, admin',
        user: req.user
    });
});

module.exports = router;
