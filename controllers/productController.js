const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const {
            name, desc, type, price, weight, roast
        } = req.body;

        const image = req.file ? req.file.filename : null;

        const product = await Product.create({
            name, desc, type, price, weight, roast, image
        });

        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('type');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('type');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const {
            name, desc, type, price, weight, roast
        } = req.body;

        const updatedFields = {
            name, desc, type, price, weight, roast
        };

        if (req.file) {
            updatedFields.image = req.file.filename;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};
