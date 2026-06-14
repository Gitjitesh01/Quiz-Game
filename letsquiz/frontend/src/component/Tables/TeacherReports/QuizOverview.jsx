import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function QuizOverview({
  quizData,
  allquizreport,
  mode,
}) {
  const [filterquizData, setFilterQuizData] = useState([]);
  const [displayedQuizData, setDisplayedQuizData] = useState([]);
  const [searchterm, setSearchTerm] = useState("");

  useEffect(() => {
    const matchQuizDataWithReports = () => {
      const flatReports = allquizreport.flat();
      const matchedData = quizData.map((quiz) => {
        const reports = flatReports.filter(
          (report) => report.quizid === quiz._id
        );
        return {
          ...quiz,
          quizReports: reports || null,
        };
      });
      setFilterQuizData(matchedData);
      setDisplayedQuizData(matchedData);
    };

    matchQuizDataWithReports();
  }, [quizData, allquizreport]);

  // Filter the data based on search term
  const filterData = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    setDisplayedQuizData(
      search
        ? filterquizData.filter((quiz) => quiz._id === search)
        : filterquizData
    );
  };

  // Excel Download logic using xlsx
  const downloaddata = () => {
    const dataToExport = displayedQuizData.flatMap((quiz) =>
      quiz.filter((item) => item.quizType === mode).questions.map((question, idx) => {
        const questionDetails = quiz.quizReports[0]?.quizAttend[0]?.questionDetails || [];
        const response = questionDetails[idx]?.response || "N/A";
        return {
          "Quiz Name": quiz.quizTitle,
          "Quiz Type": quiz.quizType,
          "Created At": quiz.quizReports[0] &&
            new Date(quiz.quizReports[0].quizAttend[0].startedAt).toLocaleString(),
          "Completed At": quiz.quizReports[0] &&
            new Date(quiz.quizReports[0].quizAttend[0].completedAt).toLocaleString(),
          "Question": question.title.replace(/<[^>]+>/g, "") || "N/A",
          "Response": response,
        };
      })
    );

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Overview");

    // Generate Excel file
    XLSX.writeFile(workbook, "Quiz_Overview.xlsx");
  };

  return (
    <div className="relative mt-10 flex flex-col items-center overflow-x-auto sm:rounded-lg">
      <div className="flex w-full items-center justify-between pb-4">
        <select
          onChange={(e) => filterData(e)}
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
        <button
          onClick={downloaddata}
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
        </button>
      </div>

      <h1 className="m-5 text-xl font-bold" style={{ fontSize: "2em" }}>
        Quiz Overview
      </h1>

      <div className="flex w-full flex-col gap-3">
        {displayedQuizData && displayedQuizData.length > 0 ? (
          displayedQuizData
            .filter((item) => item.quizType === mode)
            .map((quiz, index) => (
              <div
                key={index}
                className="w-full rounded-xl border-2 border-[#1D4ED8] p-3"
              >
                {/* Quiz Header Section */}
                <div className="flex justify-between px-4 text-lg text-[#1D4ED8]">
                  <div className="flex flex-col">
                    <h1 className="text-[#1D4ED8]">
                      Quiz Name: {quiz.quizTitle}
                    </h1>
                    <h2>Quiz Type: {quiz.quizType}</h2>
                    <div className="text-sm text-gray-500">
                      Created At: {new Date(quiz.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    Completed At:{" "}
                    {quiz.completedAt
                      ? new Date(quiz.completedAt).toLocaleString()
                      : "N/A"}
                  </div>
                </div>

                {/* Question Details Table */}
                <div
                  id="quizOverviewTable"
                  className="mt-3 w-full overflow-hidden rounded-lg text-left text-sm text-gray-500"
                >
                  <table className="w-full text-sm text-gray-500">
                    <thead className="bg-[#1D4ED8] text-xs uppercase text-white">
                      <tr>
                        <th className="p-4">S.no</th>
                        <th className="w-[30%] px-6 py-3">Started at</th>
                        <th className="px-6 py-3">Completed at </th>
                        {quiz.questions.map((report, idx) => (
                          <th
                            key={idx}
                            className="text-start text-sm"
                            dangerouslySetInnerHTML={{
                              __html:
                                report.title.replace(/<[^>]+>/g, "") || "N/A",
                            }}
                          ></th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {quiz.questions?.length > 0 ? (
                        quiz.questions.map((report, idx) => {
                          return (
                            <tr key={idx} className="">
                              <td>{idx + 1}</td>
                              <td>
                                {quiz.quizReports[0] &&
                                  new Date(
                                    quiz.quizReports[0].quizAttend[0]
                                      .startedAt
                                  ).toLocaleString()}
                              </td>
                              <td>
                                {quiz.quizReports[0] &&
                                  new Date(
                                    quiz.quizReports[0].quizAttend[0]
                                      .completedAt
                                  ).toLocaleString()}
                              </td>
                              {quiz.quizReports[0] &&
                                quiz.quizReports[0].quizAttend[0].questionDetails.map(
                                  (question, qIdx) => (
                                    <td key={qIdx}>
                                      {question.response || "N/A"}
                                    </td>
                                  )
                                )}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No questions available for this quiz.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
        ) : (
          <h1 className="flex items-center justify-center text-xl">
            No Quiz Records Found
          </h1>
        )}
      </div>
    </div>
  );
}