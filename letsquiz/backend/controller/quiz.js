const {
  getQuizById,
  getAllQuiz,
  createQuizWithQuestions,
  createAndUpdateQuizReport,
  createAndUpdateQuizResponseService,
  getQuizReports,
  getQuizAllReports,
  getQuizIndividualReports,
  getQuizReportsById,
} = require("../services/quiz");
const QuizSchema = require("../schema/quizschema");
const ResponseSchema = require("../schema/ResponseSchema");
const { asyncScheduler, async } = require("rxjs");
const catchAsyncError = require("../utils/catchAsyncError");
const QuizReport = require("../schema/reportSchema");
const multer = require("multer");
const reportSchema = require("../schema/reportSchema");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const quizschema = require("../schema/quizschema");
const subscriptionSchema = require("../schema/subscriptionSchema");
const quizTransactionSchema = require("../schema/quizTransactionSchema");
const { log } = require("console"); 
const path = require("path");


// >> Get Single Quiz -By ID
// ? Working -- http://localhost:3000/api/quiz/:id
const fetchQuizById = catchAsyncError(async (req, res) => {
  const quiz = await QuizSchema.findById(req.params.id);
  if (!quiz) {
    res.status(500).json({
      success: false,
      message: "Quiz does not exist!",
    });
  } else {
    res.status(200).json({
      success: true,
      quiz,
    });
  }
});

// app.post('/api/vote/:pollId', async (req, res) => {

