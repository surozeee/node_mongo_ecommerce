const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
import UserRole from '../enum/UserRole'
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        default: 'ROLE_USER',
        enum: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_USER"]
    }],
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    last_login: Date
})

UserSchema.pre('save', function (next) {
    let user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (input, callback) {
    bcrypt.compare(input, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema, 'User');