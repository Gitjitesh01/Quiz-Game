import React from "react";
import swal from "sweetalert";

("react");
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CustomizedProgressBars from "../component/AttendQuizComponents/ProgressBar";
import CircularIndeterminate from "../component/AttendQuizComponents/Loading";
import AttendForm from "../component/AttendQuizComponents/AttendForm";
import LoginBeforeAttend from "../component/AttendQuizComponents/LoginBeforeAttend";
import PollQuestions from "../component/AttendQuizComponents/PollQuestions";
import { QUIZ, USER, baseUrl } from "../constants/apiUrl";
import { useUser } from "../context/userContext";
export default function AttendQuizPage() {
  const [index, setIndex] = useState(0);

  const { currentuserdata } = useUser();
  const [quizType, setQuizType] = useState(0);
  const [attemptCompleted, setattemptCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isIdCorrect, setIsIdCorrect] = useState(true);
  // const [timer, setTimer] = useState();
  const [progress, setProgress] = useState(0);
  const [quizData, setQuizData] = useState();
  // const [answers, setAnswers] = useState();
  const [questions, setQuestions] = useState();
  const [responseData, setResponseData] = useState({
    userid: "",
    quizAttend: {
      quizid: null,
      quiz_report_id: "",
      firstName: null,
      lastName: null,
      quizType: "POLL",
      attendCount: null,
      totalPoints: null,
      totalQuestions: null,
      status: "START",
      certificate: null,
      quizDescription: null,
      quizTitle: null,
      language: null,
      quizGrades: null,
      isPass: false,
      correctCount: 0,
      NumQuesAttended: 0,
      createdBy: null,
      passPrecentage: 40,
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

  const LogIn = () => {
    // This function will run when the component is rendered
    const localId = localStorage.getItem("currentUser")._id;

    if (localId) {
      const getUser = async () => {
        try {
          const response = await axios.get(baseUrl + USER.getUser + localId);
          const user = response.data.user;
          userData.setCurrentUser(user);
        } catch (error) {
          navigate("/login");
        }
      };
      getUser();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(baseUrl + QUIZ.getpollbyuserid + currentuserdata.id)
      .then((response) => {
        setattemptCompleted(response.data.allQuiz !== null);
        console.log(response.data.allQuiz !== null);
      });
  }, [currentuserdata.id]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(baseUrl + QUIZ.getQuiz + `${id}`);

      const quizAttempts = await axios.post(baseUrl + QUIZ.getQuizAttempts, {
        quizid: id,
        userid: currentuserdata.id,
      });
      setIsLoading(false);
      setIsIdCorrect(true);
      const resData = response.data.quiz;

      setQuizData(resData);
      setQuestions(resData.questions);
      // if (resData.quizType === "QUIZ") {
      //   setQuizType(0);
      // } else if (resData.quizType === "SURVEY") {
      //   setQuizType(1);
      // } else if (resData.quizType === "POLL") {
      //   setQuizType(2);
      // }
      const initialAnswers = Array.from(
        { length: resData.questions.length },
        () => null
      );
      //  setAnswers(initialAnswers);
      //  setTimer(resData.questions[0].timer);
      setProgress((1 / resData?.questions.length) * 100);

      // setattemptCompleted(quizAttempts.data.quiz_count);
      responseData.quizid = resData._id;
      responseData.quizid = resData._id;
      responseData.quizid = resData._id;
      responseData.quizid = resData._id;
      responseData.numAttempt = resData.numAttempt;
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
      console.log(transformedArray);
      console.log();
    } catch (error) {
      console.log(error);
      setIsIdCorrect(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
    console.log(quizData);
    console.log(responseData);
  }, [id]);

  const updateAnswerAtIndex = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    // setAnswers(newAnswers);
    console.log("Questions", questions);
    console.log(newAnswers);
    if (newAnswers[5]) {
      console.log("Sliced check", newAnswers[5].slice(4));
    }
    return newAnswers;
  };

  const whenSubmitted = async (answers) => {
    responseData.quizAttend.completedAt = Date.now();
    console.log("Sub Answers", answers);
    for (let index = 0; index < answers.length; index++) {
      responseData.quizAttend.questionDetails[index].response = await answers[
        index
      ];
      if (
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
        console.log(
          "Response",
          responseData.quizAttend.questionDetails[index].response
        ); // array having id of options
        console.log("Answer", questions[index].options);
        responseData.quizAttend.questionDetails[index].response.map(
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
      } else if (
        questions[index].type === "CHECK BOX" ||
        questions[index].type === "checkebox"
      ) {
        // remove first four items in the array
        const responses =
          responseData.quizAttend.questionDetails[index].response.slice(4); // this returns an array of id's, now comparing ids with answer options text
        console.log("Responses", responses);
        console.log("Answer", questions[index].answer_options);
        let isCorrect = false;
        responses.map((response, index2) => {
          // const indexOfId = questions[index].answer_options.findIndex((option) => option.text === response);
          // if (indexOfId !== -1) {
          //     responseData.quizAttend.questionDetails[index].pointScored += questions[index].points/questions[index].answer_options.length;
          //     responseData.quizAttend.points += questions[index].points/questions[index].answer_options.length;
          //     if (responseData.quizAttend.questionDetails[index].pointScored === questions[index].points) {
          //         responseData.quizAttend.correctCount++;
          //     }
          // }
          if (questions[index].answer_options[index2].text == response) {
            isCorrect = true;
          } else {
            isCorrect = false;
            return;
          }
        });
        if (isCorrect) {
          responseData.quizAttend.questionDetails[index].pointScored =
            questions[index].points;
          responseData.quizAttend.points += questions[index].points;
          responseData.quizAttend.correctCount++;
        }
      } else if (
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
              responseData.quizAttend.correctCount++;
              break;
            }
          } else {
            alert("a");
            console.log(
              "response",
              responseData.quizAttend.questionDetails[index].response
            );
            console.log("answer", questions[index].answer_options[i2].text);
            alert("s");
            if (
              responseData.quizAttend.questionDetails[index].response
                .toLowerCase()
                .includes(
                  questions[index].answer_options[i2].text.toLowerCase()
                )
            ) {
              alert("Gave marks");
              responseData.quizAttend.questionDetails[index].pointScored =
                questions[index].points;
              responseData.quizAttend.points += questions[index].points;
              responseData.quizAttend.correctCount++;
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
            responseData.quizAttend.correctCount++;
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
            responseData.quizAttend.correctCount++;
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
      .post("/api/quiz-response", responseData)
      .then((response) => {
        const resData = response.data.report;
        const objectToSend = {
          userid: resData.userid,
          quizAttend: {
            quizid: resData.quizid,
            responseid: resData._id,
          },
        };
        axios
          .put("/api/student-quiz", objectToSend)
          .then((response) => {
            //console.log("Response from the server:", response.data);
            navigate("/dashboard/reports");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const whenFormSubmitted = async (firstName, lastName, date, email) => {
    setIndex(2);
    responseData.quizAttend.firstName = firstName;
    responseData.quizAttend.lastName = lastName;
    // console.log(firstName, lastName, date, email)
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const pages = [
    <>
      {" "}
      <LoginBeforeAttend setIndex={setIndex} LogIn={LogIn} />{" "}
    </>,
    <>
      {" "}
      <AttendForm whenFormSubmitted={whenFormSubmitted} />{" "}
    </>,
    <>
      <div>
        {attemptCompleted == true ? (
          <div className="flex w-full flex-col sm:w-[80vw]">
            <div className="i m-1 flex items-center justify-between p-2  sm:m-5">
              <h2 className="mb-3 text-center text-[2em] font-bold text-cyan-400 sm:text-[3em]">
                LetsQuiz
              </h2>
              {quizData?.quizType === "QUIZ" ? (
                <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
                  {/* <p className='text-lg font-bold'>Time remaining :</p>
                        <Timer timer={timer} whenSubmitted={whenSubmitted} setTimer={setTimer} setLeftTime={(time)=>{
                            let newQuestions = [...questions];
                            // console.log("ca=hagning ques of index", currentQuestionIndex)
                            newQuestions[currentQuestionIndex].timer = time;
                            setQuestions(newQuestions);
                            console.log("new ques", questions)
                        }} /> */}
                </div>
              ) : (
                <div></div>
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
                  {" "}
                  <strong>Quiz not Found</strong>{" "}
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
                    <PollQuestions
                      id={quizData._id}
                      questions={questions}
                      setProgress={setProgress}
                      updateAnswerAtIndex={updateAnswerAtIndex}
                      quizData={quizData}
                      //  setTimer={setTimer}
                      currentQuestionIndex={currentQuestionIndex}
                      setCurrentQuestionIndex={setCurrentQuestionIndex}
                      whenSubmitted={whenSubmitted}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col sm:w-[80vw]">
            <div className="flex flex-col justify-between p-3 text-center text-lg sm:text-xl">
              <h2>Poll already Submitted</h2>
            </div>
          </div>
        )}
      </div>
    </>,
  ];

  return (
    <>
      {" "}
      {isLoading === true ? (
        <CircularIndeterminate />
      ) : (
        <div className="flex items-center justify-center">{pages[index]}</div>
      )}
    </>
  );
}
