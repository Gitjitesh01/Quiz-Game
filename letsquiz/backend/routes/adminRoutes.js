const { createAdmin, adminLogin, adminFind } = require("../controller/adminController");
const { updateTeacherState } = require('../controller/teacherController');
const quizController = require("../controller/quiz");

let router = require("express").Router();


router.post("/register-admin", createAdmin);
router.post("/login-admin", adminLogin);

router.post("/find-admin", adminFind);
router.put("/update-teacher-state", updateTeacherState);
router.put("/update-quiz-state", quizController.updateQuizState);
router.delete("/delete-quiz/:id", quizController.deleteQuizById);

module.exports = router;