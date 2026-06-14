import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { baseUrl, QUIZ } from "../../constants/apiUrl";
import { useUser } from "../../context/userContext";
import { RiDeleteBin2Fill } from "react-icons/ri";
import swal from "sweetalert";

export default function MyLibrary() {
  const { currentuserdata } = useUser();
  const [quizData, setQuizData] = useState([]);
  const [polldata, setPollData] = useState([]);
  const [filterquizData, setFilterQuizData] = useState([]);
  const [searchterm, setsearchterm] = useState("");
  const [showselector, setshowselector] = useState(false);

  useEffect(() => {
    const localId = currentuserdata;

    axios
      .get(baseUrl + QUIZ.getpollbyuserid + localId.id)
      .then((response) => {
        setPollData(response.data.poll);
        console.log(response.data.allQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [currentuserdata]);

  useEffect(() => {
    const localId = currentuserdata;

    axios
      .post(baseUrl + QUIZ.getQuizbyUser, { userid: localId.id }) //https://letsquiz.org/api/quiz/quizbyUserID/
      .then((response) => {
        setQuizData(response.data.allQuiz);
        console.log(response.data.allQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [currentuserdata]);
  const deleteQuiz = async (quizId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this quiz!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(
            `https://letsquiz.org/api/quiz/quiz/${quizId}`,
            { id: quizId }
          );
          console.log(response.data);
          if (response.status === 200) {
            swal("Quiz deleted successfully", {
              icon: "success",
            });
            window.location.reload();
          } else {
            swal("Error deleting quiz", {
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting quiz:", error);
          swal("Error deleting quiz", {
            icon: "error",
          });
        }
      }
    });
  };

  useMemo(() => {
    setFilterQuizData(quizData);
    // console.log(quizData)
  }, [quizData]);

  const listofselction = [
    {
      value: "",
      label: "All",
    },
    {
      value: "QUIZ",
      label: "Quiz",
    },
    {
      value: "POLL",
      label: "Poll",
    },
    {
      value: "SURVEY",
      label: "Survey",
    },
  ];

  return (
    <div className="relative ml-10 flex flex-col items-center justify-center overflow-x-auto sm:rounded-lg">
      <h1 className="m-5 text-center text-xl font-bold text-[#1272B8] ">
        My Library
      </h1>
      <div className="relative -left-[44%] mb-5">
        <button
          className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-white"
          onClick={() => setshowselector(!showselector)}
        >
          {searchterm ? searchterm : "Select Type"}
        </button>
        {showselector && (
          <div className="absolute top-12 flex w-28 flex-col items-center overflow-hidden rounded-xl border border-zinc-200  bg-white shadow-lg">
            {listofselction.map((item, index) => (
              <button
                key={index}
                className="w-full px-4 text-left duration-200 hover:bg-[#1D4ED8] "
                onClick={() => {
                  setFilterQuizData(
                    item.value
                      ? quizData.filter((quiz) => quiz.quizType === item.value)
                      : quizData
                  );
                  setsearchterm(item.label);
                  setshowselector(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <table
        id="studentReport"
        className="w-full overflow-hidden rounded-2xl text-left text-sm text-gray-400"
      >
        <thead className="bg-[#1D4ED8] text-xs uppercase text-white ">
          <tr>
            <th scope="col" className="p-4 py-2">
              Sl. no
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quiz Id
            </th>
            <th scope="col" className="px-6 py-3">
              Copy to share
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        {filterquizData.length > 0 ? (
          <tbody className="text-md font-body">
            {filterquizData?.reverse().map((quiz, index) => (
              <tr
                key={index}
                className='className="bg-white border-b hover:bg-gray-50 '
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {quiz?.quizTitle}
                  {console.log(quiz?.quizType)} 
                </td>
                <td className="px-6 py-4">{quiz?._id}</td>

                <td className="m-auto flex items-center px-6 py-4">
                  <button
                    className="flex items-center rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `https://letsquiz.org/attendquiz/${quiz?._id}`
                      );
                      swal("Copied to clipboard");
                    }}
                  >
                    Copy Attend Link
                  </button>
                 
                </td>

                <td className="items-center whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex flex-row items-center gap-5">
                    <Link
                      to={`/dashboard/${quiz?.quizType === "QUIZ" ? "createquiz" :  quiz?.quizType === "SURVEY" ? "createsurvey" :"createpoll"  }?quizid=${quiz?._id}`}
                      // createsurvey
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit Quiz
                    </Link>
                    <div
                      className="rounded-lg border border-red-400 bg-red-100 p-1.5"
                      onClick={() => {
                        deleteQuiz(quiz?._id);
                      }}
                    >
                      <RiDeleteBin2Fill

                       className="h-4 w-4 cursor-pointer text-red-600 hover:text-red-900" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div>NO QUIZ ATTENDED</div>
        )}
      </table>
    </div>
  );
}
