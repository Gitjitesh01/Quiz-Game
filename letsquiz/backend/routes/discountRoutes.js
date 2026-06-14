const express = require('express');
const router = express.Router();
const discountSchema = require('../controller/discountController');

router.get('/discount/:id', discountSchema.getdiscountByID);
router.get('/discount', discountSchema.getAlldiscounts);
router.post('/discount', discountSchema.creatediscount);
router.post('/editdiscount/:id', discountSchema.updatediscount);
router.post('/delete-discount/:id', discountSchema.deletediscount);

module.exports = router;
