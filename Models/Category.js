const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type : String,
        required : [true, 'Please select a Category'],
    },
    categoryBigImage : {
        type : String,
    },
    categorySmallImage : {
        type : String

    },
    color : {
        type : String,
        default : 'white'
    }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;