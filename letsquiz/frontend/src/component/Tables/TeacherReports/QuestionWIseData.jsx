import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, QUIZ } from "../../../constants/apiUrl";
import XLSX from "xlsx";
import {
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function QuestionWiseData({ quizData, allquizreport, mode }) {
  const [filterquizData, setFilterQuizData] = useState([]);
  const [displayedQuizData, setDisplayedQuizData] = useState([]);
  const [searchterm, setSearchTerm] = useState("");

  useEffect(() => {
    const matchQuizDataWithReports = () => {
      const flatReports = allquizreport.flat();
      const matchedData = quizData.map((quiz) => {
        const reports = flatReports.filter((report) => report.quizid === quiz._id);
        return {
          ...quiz,
          quizReports: reports || null,
        };
      });
      setFilterQuizData(matchedData);
    };
    matchQuizDataWithReports();
  }, [quizData, allquizreport]);

  const filterData = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    setDisplayedQuizData(
      search ? filterquizData.filter((quiz) => quiz._id === search) : null
    );
  };

  const downloadData = () => {
    if (displayedQuizData.length === 0) {
      alert("No data available for download.");
      return;
    }

    function extractTextFromHTML(htmlString) {
      const div = document.createElement('div');
      div.innerHTML = htmlString;
      return div.innerText || div.textContent; // Get only the text content
  }

    const dataToExport = displayedQuizData.flatMap((quiz) =>
      quiz.questions.map((question, questionIndex) => {
        const correctCount = quiz.quizReports.reduce((acc, report) => {
          return acc + (report.quizAttend[0]?.correctCount === questionIndex ? 1 : 0);
        }, 0);

        const incorrectCount = quiz.quizReports.reduce((acc, report) => {
          const questionDetails = report.quizAttend[0]?.questionDetails || [];
          return acc + Math.max(questionDetails.length - correctCount, 0);
        }, 0);

        const totalTimeTaken = quiz.quizReports.reduce((acc, report) => {
          const start = new Date(report.quizAttend[0]?.startedAt);
          const end = new Date(report.quizAttend[0]?.completedAt);
          return acc + (end - start) / 1000; // time in seconds
        }, 0);

        const averageTimePerQuestion = totalTimeTaken / quiz.questions.length;
        const formattedAverageTime = `${Math.floor(averageTimePerQuestion / 60)}m ${Math.floor(averageTimePerQuestion % 60)}s`;

        const accuracy = (correctCount / quiz.quizReports.length) * 100;

        return {
          "Quiz Name": quiz.quizTitle,
          Question: extractTextFromHTML(question.title),
          "Question Type": question.type,
          Accuracy: `${accuracy.toFixed(2)}%`,
          "Average Time (mm:ss)": formattedAverageTime,
          Correct: correctCount,
          Incorrect: incorrectCount,
          Unattempted: question.unattempted || 0,
        };
      })
    );

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "QuestionWiseData");
    XLSX.writeFile(wb, "QuestionWiseData.xlsx");
  };

  // Data columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'S.no', width: 70 },
    {
      field: 'question',
      headerName: 'Question',
      width: 350,
      renderCell: (params) => (
        <div dangerouslySetInnerHTML={{ __html: params.value }} />
      ),
    },
    { field: 'questionType', headerName: 'Question Type', width: 150 },
    { field: 'accuracy', headerName: 'Answer Accuracy', width: 150 },
    { field: 'averageTime', headerName: 'Average  Time (mm:ss)', width: 200 },
    { field: 'correct', headerName: 'Correct', width: 100 },
    { field: 'incorrect', headerName: 'Incorrect', width: 100 },
    { field: 'unattempted', headerName: 'Unattempted', width: 150 }
  ];

  // Prepare rows for DataGrid
  const rows = displayedQuizData && displayedQuizData.length > 0 
    ? displayedQuizData.flatMap((quiz, quizIndex) =>
        quiz.questions.map((question, questionIndex) => {
          const correctCount = quiz.quizReports.reduce((acc, report) => {
            return acc + (report.quizAttend[0]?.correctCount === questionIndex ? 1 : 0);
          }, 0);

          const incorrectCount = quiz.quizReports.reduce((acc, report) => {
            const questionDetails = report.quizAttend[0]?.questionDetails || [];
            return acc + Math.max(questionDetails.length - correctCount, 0);
          }, 0);

          const totalTimeTaken = quiz.quizReports.reduce((acc, report) => {
            const start = new Date(report.quizAttend[0]?.startedAt);
            const end = new Date(report.quizAttend[0]?.completedAt);
            return acc + (end - start) / 1000; // time in seconds
          }, 0);

          const averageTimePerQuestion = totalTimeTaken / quiz.questions.length;
          const formattedAverageTime = `${Math.floor(averageTimePerQuestion / 60)}m ${Math.floor(averageTimePerQuestion % 60)}s`;

          const accuracy = (correctCount / quiz.quizReports.length) * 100;

          return {
            id: `${quizIndex}-${questionIndex}`,
            question: question.title, // Assuming question.title is in HTML format
            questionType: question.type,
            accuracy: `${accuracy.toFixed(2)}%`,
            averageTime: formattedAverageTime,
            correct: correctCount,
            incorrect: incorrectCount,
            unattempted: question.unattempted || 0
          };
        })
      )
    : [];

  return (
    <div className="relative mt-10 flex flex-col items-center overflow-x-auto sm:rounded-lg">
      <div className="flex w-full items-center justify-between pb-4">
        <Select
          value={searchterm}
          onChange={filterData}
          displayEmpty
          className="w-fit"
        >
          <MenuItem value="">
            <em>Select quiz</em>
          </MenuItem>
          {filterquizData.filter((item) => item.quizType === mode).map((quiz) => (
            <MenuItem key={quiz._id} value={quiz._id}>
              {quiz.quizTitle}
            </MenuItem>
          ))}
        </Select>

        {displayedQuizData && (
          <Button onClick={downloadData} variant="contained" color="primary">
            Download Excel
          </Button>
        )}
      </div>

      <Box sx={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
          autoHeight
          components={{
            Toolbar: () => (
              <div style={{ padding: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Search…"
                  value={searchterm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
              </div>
            ),
          }}
          filterModel={{
            items: [
              {
                columnField: 'question',
                operatorValue: 'contains',
                value: searchterm,
              },
            ],
          }}
        />
      </Box>
    </div>
  );
}
