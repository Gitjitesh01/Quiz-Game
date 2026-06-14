import React, { useMemo, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import * as XLSX from "xlsx";

const BulkReport = ({ mode, allquizreport, quizData }) => {
  const [filterquizData, setFilterQuizData] = useState([]);
  const [displayedQuizData, setDisplayedQuizData] = useState([]);
  const [searchterm, setsearchterm] = useState("");

  useEffect(() => {
    const matchQuizDataWithReports = () => {
      const flatReports = allquizreport.flat();
      const matchedData = quizData.map((quiz) => {
        const reports = flatReports.filter((report) => report.quizid === quiz._id);
        return {
          ...quiz,
          quizReports: reports,
        };
      });
      setFilterQuizData(matchedData);
      setDisplayedQuizData(matchedData); // Set displayedQuizData initially
    };

    matchQuizDataWithReports();
  }, [quizData, allquizreport]);

  const filterdata = (e) => {
    const search = e.target.value;
    setsearchterm(search);
    setDisplayedQuizData(
      search
        ? filterquizData.filter((quiz) => quiz._id === search)
        : filterquizData
    );
  };

  function calculateCorrectIncorrect(report) {
    const questionDetails = report.quizAttend[0]?.questionDetails || [];
    const correct = report.quizAttend[0]?.correctCount || 0;
    const incorrect = questionDetails.length - correct;
    return { correct, incorrect };
  }

  function formatTimeTaken(startedAt, completedAt) {
    const start = new Date(startedAt);
    const end = new Date(completedAt);
    const timeTaken = (end - start) / 1000;
    const hours = Math.floor(timeTaken / 3600);
    const minutes = Math.floor((timeTaken % 3600) / 60);
    const seconds = Math.floor(timeTaken % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
  }

  const exportToExcel = () => {
    const formattedData = displayedQuizData
      .filter((quiz) => quiz.quizType === mode)
      .map((quiz) => {
        return quiz.quizReports.map((report, idx) => {
          const { correct, incorrect } = calculateCorrectIncorrect(report);
          return {
            "Quiz Name": quiz.quizTitle,
            "Participant Name": `${report.quizAttend[0]?.firstName || ""} ${
              report.quizAttend[0]?.lastName || ""
            }`,
            "Total Marks Scored": `${report.quizAttend[0]?.points || 0} / ${
              report.quizAttend[0]?.totalPoints || 0
            }`,
            "Average %": report.quizAttend[0]?.average || 0,
            "Correct": correct,
            "Incorrect": incorrect,
            "Time Taken": formatTimeTaken(
              report.quizAttend[0]?.startedAt,
              report.quizAttend[0]?.completedAt
            ),
          };
        });
      })
      .flat();

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Reports");

    // Download Excel file
    XLSX.writeFile(workbook, "QuizReports.xlsx");
  };

  return (
    <div className="relative mt-10 flex flex-col items-center overflow-x-auto sm:rounded-lg">
      <div className="flex w-full items-center justify-between pb-4">
        <select
          onChange={(e) => filterdata(e)}
          value={searchterm}
          className="text-md block w-fit rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select quiz</option>
          {filterquizData
            .filter((item) => item.quizType === mode)
            .map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.quizTitle}
              </option>
            ))}
        </select>
        <Button
          onClick={exportToExcel}
          className="inline-flex items-center rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
        >
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
        </Button>
      </div>
      <h1 className="m-5 text-xl font-bold" style={{ fontSize: "2em" }}>
        Score data
      </h1>

      <div className="flex w-full flex-col gap-3">
        {displayedQuizData && displayedQuizData.length > 0 ? (
          displayedQuizData
            .filter((item) => item.quizType === mode)
            .map((quiz, index) => (
              <div key={index} className="w-full rounded-xl border-2 border-[#1D4ED8] p-3">
                <div className="flex justify-between px-4 text-lg text-[#1D4ED8]">
                  <div className="flex flex-col">
                    <h1 className="text-[#1D4ED8]">Quiz Name: {quiz.quizTitle}</h1>
                    <h2>Quiz Type: {quiz.quizType}</h2>
                    <div className="text-sm text-gray-500">
                      Created At: {new Date(quiz.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div
                  id="questionWiseTable"
                  className="mt-3 w-full overflow-hidden rounded-lg text-left text-sm text-gray-500"
                >
                  <table className="w-full text-sm text-gray-500">
                    <thead className="bg-[#1D4ED8] text-xs uppercase text-white">
                      <tr>
                        <th className="p-4">S.no</th>
                        <th className="px-6 py-3">Participant Name</th>
                        <th className="px-6 py-3">Total Marks Scored</th>
                        <th className="px-6 py-3">Average %</th>
                        <th className="px-6 py-3">Correct</th>
                        <th className="px-6 py-3">Incorrect</th>
                        <th className="px-6 py-3">Time Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quiz.quizReports.map((report, idx) => {
                        const { correct, incorrect } = calculateCorrectIncorrect(report);
                        return (
                          <tr key={idx} className="border-b bg-white hover:bg-gray-100">
                            <td className="w-4 p-4">{idx + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                              {report.quizAttend[0]?.firstName}{" "}
                              {report.quizAttend[0]?.lastName}
                            </td>
                            <td className="px-6 py-4">
                              {report.quizAttend[0]?.points || 0} /{" "}
                              {report.quizAttend[0]?.totalPoints || 0}
                            </td>
                            <td className="px-6 py-4">{report.quizAttend[0]?.average || 0}</td>
                            <td className="px-6 py-4">{correct}</td>
                            <td className="px-6 py-4">{incorrect}</td>
                            <td className="px-6 py-4">
                              {formatTimeTaken(
                                report.quizAttend[0]?.startedAt,
                                report.quizAttend[0]?.completedAt
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
        ) : (
          <Box>No data found</Box>
        )}
      </div>
    </div>
  );
};

export default BulkReport;
