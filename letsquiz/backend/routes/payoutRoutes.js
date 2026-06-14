const express = require('express');

const router = express.Router();
const {
    createPayout,
    getPayoutById,
    updatePayoutById,
    deletePayoutById,
    getPayoutByType,
    updatePayoutStatusById
} = require('../controller/PayoutController');

// Create a new payout
router.post('/payouts', createPayout);

// Get a payout by ID
router.get('/payouts/:id', getPayoutById);

// Update a payout status by ID
// Get payouts by type
router.get('/payouts/type/:type', getPayoutByType);

// Update a payout by ID
router.patch('/payouts/:id', updatePayoutById);
router.patch('/payouts/status/:id', updatePayoutStatusById);

// Delete a payout by ID
router.delete('/payouts/:id', deletePayoutById);

module.exports = router;