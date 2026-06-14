const express = require('express');
const router = express.Router();
const cancelationController = require('../controller/cancelationController');

router.get('/cancelation/:id', cancelationController.getCancelationByID);
router.get('/cancelations', cancelationController.getAllCancelations);
router.post('/cancelation-update', cancelationController.updateCancelation);
router.post('/cancelation-create', cancelationController.createCancelation);
router.post('/delete-cancelation/:id', cancelationController.deleteCancelation);

module.exports = router;