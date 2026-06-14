const TeacherSchema = require("../schema/teacherschema");
const catchAsyncError = require("../utils/catchAsyncError");

const multer = require("multer");
const path = require("path");
let teacherid = "";
const fs = require("fs");
const { response } = require("express");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ////.log(req)
    // const teacherid = req.body.teacherid;
    const imagesPath = "./uploads/userPics/" + req.params.id;
    // //.log(req.params)

    // Create a folder with UID name if it doesn't exist
    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
    }

    cb(null, imagesPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "profilePic" +
        file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // limit file size to 10MB
}).fields([{ name: "newPic" }]);
exports.registerTeacher = catchAsyncError(async (req, res) => {
  let {
    _id,
    email,
    password,
    firstname,
    lastname,
    organization,
    usertype,
    phoneNumber,
  } = req.body;
  email = email.toLowerCase();
  try {
    const teacher = await TeacherSchema.create({
      _id,
      email,
      password,
      firstname,
      lastname,
      organization,
      usertype,
      phoneNumber,
      about: "",
      city: "",
      state: "",
      country: "",
      isActive: true,

      profilePic: "",
    });
    //.log(teacher)
    res.status(200).json({
      success: true,
      user: "teacher",
      teacher,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

exports.loginTeacher = catchAsyncError(async (req, res) => {
  let { _id } = req.body;
  const teacher = await TeacherSchema.findOne({ _id: _id }).select("+password");

  res.status(200).json({
    success: true,
    user: "teacher",
    teacher,
  });
});
exports.getAllTeacher = async (req, res) => {
  const allTeacher = await TeacherSchema.find();
  const totalTeachers = await TeacherSchema.count();
  res.status(200).json({
    success: true,
    allTeacher,
    total_teachers: totalTeachers,
  });
};
exports.getTeacherbyId = async (req, res) => {
  const teacher = await TeacherSchema.find({ _id: req.body.id });
  //const totalTeachers = await TeacherSchema.count();
  res.status(200).json({
    success: true,
    teacher,
  });
};

// >> Update Teacher Active state
exports.updateTeacherState = async (request, response) => {
  upload(request, response, async (err) => {
    //.log(request)
    if (err) {
      ////.log(err);
      ////.log("REQ: ", req.body);
      response.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    } else {
      try {
        ////.log(req.body)
        const {
          teacherid,
          countryShort,
          countryName,
          state,
          city,
          phoneNumber,
          about,
          profilePic,
        } = request.body;
        let coverImagePath = profilePic;
        if (request.files.newPic) {
          coverImagePath = "/" + request.files.newPic[0].path;
        }

        const teacher = await TeacherSchema.findOneAndUpdate(
          { _id: teacherid },
          {
            $set: {
              countryShort: countryShort,
              countryName: countryName,
              city: city,
              state: state,
              phoneNumber: phoneNumber,
              profilePic: coverImagePath,
              about: about,
            },
          },
          { new: true }
        );
        response.status(200).json({
          success: true,
          teacher,
          message: "Update successfully!",
        });
      } catch (error) {
        response.status(400).json({
          success: true,

          message: error.message,
        });
      }
    }
  });
};
