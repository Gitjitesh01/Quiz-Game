const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Banner = require("../schema/bannerSchema"); // Ensure correct path

const UPLOAD_PATH = path.join(__dirname, "../uploads/banner");

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, UPLOAD_PATH);
  },
  filename: function (req, file, callback) {
    const name =
      file.originalname.split(".")[0] +
      "_" +
      Date.now() +
      path.extname(file.originalname);
    callback(null, name);
    req.body[file.fieldname] = name; // Store the file name in request body
  },
});

const upload = multer({ storage: Storage });

exports.uploadBanner = [
  upload.single("image"), // Use single file upload
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { title } = req.body;
      const image = req.file.filename;

      const banner = new Banner({ image, title });
      await banner.save();

      return res.status(201).json(banner);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: "Validation error" });
      }
      //.error(error);
      return res.status(500).send({ message: "Server error" });
    }
  },
];

// Get banner by ID
exports.getBannerByID = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    return res.json(banner);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});
    return res.status(200).json(banners);
  } catch (error) {
    //.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    return res.json({ message: "Banner deleted successfully", banner });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    return res.json(banner);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Validation error" });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }
    //.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
