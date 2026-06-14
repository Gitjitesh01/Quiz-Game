import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";

import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  PUBLICURL,
  USER,
  baseUrl,
  subscription,
} from "../../../../constants/apiUrl";
import {
  BiImageAlt,
  BiMicrophone,
  BiVideo,
  BiCopy,
  BiFileBlank,
  BiLogoGmail,
} from "react-icons/bi";
import { TbSection } from "react-icons/tb";
import {
  AiOutlineDelete,
  AiFillDelete,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { BsWhatsapp, BsTwitter } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MobilePreview from "./mobilePreview";
import QuestionSection from "./QuestionSection";
import Editor from "../../../../Editor";

const QuizQuestions = ({ setStage, questions, setQuestions }) => {
  const [valueOfQuill, setValueOfQuill] = useState("");
  const questionList =  [
    {
      _id: "666c9be39f6919a569606ca7",
      name: "MULTIPLE CHOICE",
      value: "mcq",
      isActive: true,
      __v: 0,
    },
    // {
    //   _id: "666c9be39f6919a569606cab",
    //   name: "DATE",
    //   value: "date",
    //   isActive: true,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606cac",
    //   name: "MATCHING",
    //   value: "matching",
    //   isActive: true,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606cac",
    //   name: "DRAG AND DROP",
    //   value: "matching",
    //   isActive: true,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606ca9",
    //   name: "SHORT ANSWER",
    //   value: "shortanswer",
    //   isActive: true,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606cae",
    //   name: "DROP DOWN",
    //   value: "dropdown",
    //   isActive: true,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606caa",
    //   name: "FILL UPS",
    //   value: "fillups",
    //   isActive: false,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606ca8",
    //   name: "TRUE OR FALSE",
    //   value: "truefalse",
    //   isActive: true,
    //   __v: 0,
    // },
    // {
    //   _id: "666c9be39f6919a569606cad",
    //   name: "CHECK BOX",
    //   value: "checkbox",
    //   isActive: true,
    //   __v: 0,
    // },
  ];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(questions);
  console.log(questionList);
  useEffect(() => {
    async function call() {
      const subscriptionPlan = await axios.post(
        baseUrl + subscription.getSubscriptionbyType,
        { type: currentUser.subscriptionType || "" }
      );
      console.log(subscriptionPlan);
    }
  }, []);
  // const [questions, setQuestions] = useState([
  //     {
  //         title: "",
  //         type: "mcq",
  //         options: [
  //             {
  //                 text: "",
  //                 id: 1,
  //                 image: "",
  //                 audio: "",
  //                 video: "",
  //                 selection: ""
  //             }
  //         ],
  //         answer_options: [
  //             {
  //                 text: "",
  //                 image: "",
  //                 audio: "",
  //                 video: "",
  //             }
  //         ],
  //         timer: "",
  //         selectedTimer: {
  //             code: 12000,
  //             name: "12 Seconds",
  //         },
  //         points: 4,
  //         cumpolsory: true,
  //     }
  // ]);

  useEffect(() => {}, [questions]);

  const [mcq, setMcq] = useState([
    {
      value: 3,
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("questionData")) {
      setQuestions(JSON.parse(localStorage.getItem("questionData")));
    }
  }, [localStorage.getItem("questionData")]);
  const handleMcqChange = () => {
    console.log("hello");
    setMcq((mcq) => {
      return [...mcq, { value: 1 }];
    });
  };

  const questionType = {
    mcq: (
      <>
        {mcq.map((singleMcq, index) => {
          return (
            // <>
            <div
              key={singleMcq.value}
              id="mcqOption1"
              className="my-2 flex items-center"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-[#F4FF52] p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="Add an option here"
                  value={singleMcq.value}
                  onChange={(e) => {
                    console.log(e.target.value);
                    let newMcq = [...mcq];
                    newMcq[index].value = e.target.value;
                    setMcq(newMcq);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="ml-2 rounded-lg border border-blue-500 bg-[#1D4ED8] p-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300  "
              >
                <TiTick />
                <span className="sr-only">Search</span>
              </button>
            </div>
            // {/* <div id="mcqOption2" className="flex items-center my-2">
            //     <div className="relative w-full">
            //         <input
            //             type="text"
            //             id="simple-search"
            //             className="bg-[#53FF45] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   "
            //             placeholder="Add an option here"
            //             required
            //         />
            //     </div>
            //     <button
            //         type="submit"
            //         className="p-2.5 ml-2 text-sm font-medium text-white bg-[#1D4ED8] rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300  "
            //     >
            //         <TiTick />
            //         <span className="sr-only">Search</span>
            //     </button>
            // </div> */}
            // </>
          );
        })}
        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={() => {
            setMcq((mcq) => {
              return [...mcq, { value: 1 }];
            });
            console.log("New Mcq Added", mcq);
          }}
        >
          Add Answer Option
        </button>
      </>
    ),
    fillups: (
      <>
        <div className="my-2 flex w-full flex-col  items-center justify-around">
          <p>TYPE THE ANSWER AS CORRECT,IF IT</p>
          <div className="flex w-full justify-around">
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                placeholder="Add your answer"
                required
              />
            </div>
            <button
              type="submit"
              className=" rounded-lg border border-[#1D4ED8] bg-[#1D4ED8] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
            >
              <select
                id="countries"
                className="block w-4 w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
              >
                <option className="bg-gray-50 text-black" selected>
                  /CreateSurvey Contains
                </option>
                <option className="bg-gray-50 text-black">Exactly</option>
              </select>
            </button>
          </div>
        </div>

        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={handleMcqChange}
        >
          Add Alternative
        </button>
      </>
    ),
    truefalse: (
      <>
        <div className="mb-4 flex items-center">
          <input
            id="default-radio-1"
            type="radio"
            value=""
            name="truefalse-radio"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900    "
          >
            True
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked
            id="default-radio-2"
            type="radio"
            value=""
            name="truefalse-radio"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900    "
          >
            False
          </label>
        </div>
      </>
    ),
    matching: (
      <>
        <div className="mb-4 flex flex-col items-center">
          <div className="my-2 flex">
            <input
              type="text"
              id="voice-search"
              className="mx-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
              placeholder="your option"
              required
            />
            <input
              type="text"
              id="voice-search"
              className="mx-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
              placeholder="your answer"
              required
            />
            <div className="flex items-center justify-center">
              <AiFillDelete size={"1rem"} />
            </div>
          </div>
          <button
            className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
            onClick={handleMcqChange}
          >
            Add Answer Option
          </button>
        </div>
      </>
    ),
    shortanswer: (
      <>
        <div className="my-2 flex w-full flex-col  items-center justify-around">
          <p>TYPE THE ANSWER AS CORRECT,IF IT</p>
          <div className="flex w-full justify-around">
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                placeholder="Add your answer"
                required
              />
            </div>
            <button
              type="submit"
              className=" rounded-lg border border-[#1D4ED8] bg-[#1D4ED8] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
            >
              <select
                id="countries"
                className="block w-4 w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
              >
                <option className="bg-gray-50 text-black" selected>
                  Contains
                </option>
                <option className="bg-gray-50 text-black">Exactly</option>
              </select>
            </button>
          </div>
        </div>

        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={handleMcqChange}
        >
          Add Alternative
        </button>
      </>
    ),
    checkbox: (
      <>
        <div className="my-2 flex w-full flex-col  items-center justify-around">
          <div className="flex w-full items-center justify-around">
            <div className="m-2 flex items-center justify-center">
              <input type="checkbox" className="h-4 w-4" name="" id="" />
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                placeholder="Add your answer"
                required
              />
            </div>
            <div>
              <AiFillDelete size={"1.4rem"} />
            </div>
          </div>
        </div>

        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={handleMcqChange}
        >
          Add Answer Option
        </button>
      </>
    ),
    dropdown: (
      <>
        {mcq.map((singleMcq) => {
          return (
            <div key={singleMcq.value} className="my-2 flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="Add your answer"
                  required
                />
              </div>
              <button
                type="submit"
                className="ml-2 rounded-lg border border-[#1D4ED8] bg-[#1D4ED8] p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
              >
                <TiTick />
                <span className="sr-only">Search</span>
              </button>
            </div>
          );
        })}
        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={handleMcqChange}
        >
          Add Answer Option
        </button>
      </>
    ),
    date: (
      <>
        <input
          type="date"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
          placeholder="Select date"
        />
      </>
    ),
    email: (
      <>
        <input
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
          placeholder="Your Email"
          type="text"
        />
      </>
    ),
    rating: <></>,
    wordcloud: (
      <>
        <div className="flex flex-col">
          <div>
            <h2 className="text-xl font-bold">Words</h2>
            <div className="relative flex w-full">
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                placeholder="Add your answer"
                required
              />
              <button
                type="submit"
                className="ml-2 rounded-lg border border-[#1D4ED8] bg-[#1D4ED8] p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
              >
                <TiTick />
                <span className="sr-only">Search</span>
              </button>
            </div>
            <button className="my-2 block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  ">
              Add Words
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold">Answers</h2>
            <div className="relative flex w-full">
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                placeholder="Add your answer"
                required
              />
              <button
                type="submit"
                className="ml-2 rounded-lg border border-[#1D4ED8] bg-[#1D4ED8] p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
              >
                <TiTick />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
          <button className="my-2 block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  ">
            Add Answers
          </button>
        </div>
      </>
    ),
    test: (
      <textarea
        id="message"
        rows="4"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
        placeholder="Write your thoughts here..."
      ></textarea>
    ),
  };

  // const [questionTypeVal, setquestionTypeVal] = useState("test");
  // useEffect(() => {
  //   handleQuestionTypeChange();
  // }, [questionTypeVal, mcq]);

  // const handleQuestionTypeChange = (e) => {
  //   const questionTypeValTemp = document.getElementById("question-type").value;
  //   setquestionTypeVal(questionTypeValTemp);
  //   console.log(questionTypeVal);
  // };

  const [objVal, setobjVal] = useState();

  function getObjectValue(obj, keyString) {
    const keys = keyString.split(".");
    let value = obj;

    for (let key of keys) {
      if (value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        value = undefined;
        break;
      }
    }

    return value;
  }
  const [previewHTML, setpreviewHTML] = useState(<div className=""></div>);
  const convertStringToHtml = (htmlString) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, "text/html");
    return parsedHtml.body;
  };

  // useEffect(() => {
  //     console.log(questions)
  //     //let newHTML=convertStringToHtml(valueOfQuill);
  //     const targetElement = document.querySelector(`.${"ql-editor"}`);
  //     const innerHTML = targetElement.innerHTML;
  //     setpreviewHTML(innerHTML);
  //     //console.log(innerHTML)
  //     return () => {
  //         // Cleanup code here
  //         // This will be executed before the component unmounts or before the next 'count' update
  //     };
  // }, [questions]);

  const changePreviewVisibilityToFlex = () => {
    let element = document.getElementById("preview");
    //let displayState = element.style.display;
    element.style.display = "flex";
    element = document.getElementById("closeButton");
    element.style.display = "flex";
    element = document.getElementById("openButton");
    element.style.display = "none";
    quesBox = document.getElementById("questionBox");
  };

  const changePreviewVisibilityToNone = () => {
    let element = document.getElementById("preview");
    //let displayState = element.style.display;
    element.style.display = "none";
    element = document.getElementById("openButton");
    element.style.display = "flex";
    element = document.getElementById("closeButton");
    element.style.display = "none";
    quesBox = document.getElementById("questionBox");
  };
  console.log(questions);

  return (
    <>
      <div className=" flex h-[80vh] scale-95 flex-wrap items-center justify-around pb-32 ">
        <div className=" flex flex-col gap-3">
          {true &&
            (Array.isArray(questions) ? questions : []).map((question, index) => {
              return (
                questions && (
                  <div
                  key={question?.id}
                  id={"questionBox" + index}
                  className="mb-10   flex w-[760px] items-center rounded-xl    border-2 border-[#1D4ED8]"
                >
                  <div className="flex w-full flex-col flex-wrap items-center">
                    <div className="flex w-full items-center justify-center rounded-lg rounded-b-none bg-[#1D4ED8] p-[10px] font-semibold text-white">
                      <span>Question {index + 1}</span>
                    </div>
                    <div className="flex w-full flex-col gap-4 rounded-xl border-2 bg-white p-4">
                      <div className="flex items-center gap-5">
                        {question?.image ? (
                          <div className="relative">
                            <img
                              className="mb-2 w-48"
                              src={URL.createObjectURL(question?.image)}
                              alt=""
                            />
                            <button
                              className="absolute right-2 top-2 rounded-full bg-red-500 p-0.5"
                              onClick={() => {
                                let tempQuestions = [...questions];
                                tempQuestions[index].image = null;
                                setQuestions(tempQuestions);
                                localStorage.setItem(
                                  "questionData",
                                  JSON.stringify(tempQuestions)
                                );
                              }}
                            >
                              <TiDeleteOutline className="h-5 w-5 text-white" />
                            </button>
                          </div>
                        ) : null}
                        {question?.audio ? (
                          <div className="flex items-center gap-2">
                            <audio
                              className="w-72"
                              controls
                              src={URL.createObjectURL(question?.audio)}
                              alt=""
                            />
                            <button
                              className="rounded-full bg-red-500 p-1"
                              onClick={() => {
                                let tempQuestions = [...questions];
                                tempQuestions[index].audio = null;
                                setQuestions(tempQuestions);
                                localStorage.setItem(
                                  "questionData",
                                  JSON.stringify(tempQuestions)
                                );
                              }}
                            >
                              <TiDeleteOutline className="h-5 w-5 text-white" />
                            </button>
                          </div>
                        ) : null}
                        {question?.youtube ? (
                          <div className="flex items-center gap-2">
                            <iframe
                              className="w-72"
                              src={question?.youtube}
                              alt=""
                            />
                            <button
                              className="rounded-full bg-red-500 p-1"
                              onClick={() => {
                                let tempQuestions = [...questions];
                                tempQuestions[index].youtube = null;
                                setQuestions(tempQuestions);
                                localStorage.setItem(
                                  "questionData",
                                  JSON.stringify(tempQuestions)
                                );
                              }}
                            >
                              <TiDeleteOutline className="h-5 w-5 text-white" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                      <div className="-mt-10 flex  min-h-[150px] w-full  items-baseline gap-4">
                        <div className="w-full">
                          <Editor
                            questions={questions}
                            index={index}
                            setQuestions={setQuestions}
                            questionList={questionList}
                          />
                        </div>
                      </div>

                      {/* Second Section */}
                      <div>
                        {/* {getObjectValue(questionType, question?.type)} */}
                        <QuestionSection
                          type={question?.type}
                          index={index}
                          questions={questions}
                          setQuestions={setQuestions}
                        />
                      </div>

                      <div className="flex justify-between gap-4">
                        {/* <select
                          id="countries"
                          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
                          value={question?.selectedTimer?.code}
                          defaultValue={"30000"}
                          onChange={(e) => {
                            let tempQuestions = [...questions];
                            localStorage.setItem(
                              "questionData",
                              JSON.stringify(questions)
                            );
                            tempQuestions[index].selectedTimer.code = parseInt(
                              e.target.value
                            );
                            tempQuestions[index].selectedTimer.name =
                              e.target.options[e.target.selectedIndex].text;
                            tempQuestions[index].timer = parseInt(
                              e.target.value
                            );
                            setQuestions(tempQuestions);
                          }}
                        >
                          <option
                            className="bg-gray-50 text-black "
                            selected
                            disabled
                          >
                            Timer
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="10000"
                          >
                            10 Second
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="20000"
                          >
                            20 Second
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="30000"
                          >
                            30 Second
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="60000"
                          >
                            1 Minute
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="120000"
                          >
                            2 Minute
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="180000"
                          >
                            3 Minute
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="300000"
                          >
                            5 Minute
                          </option>
                          <option
                            className="bg-gray-50 text-black"
                            value="300000000000"
                          >
                            more than 60 hour
                          </option>
                        </select> */}

                        {/* <select
                          id="countries"
                          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
                          value={question?.points}
                          onChange={(e) => {
                            localStorage.setItem(
                              "questionData",
                              JSON.stringify(tempQuestions)
                            );
                            let tempQuestions = [...questions];
                            tempQuestions[index].points = parseInt(
                              e.target.value
                            );
                            setQuestions(tempQuestions);
                          }}
                        >
                          <option
                            className="bg-gray-50 text-black"
                            selected
                            disabled
                          >
                            Point
                          </option>
                          <option className="bg-gray-50 text-black" value="0">
                            No Points
                          </option>
                          <option className="bg-gray-50 text-black" value="1">
                            1 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="2">
                            2 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="3">
                            3 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="4">
                            4 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="5">
                            5 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="6">
                            6 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="7">
                            7 Points
                          </option>
                          <option className="bg-gray-50 text-black" value="8">
                            8 Points
                          </option>
                        </select> */}

                        {/* <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={question?.cumpolsory}
                            onChange={(e) => {
                              localStorage.setItem(
                                "questionData",
                                JSON.stringify(tempQuestions)
                              );
                              let tempQuestions = [...questions];
                              tempQuestions[index].cumpolsory =
                                e.target.checked;
                              setQuestions(tempQuestions);
                            }}
                            className="peer sr-only"
                          />
                          <div
                            title="Compulsory"
                            className="peer h-6  w-11 rounded-full  border-2 border-[#0067B1] after:absolute after:left-[2px] after:top-[11px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-[#1D4ED8] after:transition-all after:content-[''] peer-checked:border-[#1D4ED8] peer-checked:bg-[#1D4ED8] peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-[#1D4ED8] peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
                          ></div>
                        </label> */}
                        <div className="flex items-center gap-4">
                          <BiCopy
                            size="22px"
                            title="Duplicate"
                            className="cursor-pointer rounded-lg p-[0.2px] duration-200  hover:bg-blue-500 hover:text-white"
                            onClick={() => {
                              let tempQuestions = [...questions];
                              setQuestions((questions) => {
                                localStorage.setItem(
                                  "questionData",
                                  JSON.stringify(tempQuestions)
                                );
                                return [
                                  ...questions,
                                  {
                                    title: tempQuestions[index].title,
                                    type: tempQuestions[index].type,
                                    options: tempQuestions[index].options,
                                    answer_options:
                                      tempQuestions[index].answer_options,
                                    timer: tempQuestions[index].timer,
                                    selectedTimer:
                                      tempQuestions[index].selectedTimer,
                                    points: tempQuestions[index].points,
                                    cumpolsory: tempQuestions[index].cumpolsory,
                                  },
                                ];
                              });
                            }}
                          />
                          {console.log(index)}
                          <AiOutlineDelete
                            title="Delete"
                            className={`cursor-pointer rounded-lg duration-200  hover:bg-red-500 hover:text-white ${
                              index == 0 && "cursor-not-allowed"
                            }`}
                            size="22px"
                            disabled={index == 0}
                            onClick={() => {
                              if (question?.length == 1) {
                                swal("You have to keep atleast one question");
                              } else {
                              
                                let tempQuestions = [...questions];
                                tempQuestions.splice(index, 1);
                                setQuestions(tempQuestions);
                                localStorage.setItem(
                                  "questionData",
                                  JSON.stringify(tempQuestions)
                                );
                              }
                            }}
                          />
                          {/* <TbSection
                        title="Add Section"
                         size="22px" /> */}
                          {/* <BiFileBlank 
                        title="Add Question"
                        size="22px" /> */}
                          {/* <HiOutlineEllipsisVertical
                        title="More"
                         size="22px" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-around">
                      <button
                        type="button"
                        className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                        onClick={() => {
                          setStage(1);
                          // auto scroll to bottom
                          // let element = document.getElementById("questionBox"+(index+1));
                          // element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                          let element = document.getElementById("questions");
                          element.scrollTop = element.scrollHeight;
                          localStorage.setItem(
                            "questionData",
                            JSON.stringify(questions)
                          );
                        }}
                      >
                        Go Back
                      </button>
                      <button
                        type="button"
                        className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                        onClick={() => {
                          let tempQuestions = [...questions];
                          if (tempQuestions[index].title === "") {
                            swal({
                              title: "Please fill the previous question",
                              text: "It appears that you have not answered the previous question?. Please provide an answer before proceeding.",
                              icon: "info", // Warning icon
                              button: "Okay", // Button text
                            });
                            return;
                          }
                          if (tempQuestions[index].type === "mcq") {
                            if (
                              tempQuestions[index].options[0].text === "" ||
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the option",
                                text: "It appears that you have not fill all details for proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "fillups") {
                            if (
                              tempQuestions[index].answer_options[0].text ===
                                "" ||
                              tempQuestions[index].answer_options[0]
                                .selection === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (
                            tempQuestions[index].type === "truefalse"
                          ) {
                            if (
                              tempQuestions[index].answer_options[0].text ===
                                "" ||
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "matching") {
                            console.log(tempQuestions[index].options.length);
                            for (
                              let i = 0;
                              i < tempQuestions[index].options.length;
                              i++
                            ) {
                              if (
                                tempQuestions[index].options[i].selection ===
                                  "" ||
                                tempQuestions[index].options[i].text === ""
                              ) {
                                swal({
                                  title: "Please fill the answer options",
                                  text: "Please provide an answer before proceeding.",
                                  icon: "info", // Warning icon
                                  button: "Okay", // Button text
                                });
                                console.log(
                                  tempQuestions[index].options.length
                                );
                                return;
                              }
                            }
                          } else if (
                            tempQuestions[index].type === "shortanswer"
                          ) {
                            if (
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (
                            tempQuestions[index].type === "checkebox"
                          ) {
                            if (
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "dropdown") {
                            if (
                              tempQuestions[index].options[0].text === "" ||
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          }

                          setQuestions((questions) => {
                            return [
                              ...questions,
                              {
                                title: "",
                                type: "null",
                                options: [
                                  {
                                    text: "",
                                    image: "",
                                    audio: "",
                                    video: "",
                                    id: 1,
                                    selection: "",
                                  },
                                ],
                                answer_options: [
                                  {
                                    text: "",
                                    image: "",
                                    audio: "",
                                    video: "",
                                  },
                                ],
                                timer: 10000,
                                selectedTimer: {
                                  code: 30000,
                                  name: "30 Seconds",
                                },
                                points: 4,
                                cumpolsory: true,
                              },
                            ];
                          });
                          // auto scroll to bottom
                          // let element = document.getElementById("questionBox"+(index+1));
                          // element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                          localStorage.setItem(
                            "questionData",
                            JSON.stringify(questions ));
                        }}
                      >
                        Add Questions
                      </button>
                      <button
                        type="button"
                        className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                      >
                        Add Section
                      </button>
                      <button
                        onClick={() => {
                          let tempQuestions = [...questions];

                          if (questions[index].title === "") {
                            swal("Please fill the previous question");
                            return;
                          }
                          if (tempQuestions[index].type === "mcq") {
                            if (
                              tempQuestions[index].options[0].text === "" ||
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "fillups") {
                            if (
                              tempQuestions[index].answer_options[0].text ===
                                "" ||
                              tempQuestions[index].answer_options[0]
                                .selection === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (
                            tempQuestions[index].type === "truefalse"
                          ) {
                            if (
                              tempQuestions[index].answer_options[0].text ===
                                "" ||
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "matching") {
                            console.log(tempQuestions[index].options.length);
                            for (
                              let i = 0;
                              i < tempQuestions[index].options.length;
                              i++
                            ) {
                              if (
                                tempQuestions[index].options[i].selection ===
                                  "" ||
                                tempQuestions[index].options[i].text === ""
                              ) {
                                swal({
                                  title: "Please fill the answer options",
                                  text: "Please provide an answer before proceeding.",
                                  icon: "info", // Warning icon
                                  button: "Okay", // Button text
                                });
                                console.log(
                                  tempQuestions[index].options.length
                                );
                                return;
                              }
                            }
                          } else if (
                            tempQuestions[index].type === "shortanswer"
                          ) {
                            if (
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "checkbox") {
                            if (
                              tempQuestions[index].answer_options[0].text ===
                                "" &&
                              1 > 2
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          } else if (tempQuestions[index].type === "dropdown") {
                            if (
                              tempQuestions[index].options[0].text === "" ||
                              tempQuestions[index].answer_options[0].text === ""
                            ) {
                              swal({
                                title: "Please fill the answer options",
                                text: "Please provide an answer before proceeding.",
                                icon: "info", // Warning icon
                                button: "Okay", // Button text
                              });
                              return;
                            }
                          }
                          setStage(3);
                          localStorage.setItem(
                            "questionData",
                            JSON.stringify(questions)
                          );
                        }}
                        type="button"
                        className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  {/* <div className="controller flex flex-col justify-center items-center">
                 <button
                 onClick={()=>handleIncrement(index)}
                 className='increment'
                 >
                 <svg  viewBox="0 0 24 24" width="44" height="44" fill="black"><path d="M12 4.83582L5.79291 11.0429L7.20712 12.4571L12 7.66424L16.7929 12.4571L18.2071 11.0429L12 4.83582ZM12 10.4857L5.79291 16.6928L7.20712 18.107L12 13.3141L16.7929 18.107L18.2071 16.6928L12 10.4857Z"></path></svg>
                 </button>
                 <button>
                 <svg  viewBox="0 0 24 24" width="44" height="44" fill="black"><path d="M12 19.1642L18.2071 12.9571L16.7929 11.5429L12 16.3358L7.20711 11.5429L5.79289 12.9571L12 19.1642ZM12 13.5143L18.2071 7.30722L16.7929 5.89301L12 10.6859L7.20711 5.89301L5.79289 7.30722L12 13.5143Z"></path></svg>
                 
                 </button>
                 </div> */}
                </div>
                )
              );
            })}
          <div
            className="hidden h-[505px] min-h-[500px] w-64 min-w-64"
            id="preview"
          >
            <MobilePreview>
              <div className="flex max-w-[200px] flex-col flex-wrap items-start">
                <div
                  id="previewQuestion"
                  className="max-h-[450px] max-w-[210px] overflow-y-auto bg-white"
                >
                  <div className="font-bold">Question:</div>
                  <div
                    className="break max-w-[210px] flex-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: (Array.isArray(questions) ? questions : []).map((question, index) => {
                        return question?.title;
                      }).join(''),
                    }}
                  />
                </div>
              </div>
            </MobilePreview>
          </div>
        </div>
        {/* <button className="absolute right-[-2%]">
          <ArrowBackIosIcon
            id="openButton"
            className=""
            onClick={changePreviewVisibilityToFlex}
            sx={{
              display: "inline",
              height: "70px",
              width: "70px",
              color: "#3c5ecd",
            }}
          />
        </button> */}
        <button className=" absolute right-[24%]">
          <ArrowForwardIosIcon
            id="closeButton"
            className=""
            onClick={changePreviewVisibilityToNone}
            sx={{
              display: "none",
              height: "70px",
              width: "70px",
              color: "#3c5ecd",
            }}
          />
        </button>
        {/* <MobilePreview>
                <div className="flex flex-col items-start flex-wrap max-w-[200px]">
                        <div id="previewQuestion" className="bg-white m-auto max-w-[210px]">
                            <div className="font-bold">Question:</div>
                            <div className="break flex-wrap break-words max-w-[210px]" dangerouslySetInnerHTML={{ __html: previewHTML }} />
                        </div>
                    </div>
                </MobilePreview> */}
        {/* <div id="preview" className="hidden ml-[70px]">
                    <div className="flex flex-col items-center m-auto bg-black rounded-[30px] h-[600px] w-[330px] p-[20px]">
                        <div id="previewQuestion" className="bg-white m-auto h-[480px] w-[290px] p-[20px]">
                            <div className="font-bold">Question:</div>
                            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />

                        </div>
                    </div>
                </div> */}
      </div>
    </>
  );
};
QuizQuestions.propTypes = {
  setStage: PropTypes.func.isRequired,
  questions: PropTypes.object.isRequired,
  setQuestions: PropTypes.func.isRequired,
};


export default QuizQuestions;
