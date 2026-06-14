import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useMemo } from "react";
import swal from "sweetalert";

("react");
import { QUIZ, baseUrl } from "../../../constants/apiUrl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../../context/userContext";
import { Link } from "react-router-dom";

export default function PollReport({ exportToExcel }) {
  const [surveyData, setSurveyData] = useState([]);
  const [selectePoll, setSelectePoll] = useState(null);
  const [pollReport, setPollReport] = useState(null);
  const [showdata, setshowdata] = useState(false);
  const [selecteddata, setselecteddata] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const navigate = useNavigate();
  const { currentuserdata } = useUser();
  console.log(currentuserdata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}${QUIZ.getpollbyuserid}${currentuserdata.id}`
        );
        setPollReport(response.data.allQuiz);
        console.log("poll report", pollReport?.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectePoll]);

  console.log(pollReport);

  useMemo(() => {
    setfilterdata(pollReport);
  }, [pollReport]);

  console.log(filterdata);


  const filter =(e)=>{
    const search = e.target.value;
    setfilterdata(
      search
        ? pollReport.filter((quiz) => quiz._id === search)
        : pollReport
    );
  }



  const handleQuizSelect = (event) => {
    const selectePollId = event.target.value;
    console.log(selectePollId);
    setSelectePoll(selectePollId);
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

  return (
    <div className="relative mt-10 flex min-h-screen flex-col items-center overflow-x-auto sm:rounded-lg">
      {showdata && (
        <div className="fixed z-50  top-36 h-fit  w-fit rounded-xl border-2 border-[#1D4ED8] bg-white">
          <PollGraph
            setshowdata={setshowdata}
            id={selecteddata}
            showdata={showdata}
          />
        </div>
      )}
      <div className="flex w-full items-center justify-between pb-4">
        <div>
          <select
            onChange={(e) => filter(e)}
            value={selectePoll}
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option selected value="">
              Select a Poll
            </option>
            {filterdata && filterdata.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.quizTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              exportToExcel("pollReportTable");
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
        Poll Report
      </h1>
      <table
        id="pollReportTable"
        className="w-full table-fixed text-left text-sm text-gray-500 dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-1/4 p-4">
              S.no
            </th>
            <th scope="col" className="w-1/2 px-6 py-3">
              Name of the Poll
            </th>
            <th scope="col" className="w-1/4 px-6 py-3">
              View
            </th>
          </tr>
        </thead>
        {console.log(pollReport?.length)}
        {pollReport && pollReport.length <= 0 ? (
          <div>NO ONE HAS ATTENDED THIS SURVEY</div>
        ) : (
          <tbody>
            {filterdata?.map((report, index) => (
              <tr key={index} className="border-b bg-white hover:bg-gray-100">
                <td className="w-1/4 p-4">
                  {console.log(report)}
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="w-1/2 p-4">
                  <div className="flex items-center">
                    {filterdata.quizTitle}
                  </div>
                  {report.title}ddsv
                </td>
                <td className="w-1/4 p-4">
                  <Link
                    onClick={() => {
                      setshowdata(true);
                      setselecteddata(report._id);
                    }}
                    className="mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View Poll
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

import BarChart from "./graphComponents/BarChart.jsx";
import "./graphComponents/BarChart.css";

const PollGraph = ({ id, setshowdata, showdata }) => {
  const [pollData, setPollData] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);

  const FetchPollData = async () => {
    try {
      const res = await axios.get(`https://letsquiz.org/api/quiz/quiz/${id}`);
      setPollData(res.data.quiz);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchPollData();
  }, []);
  console.log(pollData);

  console.log(id);
  const chartData = {
    question: pollData?.questions.flatMap((el) => el.title),
    labels: pollData?.questions.flatMap((el) =>
      el.options.map((ele) => ele.text)
    ),
    values: pollData?.questions.flatMap((el) =>
      el.options.map((ele) => ele.vote)
    ), // Replace with your actual data
  };

  return (
    <div className="p-10 pr-20  ">
      <h1
        dangerouslySetInnerHTML={{
          __html: pollData?.questions.flatMap((el) => `Q. ${el.title}`),
        }}
      ></h1>
      <BarChart data={chartData} />

      <button
        className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-white"
        onClick={() => setshowdata(() => !showdata)}
      >
        Go back
      </button>
    </div>
  );
};
