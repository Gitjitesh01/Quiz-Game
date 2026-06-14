const { registerTeacher, loginTeacher, updateTeacherState,getAllTeacher } = require("../controller/teacherController");




let router = require("express").Router();

router.post("/teacher-signup", registerTeacher);
router.post("/teacher-login", loginTeacher);

router.get("/getAllTeacher", getAllTeacher);
router.post("/teacher-update/:id", updateTeacherState);
module.exports = router;