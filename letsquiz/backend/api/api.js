const express = require("express");
const router = express.Router();
const path = require("node:path");
const User = require("../schema/userSchema.js");
const Teacher = require("../schema/teacherschema.js");
const userServices = require("../controller/users.js");
const studentschema = require("../schema/studentschema.js");

// POST method
router.post("/create", (req, res) => {
  res.send("Create API hit!");
});

// GET method
router.get("/read", (req, res) => {
  res.send("Read API hit!");
});

router.post("/signup", function (req, res) {
  // var data = jsonDecode(req.body);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user.save();
  res.send("User saved to database");
  // return res.sendFile(path.join(__dirname, "../signup_sucess.html"));
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;

  // res.send("Login API hit!");
  userServices.login({ email, password }).then((user) => {
    res.json(user);
  });
});
// >> For teacher Sign Up
router.post("/teacher-signup", (req, res) => {
  const { email, password, firstname, lastname, organization, usertype } =
    req.body;

  const teacher = new Teacher({
    email,
    password,
    firstname,
    lastname,
    organization,
    usertype,
  });
  teacher.save();
  res.status(200).json({
    success: true,
    message: "Teacher account created successfully!",
  });
});
router.post("/student-signup", (req, res) => {
  const {
    firstname,
    lastname,
    password,
    createdAt,
    studentId,
    userType,
    phoneNumber,
    emailid,
  } = req.body;

  const student = new studentschema({
    firstname,
    lastname,
    password,
    createdAt,
    studentId,
    userType,
    phoneNumber,
    emailid,
  });
  student.save();
  res.status(200).json({
    success: true,
    message: "student account created successfully!",
  });
});
router.get("/getHeavyWeightBoxers", function (req, res) {
  Boxer.find(
    {
      weight: { $gte: 80, $lte: 92 },
    },
    function (err, foundBoxers) {
      if (err) {
        console.log(err);
      } else {
        res.send(foundBoxers);
      }
    }
  );
});

router.get("/getAllBoxers", function (req, res) {
  Boxer.find(
    // {
    //   weight: { $gte: 90, $lte: 100 },
    // },
    function (err, foundBoxers) {
      if (err) {
        console.log(err);
      } else {
        console.log("foundBoxers");
        console.log(foundBoxers);
        console.log(foundBoxers.length);
        console.log(foundBoxers[0].Name);

        // Instead this data should be sent to the frontend
        // res.render("grid.ejs", { users: foundBoxers });

        res.send(foundBoxers);
      }
    }
  );
});

module.exports = router;
