import React, { useState, useMemo, useEffect } from "react";
import swal from "sweetalert";

import FlashMessage from "react-flash-message";
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
// import CreateQuizForm from "./CreateSurveyComponents/CreateQuizForm";
import CreateQuizForm from "./CreateSurveyComponents/CreateQuizForm";
import QuizQuestions from "./CreateSurveyComponents/QuizQuestions";
import { QUIZ, baseUrl } from "../../../constants/apiUrl";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const FinalizeQuiz = ({ setStage, properties , dataispatched, setQuizUrl,
  quizidwhichcomefrompatch }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // const [examMode, setExamMode] = useState(false);
  const [orgiName, setOrgiName] = useState("");
  const [quizMode, setQuizMode] = useState(1);
  // const [numAttempt, setNumAttempt] = useState(1);
  const [certificate, setCertificate] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [fontStyle, setFontStyle] = useState("");
  const [themeId, setThemeId] = useState(1);
  const [musicId, setMusicId] = useState(1);
  const [signature, setSignature] = useState("");
  const [certContent, setCertContent] = useState("");
  const { currentuserdata } = useUser();
  const [customCertificate, setCustomCertificate] = useState(null);

  const [chooseTheme, setChooseTheme] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  console.log(currentuserdata.id);
  const [showCertificateSelection, setShowCertificateSelection] =
    useState(false);




  async function saveQuiz() {
    console.log("saveQuiz");
    console.log(properties.questions.length);
    console.log(orgiName);
    console.log(quizMode);
    console.log(fontSize);
    console.log(fontStyle);
    console.log(themeId);
    console.log(musicId);

    const [quizUrl, setQuizUrl] = [properties.quizUrl, properties.setQuizUrl];

    const formData = new FormData();

    formData.append("userId", currentuserdata.id);
    formData.append("quizType", "SURVEY");
    formData.append("quizTitle", properties.title);
    formData.append("quizDescription", properties.description);
    formData.append("coverImage", properties.coverImage);
    formData.append("language", properties.language);
    // formData.append("userId", localStorage.getItem("localId"));
    formData.append("questions", JSON.stringify(properties.questions));
    formData.append("certificate", certificate);
    formData.append("customCertificate", "");
    formData.append("fontSize", fontSize);
    formData.append("fontStyle", fontStyle);
    formData.append("themeId", themeId);
    formData.append("musicId", musicId);
    formData.append("signature", signature);
    formData.append("isActive", true);
    formData.append("certContent", certContent);
    formData.append("amount", amount);
    formData.append("paymentType", paymentType);

    // Adding missing fields with correct types
    // formData.append("isActive", properties.isActive ? "true" : "false"); // Convert boolean to string
    formData.append("totalQuestions", properties.questions.length); // Convert number to string
    formData.append("createdAt", new Date().toISOString()); // Ensure it's a valid date string
    formData.append("fontClr", properties.fontClr);

    const values = {};
      for (const [key, value] of formData.entries()) {
        values[key] = value;
        if (key == "quizGrades" || key == "subject")
          values[key] = value.split(",").map((grade) => grade.trim());
      }
  
      console.log(values);
  
      console.log(formData);
  
      console.log(values)

    // Log the FormData content
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    if(dataispatched){
      const response = await axios.patch(
        `${baseUrl + QUIZ.getQuizByIdAndUpdate}/${quizidwhichcomefrompatch}`,
        
           values
        
      );
      const data = response.data;
      console.log(data.docs.questions);


      if (data.success) {
        // setSavingQuiz(false);
        // setdataofcreatedquiz(data.quiz?._id);
        swal(data.message);
        setQuizUrl(`https://letsquiz.org/attendquiz/${quizidwhichcomefrompatch}`);
        console.log(quizUrl);
        setStage(4);
        swal(data.message);
        const savequizlink = async () => {
          await axios.post(baseUrl + QUIZ.getQuizByIdAndUpdate, {
            id: data.quiz._id,
            data: { quizUrl: quizUrl },
          });
        };
        localStorage.removeItem("questionData");
        localStorage.removeItem("questions");
        forEach(data.docs.questions, (question ,index) => {
          if(localStorage.getItem(`questiontype_${index}`)){
            localStorage.removeItem(`questiontype_${index}`);
          }
        });
        // savequizlink();
      } else {
        
        swal(data.message);
      }
    }else{
       
      try {
        const response = await axios.post(baseUrl + QUIZ.createSurvey, formData);
        const data = response.data;
  
        console.log(data);
  
        if (data.success) {
          swal(data.message);
          setQuizUrl(`https://letsquiz.org/attendquiz/${data.quiz._id}`);
          setStage(4);
          localStorage.removeItem("questionData");
          localStorage.removeItem("questions");
        } else {
          swal(data.message);
        }
       
      } catch (error) {
        console.error("Request failed with status code", error.response.status);
        console.error("Error details:", error.response.data);
      }
    
    }
  }


  


  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-full min-w-[60%] flex-col gap-4 rounded-md border-2 p-4">
        <div className="flex flex-col gap-2 p-5">
          <div className="flex items-center justify-between gap-8">
            <p className="min-w-max">Font Size</p>
            <select
              id="countries"
              className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            >
              {[
                7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 30,
              ].map((item, index) => {
                return (
                  <option key={index} value={item} className=" text-black">
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center justify-between gap-8">
            <p className="min-w-max">Font Style</p>
            <select
              id="countries"
              className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
            >
              <option className=" text-black" value="Arial">
                Arial
              </option>
              <option className=" text-black" value="Bell MT">
                Bell MT
              </option>
              <option className=" text-black" value="Calibri">
                Calibri
              </option>
              <option className=" text-black" value="Grotesque">
                Grotesque
              </option>
              <option className=" text-black" value="Trebuchet MS">
                'Trebuchet MS', sans-serif
              </option>
              <option className=" text-black" value="Times New Roman">
                'Times New Roman', serif
              </option>
              <option className=" text-black" value="Garamond">
                Garamond, serif
              </option>
              <option className=" text-black" value="Brush Script MT">
                'Brush Script MT',cursive
              </option>
              <option className=" text-black" value="Courier New">
                'Courier New', monospace
              </option>
            </select>
          </div>
          {/* <div className="flex gap-2">
            <p className="min-w-max">Certificate : </p>
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="certificate"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                // checked={showCertificateSelection}
                onClick={() => {
                  setCertificate(1);
                  setShowCertificateSelection(true);
                }}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                name="certificate"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                checked={showCertificateSelection == false}
                onChange={() => {
                  setCertificate(0);
                  setShowCertificateSelection(false);
                }}
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900    "
              >
                No
              </label>
            </div>
          </div> */}

          {showCertificateSelection ? (
            <div className="flex flex-col gap-4">
              {certificate != 4 && chooseTheme ? (
                <div className="flex gap-8">
                  <p className="min-w-max">Text Content for Certificate</p>
                  <textarea
                    name=""
                    id=""
                    rows="3"
                    className="w-full rounded-md border  border-gray-400 p-1.5"
                    placeholder="This certificate is to certify that the Applicant..."
                    value={certContent}
                    onChange={(e) => {
                      setCertContent(e.target.value);
                    }}
                  ></textarea>
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-8">
                <p>Choose Certificate Template</p>
                <div className="flex flex-col gap-2">
                  {certificate != 4 && chooseTheme ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                      <div className="flex items-center">
                        <input
                          id="default-radio-1"
                          type="radio"
                          checked={certificate === 1}
                          onChange={(e) => setCertificate(1)}
                          name="certificate"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 mr-2 text-sm font-medium text-gray-900  "
                        >
                          <img
                            src="/cert1.png"
                            className="h-32 w-auto object-cover"
                          />
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="default-radio-2"
                          type="radio"
                          checked={certificate === 2}
                          onChange={(e) => setCertificate(2)}
                          name="certificate"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900    "
                        >
                          <img
                            src="/cert2.png"
                            className="h-32 w-fit object-cover"
                          />
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="default-radio-3"
                          type="radio"
                          checked={certificate === 3}
                          onChange={(e) => setCertificate(3)}
                          name="certificate"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="default-radio-3"
                          className="ml-2 text-sm font-medium text-gray-900    "
                        >
                          <img
                            src="/cert3.png"
                            className="h-32 w-fit object-cover"
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}
                  <button
                    className="rounded bg-blue-500 p-2 px-4 font-medium text-white"
                    onClick={() => {
                      setChooseTheme(true);
                      setCertificate(1);
                      setCustomCertificate(null);
                    }}
                  >
                    Choose from Themes
                  </button>
                  <div className="flex w-full items-center gap-1.5">
                    <div className="h-[1px] grow bg-black"></div>
                    <span className="">or</span>
                    <div className="h-[1px] grow bg-black"></div>
                  </div>
                  <div className="mt-2 flex flex-col items-center justify-around">
                    <input
                      id="custom-cert"
                      type="file"
                      checked={certificate === 3}
                      onChange={(e) => {
                        setCertificate(4);
                        setCustomCertificate(e.target.files[0]);
                      }}
                      name="certificate"
                      className="mb-2 hidden h-full w-fit self-center bg-gray-500"
                    />
                    {customCertificate && !chooseTheme ? (
                      <div
                        className="fixed left-1/2 top-1/2 z-50 hidden h-fit w-[80vw] -translate-x-1/2 -translate-y-1/2 shadow-lg drop-shadow-md"
                        id="certbigpreview"
                      >
                        <div className="relative w-full">
                          <img
                            src={URL.createObjectURL(customCertificate)}
                            className="mb-2 w-full object-cover"
                          />
                          <span className="absolute left-1/2 top-1/2 min-w-max -translate-x-1/2 -translate-y-1/2 text-6xl font-semibold">
                            Student's Name
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {customCertificate ? (
                      <div
                        className="relative h-fit w-fit"
                        onMouseOver={() => {
                          document
                            .getElementById("certbigpreview")
                            .classList.remove("hidden");
                        }}
                        onMouseOut={() => {
                          document
                            .getElementById("certbigpreview")
                            .classList.add("hidden");
                        }}
                      >
                        <img
                          src={URL.createObjectURL(customCertificate)}
                          className="mb-2 h-32 w-fit object-cover"
                        />
                        <span className="absolute left-1/2 top-1/2 min-w-max -translate-x-1/2 -translate-y-1/2 text-xs font-semibold">
                          Student's Name
                        </span>
                      </div>
                    ) : null}
                    {/* <label
                      htmlFor="default-radio-3"
                      className="ml-2 text-sm font-medium text-gray-900    "
                    > */}
                    <button
                      className="rounded-md bg-blue-500 px-4 py-2 text-white"
                      onClick={() => {
                        setCertificate(4);
                        setChooseTheme(false);
                        document.getElementById("custom-cert").click();
                      }}
                    >
                      Upload Custom Certificate
                    </button>
                    {/* </label> */}
                  </div>
                </div>
              </div>

              {chooseTheme ? (
                <div className="flex items-center gap-8">
                  <p className="flex flex-col gap-1">
                    Signature
                    <span className="text-xs text-gray-700">
                      PNG File Preferred
                    </span>
                  </p>

                  <div className="flex flex-col-reverse gap-2">
                    <input
                      type="file"
                      name="sign"
                      id="sign"
                      accept="image/png"
                      className="hidden"
                      onChange={(e) => {
                        setSignature(e.target.files[0]);
                      }}
                    />
                    <label
                      htmlFor="sign"
                      className="flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  "
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("sign").click();
                      }}
                    >
                      <BiFileBlank size={"22px"} color="white" />
                      <span className="ml-2">Upload Signature</span>
                    </label>

                    <div className="flex items-center justify-center">
                      <img
                        src={
                          signature
                            ? URL.createObjectURL(signature)
                            : "/sign.png"
                        }
                        className="max-h-32 w-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          <>
            {currentUser?.subscriptionType != "basic" && (
              <div className="mt-8 flex w-full flex-col">
                <label
                  htmlFor="countries"
                  className="mb-2 block text-sm font-medium text-gray-900   "
                >
                  Payment Type
                </label>
                <select
                  id="countries"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                  }}
                >
                  <option selected value="free">
                    Choose a Payment Type
                  </option>
                  <option selected={paymentType == "free"} value="free">
                    Free
                  </option>
                  <option selected={paymentType == "paid"} value="paid">
                    Paid
                  </option>
                </select>
              </div>
            )}
          </>
          <>
            {paymentType === "paid" && (
              <div className="mt-8 flex w-full flex-col">
                <label
                  htmlFor="countries"
                  className="mb-2 block text-sm font-medium text-gray-900   "
                >
                  Amount
                </label>
                <input
                  id="message"
                  rows="2"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500       dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Enter Quiz Description"
                  value={amount || 0}
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
            )}
          </>
          <div className="flex items-center justify-between gap-8">
            <p className="min-w-max">Themes</p>
            <select
              id="countries"
              className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
              value={themeId}
              onChange={(e) => setThemeId(parseInt(e.target.value))}
            >
              <option value={1} className=" text-black">
                Theme 1
              </option>
              <option value={2} className=" text-black">
                Theme 2
              </option>
              <option value={3} className=" text-black">
                Theme 3
              </option>
            </select>
          </div>
        </div>

        <div className="flex justify-around">
          <button
            onClick={() => setStage(2)}
            type="button"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Questions
          </button>
          <button
            onClick={() => {
              saveQuiz();
              setStage(4);
            }}
            type="button"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save survey
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareQuiz = ({ quizUrl, setQuizUrl }) => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow  ">
          <div className="flex items-center justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Share as :
            </h5>
            <div className="flex gap-4">
              <BiLogoGmail size={"22px"} color="gray" />
              <AiFillFacebook size={"22px"} color="gray" />
              <AiFillInstagram size={"22px"} color="gray" />
              <BsWhatsapp size={"22px"} color="gray" />
              <BsTwitter size={"22px"} color="gray" />
            </div>
          </div>
          <div className="my-4 w-[20rem] overflow-x-auto">
            <p>{quizUrl}</p>
          </div>
          <div className="flex justify-between">
            <span
              className="m-auto inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
              onClick={async () => {
                await navigator.clipboard.writeText(quizUrl);
                swal("Copied to clipboard");
              }}
            >
              Copy Link
            </span>
            {/* <a
              href="/dashboard"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  "
            >
              Back 
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};

const CreateQuiz = () => {
  const [stage, setStage] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [language, setLanguage] = useState("");
  const [quizidwhichcomefrompatch, setquizidwhichcomefrompatch] = useState("");
  const [dataispatched, setdataispatched] = useState(false);

  const [questions, setQuestions] = useState([
    {
      title: "",
      type: "null",
      options: [
        {
          text: "",
          id: 1,
          image: "",
          audio: "",
          video: "",
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
        code: 30000,
        name: "30 Seconds",
      },
      points: 4,
      cumpolsory: true,
    },
  ]);

  const url = window.location.href;

  const urlParams = new URLSearchParams(new URL(url).search);
  const quizId = urlParams.get("quizid");
  console.log(quizId);

  console.log(baseUrl + QUIZ.getQuiz + quizId);
  useMemo(() => {
    if (quizId) {
      const gettingdata = axios
        .get(baseUrl + QUIZ.getQuiz + quizId)
        .then((response) => {
          console.log(response.data.quiz);
          setquizidwhichlaredycreated(response.data.quiz._id);
          setQuestions(response.data.quiz.questions);
          setTitle(response.data.quiz.quizTitle);
          setDescription(response.data.quiz.quizDescription);
          setGrades(response.data.quiz.quizGrades);
          setSubjects(response.data.quiz.subject);
          setCoverImage(response.data.quiz.coverImage);
          setLanguage(response.data.quiz.language);
          localStorage.setItem(
            "questionData",
            JSON.stringify(response.data.quiz.questions)
          );
          
           setpachedcoverimaeg(response.data.quiz.coverImage)

          setQuestions(response.data.quiz.questions);

          setdataispatched(true);
          // setValueOfQuill(response.data.quiz.title);
        });
    }
  }, [quizId]);



  console.log(baseUrl + QUIZ.getQuiz + quizId);
  useMemo(() => {
    if (quizId) {
      const gettingdata = axios
        .get(baseUrl + QUIZ.getQuiz + quizId)
        .then((response) => {
          // console.log(response.data.quiz);
          setquizidwhichcomefrompatch(response.data.quiz._id);
          setQuestions(response.data.quiz.questions);
          setTitle(response.data.quiz.quizTitle);
          setDescription(response.data.quiz.quizDescription);
          // setGrades(response.data.quiz.quizGrades);
          // setSubjects(response.data.quiz.subject);
          setCoverImage(response.data.quiz.coverImage);
          setLanguage(response.data.quiz.language);
          console.log(response.data.quiz);
          localStorage.setItem(
            "questionData",
            JSON.stringify(response.data.quiz.questions)
          );
          setdataispatched(true);
          // setValueOfQuill(response.data.quiz.title);
        });
    }
  }, [quizId]);

  // console.log(questions);
  console.log(language)

  useEffect(() => {
    JSON.parse(localStorage.getItem("questionData")) &&
      setQuestions(JSON.parse(localStorage.getItem("questionData")));

    console.log(localStorage.getItem("questionData"));
  }, [localStorage.getItem("questionData")]);

  const [quizUrl, setQuizUrl] = useState(
    "https://letsquiz.org/attendquiz/649ebed579cd741cc7c85ff0"
  );

  console.log(questions)
  {
    switch (stage) {
      case 1:
        // code block
        return (
          <CreateQuizForm
            setStage={setStage}
            properties={{
              title,
              setTitle,
              description,
              setDescription,
              // grades,
              // setGrades,
              // subjects,
              // setSubjects,
              coverImage,
              setCoverImage,
              language,
              setLanguage,
            }}
          />
        );
        break;
      case 2:
        return (
          <QuizQuestions
            setStage={setStage}
            questions={questions}
            setQuestions={setQuestions}
          />
        );
        break;
      case 3:
        return (
          <FinalizeQuiz
            setStage={setStage}
            dataispatched={dataispatched}
            setQuizUrl={setQuizUrl}
            quizidwhichcomefrompatch={quizidwhichcomefrompatch}
            properties={{
              title,
              setTitle,
              description,
              setDescription,
              questions,
              // grades,
              // setGrades,
              // subjects,
              // setSubjects,
              coverImage,
              setCoverImage,
              language,
              setLanguage,
              quizUrl,
              setQuizUrl,
            }}
          />
        );
        break;
      case 4:
        return (
          <ShareQuiz
            setStage={setStage}
            quizUrl={quizUrl}
            setQuizUrl={setQuizUrl}
          />
        );
        break;
      // default:
      // return <CreateQuizForm setStage={setStage} />;
    }
  }

  //
};

export default CreateQuiz;
