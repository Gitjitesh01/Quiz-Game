/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

const QuizQuestions = ({ setStage, questions, setQuestions, type  }) => {
  const [valueOfQuill, setValueOfQuill] = useState("");
  // const questionList = [
  //   {
  //     "_id": "666c9be39f6919a569606ca7",
  //     "name": "MULTIPLE CHOICE",
  //     "value": "mcq",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606ca8",
  //     "name": "TRUE OR FALSE",
  //     "value": "truefalse",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606ca9",
  //     "name": "SHORT ANSWER",
  //     "value": "shortanswer",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606caa",
  //     "name": "FILL UPS",
  //     "value": "fillups",
  //     "isActive": false,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606cab",
  //     "name": "DATE",
  //     "value": "date",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606cac",
  //     "name": "MATCHING",
  //     "value": "matching",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606cad",
  //     "name": "CHECK BOX",
  //     "value": "checkbox",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606cae",
  //     "name": "DROP DOWN",
  //     "value": "dropdown",
  //     "isActive": true,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "666c9be39f6919a569606caf",
  //     "name": "WORDCLOUD",
  //     "value": "wordcloud",
  //     "isActive": true,
  //     "__v": 0
  //   }
  // ]
  ;
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

  useEffect(() => {
    console.log("Ques", questions);
  }, [questions]);

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



  const [questionTypeVal, setquestionTypeVal] = useState("test");
  // useEffect(()=>{
  //     // handleQuestionTypeChange()
  // }, [questionTypeVal, mcq])

  // const handleQuestionTypeChange = (e) => {
  //     const questionTypeValTemp = document.getElementById('question-type').value;
  //     setquestionTypeVal(questionTypeValTemp);
  //     console.log(questionTypeVal)
  // }

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

  useEffect(() => {
    console.log(questions)
  }, [questions])

  useEffect(() => {
    localStorage.getItem("questionData") == null ||
    localStorage.getItem("questionData") == undefined
      ? localStorage.setItem("questionData", JSON.stringify(questions))
      : null;
  });

  return (
    <>
      <div className="flex flex-wrap justify-around m-auto h-[80vh] items-center  scale-95">
        <div className="flex flex-col ">
          {questions?.map((question, index) => {
            return (
              <div
                id="questionBox"
                className="flex col-span-9 flex-wrap flex-col items-center border-[#1D4ED8] border-2  rounded-xl h-fit scale-90 -mt-10"
              >
                <div className="bg-[#1D4ED8] p-[10px] text-white font-semibold w-full flex items-center justify-center rounded-lg rounded-b-none">
                  <span>Questions {index +1}</span>
                </div>
                <div className="flex flex-col gap-4 p-4 w-full border-2 bg-white rounded-b-xl">
                  <div className="w-full flex  items-baseline gap-4 min-h-[150px]">
                    <div className="">
                     
                       <div className="w-full">
                          <Editor
                            questions={questions}
                            index={index}
                            setQuestions={setQuestions}
                            // questionList={questionList}
                          />
                        </div>
                    </div>
                 
                  </div>

                  {/* Second Section */}
                  <div>
                    {/* {getObjectValue(questionType, question.type)} */}
                    <QuestionSection
                      type={type}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  </div>

                  <div className="flex gap-4 justify-between">
                 
                    <div className="flex items-center gap-4">
                      <AiOutlineDelete
                        size="22px"
                        onClick={() => {
                          let tempQuestions = [...questions];
                          tempQuestions.splice(index, 1);
                          setQuestions(tempQuestions);
                        }}
                      />
                      {/* <TbSection size="22px" />
                      <BiFileBlank size="22px" />
                      <HiOutlineEllipsisVertical size="22px" /> */}
                    </div>
                  </div>
                </div>
                <div className="flex justify-around mt-3">
                  {questions.length < 5 ? (
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => {
                          let tempQuestions = [...questions];
                          if (tempQuestions[index].title === "") {
                              alert("Please fill the previous question")
                              return;
                          }
                          
                
                        setQuestions((questions) => {
                          
                          return [
                            ...questions,
                            {
                              title: "",
                              type: type,
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
                              timer: "",
                              selectedTimer: {
                                code: 12000,
                                name: "12 Seconds",
                              },
                              points: 4,
                              cumpolsory: true,
                            },
                          ];
                        });
                      }}
                    >
                      Add Questions
                    </button>
                  ) : (
                    ""
                  )}
                  {/* <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Add Section
                        </button> */}
                           <button
                    onClick={() => {
                      let tempQuestions = [...questions];
                      tempQuestions.splice(index, 1);
                      setQuestions(tempQuestions);
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      if (questions[index].title === "") {
                          alert("Please fill the previous question")
                          return;
                      }
                      setStage(3)
                  }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Next
                  </button>
               
                </div>
              </div>
            );
          })}
          <div
            className="hidden w-64 min-w-64 min-h-[500px] h-[505px]"
            id="preview"
          >
            <MobilePreview>
              <div className="flex flex-col items-start flex-wrap max-w-[200px]">
                <div
                  id="previewQuestion"
                  className="bg-white max-w-[210px] max-h-[450px] overflow-y-auto"
                >
                  <div className="font-bold">Question:</div>
                  <div
                    className="break flex-wrap break-words max-w-[210px]"
                    dangerouslySetInnerHTML={{
                      __html: questions.map((question, index) => {
                        return question.title;
                      }),
                    }}
                  />
                </div>
              </div>
            </MobilePreview>
          </div>
        </div>
        <button className="absolute right-[-2%]">
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
        </button>
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

export default QuizQuestions;
