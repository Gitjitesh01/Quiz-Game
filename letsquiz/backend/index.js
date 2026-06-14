const express = require("express");
const app = express();
const mongoose = require("mongoose");
const QuizSchema = require("./schema/quizschema.js");
const pollSchema = require("./schema/pollschema.js");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(bodyParser.json({ limit: "300mb" }));

app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(express.json());

//we get some issue on update quiz so we use this code here this only chnage isActive copnent of quiz

//

// Set EJS as the template engine
// app.set("view engine", "ejs");
// import API.js
const api = require("./api/api.js");
const quiz = require("./routes/quiz.routes");
const public = require("./routes/publicRoutes");
const banner = require("./routes/bannerRoutes.js");
const subscription = require("./routes/subscriptionPlanRoute.js");
const discount = require("./routes/discountRoutes.js");
const student = require("./routes/studentRoutes");
const teacher = require("./routes/teacherRoute");
const tax = require("./routes/taxRoutes");
const user = require("./routes/userRoutes");
const superAdmin = require("./routes/superAdminRoute");
const Subscription = require("./schema/subscriptionPlanSchema");
const cancelation = require("./routes/CancelationRotes.js");
const bankdetails = require("./routes/BankdetailsRoutes.js");
const transaction = require("./routes/transaction.js");
const Payout = require("./routes/payoutRoutes.js");
const Support = require("./routes/supportRoutes.js");

const admin = require("./routes/adminRoutes");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use(cors({ orign: process.env.CLIENT_URL, credentials: true })); //Credentials for sending cookies

app.use(cookieParser());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.put("/toggleActivityStatus/:id", async (req, res) => {
  const { id } = req.params;
  //.log(id ,"this is condition" );
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
  // res.send("Connected");
});

app.put("/toggleschedule/:id", async (req, res) => {
  const { id } = req.params;
  //.log(id ,"this is condition" );
  const quiz = await QuizSchema.findById(id);
  if (!quiz) {
    res.status(500).json({
      success: false,
      message: "Quiz does not exist!",
    });
  } else {
    const updatedQuiz = await QuizSchema.findByIdAndUpdate(
      id,
      { timeline: !quiz.timeline },
      { new: true }
    );
    res.status(200).json({
      success: true,
      quiz: updatedQuiz,
    });
  }
  // res.send("Connected");
});

// app.get("/" , (req , res) => {
//   res.json({message : "Connected"})
// })
// use API routes
// app.use(express.static(path.join(__dirname, "dist/letquiz")));
app.use("/uploads", express.static("uploads"));
app.use("/api/quiz", quiz);
// app.use("/api", poll);
app.use("/api", student);
app.use("/api", public);
app.use("/api", banner);
app.use("/api", subscription);
app.use("/api", cancelation);
app.use("/api", discount);
app.use("/api", teacher);
app.use("/api", bankdetails);
app.use("/api", Payout);
app.use("/api", tax);
app.use("/api/user", user);
app.use("/api", admin);
app.use("/api", transaction);
app.use("/api", Support);
app.use("/api", superAdmin);
app.get("/api", (req, res) => {
  res.send("Connected");
});

// polls

// API endpoint to create a new poll

// ***********

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,'../frontend/dist', 'index.html'));
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});

app.post("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});

// use API routes
// router(app);

// >> StrictQuery
mongoose.set("strictQuery", false);
// const url = "mongodb+srv://abood:123@cluster0.ovovdyh.mongodb.net/?retryWrites=true&w=majority";
const url =
  process.env.MONGODB_URI ||
  process.env.DATABASE ||
  "mongodb+srv://ashwin:L73LFmAD66yVJkdB@cluster0.bmzbyjh.mongodb.net/LetsQuiz?retryWrites=true&w=majority";

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    //.log(`listening on http://localhost:${PORT}`);
  });
}

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    //.log("connection succesful");
  })
  .catch((e) => {
    //.log(e);
  });

module.exports = app;
