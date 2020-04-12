var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Status = ["ACTIVE", "INACTIVE", "DEACTIVE"];
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: 'ACTIVE',
        enum: ["ACTIVE", "INACTIVE", "DEACTIVE"]
    },
    images:[{
        type: String
    }],
    category: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    attributes: [{
        name: String,
        details: [{
            name: String,
            price: Number
        }]
    }]
});

module.exports = mongoose.model('Product', productSchema, 'Product');
