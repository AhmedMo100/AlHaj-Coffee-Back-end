const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Create Product (Admin only)
router.post('/', protect, allowRoles('admin'), upload.single('image'), createProduct);

// Get All Products
router.get('/', getAllProducts);

// Get One Product
router.get('/:id', getProductById);

// Update Product (Admin only)
router.put('/:id', protect, allowRoles('admin'), upload.single('image'), updateProduct);

// Delete Product (Admin only)
router.delete('/:id', protect, allowRoles('admin'), deleteProduct);

module.exports = router;
