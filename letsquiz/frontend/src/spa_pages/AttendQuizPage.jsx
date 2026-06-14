import React, { useMemo } from "react";
import Timer from "../component/AttendQuizComponents/Timer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CustomizedProgressBars from "../component/AttendQuizComponents/ProgressBar";
import Questions from "../component/AttendQuizComponents/Questions";
import CircularIndeterminate from "../component/AttendQuizComponents/Loading";
import AttendForm from "../component/AttendQuizComponents/AttendForm";
import LoginBeforeAttend from "../component/AttendQuizComponents/LoginBeforeAttend";
import { QUIZ, USER, baseUrl } from "../constants/apiUrl";
import { useUser } from "../context/userContext";
import "../component/Animated_Background/css.css";
import {
  format,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  differenceInHours,
} from "date-fns";
import timer from "../component/timer/index";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://qhcpxbkmqeolnjplsmoi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoY3B4YmttcWVvbG5qcGxzbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MDIwNjAsImV4cCI6MjAzODk3ODA2MH0.4_hlataQGgbDJP7wttzIwtXkqHIg1rc7zZR14odOnho";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AttendQuizPage() {
  const { currentuserdata } = useUser();

  useEffect(() => {}, []);
  const [index, setIndex] = useState(0);
  const isLoggedIn = JSON.parse(localStorage.getItem("currentUser"))?._id;

  if (isLoggedIn && index === 0) {
    setIndex(1);
  }

  const [userName, setUserName] = useState("");
  const [isLogin, setLogin] = useState(false);

  const userData = useUser();
  const [quizType, setQuizType] = useState(0);
  const [attemptCompleted, setattemptCompleted] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isIdCorrect, setIsIdCorrect] = useState(true);
  const [timer, setTimer] = useState();
  const [progress, setProgress] = useState(0);
  const [starttime, setstarttime] = useState();
  const [endtime, setendtime] = useState();
  const [quizData, setQuizData] = useState();
  const [answers, setAnswers] = useState();
  const [currentquiz, setcurrentquiz] = useState([]);
  const [questions, setQuestions] = useState();
  console.log(currentuserdata);
  const [responseData, setResponseData] = useState({
    userid: currentuserdata?.id,

    quizAttend: {
      quizid: null,
      quiz_report_id: "",
      firstName: null,
      lastName: null,
      countryName: "",
      countryShort: "",
      email: "",
      attendCount: null,
      totalPoints: null,
      totalQuestions: null,
      attemptPresent: 0,
      status: "START",
      certificate: null,
      quizDescription: null,
      quizTitle: null,
      language: null,
      quizGrades: null,
      isPass: false,
      correctCount: 0,
      numAttempt: 0,
      NumQuesAttended: 0,
      createdBy: null,
      passPrecentage: 40,
      amount: 0,
      average: null,
      points: 0,
      questionDetails: [
        {
          question: null,
          pointScored: null,
          response: null,
          qattempt: null,
          type: null,
          timeLeft: null,
        },
        {
          question: null,
          pointScored: null,
          response: null,
          qattempt: null,
          type: null,
          timeLeft: null,
        },
        {
          question: null,
          pointScored: null,
          response: null,
          qattempt: null,
          type: null,
          timeLeft: null,
        },
      ],
      userid: [null],
      startedAt: null,
      orgiName: null,
      completedAt: null,
    },
    quizid: null,
  });

  const fillOutThis = [
    <p className=" font-semibold ">Fill out this quiz.</p>,
    <p className=" font-semibold ">Fill out this survey.</p>,
    <p className=" font-semibold ">Fill out this poll.</p>,
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    setstarttime(Date.now());
  }, []);

  const getquizresponsebyId = async () => {
    axios
      .post(baseUrl + QUIZ.getQuizbyresponseId, { quizid: id })
      .then((response) => {
        console.log(response.data.report);
        if (response.data.report) {
          setcurrentquiz(response.data.report);
          console.log(response.data.report);
        }
      });
  };

  useEffect(() => {
    getquizresponsebyId();
  }, []);

  const LogIn = () => {
    // This function will run when the component is rendered
    const localId = localStorage.getItem("localId");
    console.log(localId);
    const curr = localStorage.getItem("currentUser");
    console.log(curr);

    // if (localId || curr) {
    // } else {
    //   navigate("/login");
    // }
  };

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(baseUrl + QUIZ.getQuiz + `${id}`); //https://letsquiz.org/api/
      console.log(response.data.quiz.quizMode);
      const quizAttempts = await axios.post(baseUrl + QUIZ.getQuizAttempts, {
        quizid: response.data.quiz?._id,
        userid: userData.currentUser?._id,
      });
      setIsLoading(false);
      setIsIdCorrect(true);
      const resData = response.data.quiz;
      console.log(resData.quizMode);

      setQuizData(resData);
      setQuestions(resData.questions);
      if (resData.quizType === "QUIZ") {
        setQuizType(0);
      } else if (resData.quizType === "SURVEY") {
        setQuizType(1);
      } else if (resData.quizType === "POLL") {
        setQuizType(2);
      }
      const initialAnswers = Array.from(
        { length: resData.questions.length },
        () => null
      );
      setAnswers(initialAnswers);
      setTimer(resData.questions[0].timer);
      setProgress((1 / resData?.questions.length) * 100);

      setattemptCompleted(quizAttempts.data.quiz_count);
      console.log(attemptCompleted);

      responseData.quizid = resData?._id;
      responseData.numAttempt = resData.numAttempt;
      // console.log(resData.numAttempt);
      responseData.quizAttend.paymentType = resData.paymentType;
      responseData.quizAttend.totalPoints = resData.totalPoint;
      responseData.quizAttend.amount = resData.amount;
      responseData.quizAttend.totalQuestions = resData.questions.length;
      responseData.quizAttend.NumQuesAttended = resData.questions.length;
      responseData.quizAttend.certificate = resData.certificate;
      responseData.quizAttend.quizDescription = resData.quizDescription;
      responseData.quizAttend.quizTitle = resData.quizTitle;
      responseData.quizAttend.language = resData.language;
      responseData.quizAttend.quizGrades = resData.quizGrades;
      responseData.quizAttend.createdBy = resData.userId;
      responseData.quizAttend.orgiName = resData.orgiName;
      const transformedArray = resData.questions.map((obj) => ({
        question: obj.title,
        pointScored: 0,
        response: null,
        qattempt: 1,
        type: obj.type,
        totalPoints: obj.points,
      }));
      responseData.quizAttend.questionDetails = transformedArray;
    } catch (error) {
      console.log(error);
      setIsIdCorrect(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
    const localId = currentuserdata?.id;
    console.log(localId);
    const curr = currentuserdata?.id;
    console.log(curr);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);

    const getUser = async () => {
      try {
        // console.log("I ran");
        if (currentUser) {
          console.log("I ran");
        } else {
          console.log("sending to /login");
          // navigate("/login");
        }
      } catch (error) {
        console.log(error);

        console.error("Error sending POST request:", error);
        // navigate("/login");
      }
    };
    // console.log("I am Calling");
    getUser();
  }, [id]);

  const [pointgate, setpointgate] = useState(0);

  const updateAnswerAtIndex = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    if (newAnswers[5]) {
    }
    return newAnswers;
  };
  console.log(quizData);

  const whenSubmitted = async (answers) => {
    responseData.userid = userData.currentUser?._id;
    // responseData.quizAttend.firstName = currentuserdata.firstname;
    // responseData.quizAttend.lastName = currentuserdata.lastname;
    responseData.quizAttend.userid = currentuserdata?._id;
    responseData.quizAttend.startedAt = starttime;
    setpointgate(responseData.quizAttend.points);
    // console.log(responseData);
    if (quizData?.quizMode == 3) {
      handleAddQuiz(id, responseData.quizAttend.points);
    }

    responseData.quizAttend.completedAt = Date.now();
    for (let index = 0; index < answers.length; index++) {
      responseData.quizAttend.questionDetails[index].response = await answers[
        index
      ];
      if (
        questions[index].type !== "mcq" &&
        questions[index].type !== "MATCHING" &&
        questions[index].type !== "matching" &&
        questions[index].type !== "CHECK BOX" &&
        questions[index].type !== "checkebox" &&
        questions[index].type !== "FILL UPS" &&
        questions[index].type !== "fillups" &&
        questions[index].type !== "SHORT ANSWER" &&
        questions[index].type !== "shortanswer"
      ) {
        if (
          responseData.quizAttend.questionDetails[index].response ==
          questions[index]?.answer_options[0].text
        ) {
          responseData.quizAttend.questionDetails[index].pointScored =
            questions[index].points;
          responseData.quizAttend.points += questions[index].points;
          responseData.quizAttend.correctCount++;
        }
      } else if (
        questions[index].type === "MATCHING" ||
        questions[index].type === "matching"
      ) {
        // equate the response with selection key of same index in options array
        responseData.quizAttend.questionDetails[index].response?.map(
          (response, index2) => {
            const indexOfId = questions[index].options.findIndex(
              (option) => option.id === response
            );
            if (
              questions[index].options[indexOfId].selection ===
              questions[index].options[index2].selection
            ) {
              responseData.quizAttend.questionDetails[index].pointScored +=
                Math.round(
                  (questions[index].points / questions[index].options.length) *
                    2
                ) / 2;
              responseData.quizAttend.points +=
                Math.round(
                  (questions[index].points / questions[index].options.length) *
                    2
                ) / 2;
              if (
                responseData.quizAttend.questionDetails[index].pointScored ===
                questions[index].points
              ) {
                responseData.quizAttend.correctCount++;
              }
            }
          }
        );
      } else if (questions[index].type === "mcq") {
        const response =
          responseData.quizAttend.questionDetails[index].response;
        const indexOfId = questions[index].options.findIndex(
          (option) => option.id === response
        );
        if (indexOfId != -1) {
          responseData.quizAttend.questionDetails[index].pointScored +=
            questions[index].points;
          responseData.quizAttend.points += questions[index].points;
          responseData.quizAttend.correctCount += 1;
        }

        console.log(responseData);
      } else if (
        questions[index].type === "CHECK BOX" ||
        questions[index].type === "checkebox"
      ) {
        // remove first four items in the array
        const responses =
          responseData.quizAttend.questionDetails[index].response.slice(4); // this returns an array of id's, now comparing ids with answer options text

        let isCorrect = false;
        responses.map((response, index2) => {
          // check if response is equal to any of the answer options
          if (questions[index].answer_options[index2].text == response) {
            isCorrect = true;
          } else {
            isCorrect = false;
            return;
          }
        });
        // if all responses are correct, give full marks
        if (isCorrect) {
          responseData.quizAttend.questionDetails[index].pointScored =
            questions[index].points;
          responseData.quizAttend.points += questions[index].points;
          responseData.quizAttend.correctCount += 1;
        }
      } // check if selection is "contains" or "exact"
      else if (
        questions[index].type === "FILL UPS" ||
        questions[index].type === "fillups"
      ) {
        // check if selection is "contains" or "exact"
        for (let i2 = 0; i2 < questions[index].answer_options.length; i2++) {
          if (questions[index].answer_options[i2].selection === "exact") {
            if (
              responseData.quizAttend.questionDetails[
                index
              ].response.toLowerCase() ==
              questions[index].answer_options[i2].text.toLowerCase()
            ) {
              responseData.quizAttend.questionDetails[index].pointScored =
                questions[index].points;
              responseData.quizAttend.points += questions[index].points;
              responseData.quizAttend.correctCount += 1;
              break;
            }
          } // answer options contains comma seperated values of answers to be checked
          else {
            alert("a");
            console.log(
              "response",
              responseData.quizAttend.questionDetails[index].response
            );
            console.log("answer", questions[index].answer_options[i2].text);
            alert("s");
            // check if response contains any of the answer options
            if (
              responseData.quizAttend.questionDetails[index].response
                .toLowerCase()
                .includes(
                  questions[index].answer_options[i2].text.toLowerCase()
                )
            ) {
              // give marks
              alert("Gave marks");
              responseData.quizAttend.questionDetails[index].pointScored =
                questions[index].points;
              responseData.quizAttend.points += questions[index].points;
              responseData.quizAttend.correctCount += 1;
              break;
            }
          }
        }
      } else if (
        questions[index].type === "SHORT ANSWER" ||
        questions[index].type === "shortanswer"
      ) {
        // check if selection is "contains" or "exact"
        // for (let 0=0; 0<questions[index].answer_options.length; 0++) {
        if (questions[index].answer_options[0].selection === "exact") {
          alert("Exact");
          if (
            responseData.quizAttend.questionDetails[
              index
            ].response.toLowerCase() ===
            questions[index].answer_options[0].text.toLowerCase()
          ) {
            responseData.quizAttend.questionDetails[index].pointScored =
              questions[index].points;
            responseData.quizAttend.points += questions[index].points;
            responseData.quizAttend.correctCount += 1;
          }
        } else {
          // answer options contains comma seperated values of answers to be checked
          const answers = questions[index].answer_options[0].text.split(",");
          console.log("Answers", answers);
          let pointsScoredTemp = 0;
          for (let i = 0; i < answers.length; i++) {
            let contains = false;
            console.log("Checking", answers[i]);
            console.log(
              "Response",
              responseData.quizAttend.questionDetails[index].response
            );
            if (
              responseData.quizAttend.questionDetails[index].response
                .toLowerCase()
                .includes(answers[i].toLowerCase().trim())
            ) {
              console.log("Contains Verified", answers[i]);
              pointsScoredTemp += parseFloat(
                questions[index].points / answers.length
              );
              console.log(
                "Adding marks",
                questions[index].points / answers.length
              );
              console.log("New maks", pointsScoredTemp);
              contains = true;
            } else {
              console.log("Should stop", answers[i]);
              contains = false;
            }
          }
          alert(
            "Scored until now",
            responseData.quizAttend.questionDetails[index].pointScored
          );
          console.log("Points scored", parseInt(pointsScoredTemp));
          alert("New points", parseInt(pointsScoredTemp));
          console.log("Points scored", parseInt(pointsScoredTemp));
          if (
            parseInt(pointsScoredTemp) === parseInt(questions[index].points)
          ) {
            console.log("Points scored", parseInt(pointsScoredTemp));
            alert("All corr");
            responseData.quizAttend.questionDetails[index].pointScored =
              questions[index].points;
            responseData.quizAttend.points += questions[index].points;
            responseData.quizAttend.correctCount += 1;
          } else if (
            responseData.quizAttend.questionDetails[index].pointScored <
            pointsScoredTemp
          ) {
            console.log("Points scored", pointsScoredTemp);
            alert("Partial corr");
            responseData.quizAttend.questionDetails[index].pointScored =
              Math.round(pointsScoredTemp * 2) / 2;
            responseData.quizAttend.points +=
              responseData.quizAttend.questionDetails[index].pointScored;
          }
        }
        // }
      }
    }
    responseData.quizAttend.average = Math.floor(
      (responseData.quizAttend.points / responseData.quizAttend.totalPoints) *
        100
    );
    if (
      responseData.quizAttend.average > responseData.quizAttend.passPrecentage
    ) {
      responseData.quizAttend.isPass = true;
    }
    console.log(responseData);

    axios
      // .post("https://letsquiz.org/api/quiz/quiz-response", responseData)
      .post(baseUrl + QUIZ.postQuizResponse, responseData)
      .then((response) => {
        const resData = response.data.report;
        console.log(resData);
        setcurrentquiz(resData);
        console.log(resData.quizAttend[0]?._id);
        console.log(resData.quizid);
        // console.log(currentquiz.quizAttend[0].questionDetails[0].totalPoints)

        const objectToSend = {
          userid: currentuserdata.id,
          quizAttend: {
            quizid: resData.quizid,
            responseid: resData.quizAttend[0]?._id,
          },
        };
        axios
          .put(baseUrl + USER.addUserQuiz, objectToSend)
          .then((response) => {
            const data = {
              userid: currentuserdata.id,
              quizid: resData.quizid,
              amount: quizData.amount,
            };
            axios
              .post(baseUrl + QUIZ.addQuizTransaction, data)
              .then((response) => {
                navigate("/dashboard/quizattended");
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  async function handleAddQuiz(id, pointgat) {
    const quizId = String(id).trim();
    console.log(pointgat);
    try {
      // Check if the quiz ID already exists
      const { data: existingQuiz, error: fetchError } = await supabase
        .from("quiz")
        .select("*")
        .eq("quiz_id", quizId)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (existingQuiz) {
        // Update the existing quiz record
        const { data, error: updateError } = await supabase
          .from("quiz")
          .update({
            quiz_name: "Sample Quiz",
            Created_by: quizData.userId,
            total_score: quizData.totalPoint,
            student_info: [
              {
                student_id: currentuserdata?.id,
                student_firstname: currentuserdata?.firstName,
                student_email: currentuserdata?.email,
                student_score: pointgat,
              },
            ],
          })
          .eq("quiz_id", quizId);

        if (updateError) {
          throw updateError;
        }
        console.log("Quiz updated successfully");
      } else {
        // Insert a new quiz record
        const { error: insertError } = await supabase.from("quiz").insert([
          {
            quiz_id: quizId,
            quiz_name: "New Quiz",
            Created_by: quizData.userId,
            total_score: quizData.totalPoint,
            student_info: [
              {
                student_id: currentuserdata?.id,
                student_firstname:
                  currentuserdata?.firstname + " " + currentuserdata?.lastname,
                student_email: currentuserdata?.email,
                student_score: pointgat,
              },
            ],
          },
        ]);

        if (insertError) {
          throw insertError;
        }
        console.log("Quiz inserted successfully");
      }
    } catch (error) {
      console.log(typeof quizId);
      console.error("Error handling quiz data:", error.message);
    }
  }

  // Assuming `quizData.id` is defined and relevant event is passed

  const whenFormSubmitted = async (firstName, lastName, date, email) => {
    setIndex(2);
    responseData.quizAttend.firstName = firstName;
    responseData.quizAttend.lastName = lastName;
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' locale formats date as day/month/year
  };

  const [countdown, setCountdown] = useState("");
  const startDate = quizData?.startdate;
  const endDate = quizData?.enddate;
  const calculateCountdown = (startDate) => {
    const now = new Date();
    const targetDate = new Date(startDate);

    const hoursRemaining = differenceInHours(targetDate, now) % 24;
    const minutesRemaining = differenceInMinutes(targetDate, now) % 60;
    const secondsRemaining = differenceInSeconds(targetDate, now) % 60;

    return `${hoursRemaining} hours ${minutesRemaining} minutes ${secondsRemaining} seconds`;
  };

  // Example usage in a React component

  useEffect(() => {
    const updateCountdown = () => {
      const countdownString = calculateCountdown(startDate);
      setCountdown(countdownString);
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  console.log(countdown);

  // console.log(quizData?.startdate);

  console.log(quizData?.paymentType);

  const pages = [
    <LoginBeforeAttend
      key="login-before-attend"
      setIndex={setIndex}
      LogIn={LogIn}
    />,
    <AttendForm key="attend-form" whenFormSubmitted={whenFormSubmitted} setIndex={setIndex} certificate={quizData?.certificate}/>,
    <div
      key="quiz-page"
      className={` ${
        quizData && (quizData.themeId == "1" ? "bg-white" : "bg-red-500")
      }  relative flex items-center justify-center w-screen`}
    >
      {/* {console.log(attemptCompleted)} */}
      {/* {console.log(responseData.numAttempt)} */}
      {quizData &&
        (quizData.themeId == "1" ? (
          <div className="absolute -left-[50vw] -top-1/2 z-10   w-screen ">
            
          </div>
        ) : quizData.themeId == "2" ? (
          <div className="animated2 absolute -left-2/4  top-[125%] z-10  mt-[50vh] h-screen w-full w-screen -translate-x-1/2  -translate-y-1/2  "></div>
        ) : (
          <div className="container absolute -left-2/4  top-[125%] z-10  mt-[50vh] h-screen w-full w-screen -translate-x-1/2  -translate-y-1/2  ">
            <div className="lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        ))}
      <div className="flex w-full flex-col sm:w-[80vw]">
        {(responseData && quizData) || quizData?.isActive ? (
          quizData.timeline == true ? (
            quizData.startdate > Date.now() || quizData.enddate < Date.now() ? (
              attemptCompleted !== responseData.numAttempt ? (
                quizData.isActive ? (
                  <div className="flex w-full flex-col sm:w-[80vw] ">
                    <div>
                      <div className="i m-1 flex items-center justify-between p-2 sm:m-5">
                        <h2 className="mb-3 text-center text-2xl font-bold text-black sm:text-[3em]">
                          LetsQuiz
                        </h2>
                        {quizData?.quizType === "QUIZ" && timer < 3000000 && (
                          <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
                            <p className="text-lg font-bold">
                              Time remaining :
                            </p>
                            <Timer
                              timer={timer}
                              whenSubmitted={whenSubmitted}
                              setTimer={setTimer}
                              setCurrentQuestionIndex={setCurrentQuestionIndex}
                              currentQuestionIndex={currentQuestionIndex}
                              updateAnswerAtIndex={updateAnswerAtIndex}
                              questions={questions}
                              setProgress={setProgress}
                              setLeftTime={(time) => {
                                let newQuestions = [...questions];
                                newQuestions[currentQuestionIndex].timer = time;
                                setQuestions(newQuestions);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      {isIdCorrect === false ? (
                        // || responseData.length >
                        <div className="flex flex-col">
                          <Alert
                            id="NoQuizAlert"
                            severity="error"
                            onClose={() => {
                              navigate("/");
                            }}
                          >
                            <strong>Quiz not Found</strong>
                          </Alert>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <h1 className="m-2 flex text-4xl font-bold sm:text-5xl">
                            {quizData?.quizTitle}
                          </h1>
                          <p>{quizData?.quizDescription}</p>
                          {fillOutThis[quizType]}
                          <div className="m-3 flex h-10 w-full items-center p-2">
                            <CustomizedProgressBars progress={progress} />
                          </div>
                          <div className="m-3 ml-6 flex w-full items-start p-2">
                            {!questions || questions.length === 0 ? (
                              <CircularIndeterminate />
                            ) : (
                              <Questions
                                questions={questions}
                                setProgress={setProgress}
                                updateAnswerAtIndex={updateAnswerAtIndex}
                                setTimer={setTimer}
                                currentQuestionIndex={currentQuestionIndex}
                                setCurrentQuestionIndex={
                                  setCurrentQuestionIndex
                                }
                                whenSubmitted={whenSubmitted}
                                answers={answers}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-screen w-full   flex-col items-center justify-center sm:w-[80vw]">
                    <div className="flex h-1/2  h-[60vh] w-1/2 flex-col items-center justify-center  rounded-3xl bg-zinc-200/50 p-3 text-center text-center text-lg backdrop-blur-xl sm:text-xl">
                      <h2>The Quiz is Closed Now </h2>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex w-full flex-col sm:w-[80vw]">
                  <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
                    <h2>Attempts Finished</h2>
                  </div>
                </div>
              )
            ) : (
              <div>
                <div className="flex w-full flex-col sm:w-[80vw]">
                  <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
                    <h2>
                      The Quiz is Active on <br />
                      <div className="text-2xl font-bold">{countdown}</div>{" "}
                    </h2>
                  </div>
                </div>
              </div>
            )
          ) : attemptCompleted !== responseData.numAttempt ? (
            quizData.isActive ? (
              <div className="flex w-full flex-col sm:w-[80vw]">
                <div>
                  <div className="w-full  flex items-center justify-between p-2 sm:m-5 border-b-[1px] border-black">
                    <h2 className="mb-3 text-center text-xl font-bold text-black sm:text-3xl">
                      LetsQuiz
                    </h2>
                    {quizData?.quizType === "QUIZ" && timer < 3000000 && (
                      <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
                        <p className="text-lg font-bold">Time remaining :</p>
                        <Timer
                          timer={timer}
                          whenSubmitted={whenSubmitted}
                          setTimer={setTimer}
                          setCurrentQuestionIndex={setCurrentQuestionIndex}
                          currentQuestionIndex={currentQuestionIndex}
                          updateAnswerAtIndex={updateAnswerAtIndex}
                          questions={questions}
                          setProgress={setProgress}
                          setLeftTime={(time) => {
                            let newQuestions = [...questions];
                            newQuestions[currentQuestionIndex].timer = time;
                            setQuestions(newQuestions);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {isIdCorrect === false ? (
                    <div className="flex flex-col">
                      <Alert
                        id="NoQuizAlert"
                        severity="error"
                        onClose={() => {
                          navigate("/");
                        }}
                      >
                        <strong>Quiz not Found</strong>
                      </Alert>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <h1 className="m-2 flex text-4xl font-bold sm:text-5xl">
                        {quizData?.quizTitle}
                      </h1>
                      <p>{quizData?.quizDescription}</p>
                      {fillOutThis[quizType]}
                      <div className=" flex h-10 w-full items-center py-4">
                        <CustomizedProgressBars progress={progress} />
                      </div>
                      <div className="flex w-full items-start">
                        {!questions || questions.length === 0 ? (
                          <CircularIndeterminate />
                        ) : (
                          <Questions
                            questions={questions}
                            setProgress={setProgress}
                            updateAnswerAtIndex={updateAnswerAtIndex}
                            setTimer={setTimer}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                            whenSubmitted={whenSubmitted}
                            answers={answers}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex min-h-screen w-full   flex-col items-center justify-center sm:w-[80vw]">
                <div className="flex h-1/2  h-[60vh] w-1/2 flex-col items-center justify-center  rounded-3xl bg-zinc-200/50 p-3 text-center text-center text-lg backdrop-blur-xl sm:text-xl">
                  <h2>The Quiz is Closed Now</h2>
                </div>
              </div>
            )
          ) : (
            <div className="flex w-full flex-col sm:w-[80vw]">
              <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
                <h2>Attempts Finished</h2>
              </div>
            </div>
          )
        ) : (
          <div className="flex w-full flex-col sm:w-[80vw]">
            <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
              <h2>quiz not available now</h2>
            </div>
          </div>
        )}
      </div>
    </div>,
  ];

  console.log(currentuserdata.id, "this is userid");

  const [paid, setpaid] = useState(false);

  const getpaymentdetails = async () => {
    axios
      .get(
        baseUrl + "transaction" + `/${quizData?._id}` + `/${currentuserdata.id}`
      )
      .then((response) => {
        console.log(response.data, "this is traction data");
        setpaid(response.data);
      });
  };

  useEffect(() => {
    getpaymentdetails();
  });

  const PaymentModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col items-center justify-center rounded-lg bg-white p-10">
          <h1 className="text-2xl font-bold">Payment Required</h1>
          <p className="text-lg">Please pay to attend the quiz</p>
          <Link
            to={`/dashboard/quiz-payment/${quizData?._id}`}
            className="mt-5 w-fit rounded-lg bg-blue-500 p-2 text-white"
          >
            Pay Now
          </Link>
        </div>
      </div>
    );
  };

  console.log(quizData?._id);

  // const [transcation_made, settransaction_mode] = useState(true);

  // const check_for_pay = () => {
  //   const reponse = axios.get(baseUrl + 'transactionbyuserid/' + currentuserdata.id);
  //   if(reponse.data){
  //     settransaction_mode(true);
  //   }
  // };

  // useEffect(()=>{
  //   check_for_pay();
  // },[])

  // useMemo(()=>{
  //   console.log("traction is get")
  // },[transcation_made])

  return (
    <div className={`min-h-screen w-screen `}>
      {" "}
      {isLoading === true ? (
        <CircularIndeterminate />
      ) : (
        <>
          {quizData.paymentType == "FREE" ||
          quizData.paymentType == "free" ||
          paid ? null : (
            <PaymentModal />
          )}

          <div className="flex items-center justify-center">{pages[index]}</div>
        </>
      )}
    </div>
  );
}
