const Order = require('../models/Order');
const Product = require('../models/Product');

// Place orders in mongo db
exports.placeOrder = async (req, res) => {
    try {
        const { products, shippingInfo } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No products provided' });
        }

        if (!shippingInfo || !shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
            return res.status(400).json({ message: 'Shipping information is incomplete' });
        }

        // Calculate total price based on products and their prices
        let totalPrice = 0;

        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ message: `Product not found: ${item.product}` });
            }

            totalPrice += product.price * (item.quantity || 1);
        }

        // Create order
        const order = await Order.create({
            user: req.user.id,
            products,
            shippingInfo,
            totalPrice
        });

        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Place Order Error:', error.message);
        res.status(500).json({ message: 'Failed to place order' });
    }
};

// Get my orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product', 'name price image');

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Get My Orders Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch your orders' });
    }
};

// Update orders with status by admins
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        console.log('Order ID:', orderId);
        console.log('New Status:', status);

        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            console.log('Order not found.');
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        console.error('❌ Update Order Status Error:', error.message);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};


