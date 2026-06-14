const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema({
    userid : {
        type: String,
        required: true,
        trim: true
    },
    accountHolderName: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ifscCode: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Z]{4}0[A-Z0-9]{6}$/
    },
    bankName: {
        type: String,
        required: true,
        trim: true
    },
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Savings', 'Current', 'Fixed Deposit', 'Recurring Deposit']
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^[6-9]\d{9}$/
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BankDetails', bankDetailsSchema);