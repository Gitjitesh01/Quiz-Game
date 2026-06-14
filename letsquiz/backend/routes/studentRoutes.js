const { registerStudent, putStudent, studentLogin, getAllStudents,updateStudentState } = require("../controller/studentController");



let router = require("express").Router();

router.put("/student-quiz", putStudent);
router.post("/student-signup", registerStudent);
router.get("/getAllStudent", getAllStudents);
router.post("/student-login", studentLogin);
router.post("/student-update/:id", updateStudentState);
module.exports = router;