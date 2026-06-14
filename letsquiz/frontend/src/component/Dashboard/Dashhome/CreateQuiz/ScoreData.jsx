import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";
import { baseUrl1 ,baseUrl ,QUIZ} from "../../../constants/apiUrl";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "../../../context/userContext";

const supabase = createClient(
  "https://qhcpxbkmqeolnjplsmoi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoY3B4YmttcWVvbG5qcGxzbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MDIwNjAsImV4cCI6MjAzODk3ODA2MH0.4_hlataQGgbDJP7wttzIwtXkqHIg1rc7zZR14odOnho"
);

const ScoreData = ({
  exportToExcel,
  handleQuizSelect,
  selectedQuiz,
  quizReport,
}) => {
  const [alldata, setalldata] = useState([]);

  const [quizData, setQuizData] = useState([]);
  const [Status, setStatus] = useState(quizData?.isActive);
  const {currentuserdata} = useUser()



  useEffect(() => {
    // Assuming localId is your locally stored variable
    // const localId = localStorage.getItem("currentUser");
    const localId = currentuserdata

    // Fetch quiz data using Axios
    axios
      .post(baseUrl + QUIZ.getQuizbyUser, { userid: localId.id }) //https://letsquiz.org/api/quiz/quizbyUserID/
      .then((response) => {
        setQuizData(response.data.allQuiz);

        console.log(response.data.allQuiz.find(item => item.quizMode = tableNumber));
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [Status]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  useEffect(() => {
    console.log("QUIZDATA", quizData);
    console.log("QUIZREPORT", quizReport);
  }, []);

  const formatTimeTaken = (startTime, completedTime) => {
    const timeTakenInSeconds = completedTime - startTime;
    const hours = Math.floor(timeTakenInSeconds / 3600);
    const minutes = Math.floor((timeTakenInSeconds % 3600) / 60);
    const seconds = Math.floor(timeTakenInSeconds % 60);

    return ` ${minutes}m ${seconds}s`;
  };

  const sendData = (id) => {
    axios
      .put(`${baseUrl1}/toggleActivityStatus/${id}`)
      .then((response) => {
        // handle success
        console.log(response.data.quiz?.isActive);
        setStatus(response.data.quiz);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

 

  const [words, setWords] = useState([
    {
      text: "told",
      value: 48,
    },
    {
      text: "Education",
      value: 68,
    },
    {
      text: "Toys",
      value: 80,
    },
    {
      text: "Grow",
      value: 60,
    },
    {
      text: "Stuck",
      value: 54,
    },
    {
      text: "Throw",
      value: 48,
    },
  ]);

  console.log(Status);

  console.log(quizData);
  return (
    <div className="relative mt-10 flex flex-col items-center overflow-x-auto sm:rounded-lg">
      <div className="flex w-full items-center justify-between pb-4">
        {countries &&
          countries.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        <div>
          {/* <select id="countries" onChange={handleQuizSelection} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">
                        <option value="">Select Quiz</option>
                        {quizTitles.map((quiz, index) => (
                            <option key={index} value={quiz.quizTitle}>
                                {quiz.quizTitle}
                            </option>
                        ))}
                    </select> */}
          <select
            onChange={handleQuizSelect}
            value={selectedQuiz}
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option selected value="">
              Select a Quiz
            </option>
            {quizData &&
              quizData.map((quiz) => (
                <option key={quiz._id} value={quiz._id}>
                  {quiz.quizTitle}
                </option>
              ))}
            <ul></ul>
          </select>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              exportToExcel("scoreDataTable");
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
      {/* <h1 className='m-5 text-xl font-bold ' style={{ fontSize: "2em" }}>Score Data</h1> */}
    
      <table
        id="quizTable"
        className="w-full text-center  text-lg text-gray-500 dark:text-gray-400"
      >
        <thead className="w-full bg-gray-50 text-lg uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Q.no
            </th>
            <th scope="col" className="px-6 py-3">
              quiz title
            </th>
            <th scope="col" className="px-6 py-3">
              quiz languag
            </th>
            <th scope="col" className="px-6 py-3">
              quiz type
            </th>
            <th scope="col" className="px-6 py-3">
              fillRule
            </th>
            <th scope="col" className="px-6 py-3">
              quiz status
            </th>
          </tr>
        </thead>
        {quizData !== null && quizData.length === 0 ? (
          <div>NO quiz are Created</div>
        ) : (
          <tbody>
            {quizData?.map((report, index) => (
              <tr
                key={index}
                className="border-b bg-white   hover:bg-gray-100 "
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {report?.quizTitle}
                </td>
                <td className="px-6 py-4">{report?.language}</td>
                <td className="px-6 py-4">{report?.quizType}</td>
                <td className="px-6 py-4  ">
                  <p className="h-[7vh]  overflow-hidden  text-ellipsis  ">
                    {" "}
                    {report?.quizDescription.slice(0, 140)}
                    {report?.quizDescription.length >= 100 &&
                    parseInt(report?.quizDescription.length) > 100
                      ? "..."
                      : ""}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => sendData(quizData[index]._id)}
                    className="inline-flex items-center rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
                  >
                    {report?.isActive ? "activate" : "Deactivate"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ScoreData;
