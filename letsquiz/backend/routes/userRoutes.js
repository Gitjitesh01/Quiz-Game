const {
  userClassification,
  userLogin,
  registerUser,
  getAllUser,
  updateUserState,
  getCategoryWiseUsers,
  getSubCategoryWiseUsers,
  addUserAttendQuiz,
  getusersubcription,
  deleteUser,
  getUserForSubscription,
  getuser
} = require("../controller/users");

let router = require("express").Router();

router.post("/user-classfication", userClassification);


router.post("/user-signup", registerUser);
router.post("/user-login", userLogin);
router.get("/getallusers", getAllUser);
router.post('/getusersubcription',getusersubcription)
router.post("/user-update/:id", updateUserState);
router.get("/user-for-cancelation", getUserForSubscription);
router.post("/user", getuser);
router.post("/user-categorywise/", getCategoryWiseUsers);
router.post("/user-subcategorywise/", getSubCategoryWiseUsers);
router.delete("/delete-user/:id", deleteUser);
router.put("/add-userquiz/", addUserAttendQuiz);
module.exports = router;