const rateQuiz = async (req, res) => {
  const { userId, rating } = req.body;
  const { id } = req.params;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    });
  }

  try {
    const quiz = await QuizSchema.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const existingRating = quiz.rating.userId
    if (existingRating) {
      existingRating.rating = rating;
      existingRating.time = Date.now();
    } else {
      await QuizSchema.create({ userId, rating });
    }

    // const totalRatings = quiz.rating.reduce(
    //   (acc, curr) => acc + curr.rating,
    //   0
    // );
    // quiz.avarage_rating = totalRatings / quiz.rating.length;

    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updatedPollVote = async (req, res) => {
  const { vote } = req.body;
  try {
    const data = Object.entries(vote)
      .map(([k, v]) => ({ [`questions.${k}.options.${v}.vote`]: 1 }))
      .reduce((a, b) => ({ ...a, ...b }));
    console.table({ $inc: { ...data } });
    const updatedQuiz = await QuizSchema.findByIdAndUpdate(
      req.body.id,
      {
        $inc: data,
      },
      { new: true }
    );
    console.table(updatedQuiz.questions.map((e) => JSON.stringify(e.options)));
    if (!updatedQuiz) {
      res.status(500).json({
        success: false,
        message: "Quiz does not exist!",
      });
    } else {
      res.status(200).json({
        success: true,
        quiz: updatedQuiz,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// >> Get all quiz
// ? working -- http://localhost:3000/api/quiz
const fetchAllQuiz = async (req, res) => {
  try {
    const report = await QuizSchema.find({ quizType: "QUIZ" });
    const totalQuizzes = await QuizSchema.count();
    const allQuiz = [];

    for (const quiz of report) {
      const quiz_attended_info = await ResponseSchema.find({
        quizid: quiz._id,
      });
      const quizTransactions = await quizTransactionSchema.find({
        quizid: quiz._id,
      });

      const tmpAmount = quizTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      allQuiz.push({
        ...quiz.toObject(),
        numAttempt: quiz_attended_info.length,
        amount: tmpAmount,
      });
    }

    res.status(200).json({
      success: true,
      allQuiz,
      total_quizzes: totalQuizzes,
    });
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// poll

const fetchPollByUserId = async (request, response) => {
  // ​http://localhost:3000/api/quiz-reports-quizID/63f9e4ca9519bbcd484735e5
  const { id } = request.params;
  console.log(id);
  try {
    const report = await QuizSchema.find({
      userId: id,
      quizType: "POLL",
    });
    const totalPolls = await QuizSchema.count();
    const allQuiz = [];

    for (const quiz of report) {
      const quiz_attended_info = await ResponseSchema.find({
        quizid: quiz._id,
      });
      const quizTransactions = await quizTransactionSchema.find({
        quizid: quiz._id,
      });

      const tmpAmount = quizTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      allQuiz.push({
        ...quiz.toObject(),
        numAttempt: quiz_attended_info.length,
        amount: tmpAmount,
      });
    }

    response.status(200).json({
      success: true,
      allQuiz,
      total_polls: totalPolls,
    });
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const fetchAllPoll = async (req, res) => {
  try {
    const report = await QuizSchema.find({ quizType: "POLL" });
    const totalPolls = await QuizSchema.count();
    const allQuiz = [];

    for (const quiz of report) {
      const quiz_attended_info = await ResponseSchema.find({
        quizid: quiz._id,
      });
      const quizTransactions = await quizTransactionSchema.find({
        quizid: quiz._id,
      });

      const tmpAmount = quizTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      allQuiz.push({
        ...quiz.toObject(),
        numAttempt: quiz_attended_info.length,
        amount: tmpAmount,
      });
    }

    res.status(200).json({
      success: true,
      allQuiz,
      total_polls: totalPolls,
    });
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
//wordcloud
const fetchAllWordcloud = async (req, res) => {
  const report = await QuizSchema.find({ quizType: "wordcloud" });
  const totalQuizzes = await QuizSchema.count();
  res.status(200).json({
    success: true,
    report,
    total_quizzes: totalQuizzes,
  });
};

const fetchAllSurvey = async (req, res) => {
  const report = await QuizSchema.find({ quizType: "SURVEY" });
  const totalQuizzes = await QuizSchema.count();
  res.status(200).json({
    success: true,
    report,
    total_quizzes: totalQuizzes,
  });
};

const validateCreateUserBody = (payload) => {
  const { name, title, email, description, questions } = payload;
  if (!name) {
    throw { message: "Quiz name is required" };
  }
  if (!email) {
    throw { message: "Email is required" };
  }
  if (!questions || !questions.length) {
    throw { message: "Questions should not be empty" };
  }
};

// Helper function to ensure the directory exists
const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Storage configuration
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let uploadPath = "./uploads";
    if (file.fieldname === "customCertificate") {
      uploadPath = "./uploads/certificates";
    } else if (file.fieldname === "image") {
      uploadPath = "./uploads/images";
    } else if (file.fieldname === "audio") {
      uploadPath = "./uploads/audios";
    } else if (file.fieldname.startsWith("questionImage")) {
      uploadPath = "./uploads/images";
    } else if (file.fieldname.startsWith("questionAudio")) {
      uploadPath = "./uploads/audios";
    } else if (file.fieldname === "coverImage") {
      uploadPath = "./uploads/coverimage";
    }

    ensureDirectoryExistence(uploadPath); // Ensure the directory exists
    callback(null, uploadPath);
  },
  filename: function (req, file, callback) {
    const name =
      file.originalname.split(".")[0] +
      "_" +
      Date.now() +
      path.extname(file.originalname); // Preserve file extension
    callback(null, name);

    // Assign filename to req.body for reference
    if (file.fieldname === "customCertificate") {
      req.body["customCertificate"] = name;
    } else if (file.fieldname === "image") {
      if (!req.body.images) req.body.images = [];
      req.body.images.push(name);
    } else {
      req.body[file.fieldname] = name;
    }
  },
});



const upload = multer({
  storage: Storage,
}).fields([
  { name: "video" },
  { name: "audio" },
  { name: "image" },
  { name: "coverImage" },
  { name: "signature" },
  { name: "customCertificate" },
  { name: "questionImage0" },
  { name: "questionImage1" },
  { name: "questionImage2" },
  { name: "questionImage3" },
  { name: "questionImage4" },
  { name: "questionImage5" },
  { name: "questionImage6" },
  { name: "questionImage7" },
  { name: "questionImage8" },
  { name: "questionImage9" },
  { name: "questionImage10" },
  { name: "questionImage11" },
  { name: "questionImage12" },
  { name: "questionImage13" },
  { name: "questionImage14" },
  { name: "questionImage15" },
  { name: "questionImage16" },
  { name: "questionImage17" },
  { name: "questionImage18" },
  { name: "questionImage19" },
  { name: "questionImage20" },
  { name: "questionImage21" },
  { name: "questionImage22" },
  { name: "questionImage23" },
  { name: "questionImage24" },
  { name: "questionImage25" },
  { name: "questionImage26" },
  { name: "questionImage27" },
  { name: "questionImage28" },
  { name: "questionImage29" },
  { name: "questionImage30" },
  { name: "questionImage31" },
  { name: "questionImage32" },
  { name: "questionImage33" },
  { name: "questionImage34" },
  { name: "questionImage35" },
  { name: "questionImage36" },
  { name: "questionImage37" },
  { name: "questionImage38" },
  { name: "questionImage39" },
  { name: "questionImage40" },
  { name: "questionImage41" },
  { name: "questionImage42" },
  { name: "questionImage43" },
  { name: "questionImage44" },
  { name: "questionImage45" },
  { name: "questionImage46" },
  { name: "questionImage47" },
  { name: "questionImage48" },
  { name: "questionImage49" },
  { name: "questionAudio0" },
  { name: "questionAudio1" },
  { name: "questionAudio2" },
  { name: "questionAudio3" },
  { name: "questionAudio4" },
  { name: "questionAudio5" },
  { name: "questionAudio6" },
  { name: "questionAudio7" },
  { name: "questionAudio8" },
  { name: "questionAudio9" },
  { name: "questionAudio10" },
  { name: "questionAudio11" },
  { name: "questionAudio12" },
  { name: "questionAudio13" },
  { name: "questionAudio14" },
  { name: "questionAudio15" },
  { name: "questionAudio16" },
  { name: "questionAudio17" },
  { name: "questionAudio18" },
  { name: "questionAudio19" },
  { name: "questionAudio20" },
  { name: "questionAudio21" },
  { name: "questionAudio22" },
  { name: "questionAudio23" },
  { name: "questionAudio24" },
  { name: "questionAudio25" },
  { name: "questionAudio26" },
  { name: "questionAudio27" },
  { name: "questionAudio28" },
  { name: "questionAudio29" },
  { name: "questionAudio30" },
  { name: "questionAudio31" },
  { name: "questionAudio32" },
  { name: "questionAudio33" },
  { name: "questionAudio34" },
  { name: "questionAudio35" },
  { name: "questionAudio36" },
  { name: "questionAudio37" },
  { name: "questionAudio38" },
  { name: "questionAudio39" },
  { name: "questionAudio40" },
  { name: "questionAudio41" },
  { name: "questionAudio42" },
  { name: "questionAudio43" },
  { name: "questionAudio44" },
  { name: "questionAudio45" },
  { name: "questionAudio46" },
  { name: "questionAudio47" },
  { name: "questionAudio48" },
  { name: "questionAudio49" },
]);

const createQuiz = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    try {
      const {
        quizTitle,
        quizDescription,
        questions,
        reqPercentage,
        isActive,
        userId,
        totalCredit,
        totalPoint,
        quizType,
        quizGrades,
        totalQuestions,
        subject,
        language,
        createdAt,
        customCertificate,
        musicId,
        themeId,
        certificate,
        numAttempt,
        fontStyle,
        fontSize,
        quizMode,
        startdate,
        enddate,
        fontClr,
        timeline,
        sections,
        orgiName,
        amount,
        competitionName,
        customlogo,
        discriptionofcertificate,
        ownerSignature,
        postiononcertificate,
        paymentType,
        coverImage,
      } = req.body;

      const newQuestions = Array.isArray(questions)
        ? questions
        : JSON.parse(questions);
      const parsedQuizGrades = Array.isArray(quizGrades)
        ? quizGrades
        : JSON.parse(quizGrades);
      const parsedSubject = Array.isArray(subject)
        ? subject
        : JSON.parse(subject);

      const data = {
        quizTitle,
        quizDescription,
        questions: newQuestions,
        reqPercentage,
        isActive,
        userId,
        totalCredit,
        totalPoint,
        quizType,
        quizGrades: parsedQuizGrades,
        totalQuestions,
        subject: parsedSubject,
        language,
        createdAt,
        fontClr,
        musicId,
        themeId,
        certificate,
        customCertificate,
        numAttempt,
        ownerSignature,
        fontStyle,
        fontSize,
        quizMode,
        startdate,
        enddate,
        timeline,
        sections,
        orgiName,
        competitionName,
        customlogo,
        discriptionofcertificate,
        postiononcertificate,
        amount,
        paymentType,
        coverImage,
        images: req.body.images || [], // Add images array to data
      };

      console.log(req.body);

      const quiz = new QuizSchema(data);
      await quiz.save();

      res.status(200).json({
        success: true,
        message: "Quiz saved successfully!",
        quiz,
      });
    } catch (error) {
      console.log(error, "error is there");
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};

const createPoll = async (request, response) => {
  upload(request, response, (err) => {
    if (err) {
      response.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    } else {
      const {
        quizTitle,
        quizDescription,
        questions,
        isActive,
        userId,
        quizType,
        totalQuestions,
        language,
        createdAt,
        musicId,
        themeId,
        fontStyle,
        fontClr,
        fontSize,
        quizMode,
        sections,
        orgiName,
        attemptlimit,
        paymentType,
        amount,
      } = request.body;
      console.log(request.body);
      // const coverImagePath = request.files.coverImage[0].path;
      // const audioPath = request.files.audio[0].path;
      // const videoPath = request.files.video[0].path;

      //  if (!quizTitle || !quizDescription || !questions || !reqPercentage || !isActive || !teacherId || !totalCredit || !totalPoint || !quizType || !quizGrades || !totalQuestions || !subject || !language || !createdAt || !musicId || !themeId || !certificate || !numAttempt || !fontStyle || !fontClr || !fontSize || !quizMode || !sections || !orgiName) {
      //    response.status(400).json({
      //      success: false,
      //      message: "All fields are required!"
      //    })
      //   } else {
      let newQuestions = JSON.parse(questions);
      // Object.keys(request.files).map((file, index) => {
      //   if (file.includes("questionImage")) {
      //     newQuestions[file.charAt(file.length - 1)].image =
      //       request.files[file][0].filename;
      //   } else if (file.includes("questionAudio")) {
      //     newQuestions[file.charAt(file.length - 1)].audio =
      //       request.files[file][0].filename;
      //   }
      // });

      const data = {
        quizTitle,
        quizDescription,
        questions: newQuestions,

        isActive,
        userId,
        quizType,
        totalQuestions,
        language,
        createdAt,
        musicId,
        themeId,
        fontStyle,
        fontClr,
        attemptlimit,
        fontSize,
        // quizMode,
        // sections,
        // orgiName,

        paymentType,
        amount,

        //  coverImage: coverImagePath,
        // audio: audioPath,
        // video: videoPath
      };

      const quiz = new QuizSchema(data);
      quiz
        .save()
        .then(() => {
          const subscriptionData = {
            userId: userId,
            quizId: quiz._id,
            amount: amount,
            subscriptionType: "quiz",
          };
          const subscription = new subscriptionSchema(subscriptionData);
          return subscription.save().then(() => {
            return {
              quiz: quiz,
              subscription: subscription,
              success: true,
              message: "Quiz created successfully!",
            };
          });
        })
        .then((responseData) => {
          response.status(200).json(responseData);
        })
        .catch((error) => {
          response.status(400).json({
            success: false,
            message: error.message,
          });
        });
    }
  });
};
const createSurvey = async (request, response) => {
  upload(request, response, async (err) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }

    try {
      // Destructure the request body
      const {
        quizTitle,
        quizDescription,
        questions,
        isActive,
        userId,
        quizType,
        totalQuestions,

        language,
        createdAt,
        customCertificate,
        musicId,
        themeId,
        certificate,
        fontStyle,
        fontClr,
        fontSize,
        paymentType,
        amount,
        certContent,
      } = request.body;

      // Log the questions to verify its structure
      console.log("Original Questions:", request.body);

      // Ensure questions are in object format (they might already be, depending on the request)
      let newQuestions;
      if (typeof questions === "string") {
        // Parse questions if it's in JSON string format
        newQuestions = JSON.parse(questions);
      } else {
        // Use questions directly if it's already an object
        newQuestions = questions;
      }

      // Handle file mappings
      Object.keys(request.files || {}).map((file) => {
        if (file.includes("questionImage")) {
          newQuestions[file.charAt(file.length - 1)].image =
            request.files[file][0].filename;
        } else if (file.includes("questionAudio")) {
          newQuestions[file.charAt(file.length - 1)].audio =
            request.files[file][0].filename;
        }
      });

      // Prepare the data for saving
      const data = {
        quizTitle,
        quizDescription,
        questions: newQuestions,
        isActive,
        userId,
        quizType,
        totalQuestions,
        language,
        createdAt,
        musicId,
        themeId,
        certificate,
        customCertificate,
        fontStyle,
        fontClr,
        fontSize,
        paymentType,
        amount,
        certContent,
      };

      // Create a new quiz document
      const quiz = new QuizSchema(data);

      // Save the quiz and create a subscription
      const savedQuiz = await quiz.save();
      const subscriptionData = {
        userId: userId,
        quizId: savedQuiz._id,
        amount: amount,
        subscriptionType: "quiz",
      };
      const subscription = new subscriptionSchema(subscriptionData);
      await subscription.save();

      // Respond with the saved quiz and subscription
      response.status(200).json({
        success: true,
        message: "Survey created successfully!",
        quiz: savedQuiz,
        subscription: subscription,
      });
    } catch (error) {
      // Handle errors during parsing or saving
      response.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });
};

const toggleActivityStatus = async (req, res) => {
  const { id } = req.params;
  console.log(id, "this is condition");
  const quiz = await QuizSchema.findById(id);
  if (!quiz) {
    res.status(500).json({
      success: false,
      message: "Quiz does not exist!",
    });
  } else {
    const updatedQuiz = await QuizSchema.findByIdAndUpdate(
      id,
      { isActive: !quiz.isActive },
      { new: true }
    );
    res.status(200).json({
      success: true,
      quiz: updatedQuiz,
    });
  }
};

//please work
const updateQuiz = async (req, res) => {
  console.log(req.body, "this is body");
  const { id } = req.params;
  const {
    quizTitle,
    quizDescription,
    questions,
    reqPercentage,
    isActive,
    userId,
    totalCredit,
    totalPoint,
    quizType,
    quizGrades,
    totalQuestions,
    subject,
    language,
    createdAt,
    customCertificate,
    musicId,
    themeId,
    certificate,
    numAttempt,
    fontStyle,
    fontSize,
    quizMode,
    startdate,
    enddate,
    fontClr,
    timeline,
    sections,
    orgiName,
    amount,
    competitionName,
    customlogo,
    discriptionofcertificate,
    ownerSignature,
    postiononcertificate,
    paymentType,
    coverImage,
  } = req.body;

  const newQuestions = Array.isArray(questions)
    ? questions
    : JSON.parse(questions);
  const parsedQuizGrades =
    quizGrades && Array.isArray(quizGrades)
      ? quizGrades
      : quizGrades
      ? JSON.parse(quizGrades)
      : null;
  const parsedSubject =
    subject && Array.isArray(subject)
      ? subject
      : subject
      ? JSON.parse(subject)
      : null;

  const quiz = QuizSchema.findByIdAndUpdate(
    id,
    {
      quizTitle,
      quizDescription,
      questions: newQuestions,
      reqPercentage,
      isActive,
      userId,
      totalCredit,
      totalPoint,
      quizType,
      quizGrades: parsedQuizGrades || [],
      totalQuestions,
      subject: parsedSubject || [],
      language,
      createdAt,
      fontClr,
      musicId,
      themeId,
      certificate,
      customCertificate,
      numAttempt,
      ownerSignature,
      fontStyle,

      fontSize,
      quizMode,
      startdate,
      enddate,
      timeline,
      sections,
      orgiName,
      competitionName,
      customlogo,
      discriptionofcertificate,
      postiononcertificate,
      amount,
      paymentType,
      coverImage,
    },
    function (err, docs) {
      if (err) {
        res.status(401).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Quiz Updated Successfully!",
          docs,
        });
      }
    }
  );
};

// const createQuizTest = upload.fields([{ name: "coverImage" }, { name: "video" }, { name: "audio" }])
const createQuizReport = async (req, res) => {
  try {
    const { userid, quizid } = request.body;
    const report = await QuizReport.create({
      userid,
      quizid,
    });

    response.status(200).json({
      success: true,
      report,
    });
  } catch (e) {
    response.status(500).json(e);
  }
};

const createQuizResponse = async (req, res) => {
  try {
    const { userid, quizAttend, quizid } = req.body;
    console.log(req.body, "this is body");

    const report = await ResponseSchema.create({
      attenderId: userid,
      quizcreater: quizAttend.userid,
      quizAttend,
      quizid,
    });

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
      // message:"Something went Wrong!"
    });
  }
};
const createPollResponse = async (req, res) => {
  try {
    const { userid, quizAttend, quizid } = req.body;

    const report = await ResponseSchema.create({
      attenderId: userid,
      quizAttend,
      quizid,
    });

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
      // message:"Something went Wrong!"
    });
  }
};
const fetchQuizResponsebyId = async (req, res) => {
  console.log(req.body);
  try {
    const report = await ResponseSchema.find({ quizid: req.body.quizid });

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
      // message:"Something went Wrong!"
    });
  }
};

