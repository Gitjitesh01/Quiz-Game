import React, { useEffect, useMemo, useState } from "react";
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
import CreateQuizForm from "./CreatePollComponents/CreateQuizForm";
import QuizQuestions from "./CreatePollComponents/QuizQuestions";
// import QuizQuestions from "./CreatePollcomponents/QuizQuestions";
import { useUser } from "../../../context/userContext";
import { QUIZ, USER, baseUrl } from "../../../constants/apiUrl";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const FinalizeQuiz = ({ setStage, properties ,quizidwhichcomefrompatch  , dataispatched }) => {
  const {currentuserdata} = useUser();
  const currentUser = currentuserdata;
  const [examMode, setExamMode] = useState(false);
  const [orgiName, setOrgiName] = useState("");
  console.log(currentuserdata)
  const [quizMode, setQuizMode] = useState(1);
  const [numAttempt, setNumAttempt] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [fontStyle, setFontStyle] = useState("");
  const [themeId, setThemeId] = useState(1);
  const [musicId, setMusicId] = useState(1);
  const [signature, setSignature] = useState("");
  const [certContent, setCertContent] = useState("");

  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);

  const [showCertificateSelection, setShowCertificateSelection] =
    useState(false);


  async function saveQuiz() {
    console.log("saveQuiz");
    console.log("finalquiz", properties);
    console.log(orgiName);
    console.log(quizMode);
    console.log(fontSize);
    console.log(fontStyle);
    console.log(themeId);
    console.log(musicId);

    const [quizUrl, setQuizUrl] = [properties.quizUrl, properties.setQuizUrl];

    const formData = new FormData();

    formData.append("quizType", "POLL");
    formData.append("quizTitle", properties.title);
    formData.append("quizDescription", properties.description);
    formData.append("coverImage", properties.coverImage);
    formData.append("language", properties.language);
    // formData.append("quizGrades", properties.grades);
    // formData.append("subject", properties.subjects);
    formData.append("questions", JSON.stringify(properties.questions));
    formData.append("examMode", examMode);
    formData.append("orgiName", orgiName);
    // formData.append("quizMode", quizMode);
    formData.append("userId" , currentuserdata.id);
    formData.append("fontSize", fontSize);
    formData.append("attemptlimit" , false)
    formData.append("fontStyle", fontStyle);
    formData.append("themeId", themeId);
    formData.append("musicId", musicId);
    formData.append("amount", amount);
    formData.append("paymentType", paymentType);
    // formData.append("totalPoint", properties.questions.reduce((a, b) => a + b.points, 0));
    // formData.append("totalCredit", 100);
    // formData.append("signature", signature);

    const values = {};
    for (const [key, value] of formData.entries()) {
      values[key] = value;
      if (key == "quizGrades" || key == "subject")
        values[key] = value.split(",").map((grade) => grade.trim());
    }

    console.log(values);

    console.log(formData);

    console.log(values)



    if (dataispatched) {
      const response = await axios.patch(
        `${baseUrl + QUIZ.getQuizByIdAndUpdate}/${quizidwhichcomefrompatch}`,
        
           values
        
      );
      const data = response.data;
      console.log(data.docs.questions);

      if (data.success) {
        setSavingQuiz(false);
        setdataofcreatedquiz(data.quiz?._id);
        swal(data.message);
        setQuizUrl(`https://letsquiz.org/attendquiz/${quizidwhichcomefrompatch}`);
        setStage(4);
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
        setSavingQuiz(false);
        swal(data.message);
      }
    } else {
      const response = await fetch(baseUrl + QUIZ.createPoll, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      console.log(data);
  
      if (data.success) {
        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          button: "OK",
        });
        setQuizUrl(`https://letsquiz.org/attendpoll/${data.quiz._id}`);
        setStage(4);
        localStorage.removeItem("questionData");
    localStorage.removeItem("questions");
      } else {
        swal(data.message);
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
                  <option value={item} className=" text-black">
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
          <>
            {currentUser?.subscriptionType != "basic" && (
              <div className="mt-8 flex w-full flex-col">
                <label
                  htmlFor="countries"
                  className="mb-2 block text-sm font-medium text-gray-900   "
                >
                  Quiz Type
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
            Save Poll
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareQuiz = ({ quizUrl, setQuizUrl ,quizidwhichcomefrompatch }) => {
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

const CreatePoll = () => {
  const [stage, setStage] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [language, setLanguage] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [dataispatched, setdataispatched] = useState(false);
  const [quizidwhichcomefrompatch, setquizidwhichlaredycreated] = useState("");

  const [questions, setQuestions] = useState([
    {
      title: "",
      type: "mcq",
      options: [
        {
          text: "",
          id: 1,
          vote: 0,
          // image: "",
          // audio: "",
          // video: "",
          // selection: ""
        },
      ],
      answers: {},
      // timer: "",
      // selectedTimer: {
      //     code: 12000,
      //     name: "12 Seconds",
      // },
      // points: 4,
      // cumpolsory: true,
    },
  ]);

  const [quizUrl, setQuizUrl] = useState(
    "https://letsquiz.org/attendpoll/649ebed579cd741cc7c85ff0"
  );


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

  console.log(questions);

  useEffect(() => {
    JSON.parse(localStorage.getItem("questionData")) &&
    setQuestions(JSON.parse(localStorage.getItem("questionData")));

    console.log(localStorage.getItem("questionData"));
  }, [localStorage.getItem("questionData")]);


  const [params, setParams] = useSearchParams();
  
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


 useEffect(() => {
  if(quizidwhichcomefrompatch){
    setQuizUrl(`https://letsquiz.org/attendpoll/${quizidwhichcomefrompatch}`);
  }

  }, [quizidwhichcomefrompatch])


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
              coverImage,
              setCoverImage,
              language,
              setLanguage,
              questionType,
              setQuestionType,
              setQuestions,
              questions,
            }}
          />
        );
        break;
      case 2:
        return (
          <QuizQuestions
            setStage={setStage}
            questions={questions}
            type={questionType}
            setQuestions={setQuestions}
          />
        );
        break;
      case 3:
        return (
          <FinalizeQuiz
            setStage={setStage}
            setQuestions={setQuestions}
            dataispatched={dataispatched}
            quizidwhichcomefrompatch={quizidwhichcomefrompatch}
            properties={{
              title,
              setTitle,
              description,
              setDescription,
              questions,
              coverImage,
              setCoverImage,
              language,
              setLanguage,
              questionType,
              setQuestionType,
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
            quizidwhichcomefrompatch={quizidwhichcomefrompatch}
            quizUrl={quizUrl}
            setQuizUrl={setQuizUrl}
          />
        );
        break;
      default:
        return <CreateQuizForm setStage={setStage} />;
    }
  }

  //
};

export default CreatePoll;
