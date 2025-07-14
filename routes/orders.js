const express = require('express');
const router = express.Router();

const { placeOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// Place new order
router.post('/', protect, placeOrder);

// Get logged-in user’s orders
router.get('/my', protect, getMyOrders);

// Admin route: change status
router.put('/:orderId/status', protect, allowRoles('admin'), updateOrderStatus);

module.exports = router;
