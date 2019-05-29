const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({

    product_name: {
        type: String
    },
    product_info: {
        type: String
    },
    product_price: {
        type: Number
    },
    product_photo: {
        type: String
    }

});

module.exports = mongoose.model('Product', Product);