var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const OrderStatus = ["PLACED", "PROCESSING", "DELIVERED", "CANCELLED"];
const orderSchema = new Schema({
    status: {
        type: String,
        default: 'PLACED',
        enum: OrderStatus
    },
    customer: {
        name: String,
        mobileNo: String
    },
    address: {
        location: String,
        street: String,
        district: String
    },
    products: [{
        name: String,
        attributes: [{
            name: String,
            details: [{
                name: String,
                price: Number
            }]
        }]
    }],
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema, 'Order');
