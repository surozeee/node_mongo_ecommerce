var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
import logger from '../config/Logger';
import CustomError from '../error/CustomError';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        minlength: [4, 'Category name must be 4 character'],
        maxlength: [200, 'Category name must be 200 character']
    },
    status: {
        type: String,
        default: 'ACTIVE',
        enum: ["ACTIVE", "INACTIVE", "DEACTIVE"]
    },
    parent: {
        type: String
    }
});

function resolved(result) {
    console.log('Resolved');
}

function rejected(result) {
    //console.error(result);
}

categorySchema.pre('save', function (next) {
    let category = this;
    // category.name.trim();
    // category.status.trim();
    // category.parent?category.parent.trim():'';
    next();
});

module.exports = mongoose.model('Category', categorySchema, 'Category');
