const express = require('express');

const router = express.Router();
const {
    createBankDetail,
    getAllBankDetails,
    getBankDetailById,
    updateBankDetailById,
    deleteBankDetailById
} = require('../controller/bankdetailsController'); // Adjust the path as necessary

// Route to create a new bank detail
router.post('/bankdetails', createBankDetail);

// Route to get all bank details
router.get('/bankdetails', getAllBankDetails);

// Route to get a bank detail by ID
router.get('/bankdetails/:id', getBankDetailById);

// Route to update a bank detail by ID
router.patch('/bankdetails/:id', updateBankDetailById);

// Route to delete a bank detail by ID
router.delete('/bankdetails/:id', deleteBankDetailById);

module.exports = router;