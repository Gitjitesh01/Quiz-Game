const express = require('express');
const router = express.Router();
const bannerController = require('../controller/bannerController');

router.get('/banner/:id', bannerController.getBannerByID);
router.get('/banners', bannerController.getAllBanners);
router.post('/banner', bannerController.uploadBanner);
router.post('/editbanner/:id', bannerController.updateBanner);
router.post('/delete-banner/:id', bannerController.deleteBanner);

module.exports = router;
