const { response } = require("express");
const userSchema = require("../schema/userSchema");
const quizschema = require("../schema/quizschema");
const bcrypt = require("bcryptjs");
const quizTransactionSchema = require("../schema/quizTransactionSchema");
const responseSchema = require("../schema/ResponseSchema");
const catchAsyncError = require("../utils/catchAsyncError");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const path = require("path");
let userid = "";
const fs = require("fs");

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Store only essential data
  const userdetails = {
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    firstname: user.firstname,
    lastname: user.lastname,
    userType: user.userType,
    subscriptionType: user.subscriptionType,
  };

  const token = jwt.sign(userdetails, "your_jwt_secret");

  res.status(200).json({
    success: true,
    token: token,
    profilePic: user.profilePic,
  });
};

exports.getusersubcription = async (req, res) => {
  let { email } = req.body;
  const user = await userSchema.findOne({ email: email });

  try {
    if (user) {
      res.status(200).json({
        success: true,
        user: user.subscriptionType,
      });
    } else {
      res.status(200).json({
        success: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userClassification = async (req, res) => {
  let { email } = req.body;
  const user = await userSchema.findOne({ email: email });

  if (user) {
    if (user?.userType == "teacher")
      res.status(200).json({
        success: true,
        type: "teacher",
        //user: teacher
      });
    else if (user?.userType == "student") {
      res.status(200).json({
        success: true,
        type: "student",
        // user: Student
      });
    }
  } else {
    res.status(200).json({
      success: false,
      data: null,
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagesPath = "./uploads/userPics/" + req.params.id;

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

exports.registerUser = catchAsyncError(async (req, res) => {
  let {
    _id,
    email,
    password,
    firstname,
    lastname,
    organization,
    userType,
    subscriptionType,
    phoneNumber,
    city,
    state,
    countryName,
    countryShort,
  } = req.body;

  email = email.toLowerCase();

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique 6-digit user code
    const userCode = Math.floor(100000 + Math.random() * 900000).toString();
    let isUnique = false;

    while (!isUnique) {
      userCode = Math.floor(100000 + Math.random() * 900000).toString();
      const existingUser = await userSchema.findOne({ userCode: userCode });
      if (!existingUser) {
        isUnique = true;
      }
    }
    const user = await userSchema.create({
      _id,
      email,
      password: hashedPassword, // Store the hashed password
      firstname,
      lastname,
      organization,
      userType,
      usercode : userCode,
      subscriptionType,
      phoneNumber,
      about: "",
      city,
      state,
      countryName,
      countryShort,
      isActive: true,
      profilePic: "",
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json(
      console.log(error.message),
      {
      success: false,
      message: error.message,
    });
  }
});

exports.loginTeacher = catchAsyncError(async (req, res) => {
  let { email } = req.body;
  const user = await userSchema.findOne({ email: email });

  const result = bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      res.status(200).json({
        success: true,
        // user: "teacher",
        user: {
          id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          organization: user.organization,
          userType: user.userType,
          subscriptionType: user.subscriptionType,
          phoneNumber: user.phoneNumber,
          city: user.city,
          state: user.state,
          countryName: user.countryName,
          countryShort: user.countryShort,
          isActive: user.isActive,
          profilePic: user.profilePic,
        },
      });
    }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

exports.addUserAttendQuiz = catchAsyncError(async (req, res) => {
  try {
    const { userid, quizAttend } = req.body;
    const user = await userSchema.findOneAndUpdate(
      { _id: userid },
      { $push: { quizAttend: quizAttend } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      user,
      message: "Update successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
});

exports.getuser = async (req, res) => {
  // params = req.params;

  const user = await userSchema.findOne({ _id: req.body.id });

  // const token = jwt.sign({ userdetails }, 'your_jwt_secret');
  try {
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const allUser_info = await userSchema.find();

    let data = await Promise.all(
      allUser_info.map(async (user) => {
        const freequizes_created = await quizschema.find({
          userId: user._id,
          paymentType: "free",
          quizType: "QUIZ",
        });
        const paidquizes_created = await quizschema.find({
          userId: user._id,
          paymentType: "paid",
          quizType: "QUIZ",
        });
        const paidpoll_created = await quizschema.find({
          userId: user._id,
          paymentType: "paid",
          quizType: "POLL",
        });
        const freepoll_created = await quizschema.find({
          userId: user._id,
          paymentType: "free",
          quizType: "POLL",
        });
        const freesurvey_created = await quizschema.find({
          userId: user._id,
          paymentType: "free",
          quizType: "SURVEY",
        });
        const paidsurvey_created = await quizschema.find({
          userId: user._id,
          paymentType: "paid",
          quizType: "SURVEY",
        });
        const free_quiz_created_count = freequizes_created?.length || 0;
        const paid_quiz_created_count = paidquizes_created?.length || 0;
        const paid_poll_created_count = paidpoll_created?.length || 0;
        const paid_survey_created_count = paidsurvey_created?.length || 0;
        const free_poll_created_count = freepoll_created?.length || 0;
        const free_survey_created_count = freesurvey_created?.length || 0;

        const all_quizes_created = [
          ...freequizes_created,
          ...paidquizes_created,
        ];
        const all_polls_created = [...freepoll_created, ...paidpoll_created];
        const all_surveys_created = [
          ...freesurvey_created,
          ...paidsurvey_created,
        ];

        const quiz_amount_received_info = await Promise.all(
          all_quizes_created.map(async (q_created) => {
            const quizTransactions = await quizTransactionSchema.find({
              quizid: q_created._id,
              userid: user._id,
            });
            const totalAmountReceived = quizTransactions.reduce(
              (acc, transaction) => {
                return acc + (transaction.amount || 0);
              },
              0
            );

            return {
              quiz_id: q_created._id,
              quiztype: q_created.quizType,
              userId: q_created.userId,
              paymentType: q_created.paymentType,
              amountReceived: totalAmountReceived,
            };
          })
        );
        const poll_amount_received_info = await Promise.all(
          all_polls_created.map(async (q_created) => {
            const quizTransactions = await quizTransactionSchema.find({
              quizid: q_created._id,
              userid: user._id,
            });
            const totalAmountReceived = quizTransactions.reduce(
              (acc, transaction) => {
                return acc + (transaction.amount || 0);
              },
              0
            );

            return {
              quiz_id: q_created._id,
              quiztype: q_created.quizType,
              userId: q_created.userId,
              paymentType: q_created.paymentType,
              amountReceived: totalAmountReceived,
            };
          })
        );
        const survey_amount_received_info = await Promise.all(
          all_surveys_created.map(async (q_created) => {
            const quizTransactions = await quizTransactionSchema.find({
              quizid: q_created._id,
              userid: user._id,
            });
            const totalAmountReceived = quizTransactions.reduce(
              (acc, transaction) => {
                return acc + (transaction.amount || 0);
              },
              0
            );

            return {
              quiz_id: q_created._id,
              quiztype: q_created.quizType,
              userId: q_created.userId,
              paymentType: q_created.paymentType,
              amountReceived: totalAmountReceived,
            };
          })
        );

        const quizes_attended = await responseSchema.find({
          attenderId: user._id,
        });

        const quizes_attended_info = await Promise.all(
          quizes_attended.map(async (q_att) => {
            const transaction_info = await quizTransactionSchema.findOne({
              userid: user._id,
              quizid: q_att.quizid, // Use `quizid` instead of `_id` for attended quizzes
            });

            let last_quiz_attempt = q_att?.quizAttend?.at(-1);
            if (transaction_info) {
              const totalAmountPaid = parseFloat(transaction_info.amount);

              // Calculate payments
              const payment_to_user = 0.8 * totalAmountPaid;
              const payment_to_admin = 0.2 * totalAmountPaid;

              const certificate_status =
                last_quiz_attempt?.certificate && last_quiz_attempt?.isPass
                  ? true
                  : false;

              return {
                quiz_id: q_att.quizid,
                paymentType: last_quiz_attempt.paymentType,
                certificate_status,
                payment_status: transaction_info || null,
                quiz_type: q_att.quizType,
                payment_to_user,
                payment_to_admin,
              };
            } else {
              return {
                quiz_id: q_att.quizid,
                paymentType: last_quiz_attempt.paymentType,
                certificate_status: false,
                payment_status: null,
                payment_to_user: 0,
                payment_to_admin: 0,
              };
            }
          })
        );

        return {
          userId: user._id,
          userType: user.userType,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          organization: user.organization,
          phoneNumber: user.phoneNumber,
          countryName: user.countryName,
          countryShort: user.countryShort,
          user_status: user.isActive,
          subscriptionType: user.subscriptionType,
          free_quiz_created_count,
          paid_quiz_created_count,
          paid_poll_created_count,
          paid_survey_created_count,
          free_poll_created_count,
          free_survey_created_count,
          quiz_amount_received_info,
          poll_amount_received_info,
          survey_amount_received_info,
          quizes_attended_info,
        };
      })
    );

    const totalUsers = await userSchema.countDocuments();

    res.status(200).json({
      success: true,
      data,
      total_users: totalUsers,
    });
  } catch (error) {
    //.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user information.",
    });
  }
};

exports.getUserbyId = async (req, res) => {
  const user = await userSchema.find({ _id: req.body.id });

  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUserState = async (request, response) => {
  const { id } = request.params;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const imagesPath = `./uploads/userPics/${req.params.id}`;

      // Create a folder with UID name if it doesn't exist
      fs.mkdir(imagesPath, { recursive: true }, (err) => {
        if (err) {
          return cb(
            new Error("Failed to create directory: " + err.message),
            null
          );
        }
        cb(null, imagesPath);
      });
    },
    filename: (req, file, cb) => {
      // Generate a short, unique filename using a timestamp and random string
      const uniqueSuffix = Date.now();
      const ext = path.extname(file.originalname); // Extract file extension
      const filename = "profilePic-" + req.params.id[23] + uniqueSuffix + ext; // Create a new filename

      cb(null, filename);
    },
  });

  //.log(request)

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // limit file size to 10MB
    fileFilter: (req, file, cb) => {
      // Only accept images (optional enhancement)
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"), false);
      }
      cb(null, true);
    },
  }).fields([{ name: "newPic" }]);

  upload(request, response, async (err) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Error uploading file: " + err.message,
      });
    }

    try {
      const {
        countryShort,
        countryName,
        state,
        city,
        phoneNumber,
        email,
        requestForCancelation,
        about,
        profilePic,
      } = request.body;

      let coverImagePath = profilePic;
      if (request.files && request.files.newPic) {
        coverImagePath = "/" + request.files.newPic[0].path.replace(/\\/g, "/"); // Normalize path for different OS
      }

      const user = await userSchema.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            countryShort,
            countryName,
            state,
            city,
            phoneNumber,
            email,
            requestForCancelation,
            profilePic: coverImagePath,
            about,
          },
        },
        { new: true } // Return the updated document
      );

      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const userdetails = {
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstname: user.firstname,
        lastname: user.lastname,
        userType: user.userType,
        requestForCancelation: true,
        subscriptionType: user.subscriptionType,
        profilePic: user.profilePic,
      };

      const token = jwt.sign(userdetails, "your_jwt_secret");

      response.status(200).json({
        success: true,
        user: token,
        message: "Update successful!",
      });
    } catch (error) {
      response.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      user,
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserForSubscription = async (req, res) => {
  try {
    // Fetch users who have requested cancellation
    const users = await userSchema.find({
      requestForCancelation: true,
      subscriptionType: { $ne: "basic" },
    });

    // Map the necessary details
    const userDetails = users.map((user) => ({
      requestForCancelation: user.requestForCancelation,
      email: user.email,
      subscriptionType: user.subscriptionType,
    }));

    // Send response
    res.status(200).json({
      success: true,
      userDetails,
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getCategoryWiseUsers = async (request, response) => {
  try {
    const category = request.body.category; // Assuming category is something like 'userType'
    const users = await userSchema.find();
    const userArr = {};

    users.forEach((user) => {
      const categoryValue = user[category];
      userArr[categoryValue] = (userArr[categoryValue] || 0) + 1;
    });

    const formattedData = Object.entries(userArr).map(([type, count]) => [
      type,
      count,
    ]);

    response.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSubCategoryWiseUsers = async (request, response) => {
  try {
    const category = request.body.category; // Assuming category is something like 'country'
    const subcategory = request.body.subcategory; // Assuming subcategory is something like 'userType'

    const users = await userSchema.find();
    const userArr = {};

    // Iterate through users to categorize them by category value
    users.forEach((user) => {
      const categoryValue = user[category];
      if (!userArr[categoryValue]) {
        userArr[categoryValue] = [];
      }
      userArr[categoryValue].push(user[subcategory]);
    });

    // Count the occurrences of each subcategory within each category
    const formattedData = Object.entries(userArr).map(
      ([categoryValue, subcategories]) => {
        const subcategoryCounts = {};
        subcategories.forEach((subcategory) => {
          subcategoryCounts[subcategory] =
            (subcategoryCounts[subcategory] || 0) + 1;
        });
        return { category: categoryValue, subcategoryCounts };
      }
    );

    response.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
