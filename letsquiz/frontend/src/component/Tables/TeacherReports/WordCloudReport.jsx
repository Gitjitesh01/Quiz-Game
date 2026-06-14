import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useUser } from "../../../context/userContext";
import { QUIZ, baseUrl } from "../../../constants/apiUrl";
import ReactWordcloud from "react-wordcloud";
import { useNavigate } from "react-router";
import { set } from "lodash";

export default function WordCloudReport({ exportToExcel }) {
  const [surveyData, setSurveyData] = useState([]);
  const [selectePoll, setSelectePoll] = useState(null);
  const [pollReport, setPollReport] = useState(null);
  const [wordCloudData, setWordCloudData] = useState([]);
  const [selecteddata, setselecteddata] = useState("");
  const [showdata, setshowdata] = useState(false);
  const [isWordCloudModalOpen, setIsWordCloudModalOpen] = useState(false); // State for modal control
  const [filterdata ,setfilterdata ] = useState([])
  const navigate = useNavigate();
  const { currentuserdata } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}${QUIZ.getpollbyuserid}${currentuserdata.id}`
        );
        setPollReport(response.data.allQuiz);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentuserdata.id]);

  

  useEffect(() => {
    if (selectePoll) {
      const fetchPollData = async () => {
        try {
          const response = await axios.get(
            `/api/quiz/${selectePoll}`
          );
          const quizData = response.data.quiz;
          setPollReport(quizData);
          extractWordCloudData(quizData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchPollData();
    }
  }, [selectePoll]);

  const getshowdata = () => {
    setshowdata(() => !showdata);
  };


  useMemo(() => {
    setfilterdata(pollReport)
  }, [pollReport]);


  const extractWordCloudData = (quizData) => {
    if (quizData.wordcloud && quizData.wordcloud.length > 0) {
      const words = quizData.wordcloud.map((word) => ({
        text: word.text,
        value: word.count || 1,
      }));
      setWordCloudData(words);
    } else if (quizData.questions) {
      const words = quizData.questions.flatMap((question) =>
        question.options.map((option) => ({
          text: option.text,
          value: option.vote || 1,
        }))
      );
      setWordCloudData(words);
    }
  };

  // Handle opening the modal
  const openWordCloudModal = () => {
    setIsWordCloudModalOpen(true);
  };

  // Handle closing the modal
  const closeWordCloudModal = () => {
    setIsWordCloudModalOpen(false);
  };


  const filter =(e)=>{

    if( e.target.value === ""){
      setfilterdata(pollReport)

    }else{
      setfilterdata(pollReport.filter((quiz) => quiz._id === e.target.value))

    }


  }

  return (
    <div className="relative mt-10 flex flex-col items-center overflow-x-auto sm:rounded-lg">
      {showdata && (
        <div className="fixed z-50  h-fit  w-fit rounded-xl border-2 border-[#1D4ED8] bg-white">
          <WordCloud controller={getshowdata} data={selecteddata} />
        </div>
      )}
      <div className="flex w-full items-center justify-between pb-4">
        <div>
          <select
            onChange={(e)=> filter(e)}
            value={selectePoll}
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a WordCloud</option>
            {pollReport && pollReport.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.quizTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <button
            onClick={() => exportToExcel("pollReportTable")}
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
      </div>
      <h1 className="m-5 text-xl font-bold" style={{ fontSize: "2em" }}>
        WordCloud Report
      </h1>

      

      {/* Word Cloud Modal */}
      {isWordCloudModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 max-w-lg rounded-lg bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold">WordCloud</h3>
              <button
                onClick={closeWordCloudModal}
                className="text-red-500 hover:text-red-800"
              >
                &times;
              </button>
            </div>

            {wordCloudData.length > 0 ? (
              <ReactWordcloud words={wordCloudData} />
            ) : (
              <div>No wordcloud data available</div>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={closeWordCloudModal}
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
        <tbody>
          {filterdata?.map((report, index) => (
            <tr key={index} className="border-b bg-white hover:bg-gray-100">
              <td className="w-1/4 p-4">
                <div className="flex items-center">{index + 1}</div>
              </td>
              <td className="w-1/2 p-4">
                <div className="flex items-center">{report.quizTitle}</div>
              </td>
              <td className="w-1/4 p-4">
                <button
                  onClick={() => {
                    setshowdata(true);
                    setselecteddata(
                      filterdata.filter((report) => report._id === report._id)
                    );
                    console.log(selecteddata);
                  }}
                  type="button"
                  className="mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Poll
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const WordCloud = ({ data, controller }) => {
  const [surveyData, setSurveyData] = useState([]);

  console.log(data[0].questions[0].options.map((item) => item));
  useEffect(() => {
    if (data && data.length > 0) {
      const wordCloudData = data[0].questions[0].options?.map((item) => ({
        text: item.text,
        value: item.value || 1,
      }));
      setSurveyData(wordCloudData);
    }
  }, [data]);

  console.log(surveyData);
  return (
    <>
      {
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 max-w-lg rounded-lg bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold">WordCloud</h3>
              <button
                onClick={() => controller()}
                className="text-red-500 hover:text-red-800"
              >
                &times;
              </button>
            </div>
            {surveyData.length > 0 ? (
              <ReactWordcloud words={surveyData} />
            ) : (
              <div>No wordcloud data available</div>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={() => controller()}
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};
