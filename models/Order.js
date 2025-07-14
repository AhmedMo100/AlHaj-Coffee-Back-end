const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' 
            },
            quantity: { 
                type: Number, 
                required: true 
            }
        }
    ],
    shippingInfo: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
