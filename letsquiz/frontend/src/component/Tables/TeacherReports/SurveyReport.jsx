import axios from "axios";
import React from "react";
import swal from "sweetalert";

("react");
import { useState, useEffect } from "react";

export default function SurveyReport({ exportToExcel }) {
  const [surveyData, setSurveyData] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizReport, setQuizReport] = useState(null);

  useEffect(() => {
    // Assuming localId is your locally stored variable
    const localId = localStorage.getItem("localId");

    // Fetch quiz data using Axios
    axios
      .post("https://letsquiz.org/api/survey-teacher", { id: localId })
      .then((response) => {
        setSurveyData(response.data.report);
        //console.log(response.data.report)
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, []);

  const handleQuizSelect = (event) => {
    const selectedQuizId = event.target.value;
    setSelectedQuiz(selectedQuizId);

    // Assuming you have the quiz title available
    //const selectedQuizTitle = quizData.find(quiz => quiz.quizid === selectedQuizId).quizTitle;

    // Make a post request with the selected quiz id and title
    axios
      .post("https://letsquiz.org/api/quiz-responsebyId/", {
        quizid: selectedQuizId,
      })
      .then((response) => {
        setQuizReport(response.data.report);
        console.log(response.data.report);
      })
      .catch((error) => {
        console.error("Error sending post request:", error);
      });
  };
  function extractTextFromJSX(jsxString) {
    const regex = /<[^>]+>([^<]+)<\/[^>]+>/;
    const match = jsxString.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }
  //console.log(quizReport)

  return (
    <div className="relative mt-10 flex flex-col items-center overflow-x-auto sm:rounded-lg">
      <div className="flex w-full items-center justify-between pb-4">
        <div>
          <select
            onChange={handleQuizSelect}
            value={selectedQuiz}
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option selected value="">
              Select a Quiz
            </option>
            {surveyData.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.quizTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              exportToExcel("surveyReportTable");
            }}
            className="inline-flex items-center rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
          >
            {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-download mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            <span>Download Excel</span>
          </button>
        </div>
      </div>
      <h1 className="m-5 text-xl font-bold " style={{ fontSize: "2em" }}>
        Survey Report
      </h1>
      <table
        id="surveyReportTable"
        className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              S.no
            </th>
            <th scope="col" className="px-6 py-3">
              Name of the Participant
            </th>
            <th scope="col" className="px-6 py-3">
              Submitted At
            </th>
            {quizReport === null || quizReport?.length === 0 ? (
              <th>No questions</th>
            ) : (
              <>
                {quizReport[0]?.quizAttend[0]?.questionDetails.map(
                  (response, index) => (
                    <th key={index} className="px-6 py-4">
                      {!response.question
                        ? "No response"
                        : extractTextFromJSX(response.question)}
                    </th>
                  )
                )}
              </>
            )}
          </tr>
        </thead>
        {quizReport !== null && quizReport.length === 0 ? (
          <div>NO ONE HAS ATTENDED THIS SURVEY</div>
        ) : (
          <tbody>
            {quizReport?.map((report, index) => (
              <tr
                key={index}
                className="border-b bg-white   hover:bg-gray-100 "
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {report.quizAttend[0]?.firstName}{" "}
                  {report.quizAttend[0]?.lastName}
                </td>
                <td className="px-6 py-4">
                  {new Date(
                    report.quizAttend[0]?.startedAt * 1
                  ).toLocaleString()}
                </td>
                {report.quizAttend[0]?.questionDetails.map(
                  (response, index) => (
                    <td key={index} className="px-6 py-4">
                      {response.response === "" || response.response === null
                        ? "No response"
                        : String(response?.response)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
