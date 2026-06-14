const express = require('express');
const supportController = require('../controller/supportController');

const router = express.Router();

// Create a new support ticket
router.post('/support', supportController.createSupport);

// Get all support tickets
router.get('/support', supportController.getAllSupports);

// Update the status of a support ticket by ID
router.patch('/support-status-update/:id/:status', supportController.updateSupportStatus);

// Get a single support ticket by ID
router.get('/support/:id', supportController.getSupportById);

// Update a support ticket by ID
router.patch('/support/:id', supportController.updateSupport);

// Delete a support ticket by ID
router.delete('/support/:id', supportController.deleteSupport);

module.exports = router;