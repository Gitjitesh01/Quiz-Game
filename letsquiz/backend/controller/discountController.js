const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const discountSchema = require("../schema/discountSchema");

// Get discount by ID
exports.getdiscountByID = async (req, res) => {
  try {
    const discount = await discountSchema.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: "discount not found" });
    }
    return res.json(discount);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Get all discounts
exports.getAlldiscounts = async (req, res) => {
  try {
    const discounts = await discountSchema.find();
    return res.json(discounts);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

exports.creatediscount = async (req, res) => {
  try {
    const payload = req.body;
    const data = discountSchema.create(payload);
    return res.json({ message: "discount Created successfully", data });
  } catch (error) {
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a discount
exports.deletediscount = async (req, res) => {
  try {
    const discount = await discountSchema.findByIdAndDelete(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: "discount not found" });
    }
    return res.json({ message: "discount deleted successfully", discount });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid discount ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updatediscount = async (req, res) => {
  //.log(req.body);
  try {
    const discount = await discountSchema.findByIdAndUpdate(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: "discount not found" });
    }
    return res.json({ message: "discount updated successfully", discount });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid discount ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
