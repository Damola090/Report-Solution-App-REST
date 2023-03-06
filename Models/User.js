const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    location: {
        type: String,
        required: [true, 'Please enter your location']
    },
    reportList : [
        {
            report: {
                type: mongoose.Schema.ObjectId,
                ref: 'Report',
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User', userSchema)