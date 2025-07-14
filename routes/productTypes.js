const express = require('express');
const router = express.Router();

const ProductType = require('../models/ProductType');
const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// POST /api/types - Add new product type (admin only)
router.post('/', protect, allowRoles('admin'), async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await ProductType.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: 'Type already exists' });
        }

        const newType = await ProductType.create({ name });
        res.status(201).json(newType);
    } catch (err) {
        res.status(500).json({ message: 'Server error while adding type' });
    }
});

// GET /api/types - Get all types
router.get('/', async (req, res) => {
    try {
        const types = await ProductType.find().sort({ createdAt: -1 });
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch types' });
    }
});

module.exports = router;