const fetchQuizResponsebyUserId = async (req, res) => {
  try {
    const report = await ResponseSchema.find({
      attenderId: req.body.attenderId,
    });

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
      // message:"Something went Wrong!"
    });
  }
};

const fetchQuizReports = async (request, response) => {
  try {
    const report = await QuizReport.find()
      .populate("userid")
      .populate("quizid");

    response.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchQuizAllReports = (request, response) => {
  const id = request.params.id;
  getQuizAllReports(id) //not working
    .then((res) => {
      response.status(200).json(res.data);
    })
    .catch((errRes) => {
      response.status(500).json(errRes);
    });
};

const fetchQuizByUserId = async (request, res) => {
  // ​http://localhost:3000/api/quiz-reports-quizID/63f9e4ca9519bbcd484735e5
  try {
    console.log(request.body.userid, "this is user id");
    console.log(request.body.type, "this is quition ypt");
    const report = await QuizSchema.find({ userId: request.body.userid });
    console.log(report);
    console.log("report");

    const totalQuizzes = await report.length;
    const allQuiz = [];

    for (const quiz of report) {
      const quiz_attended_info = await ResponseSchema.find({
        quizid: quiz._id,
      });
      const quizTransactions = await quizTransactionSchema.find({
        quizid: quiz._id,
      });

      const tmpAmount = quizTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      console.log(quiz);
      allQuiz.push({
        _id: quiz._id,
        totalCredit: quiz.totalCredit,
        totalPoint: quiz.totalPoint,
        paymentType: quiz.paymentType,
        language: quiz.language,
        musicId: quiz.musicId,
        themeId: quiz.themeId,
        certificate: quiz.certificate,
        questions: quiz.questions,
        customCertificate: quiz.customCertificate,
        numAttempt: quiz_attended_info.numAttempt, // derived from quiz_attended_info.length
        fontSize: quiz.fontSize,
        fontStyle: quiz.fontStyle,
        quizMode: quiz.quizMode,
        sections: quiz.sections,
        orgiName: quiz.orgiName,
        wordcloud: quiz.wordcloud,
        amount: tmpAmount, // derived from tmpAmount
        certContent: quiz.certContent,
        isActive: quiz.isActive,
        userId: quiz.userId,
        quizType: quiz.quizType,
        quizGrades: quiz.quizGrades,
        subject: quiz.subject,
        quizTitle: quiz.quizTitle,
        quizDescription: quiz.quizDescription,
        numofAttempts: quiz_attended_info.length,
        totalrevenue: tmpAmount,
        createdAt: quiz.createdAt,
        startdate: quiz.startdate,
        enddate: quiz.enddate,
        timeline: quiz.timeline,
      });
    }
    console.log(allQuiz, "this si all quiz ");

    res.status(200).json({
      success: true,
      allQuiz,
      total_quizzes: totalQuizzes,
    });
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// const fetchQuizByUserId = async (request, response) => {
//   // ​http://localhost:3000/api/quiz-reports-quizID/63f9e4ca9519bbcd484735e5

//   try {
//     const report = await QuizSchema.find({
//       userId: request.body.userid,
//       quizType: "POLL",
//     });
//     const totalPolls = await QuizSchema.count();
//     const allQuiz = [];

//     for (const quiz of report) {
//       const quiz_attended_info = await ResponseSchema.find({
//         quizid: quiz._id,
//       });
//       const quizTransactions = await quizTransactionSchema.find({
//         quizid: quiz._id,
//       });

//       const tmpAmount = quizTransactions.reduce(
//         (acc, curr) => acc + curr.amount,
//         0
//       );

//       allQuiz.push({
//         ...quiz.toObject(),
//         numAttempt: quiz_attended_info.length,
//         amount: tmpAmount,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       allQuiz,
//       total_polls: totalPolls,
//     });
//   } catch (error) {
//     console.error("Error fetching all quizzes:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };

const fetchSurveyByUserId = async (request, response) => {
  // ​http://localhost:3000/api/quiz-reports-quizID/63f9e4ca9519bbcd484735e5
  console.log(request);
  const report = await QuizSchema.find({
    $and: [{ userId: request.body.id }, { quizType: "SURVEY" }],
  });
  // let count_passStudent = 0
  // let attemped_student = 0
  // for (const x of report) {
  //   if (x.pass_fail == "pass") {
  //     count_passStudent++
  //   }
  //   attemped_student++
  // }

  if (!report) {
    response.status(200).json({
      success: true,
      message: "Report not found!",
    });
  } else
    response.status(200).json({
      success: true,
      // attemped_student,
      // count_passStudent,
      report,
    });
};

const fetchQuizAttenderId = async (request, response) => {
  // ​http://localhost:3000/api/quiz-reports-quizID/63f9e4ca9519bbcd484735e5
  const { quizAttend, attenderId } = request.body;
  console.log(request.body);
  //console.log(itm)
  const report = await ResponseSchema.find({ attenderId: attenderId });
  console.log(report);
  // let count_passStudent = 0
  // let attemped_student = 0
  // for (const x of report) {
  //   if (x.pass_fail == "pass") {
  //     count_passStudent++
  //   }
  //   attemped_student++
  // }

  if (!report) {
    response.status(200).json({
      success: true,
      message: "Report not found!",
    });
  } else
    response.status(200).json({
      success: true,
      // attemped_student,
      // count_passStudent,
      report,
    });
};

const getQuestionsType = async (req, res) => {
  try {
    // Fetch all quizzes
    const allQuiz = await QuizSchema.find({ quizType: req.body.quizType });

    // Initialize an empty object to keep track of question types and their counts
    let questionsArr = {};

    // Iterate over each quiz
    allQuiz.forEach((quiz) => {
      // Iterate over each question in the quiz
      quiz.questions.forEach((ques) => {
        // Count the occurrences of each question type
        questionsArr[ques.type] = (questionsArr[ques.type] || 0) + 1;
      });
    });

    // Respond with the data as a key-value map
    res.status(200).json({
      success: true,
      data: questionsArr,
    });
  } catch (error) {
    // Respond with an error message
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllQuizCategoryWise = async (request, res) => {
  try {
    const allQuiz = await QuizSchema.find();
    const quiz = allQuiz.filter((item) => {
      return item.quizType === "QUIZ";
    });
    const poll = allQuiz.filter((item) => {
      return item.quizType === "POLL";
    });
    const survey = allQuiz.filter((item) => {
      return item.quizType === "SURVEY";
    });

    console.log(allQuiz);
    // const allSurvey=await surve
    let quizArr = {
      quiz: quiz,
      poll: poll,
      survey: survey,
    };

    res.status(200).json({
      success: true,
      data: quizArr,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
const getSubjectWiseGradeWise = async (req, res) => {
  try {
    // Fetch data from the QuizSchema
    const quizzes = await QuizSchema.find({});

    // Initialize an empty object to store the formatted data
    const formattedData = {};

    // Iterate over each quiz and organize the data by subject and grade
    quizzes.forEach((quiz) => {
      quiz.subject.forEach((subject) => {
        if (!formattedData[subject]) {
          formattedData[subject] = {};
        }
        quiz.quizGrades.forEach((grade) => {
          if (!formattedData[subject][grade]) {
            formattedData[subject][grade] = 0;
          }
          formattedData[subject][grade]++;
        });
      });
    });
    console.log(formattedData);
    // Convert the formatted data to the desired array format
    const data = Object.keys(formattedData).map((subject) => {
      const gradeCounts = formattedData[subject];
      return { name: subject, ...gradeCounts };
    });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
const getGradeWise = async (req, res) => {
  try {
    // Fetch all quizzes
    const quizzes = await QuizSchema.find({ quizType: req.body.quizType });
    console.log(quizzes);
    // Initialize formatted data object
    const formattedData = {};

    // Iterate through each quiz
    for (const quiz of quizzes) {
      // Fetch all transactions related to the current quiz
      const quizTransactions = await quizTransactionSchema.find({
        quizid: quiz._id,
      });

      // Calculate the total amount for the current quiz
      const totalAmount = quizTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      // Iterate through each grade in the current quiz
      quiz.quizGrades.forEach((grade) => {
        // If the grade is not yet in formatted data, initialize it
        if (!formattedData[grade]) {
          formattedData[grade] = { count: 0, totalAmount: 0 };
        }

        // Increment the count and add the total amount for the grade
        formattedData[grade].count++;
        formattedData[grade].totalAmount += totalAmount;
      });
    }

    // Send the response with formatted data
    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSubjectWise = async (req, res) => {
  try {
    // Fetch all quizzes
    const quizzes = await QuizSchema.find({});

    // Initialize formatted data object
    const formattedData = {};

    // Iterate through each quiz
    for (const quiz of quizzes) {
      // Fetch all transactions related to the current quiz
      const quizTransactions = await quizTransactionSchema.find({
        quizid: quiz._id,
      });

      // Calculate the total amount for the current quiz
      const totalAmount = quizTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      // Iterate through each grade in the current quiz
      quiz.subject.forEach((grade) => {
        // If the grade is not yet in formatted data, initialize it
        if (!formattedData[grade]) {
          formattedData[grade] = { count: 0, totalAmount: 0 };
        }

        // Increment the count and add the total amount for the grade
        formattedData[grade].count++;
        formattedData[grade].totalAmount += totalAmount;
      });
    }

    // Send the response with formatted data
    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const addTransaction = async (request, res) => {
  try {
    const trans = await quizTransactionSchema.findOne({
      userid: request.body.userid,
      quizid: request.body.quizid,
    });
    if (trans) {
      res.status(200).json({
        success: false,
        message: "Transaction already Existis",
        trans,
      });
    } else {
      const transaction = await quizTransactionSchema.create(request.body);

      if (!transaction) {
        res.status(401).json({
          success: true,
          message: "Unable to create",
        });
      }
      res.status(200).json({
        success: true,
        transaction,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchQuizIndividualReports = async (request, res) => {
  try {
    const report = await QuizReport.findById(request.params.id);
    console.log(report);
    if (!report) {
      res.status(401).json({
        success: true,
        message: "Report not found!",
      });
    }
    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// >> Delete Quiz By ID

const deleteQuizById = async (req, res) => {
  req.params.id;
  try {
    const quiz = await QuizSchema.findByIdAndDelete(req.params.id);
    // return quiz response

    console.log(quiz);

    // const newQuizResponse = await ResponseSchema.deleteMany({ "quizid": req.params.id })

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// >> Update Quiz State
const updateQuizState = async (req, res) => {
  const { id, isActive } = req.body;

  const quiz = QuizSchema.findByIdAndUpdate(
    id,
    { isActive },
    function (err, docs) {
      if (err) {
        res.status(401).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Quiz Updated Successfully!",
          docs,
        });
      }
    }
  );
};

// function for creation of certificate with given studentName, teacherName, content, and teacher signature image
const createCertificate = (
  template = 1,
  studentName,
  organizationName = "Lets Quiz",
  customCertificate,
  teacherName,
  content,
  teacherSignature = "vishalSNoBg.png"
) => {
  const createCert1 = async (
    studentName,
    teacherName,
    content,
    organizationName,
    teacherSignature
  ) => {
    const doc = new PDFDocument({
      size: [842, 595],
      margins: {
        left: 50,
        right: 50,
        top: 72,
        bottom: 52,
      },
      info: {
        Title: "Certificate",
      },
    });

    doc.pipe(fs.createWriteStream("certificate" + "_" + studentName + ".pdf"));

    await doc.image("cert12.png", 0, 0, {
      width: 842,
      height: 595,
      align: "center",
      valign: "center",
    });

    await doc
      .font("Times-Bold")
      .fontSize(20)
      .text(organizationName, 20, 50, {
        align: "center",
      })
      .fillColor("#DDAC00");

    await doc
      .font("fonts/GreatVibes-Regular.ttf")
      .fontSize(70)
      .text(studentName, 50, 280, {
        align: "center",
      })
      .fillColor("#000");

    await doc
      .font("fonts/Poppins/Poppins-Italic.ttf")
      .fontSize(15)
      .text(content, 171, 360, {
        align: "center",
        width: 500,
      });

    doc.font("Times-Bold").fontSize(16).text(studentName, 230, 490, {
      // align: 'center'
    });

    doc.font("Times-Bold").fontSize(16).text(teacherName, 520, 490, {
      // align: 'right'
      fontWeight: "bold",
    });

    doc.font("Times-Roman").fontSize(14).text("Teacher", 540, 510, {
      // align: 'center'
    });

    doc.image(teacherSignature, 495, 390, {
      // align: 'center',
      // width: 100,
      height: 100,
    });

    await doc.end(() => {});
  };

  const createCert2 = async (
    studentName,
    teacherName,
    content,
    organizationName,
    teacherSignature
  ) => {
    const doc = new PDFDocument({
      size: [842, 595],
      margins: {
        left: 50,
        right: 50,
        top: 72,
        bottom: 52,
      },
      info: {
        Title: "Certificate",
      },
    });

    doc.pipe(fs.createWriteStream("certificate" + "_" + studentName + ".pdf"));

    doc.image("cert2.png", 0, 0, {
      width: 842,
      height: 595,
      align: "center",
      valign: "center",
    });

    doc
      .font("Times-Bold")
      .fontSize(20)
      .text(organizationName, 20, 85, {
        align: "center",
      })
      .fillColor("#1D3644");

    doc
      .font("fonts/GreatVibes-Regular.ttf")
      .fontSize(70)
      .text(studentName, 50, 280, {
        align: "center",
      })
      .fillColor("#000");

    doc
      .font("fonts/Poppins/Poppins-Regular.ttf")
      .fontSize(15)
      .text(content, 171, 360, {
        align: "center",
        width: 500,
      });

    doc.font("Times-Bold").fontSize(16).text(studentName, 230, 460, {
      // align: 'center'
    });

    doc.font("Times-Roman").fontSize(14).text("Student", 250, 480, {
      // align: 'center'
    });

    doc.font("Times-Bold").fontSize(16).text(teacherName, 520, 460, {
      // align: 'right'
      fontWeight: "bold",
    });

    doc.font("Times-Roman").fontSize(14).text("Teacher", 540, 480, {
      // align: 'center'
    });

    doc.image(teacherSignature, 495, 380, {
      // align: 'center',
      // width: 100,
      height: 80,
    });

    doc.end();
  };

  const createCert3 = async (
    studentName,
    teacherName,
    content,
    organizationName,
    teacherSignature
  ) => {
    const doc = new PDFDocument({
      size: [842, 595],
      margins: {
        left: 50,
        right: 50,
        top: 72,
        bottom: 20,
      },
      info: {
        Title: "Certificate",
      },
    });

    doc.pipe(fs.createWriteStream("certificate" + "_" + studentName + ".pdf"));

    doc
      .image("cert3.png", 0, 0, {
        width: 842,
        height: 595,
        align: "center",
        valign: "center",
      })
      .fillColor("#DDAC00");

    // doc
    // .font('Times-Bold')
    // .fontSize(20)
    // .text(organizationName, 20, 50, {
    //   align: 'center'
    // })
    // .fillColor("#DDAC00")

    doc
      .font("fonts/GreatVibes-Regular.ttf")
      .fontSize(70)
      .text(studentName, 290, 250, {
        align: "center",
      })
      .fillColor("#000");

    doc
      .font("fonts/Poppins/Poppins-Italic.ttf")
      .fontSize(15)
      .text(content, 360, 340, {
        align: "center",
        width: 450,
      });

    doc.font("Times-Bold").fontSize(16).text(studentName, 395, 510, {
      // align: 'center'
    });

    doc.font("Times-Roman").fontSize(14).text("Student", 415, 530, {
      // align: 'center'
    });

    doc.font("Times-Bold").fontSize(16).text(teacherName, 600, 510, {
      // align: 'right'
      fontWeight: "bold",
    });

    doc.font("Times-Roman").fontSize(14).text("Teacher", 640, 530, {
      // align: 'center'
    });

    doc.image(teacherSignature, 580, 405, {
      // align: 'center',
      // width: 100,
      height: 100,
    });

    doc.end();

    const certificate = fs.readFileSync(
      "certificate" + "_" + studentName + ".pdf"
    );
    return certificate;
  };

  const createCertCustom = async (
    studentName,
    teacherName,
    content,
    organizationName,
    teacherSignature
  ) => {
    const doc = new PDFDocument({
      size: [842, 595],
      margins: {
        left: 50,
        right: 50,
        top: 72,
        bottom: 20,
      },
      info: {
        Title: "Certificate",
      },
    });

    doc.pipe(fs.createWriteStream("certificate" + "_" + studentName + ".pdf"));

    doc.image("uploads/certificates/" + content, 0, 0, {
      width: 842,
      height: 595,
      align: "center",
      valign: "center",
    });

    doc
      // .font('fonts/GreatVibes-Regular.ttf')
      .fontSize(60)
      .text(studentName, 50, 280, {
        align: "center",
      });

    doc.end();
  };

  switch (template) {
    case "1":
      return createCert1(
        studentName,
        teacherName,
        content,
        organizationName,
        teacherSignature
      );
    case "2":
      return createCert2(
        studentName,
        teacherName,
        content,
        organizationName,
        teacherSignature
      );
    case "3":
      return createCert3(
        studentName,
        teacherName,
        content,
        organizationName,
        teacherSignature
      );
    case "4":
      return createCertCustom(
        studentName,
        teacherName,
        content,
        organizationName,
        teacherSignature
      );
    default:
      return createCert1(
        studentName,
        teacherName,
        content,
        organizationName,
        teacherSignature
      );
  }
};
const getQuizAttempts = async (req, res) => {
  const { userid, quizid } = req.body;

  const quiz_attended_info = await ResponseSchema.find({
    $and: [
      {
        attenderId: userid,
        quizid: quizid,
      },
    ],
  });
  if (quiz_attended_info.length == 0) {
    return res.status(200).json({
      quiz_count: 0,
    });
  } else {
    return res.status(200).json({
      quiz_count: quiz_attended_info.length,
    });
  }
};

const downloadCertificate = async (req, res) => {
  const { student, teacher, content, organizationName, template, quizid } =
    req.query;
  // res.json(studentName, teacherName, content, teacherSignature)

  let customCertificate = null;
  if (template.toString() == "4") {
    const quizDetails = await QuizSchema.findById(quizid);
    const customCertificate = quizDetails.customCertificate;
    await createCertificate(
      template,
      student,
      teacher,
      content,
      organizationName,
      customCertificate
    );
  } else {
    await createCertificate(
      template,
      student,
      teacher,
      content,
      organizationName
    );
  }
  setTimeout(() => {
    const certificate = fs.readFileSync("certificate" + "_" + student + ".pdf");
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=certificate.pdf",
      "Content-Length": certificate.length,
    });

    res.end(certificate);

    fs.unlink("certificate" + "_" + student + ".pdf", (err) => {
      if (err) {
        return;
      }
    });
  }, 1000);

  // res.writeHead(200, {
  //   'Content-Type': 'application/pdf',
  //   'Content-Disposition': 'attachment; filename=certificate.pdf',
  //   'Content-Length': certificate.length
  // });
};

async function allQuizes(req, res) {
  const { subject } = req.body;
  console.log(subject);

  let data = await quizschema.find({
    subject: { $in: [subject] }, // Check if subject exists in the subject array
  });
  console.log(data);
  res.send(data);
}

module.exports = {
  allQuizes,
  updatedPollVote,
  rateQuiz,
  fetchAllQuiz,
  fetchAllPoll,
  fetchAllWordcloud,
  fetchAllSurvey,
  fetchQuizById,
  createQuiz,
  createPoll,
  createSurvey,
  createQuizReport,
  createQuizResponse,
  fetchQuizReports,
  fetchQuizAttenderId,
  // fetchPollByUserId,
  fetchSurveyByUserId,
  fetchPollByUserId,
  fetchQuizByUserId,
  toggleActivityStatus,
  fetchQuizAllReports,
  fetchQuizIndividualReports,
  deleteQuizById,
  updateQuiz,
  updateQuizState,
  fetchQuizResponsebyId,
  fetchQuizResponsebyUserId,
  downloadCertificate,
  getQuestionsType,
  getAllQuizCategoryWise,
  getSubjectWiseGradeWise,
  getGradeWise,
  getSubjectWise,
  addTransaction,
  getQuizAttempts,
  createPollResponse,
};
