const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

router.get('/', protect, allowRoles('admin'), getAllUsers);

module.exports = router;
