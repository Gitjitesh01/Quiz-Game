const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required:true,
        unique: true,
    },
    promoType : {
        type: String,
        enum: ['discount', 'coupon'],
        required: true,
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed', 'flat'],
        required: true,
    },
    applyTo: {
        type: String,
        required: true,
        default: 'all',
    },
    value: {
        type: Number,
        required: true,
    }, 
     validFrom: {
        type: String,
        required: true,
    },
    validTo: {
            type: String,
            required: true,
        },
   
    
}, { timestamps: true });

const discount = mongoose.model('discount', discountSchema);
module.exports = discount;