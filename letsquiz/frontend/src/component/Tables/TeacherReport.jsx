import React, { useState, useEffect, useMemo } from "react";
import swal from "sweetalert";

import ScoreData from "./TeacherReports/ScoreData";
import ResponseData from "./TeacherReports/ResponseData";
import QuestionWIseData from "./TeacherReports/QuestionWIseData";
import SurveyReport from "./TeacherReports/SurveyReport";
import PollReport from "./TeacherReports/PollReport";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import BulkReport from "./TeacherReports/BulkReport";
import WordCloudReport from "./TeacherReports/WordCloudReport";
import QuizOverview from "./TeacherReports/QuizOverview.jsx";
import { useUser } from "../../context/userContext";
import { QUIZ, USER, baseUrl } from "../../constants/apiUrl";

const TeacherReport = () => {
  const [tableNumber, setTableNumber] = useState(null);
  const [focusedButton, setFocusedButton] = useState(1);
  const [currenton , setcurrenton] = useState(null);
  const { currentuserdata } = useUser();

  const exportToExcel = (tableId) => {
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "table.xlsx");
  };
  const [quizData, setQuizData] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizReport, setQuizReport] = useState(null);
  const [allquizreport, setAllQuizReport] = useState([]);
  
  const [mode, setmode] = useState(null);
  const [filteredQuizData, setFilteredQuizData] = useState([]);

  useEffect(() => {
    // Assuming localId is your locally stored variable
    // const localId = localStorage.getItem("currentUser");
    const localId = currentuserdata;

    // Fetch quiz data using Axios
    axios
      .post(baseUrl + QUIZ.getQuizbyUser, { userid: localId.id }) //https://letsquiz.org/api/quiz/quizbyUserID/
      .then((response) => {
        setQuizData(response.data.allQuiz);
        setFilteredQuizData(response.data.allQuiz);
        console.log(response.data.allQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [tableNumber]);

  const allreport = [];
  useEffect(() => {
    const fetchReports = async () => {
      const promises = quizData.map((quiz) => {
        return axios.post(baseUrl + QUIZ.getQuizbyresponseId, {
          quizid: quiz._id,
        });
      });

      try {
        const responses = await Promise.all(promises);
        responses.forEach((response) => {
          allreport.push(response.data.report);
          console.log(response.data.report);
        });
        console.log(allreport, "allreport");
        setAllQuizReport(allreport);
      } catch (error) {
        console.error("Error sending post request:", error);
      }
    };

    fetchReports();
  }, [quizData]);

  console.log(`${baseUrl}quiz/:id`);

  const handleQuizSelect = (event) => {
    const selectedQuizId = event._id;
    console.log(event._id);

    axios
      .get(`${baseUrl}quiz/quiz/${event._id}`)
      .then((response) => {
        setQuizReport(response.data.report);
        console.log(response.data.quiz);
      })
      .catch((error) => {
        console.error("Error sending post request:", error);
      });
  };

  useMemo(() => {
    if (mode == null) {
      setFilteredQuizData(quizData);
    } else {
      setFilteredQuizData(quizData.filter((quiz) => quiz.quizType == mode));
      switch (mode) {
        case "QUIZ":
          if(tableNumber){
            setTableNumber(2);
          }
          break;
        case "SURVEY":
          if(tableNumber){
            setTableNumber(2);}
          break;
        case "POLL":
          if(tableNumber){
            setTableNumber(4);}
          break;
        default:
          break;
      }
    }
  }, [mode]);

  console.log(quizData);

  // console.log(quizData,"quizData");

  const tables = [
    <ScoreData
      key={"scoredata"}
      exportToExcel={exportToExcel}
      handleQuizSelect={handleQuizSelect}
      allreport={allreport}
      selectedQuiz={selectedQuiz}
      tableNumber={tableNumber}
      quizData={filteredQuizData}
      quizReport={quizReport}
    />,
    <ResponseData
      key={"scoredata"}
      quizData={filteredQuizData}
      exportToExcel={exportToExcel}
      handleQuizSelect={handleQuizSelect}
      selectedQuiz={selectedQuiz}
      tableNumber={tableNumber}
      quizReport={quizReport}
    />,
    <QuestionWIseData
      key={"questionwisedata"}
      exportToExcel={exportToExcel}
      handleQuizSelect={handleQuizSelect}
      mode={mode}
      selectedQuiz={selectedQuiz}
      quizData={filteredQuizData}
      allquizreport={allquizreport}
      quizReport={quizReport}
    />,
    <SurveyReport key={"surveyreport"} exportToExcel={exportToExcel} />,
    <PollReport key={"pollreport"} exportToExcel={exportToExcel} />,
    <BulkReport
      key={"bulkreport"}
      exportToExcel={exportToExcel}
      allquizreport={allquizreport}
      allreport={allreport}
      handleQuizSelect={handleQuizSelect}
      selectedQuiz={selectedQuiz}
      mode={mode}
      quizData={filteredQuizData}
      quizReport={quizReport}
    />,
    <WordCloudReport key={"wordCloudReport"} exportToExcel={exportToExcel} />,
    <QuizOverview
    exportToExcel={exportToExcel}
      allquizreport={allquizreport}
      allreport={allreport}
      handleQuizSelect={handleQuizSelect}
      selectedQuiz={selectedQuiz}
      mode={mode}
      quizData={filteredQuizData}
      quizReport={quizReport}
    />,

  ];

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        <div className="flex flex-col  items-center justify-center">
          <h1 className="mb-5 text-center text-2xl font-semibold">
            My Report{" "}
          </h1>
          <span className=" ">
            {" "}
            {mode == null
              ? "Please select the type test "
              : tableNumber == null && "please select the report"}{" "}
          </span>
          <select
            onChange={(e) => {
              setmode(e.target.value);

            }}
            className="text-md mt-5 rounded-xl bg-blue-500 px-3 py-2 font-bold text-white duration-200 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="">Select Test Type</option>
            <option value="QUIZ">Quiz</option>
            <option value="SURVEY">Survey</option>
            <option value="POLL">Poll</option>
            {/* <option value="">All</option> */}
          </select>
        </div>
        <div className="flex  w-fit px-4 flex-col gap-3">
         {mode == "QUIZ"  ?  <select className="text-md mt-5 rounded-xl bg-blue-500 px-3 py-2 font-bold text-white duration-200 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring" onChange={(e)=> {setTableNumber(e.target.value)
          setcurrenton(e.target.value)}
         } name="" id="">
            <option value="">Select Test Type</option>
            <option value={2} >Normal quiz</option>
            <option value={1}>Live quiz</option>
          </select> : 
          mode == "POLL" ? <select className="text-md mt-5 rounded-xl bg-blue-500 px-3 py-2 font-bold text-white duration-200 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring" onChange={(e)=> {setTableNumber(e.target.value)
          setcurrenton(e.target.value)}

          } name="" id="">
            <option value="">Select Test Type</option>
            <option value={4} >POll Report</option>
            <option value={6}>WordCloud Report</option>

          </select> : null}
          {currenton == 2  &&  <select className="text-md mt-5 rounded-xl bg-blue-500 px-3 py-2 font-bold text-white duration-200 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring" onChange={(e)=> {setTableNumber(e.target.value)
          }
         } name="" id="">
            <option value="">Select Test Type</option>
            <option value={2} >Question Wise Data</option>
            <option value={5}>Score Data</option>
            <option value={7}>Quiz Overview</option>

          </select> }
          
          
        </div>

        <div className="m-5 mx-[20px] flex flex-wrap justify-evenly gap-x-2">
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(0);
            }}
            className={`${
              mode == null
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            Manage
          </button> */}
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(1);
            }}
            className={`${
              mode == "QUIZ"
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            Live quiz
          </button> */}
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(2);
            }}
            className={`${
              mode == "QUIZ" && currenton == 2
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            Question Wise Data
          </button> */}
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(3);
            }}
            className={`${
               mode == "SURVEY"
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            Survey Report
          </button> */}
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(4);
            }}
            className={`${
              mode == "POLL"
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            poll report
          </button> */}
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(5);
            }}
            className={`${
              mode == "QUIZ"  && currenton == 2
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            Score Data
          </button> */}
          {/* <button
            onClick={() => {
              // setFocusedButton(0);
              setTableNumber(6);
            }}
            className={`${
              mode == "POLL"
                ? focusedButton === tableNumber
                  ? "bg-blue-500 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-800 focus:outline-none focus:ring"
                  : "bg-blue-500 hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring"
                : "hidden"
            } text-md rounded-xl px-3 py-2 font-bold text-white duration-200`}
          >
            WordCloud Report
          </button> */}
        </div>

        {tables[tableNumber]}
      </div>
    </>
  );
};

export default TeacherReport;
