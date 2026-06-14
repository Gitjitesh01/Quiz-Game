const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payoutSchema = new Schema({
    reciveamounttranstionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Transaction'
    },
    payoutcode :{
        type: Number,
        required: true
        
    },
    giveamounttranstionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalPayment: {
        type: Number,
        required: true
    },
    paidToCreator: {
        type: Number,
        required: true
    },
    paymentMakerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
  
    payoutType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payout', payoutSchema);