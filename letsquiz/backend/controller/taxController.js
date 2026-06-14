const TaxSchema = require("../schema/TaxSchema");
const mongoose = require("mongoose"); // Ensure mongoose is imported

// Create a new tax
const createTax = async (req, res) => {
  const taxData = req.body;
  try {
    const newTax = new TaxSchema(taxData);
    await newTax.save();
    res.status(201).json(newTax);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get all taxes
const getAllTaxes = async (req, res) => {
  try {
    const taxes = await TaxSchema.find();
    return res.status(200).json(taxes);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Get tax by ID
const getTaxById = async (req, res) => {
  try {
    const tax = await TaxSchema.findById(req.params.id);
    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }
    return res.json(tax);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Update a tax
const updateTax = async (req, res) => {
  //.log(req.body)
  try {
    const tax = await TaxSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }
    return res.json(tax);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Delete a tax
const deleteTax = async (req, res) => {
  try {
    const tax = await TaxSchema.findByIdAndDelete(req.params.id);
    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }
    return res.json({ message: "Tax deleted successfully", tax });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid tax ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get tax by type
const getTaxByType = async (req, res) => {
  // console.log("hi i am run")
  try {
    const tax = await TaxSchema.find({ taxType: req.params.type });
    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }
    
    return res.status(200).json({
      tax
    });
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Export all the functions
module.exports = {
  createTax,
  getAllTaxes,
  getTaxById,
  updateTax,
  deleteTax,
  getTaxByType,
};
