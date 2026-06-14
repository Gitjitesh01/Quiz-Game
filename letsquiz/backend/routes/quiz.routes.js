const userController = require("../controller/users");
const quizController = require("../controller/quiz");
const quizschema = require("../schema/quizschema");

let router = require("express").Router();

// User routes
// router.get('/user', userController.fetchUser);
// router.get('/userbyemail', userController.fetchUserByEmail);
// router.post('/user', userController.createUser);
// router.get('/valid-email', userController.isValidEmail);
// router.post('/validateUser', userController.validateUser);
// api/quiz/quizbyUserID/

router.get("/allquiz", quizController.fetchAllQuiz);

router.get("/allpoll", quizController.fetchAllPoll);
router.get("/getpollbyuserid/:id", quizController.fetchPollByUserId);
//router.get('/allpoll', quizController.fetchAllWordcloud);
router.post("/poll-updatevote/", quizController.updatedPollVote); //update poll vote
router.post("/poll-response/", quizController.createPollResponse); //update poll vote
router.post("/wordcloud/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body.data.map((e) => e?.filter((e) => e));
  // //.table(data);
  const futures = data.map(async (element, index) => {
    return await quizschema.findByIdAndUpdate(id, {
      $push: { [`questions.${index}.wordcloud`]: { $each: element } },
    });
  });
  await Promise.all(futures);

  // //.table(data);
  // //.table((await quizschema.findById(id)).questions.map(e => e.wordcloud))

  // //.table(quiz.toObject());

  return res.json({ success: true, message: "success" });
}); //update poll vote

router.get("/allsurvey", quizController.fetchAllSurvey);
router.post("/allQuizes", quizController.allQuizes);
router.post("/quizbyuserid/", quizController.fetchQuizByUserId);

// router.post('/poll-user/', quizController.fetchPollByUserId);
router.post("/survey-user/", quizController.fetchSurveyByUserId);

router.post("/quiz-attender/", quizController.fetchQuizAttenderId);
router.post("/create-quiz", quizController.createQuiz);
router.post("/create-poll", quizController.createPoll);
router.post("/create-survey", quizController.createSurvey);
router.delete("/quiz/:id", quizController.deleteQuizById);
router.post("/quiz-update", quizController.updateQuiz);
router.get("/quiz/:id", quizController.fetchQuizById); //Question and subject declearation ??confuse
router.post("/quiz-reports", quizController.createQuizReport);
router.get("/quiz-reports", quizController.fetchQuizReports);
router.get("/certificate", quizController.downloadCertificate);
router.post("/quiz-rating/:id" , quizController.rateQuiz)

router.post("/quiz-response", quizController.createQuizResponse);
router.post("/quiz-responsebyId/", quizController.fetchQuizResponsebyId);
router.post("/responseby-userId/", quizController.fetchQuizResponsebyUserId);
router.post("/quiz-questionType/", quizController.getQuestionsType);
router.post("/quiz-categoryWise/", quizController.getAllQuizCategoryWise);
router.post("/quiz-SubjectGradeWise/", quizController.getSubjectWiseGradeWise);
router.post("/quiz-gradeWise/", quizController.getGradeWise);
router.post("/quiz-subjectWise/", quizController.getSubjectWise);
router.post("/add-transaction/", quizController.addTransaction);
router.post("/get-quizattempts/", quizController.getQuizAttempts);
router.patch("/update-quiz/:id", quizController.updateQuiz);

// router.get('/quiz-reports/:id', quizController.fetchQuizReportsById);   //pending

//router.get('/quiz-reports-quizID/:id', quizController.fetchQuizReportsById);

// router.get('/quiz-all-reports/', quizController.fetchQuizAllReports);

//pending

// router.get('/quiz-all-reports/:id', quizController.fetchQuizAllReports);
// router.get('/quiz-individual-reports/:id', quizController.fetchQuizIndividualReports);

module.exports = router;
