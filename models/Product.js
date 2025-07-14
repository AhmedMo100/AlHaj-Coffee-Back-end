const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true
    },
    price: { type: Number, required: true },
    weight: { type: String },
    roast: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
