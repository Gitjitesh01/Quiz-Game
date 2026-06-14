const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscriptionController');

router.get('/subscription/:id', subscriptionController.getSubscriptionById);
router.post('/get-subscriptionbytype', subscriptionController.getSubscriptionByType);
router.get('/subscriptions', subscriptionController.getAllSubscriptions);
router.post('/subscription-create', subscriptionController.createSubscription);
router.post('/editsubscription/:id', subscriptionController.updateSubscription);
router.post('/delete-subscription/:id', subscriptionController.deleteSubscription);

module.exports = router;
