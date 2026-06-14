import React, { useState, useEffect, useMemo } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios, { all } from "axios";
import crownIcon from "../../../../../assets/icons/crown_icon.png";
import { useUser } from "../../../../../context/userContext";
import Editor from "../../../../../Editor";
import {
  BiImageAlt,
  BiMicrophone,
  BiVideo,
  BiCopy,
  BiFileBlank,
  BiLogoGmail,
  BiImageAdd,
} from "react-icons/bi";
import {
  PUBLICURL,
  USER,
  baseUrl,
  subscription,
} from "../../../../../constants/apiUrl";
import { TbSection } from "react-icons/tb";
import {
  AiOutlineDelete,
  AiFillDelete,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { BsWhatsapp, BsTwitter, BsMic } from "react-icons/bs";
import { TiDeleteOutline, TiTick } from "react-icons/ti";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FaCrown } from "react-icons/fa6";

import MobilePreview from "./mobilePreview";
import QuestionSection from "./QuestionSection";
import {
  RiCloseCircleFill,
  RiCloseCircleLine,
  RiYoutubeLine,
} from "react-icons/ri";

import PropTypes from "prop-types";

const QuizQuestions = ({ setStage, questions = [], setQuestions, title }) => {
  questions = questions || [];
  const [valueOfQuill, setValueOfQuill] = useState("");
  const [questionList, setQuestionList] = useState([
    {
      _id: "666c9be39f6919a569606ca7",
      name: "MULTIPLE CHOICE",
      value: "mcq",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606cab",
      name: "DATE",
      value: "date",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606cac",
      name: "MATCHING",
      value: "matching",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606cac",
      name: "DRAG AND DROP",
      value: "matching",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606ca9",
      name: "SHORT ANSWER",
      value: "shortanswer",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606cae",
      name: "DROP DOWN",
      value: "dropdown",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606caa",
      name: "FILL UPS",
      value: "fillups",
      isActive: false,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606ca8",
      name: "TRUE OR FALSE",
      value: "truefalse",
      isActive: true,
      __v: 0,
    },
    {
      _id: "666c9be39f6919a569606cad",
      name: "CHECK BOX",
      value: "checkbox",
      isActive: true,
      __v: 0,
    },
  ]);
  const allQuestions = JSON.parse(localStorage.getItem("allQuestions"));
  console.log(allQuestions);
  const { currentuserdata } = useUser();
  const currentUser = currentuserdata;
  console.log(currentUser);

  const fetchSubscriptionPlan = async () => {
    try {
      let response = await axios.post(
        baseUrl + subscription.getSubscriptionbyType,
        {
          type: currentUser?.subscriptionType || "",
        }
      );
      console.log("Subscription Plan Response:", response.data);
      let quesList = [];
      response = response.data.data;
      allQuestions.forEach((item) => {
        quesList.push({
          isActive: response[item.value],
          name: item.name,
          value: item.value,
        });
      });

      console.log(quesList);
      // setSubscriptionPlan(response.data);
    } catch (error) {
      console.error("Error fetching subscription plan:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchSubscriptionPlan();
    } else {
      console.error("No current user found in local storage.");
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

  // useEffect(() => {
  //   console.log("Ques", questions[0]?.options ?? []);
  // }, [questions]);

  const [mcq, setMcq] = useState([
    {
      value: 3,
    },
  ]);
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
              key={"section1"}
              id="mcqOption1"
              className="my-2 flex items-center"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-[#F4FF52] p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="Add an option here"
                  value={singleMcq.value}
                  onChange={(e) => {
                    console.log(e.target.value);
                    let newMcq = [...mcq];
                    newMcq[index].value = e.target.value;
                    setMcq(newMcq);
                  }}
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
          className=" block w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
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
    checkebox: (
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
            <div className="my-2 flex items-center">
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

  const [questionTypeVal, setquestionTypeVal] = useState("test");
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

  // const questionsRef = React.useRef(null);
  useEffect(() => {
    console.log("Questions", questions);
    const questionsContainer = document.getElementById("questions");
    // scroll to bottom smoothly
    questionsContainer.scrollTo({
      top: questionsContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [questions?.length]);

  const [showPreview, setshowPreview] = useState(false);
  const fruit = questions[1];

  console.log(fruit, "this is questions");

  const updateQuestionIndex = (questions, increment, questionsLength) => {
    const prefix = questions.slice(0, 1); // Extract 'q'
    const currentIndex = parseInt(questions.slice(1), 10); // Extract number
    const newIndex = ((currentIndex + increment - 1) % questionsLength) + 1; // Increment and cycle index
    return `${prefix}${newIndex}`; // Form the new question string
  };

  const handleIncrement = () => {
    const incrementValue = 1;
    const updatedQuestions = questions.map((q) =>
      updateQuestionIndex(q, incrementValue, questions.length)
    );
    setQuestions(updatedQuestions);
  };

  // useEffect(() => {
  //   const storedQuestions = localStorage.getItem("questions");
  //   if (storedQuestions) {
  //     const parsedQuestions = JSON.parse(storedQuestions);
  //     if (questions.length < parsedQuestions.length) {
  //       setQuestions(parsedQuestions);
  //     } else {
  //       localStorage.setItem("questions", JSON.stringify(questions));
  //     }
  //   } else {
  //     localStorage.setItem("questions", JSON.stringify(questions));
  //   }
  // }, [questions]);

  console.log(questions, "questions");

  useEffect(() => {
    localStorage.getItem("questionData") == null ||
    localStorage.getItem("questionData") == undefined
      ? localStorage.setItem("questionData", JSON.stringify(questions))
      : null;
  });

  useEffect(() => {
    let objectUrl;
    if (questions.image instanceof File || questions.image instanceof Blob) {
      objectUrl = URL.createObjectURL(questions.image);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [questions.image]);

  // useEffect(()=>{
  //   if()
  // })

  // useMemo(()=>{
  //   if (typeof questions === "string") {
  //     setQuestions(JSON.parse(questions));
  //   }

  // } , [questions] )

  return (
    <div className="flex  flex-col gap-2 ">
      {showPreview ? (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-row items-center justify-center bg-[rgba(0,0,0,0.5)] p-24">
          {/* <div className="flex flex-col gap-4 p-4 min-w-1/2 border-2 rounded-md bg-white relative"> */}
          <div className="relative h-fit w-fit">
            <RiCloseCircleFill
              className="absolute right-2 top-2 h-6 w-6 cursor-pointer text-red-500"
              onClick={() => {
                setshowPreview(false);
              }}
            />
            <img
              src="https://cdn.pixabay.com/photo/2016/07/13/19/43/screen-1515324_960_720.png"
              alt=""
              className="z-30 w-full"
            />
            <div className="absolute left-1/2 top-8 -z-10 flex h-[80%] w-[90%] -translate-x-1/2 flex-col items-center justify-start bg-white p-12">
              <div
                id="previewQuestion"
                className="z-50 max-h-[450px] max-w-[90%] overflow-y-auto bg-white"
              >
                <div className="font-bold">Question:</div>
                {questions?.map((question, index) => {
                  return (
                    <div
                      key={question.id}
                      className="my-3 flex w-full max-w-[90%] flex-col"
                    >
                      <div className="flex flex-row gap-1">
                        <span className="mt-1 text-sm font-semibold">
                          Q{index + 1}.
                        </span>
                        <div
                          className="break max-w-[90%] flex-wrap break-words"
                          dangerouslySetInnerHTML={{ __html: question.title }}
                        />
                      </div>
                      {question.type == "mcq" ? (
                        <div className="flex flex-col">
                          {question.options.map((option, index) => {
                            return (
                              <div
                                key={option.id}
                                className="my-2 flex items-center"
                              >
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    id="simple-search"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                                    placeholder="Add your answer"
                                    required
                                    value={option.text}
                                    disabled
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : question.type == "fillups" ||
                        question.type == "shortanswer" ? (
                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="Fill the answer"
                            className="w-full border-b border-gray-500 p-2"
                          />
                        </div>
                      ) : question.type == "truefalse" ? (
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="true"
                              placeholder="True"
                              className="m-2 border-b border-none border-gray-500"
                            />
                            <label htmlFor="true">True</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="false"
                              placeholder="False"
                              className="m-2 border-b border-none border-gray-500"
                            />
                            <label htmlFor="false">False</label>
                          </div>
                        </div>
                      ) : question.type == "matching" ? (
                        <div className="flex w-full flex-col items-stretch">
                          {question.options.map((option) => {
                            return (
                              <div
                                key={option.id}
                                className="flex h-full w-full items-stretch justify-between"
                              >
                                <span className="m-1 aspect-square w-fit break-words break-all bg-blue-400 p-2 text-sm">
                                  {option.text}
                                </span>
                                <span className="m-1 aspect-square w-fit break-words break-all bg-blue-400 p-2 text-sm">
                                  {option.selection}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : question.type == "checkebox" ? (
                        <div className="flex flex-col">
                          <div className="m-2 flex items-center">
                            {question.options.map((option, index) => {
                              return (
                                <div
                                  key={index}
                                  className="relative flex w-full flex-row gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    id="simple-search"
                                    className="block rounded-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Add your answer"
                                    required
                                  />
                                  <label htmlFor="simple-search">
                                    {option.text}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : question.type == "dropdown" ? (
                        <div className="flex flex-col">
                          <select
                            name=""
                            id=""
                            className="m-2 rounded-lg bg-gray-300 p-2 text-sm"
                          >
                            <option value="">Select</option>
                            {question.options.map((option, index) => {
                              return (
                                <option value={option.text}>
                                  {option.text}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ) : question.type == "date" ? (
                        <div className="m-2 flex flex-col rounded-lg border border-gray-400 p-1">
                          <input type="date" />
                        </div>
                      ) : question.type == "email" ? (
                        <div className="flex flex-col">
                          <input type="email" />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      ) : null}

      <span className="fixed z-10 m-2 -ml-6 -mt-9 mb-2 flex w-[80vw] items-center bg-white text-center text-lg font-semibold">
        Title:&nbsp;
        {title}
        <button
          className="ml-auto rounded-lg bg-[#1D4ED8] px-4 py-2 font-medium text-white outline-none"
          onClick={() => {
            setshowPreview(true);
          }}
        >
          Show Preview
        </button>
      </span>
      <div className=" mt-7 flex  flex-wrap items-center justify-around ">
        <div className="grid h-fit grid-cols-12 gap-4 pb-8">
          <div
            className="col-span-9 flex w-full flex-col items-center gap-4 overflow-y-auto duration-200 "
            id="questions"
          >
            {questions && typeof questions == "string"
              ? JSON.parse(questions)
              : questions.map((question, index) => {
                  return (
                    <div
                      key={question.id}
                      id={"questionBox" + index}
                      className="flex   w-[760px] items-center rounded-xl border-2    border-[#1D4ED8]"
                    >
                      <div className="flex w-full flex-col flex-wrap items-center">
                        <div className="flex w-full items-center justify-center rounded-lg rounded-b-none bg-[#1D4ED8] p-[10px] font-semibold text-white">
                          <span>Question {index + 1}</span>
                        </div>
                        <div className="flex w-full flex-col gap-4 rounded-xl border-2 bg-white p-4">
                          <div className="flex items-center gap-5">
                            {question.image instanceof File ||
                            question.image instanceof Blob ? (
                              <div className="relative">
                                <img
                                  className="mb-2 w-48"
                                  src={URL.createObjectURL(question.image)}
                                  alt=""
                                />
                                <button
                                  className="absolute right-2 top-2 rounded-full bg-red-500 p-0.5"
                                  onClick={() => {
                                    let tempQuestions = [...questions];
                                    tempQuestions[index].image = null;
                                    setQuestions(tempQuestions);
                                  }}
                                >
                                  <TiDeleteOutline className="h-5 w-5 text-white" />
                                </button>
                              </div>
                            ) : (
                              "Image Not Available"
                            )}
                            {question.audio ? (
                              <div className="flex items-center gap-2">
                                <audio
                                  className="w-72"
                                  controls
                                  src={URL.createObjectURL(question.audio)}
                                  alt=""
                                />
                                <button
                                  className="rounded-full bg-red-500 p-1"
                                  onClick={() => {
                                    let tempQuestions = [...questions];
                                    tempQuestions[index].audio = null;
                                    setQuestions(tempQuestions);
                                  }}
                                >
                                  <TiDeleteOutline className="h-5 w-5 text-white" />
                                </button>
                              </div>
                            ) : null}
                            {question.youtube ? (
                              <div className="flex items-center gap-2">
                                <iframe
                                  className="w-72"
                                  src={question.youtube}
                                  alt=""
                                />
                                <button
                                  className="rounded-full bg-red-500 p-1"
                                  onClick={() => {
                                    let tempQuestions = [...questions];
                                    tempQuestions[index].youtube = null;
                                    setQuestions(tempQuestions);
                                  }}
                                >
                                  <TiDeleteOutline className="h-5 w-5 text-white" />
                                </button>
                              </div>
                            ) : null}
                          </div>
                          <div className="-mt-10 flex  min-h-[150px] w-full  items-baseline gap-4">
                            <div className="w-full ">
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
                            {/* {getObjectValue(questionType, question.type)} */}
                            <QuestionSection
                              type={question.type}
                              index={index}
                              questions={questions}
                              setQuestions={setQuestions}
                            />
                          </div>

                          <div className="flex justify-between gap-4">
                            <select
                              id="countries"
                              className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
                              value={question.selectedTimer.code}
                              defaultValue={"30000"}
                              onChange={(e) => {
                                let tempQuestions = [...questions];
                                tempQuestions[index].selectedTimer.code =
                                  parseInt(e.target.value);
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
                                value="30000"
                              >
                                15 Second
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
                            </select>
                            {console.log(question.type)}

                            <select
                              id="countries"
                              className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
                              value={question.points}
                              onChange={(e) => {
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
                              <option
                                className="bg-gray-50 text-black"
                                value="0"
                              >
                                No Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="1"
                              >
                                1 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="2"
                              >
                                2 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="3"
                              >
                                3 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="4"
                              >
                                4 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="5"
                              >
                                5 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="6"
                              >
                                6 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="7"
                              >
                                7 Points
                              </option>
                              <option
                                className="bg-gray-50 text-black"
                                value="8"
                              >
                                8 Points
                              </option>
                            </select>

                            <label className="relative inline-flex cursor-pointer items-center">
                              <input
                                type="checkbox"
                                value=""
                                checked={question.cumpolsory}
                                onChange={(e) => {
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
                            </label>
                            <div className="flex items-center gap-4">
                              <BiCopy
                                size="22px"
                                title="Duplicate"
                                className="cursor-pointer rounded-lg p-[0.2px] duration-200  hover:bg-blue-500 hover:text-white"
                                onClick={() => {
                                  let tempQuestions = [...questions];
                                  setQuestions((questions) => {
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
                                        cumpolsory:
                                          tempQuestions[index].cumpolsory,
                                      },
                                    ];
                                  });
                                  const element = document.getElementById(
                                    `questionBox${index + 1}`
                                  );
                                  setTimeout(() => {
                                    const parentElement =
                                      document.getElementById("questions");
                                    if (parentElement) {
                                      const childElement =
                                        parentElement.querySelector(
                                          `#questionBox${index + 1}`
                                        );
                                      if (childElement) {
                                        childElement.scrollIntoView({
                                          behavior: "smooth",
                                          block: "end",
                                          inline: "nearest",
                                        });
                                      }
                                    }
                                  }, 100);
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
                                  if (index == 0) {
                                    swal(
                                      "You have to keep atleast one question"
                                    );
                                  } else {
                                    swal({
                                      title: "Are you sure?",
                                      text: "Once deleted, you will not be able to recover this question!",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        let tempQuestions = [...questions];
                                        tempQuestions.splice(index, 1);
                                        localStorage.removeItem(
                                          `questiontype_${index}`
                                        );
                                        setQuestions(tempQuestions);
                                        swal(
                                          "Poof! Your question has been deleted!",
                                          {
                                            icon: "success",
                                          }
                                        );
                                      } else {
                                        swal("Your question is safe!");
                                      }
                                    });
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
                              localStorage.setItem(
                                "questionData",
                                JSON.stringify(questions)
                              );
                              // auto scroll to bottom
                              // let element = document.getElementById("questionBox"+(index+1));
                              // element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                              let element =
                                document.getElementById("questions");
                              element.scrollTop = element.scrollHeight;
                            }}
                          >
                            Go Back
                          </button>

                          <button
                            type="button"
                            className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                            onClick={() => {
                              const tempQuestions = [...questions];
                              const currentQuestion = tempQuestions[index];

                              // Common validation function
                              const showValidationError = (title, text) => {
                                swal({
                                  title,
                                  text,
                                  icon: "info",
                                  button: "Okay",
                                });
                              };

                              // General checks
                              if (!currentQuestion.title) {
                                showValidationError(
                                  "Please fill the previous question",
                                  "It appears that you have not answered the previous question. Please provide an answer before proceeding."
                                );
                                return;
                              }

                              // Validation for different question types
                              if (
                                currentQuestion.type === "mcq" ||
                                currentQuestion.type === "dropdown"
                              ) {
                                if (
                                  !currentQuestion.options[0]?.text ||
                                  !currentQuestion.answer_options[0]?.text
                                ) {
                                  showValidationError(
                                    "Please fill the options",
                                    "It appears that you have not provided all necessary details."
                                  );
                                  return;
                                }
                              } else if (
                                ["fillups", "shortanswer", "checkbox"].includes(
                                  currentQuestion.type
                                )
                              ) {
                                if (!currentQuestion.answer_options[0]?.text) {
                                  showValidationError(
                                    "Please fill the answer options",
                                    "Please provide an answer before proceeding."
                                  );
                                  return;
                                }
                              } else if (currentQuestion.type === "truefalse") {
                                if (!currentQuestion.answer_options[0]?.text) {
                                  showValidationError(
                                    "Please fill the answer options",
                                    "Please provide an answer before proceeding."
                                  );
                                  return;
                                }
                              } else if (currentQuestion.type === "matching") {
                                for (let option of currentQuestion.options) {
                                  if (!option?.text || !option?.selection) {
                                    showValidationError(
                                      "Please fill the matching options",
                                      "Please ensure all matching options are filled."
                                    );
                                    return;
                                  }
                                }
                              }

                              // Create the new question object
                              const newQuestion = {
                                tempindex: index + 1,
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
                                timer: 30000,
                                selectedTimer: {
                                  code: 30000,
                                  name: "12 Seconds",
                                },
                                points: 4,
                                cumpolsory: true,
                              };

                              // Insert the new question after the current index
                              tempQuestions.splice(index + 1, 0, newQuestion);

                              // Update the state with the modified array
                              setQuestions(tempQuestions);

                              // Save updated questions to localStorage
                              localStorage.setItem(
                                "questionData",
                                JSON.stringify(tempQuestions)
                              );

                              // Scroll to the new question
                              const element = document.getElementById(
                                `questionBox${index + 1}`
                              );
                              setTimeout(() => {
                                const parentElement =
                                  document.getElementById("questions");
                                if (parentElement) {
                                  const childElement =
                                    parentElement.querySelector(
                                      `#questionBox${index + 1}`
                                    );
                                  if (childElement) {
                                    childElement.scrollIntoView({
                                      behavior: "smooth",
                                      block: "end",
                                      inline: "nearest",
                                    });
                                  }
                                }
                              }, 100);
                            }}
                          >
                            Add Question
                          </button>

                          {/* <button
                        type="button"
                        className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                      >
                        Add Section
                      </button> */}

                          {index === questions.length - 1 && (
                            <button
                              onClick={() => {
                                let tempQuestions = [...questions];

                                if (questions[index].title === "") {
                                  swal("Please fill the previous question");
                                  return;
                                }
                                if (tempQuestions[index].type === "mcq") {
                                  if (
                                    tempQuestions[index].options[0].text ===
                                      "" ||
                                    tempQuestions[index].answer_options[0]
                                      .text === ""
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
                                  tempQuestions[index].type === "fillups"
                                ) {
                                  if (
                                    tempQuestions[index].answer_options[0]
                                      .text === "" ||
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
                                    tempQuestions[index].answer_options[0]
                                      .text === "" ||
                                    tempQuestions[index].answer_options[0]
                                      .text === ""
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
                                  tempQuestions[index].type === "matching"
                                ) {
                                  console.log(
                                    tempQuestions[index].options.length
                                  );
                                  for (
                                    let i = 0;
                                    i < tempQuestions[index].options.length;
                                    i++
                                  ) {
                                    if (
                                      tempQuestions[index].options[i]
                                        .selection === "" ||
                                      tempQuestions[index].options[i].text ===
                                        ""
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
                                    tempQuestions[index].answer_options[0]
                                      .text === ""
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
                                  tempQuestions[index].type === "checkbox"
                                ) {
                                  if (
                                    tempQuestions[index].answer_options[0]
                                      .text === "" &&
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
                                } else if (
                                  tempQuestions[index].type === "dropdown"
                                ) {
                                  if (
                                    tempQuestions[index].options[0].text ===
                                      "" ||
                                    tempQuestions[index].answer_options[0]
                                      .text === ""
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
                                localStorage.setItem(
                                  "questionData",
                                  JSON.stringify(questions)
                                );
                                setStage(3);
                              }}
                              type="button"
                              className="mb-2 mr-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
                            >
                              Next
                            </button>
                          )}
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
                  );
                })}
            <div id="divbelowques"></div>
          </div>
          <div
            className="hidden h-[505px] min-h-[500px] w-64 min-w-64"
            id="preview"
          >
            {/* <MobilePreview>
              <div className="flex flex-col items-start flex-wrap max-w-[200px]">
                <div
                  id="previewQuestion"
                  className="bg-white max-w-[210px] max-h-[450px]"
                >
                  <div className="font-bold">Question:</div>
                  {questions.map((question, index) => {
                    return (
                      <div 
                      key={question.id}
                      className="flex flex-col my-3 w-full max-w-[210px]">
                        <div className="flex flex-row gap-1">
                          <span className="text-sm font-semibold mt-1">
                            Q{index + 1}.
                          </span>
                          <div
                            className="break flex-wrap break-words max-w-[170px]"
                            dangerouslySetInnerHTML={{ __html: question.title }}
                          />
                        </div>
                        {question.type == "mcq" ? (
                          <div className="flex flex-col">
                            {question.options.map((option, index) => {
                              return (
                                <div 
                                key={option.id}
                                className="flex items-center my-2">
                                  <div className="relative w-full">
                                    <input
                                      type="text"
                                      id="simple-search"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   "
                                      placeholder="Add your answer"
                                      required
                                      value={option.text}
                                      disabled
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : question.type == "fillups" ||
                          question.type == "shortanswer" ? (
                          <div className="flex flex-col">
                            <input
                              type="text"
                              placeholder="Fill the answer"
                              className="border-b border-gray-500 w-full p-2"
                            />
                          </div>
                        ) : question.type == "truefalse" ? (
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                id="true"
                                placeholder="True"
                                className="border-none border-b border-gray-500 m-2"
                              />
                              <label htmlFor="true">True</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                id="false"
                                placeholder="False"
                                className="border-none border-b border-gray-500 m-2"
                              />
                              <label htmlFor="false">False</label>
                            </div>
                          </div>
                        ) : question.type == "matching" ? (
                          <div className="flex flex-col w-full items-stretch">
                            {question.options.map((option, index) => {
                              return (
                                <div className="w-full flex h-full justify-between items-stretch">
                                  <span className="p-2 text-sm m-1 break-words break-all w-fit aspect-square bg-blue-400">
                                    {option.text}
                                  </span>
                                  <span className="p-2 text-sm m-1 break-words break-all w-fit aspect-square bg-blue-400">
                                    {option.selection}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : question.type == "checkebox" ? (
                          <div className="flex flex-col">
                            <div className="flex items-center m-2">
                              {question.options.map((option, index) => {
                                return (
                                  <div className="relative w-full flex flex-row gap-2">
                                    <input
                                      type="checkbox"
                                      id="simple-search"
                                      className="text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                                      placeholder="Add your answer"
                                      required
                                    />
                                    <label htmlFor="simple-search">
                                      {option.text}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : question.type == "dropdown" ? (
                          <div className="flex flex-col">
                            <select
                              name=""
                              id=""
                              className="bg-gray-300 m-2 p-2 text-sm rounded-lg"
                            >
                              <option value="">Select</option>
                              {question.options.map((option, index) => {
                                return (
                                  <option value={option.text}>
                                    {option.text}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        ) : question.type == "date" ? (
                          <div className="flex flex-col m-2 border border-gray-400 rounded-lg p-1">
                            <input type="date" />
                          </div>
                        ) : question.type == "email" ? (
                          <div className="flex flex-col">
                            <input type="email" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </MobilePreview> */}
          </div>
        </div>
        {/* <button className="absolute right-[-2%]">
          <ArrowBackIosIcon
            id="openButton"
            className=""
            onClick={changePreviewVisibilityToFlex}
            sx={{
              display: "inline",
              height: "50px",
              width: "50px",
              color: "#3c5ecd",
            }}
          />
        </button>
        <button className=" absolute right-[23%]">
          <ArrowForwardIosIcon
            id="closeButton"
            className=""
            onClick={changePreviewVisibilityToNone}
            sx={{
              display: "none",
              height: "50px",
              width: "50px",
              color: "#3c5ecd",
            }}
          />
        </button> */}
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
    </div>
  );
};

export default QuizQuestions;

// ++ Image upload in cover page. The buttons in cover moves according to the size of the image.
// ++ Side arrow preview button can be REDUCED
// ++ In custom  template, organiser name and upload sign  not needed but it shown
// 5.	Mark validation is not showing correctly
// ++ Report is not showing question wise correct /wrong answer

QuizQuestions.propTypes = {
  setStage: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          image: PropTypes.string,
          audio: PropTypes.string,
          video: PropTypes.string,
          id: PropTypes.number.isRequired,
          selection: PropTypes.string,
        }).isRequired
      ).isRequired,
      answer_options: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          image: PropTypes.string,
          audio: PropTypes.string,
          video: PropTypes.string,
        }).isRequired
      ).isRequired,
      timer: PropTypes.number.isRequired,
      selectedTimer: PropTypes.shape({
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      points: PropTypes.number.isRequired,
      cumpolsory: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  setQuestions: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

// export default QuizQuestions;
// ++ Drag and Drop
// 9.	Icon while selecting subjects & Category
