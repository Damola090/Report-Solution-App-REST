const mongoose = require('mongoose');
const validator = require('validator');

const reportSchema = new mongoose.Schema({
    reportContent: {
        topic: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: [true, 'Please select category for this report'],
        enum: {
            values: [
                'Fighting',
                'Fraud',
                'Accident',
                'Disaster',
                'Armed Robbery',
                'Theft',
                "Bribery",
                'Riot',
            ],
            message: 'Please select correct category for Report'
        }
    },
    categorylink : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : [true, 'Please select category for this product']
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Report', reportSchema)