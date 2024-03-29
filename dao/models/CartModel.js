const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;