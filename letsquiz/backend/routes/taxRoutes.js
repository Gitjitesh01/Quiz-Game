const express = require("express");
const router = express.Router();
const {
  getTaxById,
  getTaxByType,
  getAllTaxes,
  createTax,
  updateTax,
  deleteTax,
} = require("../controller/taxController.js");  // Use require for CommonJS

router.get("/tax/:id", getTaxById);
router.get("/get-taxbytype/:type", getTaxByType);
router.get("/taxes", getAllTaxes);
router.post("/tax-create", createTax);
router.post("/edittax/:id", updateTax);
router.post("/delete-tax/:id", deleteTax);

module.exports = router;  // Export the router
