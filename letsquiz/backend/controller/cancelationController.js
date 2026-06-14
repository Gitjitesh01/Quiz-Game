const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const CancelationSchema = require("../schema/Cancelationschema");

// Get cancelation by ID
exports.getCancelationByID = async (req, res) => {
  //.log(req.params.id);
  try {
    const cancelation = await CancelationSchema.findOne({
      $or: [{ _id: req.params.id }, { userId: req.params.id }],
    });
    if (!cancelation) {
      return res.status(404).json({ message: "Cancelation not found" });
    }
    return res.json(cancelation);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Get all cancelations
exports.getAllCancelations = async (req, res) => {
  try {
    const cancelations = await CancelationSchema.find();
    return res.json(cancelations);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

exports.createCancelation = async (req, res) => {
  try {
    //.log(req.body);
    const payload = {
      email: req.body.email,
      reason: req.body.reason,
      isActive: req.body.isActive ?? true,
      requestDate: req.body.requestDate ?? new Date(),
      cancelationDate: req.body.cancelationDate,
      imageurl: req.body.imageurl,
      userId: req.body.userId,
      subscriptionType: req.body.subscriptionType,
    };

    const data = await CancelationSchema.create(payload);
    return res.json({ message: "Cancellation created successfully", data });
  } catch (error) {
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a cancelation
exports.deleteCancelation = async (req, res) => {
  try {
    const cancelation = await CancelationSchema.findByIdAndDelete(
      req.params.id
    );
    if (!cancelation) {
      return res.status(404).json({ message: "Cancelation not found" });
    }
    return res.json({
      message: "Cancelation deleted successfully",
      cancelation,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid Cancelation ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateCancelation = async (req, res) => {
  //.log(req.body);
  try {
    const updatedCancelation = await CancelationSchema.findByIdAndUpdate(
      req.params.id
    );
    if (!updatedCancelation) {
      return res.status(404).json({ message: "Cancelation not found" });
    }
    return res.json({
      message: "Cancelation updated successfully",
      updatedCancelation,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid Cancelation ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
