const catchAsyncError = require("../utils/catchAsyncError");
const Studentschema = require("../schema/studentschema");

// >> Register Student

const multer = require("multer");
const path = require("path");
let teacherid = "";
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ////.log(req)
    // const teacherid = req.body.teacherid;
    const imagesPath = "./uploads/studentPics/" + req.params.id;
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
exports.putStudent = catchAsyncError(async (req, res) => {
  try {
    const { studentid, quizAttend } = req.body;
    //.log({ quizAttend: quizAttend });
    const student = await Studentschema.findOneAndUpdate(
      { _id: studentid },
      { $push: { quizAttend: quizAttend } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      student,
      message: "Update successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
});

exports.registerStudent = catchAsyncError(async (req, res) => {
  try {
    const {
      _id,
      firstname,
      lastname,
      password,
      phoneNumber,
      email,
      organization,
    } = req.body;
    const student = await Studentschema.create({
      _id,
      firstname,
      lastname,
      password,
      phoneNumber,
      email,
      organization,
      about: "",
      city: "",
      state: "",
      country: "",
      isActive: true,

      profilePic: "",
    });
    res.status(200).json({
      success: true,
      user: "student",
      student,
      message: "Student ID created successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// >> Student Login
exports.studentLogin = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const student = await Studentschema.findOne({ email }).select("+password");

  if (!student) {
    res.status(401).json({
      success: false,
      user: "student",
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await student.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(500).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    student,
    user: "student",
  });
});
exports.getAllStudents = async (req, res) => {
  const allStudent = await Studentschema.find();
  const totalStudents = await Studentschema.count();
  res.status(200).json({
    success: true,
    allStudent,
    total_students: totalStudents,
  });
};
// >> Update Student Active state
exports.updateStudentState = async (request, response) => {
  upload(request, response, async (err) => {
    //.log(request);
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
          studentid,
          countryShort,
          countryName,
          state,
          city,
          phoneNumber,
          about,
          profilePic,
        } = request.body;
        let coverImagePath = profilePic || "";
        if (request.files.newPic) {
          coverImagePath = "/" + request.files.newPic[0].path;
        }

        const student = await Studentschema.findOneAndUpdate(
          { _id: studentid },
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
          student,
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
