import React, { useEffect, useState, useMemo } from "react";
import swal from "sweetalert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import CaptureComponent from "./CreateQuizComponents/CaptureComponent.jsx";
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
import CreateQuizForm from "./CreateQuizComponents/CreateQuizForm";
import QuizQuestions from "./CreateQuizComponents/QuizQuestions";
import { RiLoader4Fill } from "react-icons/ri";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { QUIZ, baseUrl, baseUrl1 } from "../../../../constants/apiUrl";
import { useUser } from "../../../../context/userContext";
import axios from "axios";
import { data } from "autoprefixer";

import certificate1 from "../../../../../public/greenwithdata.png";
import certificate2 from "../../../../../public/cert2.png";
import certificate3 from "../../../../../public/redwithdata.png";
import certificate4 from "../../../../../public/part4.png";
import certificate1withnocontent from "../../../../../public/aprt1.png";
import certificate4withnocontent from "../../../../../public/blackwithdata.png";
import certificate2withnocontent from "../../../../../public/certificate2withnoconatent.png";
import certificate3withnocontent from "../../../../../public/part2.png";
import html2canvas from "html2canvas";
import { forEach } from "lodash";

const FinalizeQuiz = ({
  setStage,
  properties,
  dataispatched,
  quizidwhichcomefrompatch,
  setQuestions,
}) => {
  const { currentuserdata } = useUser();
  const currentUser = currentuserdata;
  const [examMode, setExamMode] = useState(false);
  const [orgiName, setOrgiName] = useState("");
  const [quizMode, setQuizMode] = useState(1);
  const [numAttempt, setNumAttempt] = useState(1);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [timeline, settimeline] = useState(false);
  const [attemplimit, setattemptlimit] = useState(true);
  const [certificate, setCertificate] = useState(0);
  const [customCertificate, setCustomCertificate] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  const [fontStyle, setFontStyle] = useState("");
  const [fontcolor, setFontColor] = useState("");
  const [themeId, setThemeId] = useState(1);
  const [musicId, setMusicId] = useState(1);
  const [signature, setSignature] = useState("");
  const [certContent, setCertContent] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [customlogo, setcustomlogo] = useState();
  const [showimgeditor, setShowimgeditor] = useState(false);
  const [postiononcertificate, setpostiononcertificate] = useState("");
  const [discriptionofcertificate, setdiscriptionofcertificate] = useState("");
  const [competitionName, setcompetitionName] = useState("");
  const [ownersignature, setownersignature] = useState();
  const [customdesign, setcustomdesign] = useState(false);
  const [certificatetempimage, setCertificatetempimage] = useState(null);
  const [amount, setAmount] = useState(0);
  const [accesstype, setaccesstype] = useState("public");
  const [finitlimit, setfinitlimit] = useState(true);
  const [dataofcreatedquiz, setdataofcreatedquiz] = useState();
  console.log(typeof startdate);
  console.log(currentuserdata);

  useEffect(() => {
    if (localStorage.getItem("questionData")) {
      try {
        const parsedQuestions = JSON.parse(localStorage.getItem("questionData"));
        if (Array.isArray(parsedQuestions)) {
          setQuestions(parsedQuestions);
        }
      } catch (error) {
        console.error("Error parsing questions from localStorage:", error);
        // Fallback to default question structure if parsing fails
        setQuestions([{
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
          timer: 30000,
          selectedTimer: {
            code: 30000,
            name: "30 Seconds",
          },
          points: 4,
          cumpolsory: true,
        }]);
      }
    }
  }, [localStorage.getItem("questionData")]);

  const localId = currentuserdata?.id;
  console.log(currentuserdata);

  console.log(customCertificate);
  console.log(fontStyle);

  const [showCertificateSelection, setShowCertificateSelection] =
    useState(false);
  console.log(
    `${baseUrl + QUIZ.getQuizByIdAndUpdate}/${quizidwhichcomefrompatch}`
  );

  useEffect(() => {
    if(localStorage.getItem("questionData")){
      localStorage.setItem("questions" , localStorage.getItem("questionData"))
    }
  }, [localStorage.getItem("questionData")]);

  const [savingQuiz, setSavingQuiz] = useState(false);
  console.log(properties.grades.map((grade) => grade));

  // console.log(`/public/certificate2withnoconatent.png`.slice(0,8));

  async function saveQuiz() {
    // Check if any value is null or empty
    if (
      // !orgiName ||
      // !quizMode ||
      // !numAttempt ||
      // // !certificate ||
      // !themeId ||
      // // !musicId ||
      // // !signature ||
      // // !certContent ||
      !paymentType
    ) {
      swal({
        title: "Please fill all the fields",
        text: "All fields are required to proceed.",
        icon: "info", // Use the 'info' icon for informational messages
        confirmButtonText: "Okay", // Button text
      });
      return;
    } else if (timeline && (startdate == "" || enddate == "")) {
      swal("please enter the timing");
      return;
    } else if (timeline && startdate > enddate) {
      swal("Start date should be less than end date");
      return;
    } else if (paymentType === "paid" && amount === 0) {
      swal("Please enter the amount");
      return;
    }

    setSavingQuiz(true);
    // console.log("saveQuiz");
    // console.log(properties);
    // console.log(orgiName);
    // console.log(quizMode);
    // console.log(fontSize);
    // console.log(fontStyle);
    // console.log(themeId);

    // console.log(musicId);

    const [quizUrl, setQuizUrl] = [properties.quizUrl, properties.setQuizUrl];

    const formData = new FormData();

    // images, audios from questions into array in formData
    // properties.questions.forEach((question, index) => {
    //   if (question.image) {
    //     formData.append(`questionImage${index}`, question.image);
    //   }
    //   if (question.audio) {
    //     formData.append(`questionAudio${index}`, question.audio);
    //   }
    // });
    
    formData.append("quizType", "QUIZ");
    formData.append("quizTitle", properties.title);
    formData.append("quizDescription", properties.description);
    formData.append("coverImage", properties.coverImage);
    formData.append("language", properties.language);
    formData.append("userId", currentuserdata.id);
    formData.append("fontClr", fontcolor);
    formData.append(
      "quizGrades",
      JSON.stringify(properties.grades.map((grade) => grade))
    );
    formData.append(
      "subject",
      JSON.stringify(properties.subjects.map((subject) => subject))
    );
    
    const questionsData = JSON.parse(localStorage.getItem("questionData"));
    if (questionsData) {
      formData.append("questions", JSON.stringify(questionsData));
    }else{
      formData.append("questions", JSON.stringify(properties.questions));
    }
    formData.append("examMode", examMode);
    formData.append("accesstype", accesstype);
    formData.append("orgiName", orgiName);
    formData.append("competitionName", competitionName);
    formData.append("postiononcertificate", postiononcertificate);
    formData.append("discriptionofcertificate", discriptionofcertificate);
    formData.append("ownerSignature", ownersignature);
    formData.append("attemptlimit", attemplimit);
    formData.append("customlogo", customlogo);
    formData.append("quizMode", quizMode);
    formData.append("numAttempt", numAttempt);
    formData.append("attemptlimiter", attemplimit);
    formData.append("certificate", certificate);
    formData.append("timeline", timeline);
    if (timeline == true) {
      formData.append("startdate", startdate);
      formData.append("enddate", enddate);
    }
    formData.append("customCertificate", customCertificate);
    formData.append("fontSize", fontSize);
    formData.append("fontStyle", fontStyle);
    formData.append("themeId", themeId);
    formData.append("musicId", musicId);
    if(localStorage.getItem("questionData")){
      formData.append(
        "totalPoint",
        JSON.parse(localStorage.getItem("questionData")).reduce((a, b) => a + b.points, 0)
      );
    }
    formData.append("totalCredit", 100);
    formData.append("signature", signature);
    formData.append("certContent", certContent);
    formData.append("paymentType", paymentType);
    formData.append("amount", amount);
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
      const response = await fetch(baseUrl + QUIZ.createQuiz, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setSavingQuiz(false);
        setdataofcreatedquiz(data.quiz._id);
        swal(data.message);
        setQuizUrl(`https://letsquiz.org/attendquiz/${data.quiz._id}`);
        setStage(4);
        const savequizlink = async () => {
          const response = await axios.post(
            baseUrl + QUIZ.getQuizByIdAndUpdate,
            {
              id: data.quiz._id,
              data: { quizUrl: quizUrl },
            }
          );
        };
        localStorage.removeItem("questionData");
        savequizlink();
      } else {
        setSavingQuiz(false);
        swal("Err->", data.message);
      }
    }
  }

  // useEffect(() => {
  //   if(customCertificate ){
  //     setShowimgeditor(true);
  //   } else {
  //     setShowimgeditor(false);
  //   }
  // }, [customCertificate]);

  console.log(dataofcreatedquiz);

  const [chooseTheme, setChooseTheme] = useState(false);
  const [ceritificatefontcoluor, setCeritificatefontcolor] =
    useState("text-black");
  const [CeritificateFontSize, setCeritificateFontSize] = useState("18");
  const [CeritificateFontBoldness, setCeritificateFontBoldness] =
    useState("light");
  const [fontitalice, setfontitalice] = useState(false);

  return (
    <div className="flex h-[80vh] flex-col items-center  gap-2 overflow-y-auto">
      <div className="min-w-1/2 flex flex-col gap-4 rounded-md border-2 p-4">
        {showCertificateSelection && showimgeditor && certificatetempimage && (
          <CaptureComponent
            certificatetempimage={certificatetempimage}
            setorgiName={setOrgiName}
            ownersignature={ownersignature}
            setcustomlogo={setcustomlogo}
            setpostiononcertificate={setpostiononcertificate}
            customdesign={customdesign}
            setdiscriptionofcertificate={setdiscriptionofcertificate}
            setcompetitionName={setcompetitionName}
            setownersignature={setownersignature}
            setShowimgeditor={setShowimgeditor}
            customlogo={customlogo}
            setCustomCertificate={setCustomCertificate}
            postiononcertificate={postiononcertificate}
            discriptionofcertificate={discriptionofcertificate}
            competitionName={competitionName}
          />
        )}

        <div className="flex w-fit items-start justify-start gap-14">
          <div className="flex  flex-col gap-3">
            <div className="flex gap-4 *:rounded-xl *:border-2 *:border-zinc-500 *:p-4">
              <div className="flex items-center justify-center gap-2">
                <p className="w-[100px]">Exam Mode : </p>
                <>
                  <div className="flex items-center justify-center ">
                    <input
                      id="default-radio-1"
                      type="radio"
                      name="exam-mode"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      checked={examMode}
                      onChange={() => setExamMode(!examMode)}
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-sm font-medium text-gray-900    "
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex flex-col items-center justify-center"></div>

                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      name="exam-mode"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      checked={!examMode}
                      onChange={() => setExamMode(!examMode)}
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-sm font-medium text-gray-900    "
                    >
                      No
                    </label>
                  </div>
                </>
              </div>
              <div className="flex items-center justify-center gap-2">
                <p className="w-[50px]">Video : </p>
                <>
                  <div className="flex items-center">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="video"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-sm font-medium text-gray-900    "
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="video"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-sm font-medium text-gray-900    "
                    >
                      No
                    </label>
                  </div>
                </>
              </div>
            </div>
            <button
              onClick={() => settimeline(!timeline)}
              type="button"
              className="mb-2 flex items-center justify-center gap-3 rounded-lg bg-[#1D4ED8]   py-2.5  text-lg font-medium  text-white  focus:outline-none focus:ring-0 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M7 1V3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H10.7546C9.65672 19.6304 9 17.8919 9 16C9 11.5817 12.5817 8 17 8C18.8919 8 20.6304 8.65672 22 9.75463V4C22 3.44772 21.5523 3 21 3H17V1H15V3H9V1H7ZM23 16C23 19.3137 20.3137 22 17 22C13.6863 22 11 19.3137 11 16C11 12.6863 13.6863 10 17 10C20.3137 10 23 12.6863 23 16ZM16 12V16.4142L18.2929 18.7071L19.7071 17.2929L18 15.5858V12H16Z"></path>
              </svg>
              <span>Schedule quiz</span>
            </button>

            {timeline && (
              <div>
                <input
                  type="datetime-local"
                  id="quizsatarttime"
                  value={startdate}
                  onChange={(e) => setstartdate(e.target.value)}
                  name="quizstarttime"
                />

                <input
                  type="datetime-local"
                  id="enddate"
                  value={enddate}
                  onChange={(e) => setenddate(e.target.value)}
                  name="enddate"
                />
              </div>
            )}

            <div
              className={`  flex w-fit  items-center  gap-4  rounded-lg pt-4   `}
            >
              <p className="min-w-max  ">Attempts Limits </p>
              <label htmlFor="attemp_limit">
                <input
                  type="checkbox"
                  id="attemp_limit"
                  defaultChecked={attemplimit}
                  className=" peer sr-only w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900   focus:border-blue-500  focus:ring-blue-500"
                  placeholder="No.of.attempts"
                  required
                  value={numAttempt}
                  onChange={() => {
                    setattemptlimit(() => !attemplimit);
                  }}
                />
                <div class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute  after:start-[2px]  after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] focus:ring-0 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
            <div
              className={`  flex items-center justify-between gap-4  overflow-hidden duration-200 ${
                attemplimit ? "h-20" : "h-0"
              } `}
            >
              <p className="min-w-max">No. of. attempts</p>
              <input
                type="text"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                placeholder="No.of.attempts"
                required
                value={numAttempt}
                onChange={(e) => setNumAttempt(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <p className="min-w-max">Certificate : </p>
              <div className="flex items-center">
                <input
                  id="default-certificatebutton"
                  type="radio"
                  value=""
                  name="certificate"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  // checked={showCertificateSelection}
                  onChange={() => {
                    setCertificate(1);
                    setShowCertificateSelection(true);
                  }}
                />

                <label
                  htmlFor="default-certificatebutton"
                  className="ml-2 text-sm font-medium text-gray-900"
                  type="radio"
                  value=""
                  name="certificate"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-certificatebutton"
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
                  htmlFor="default-certificatebutton"
                  className="ml-2 text-sm font-medium text-gray-900    "
                >
                  No
                </label>
              </div>
            </div>

            {showCertificateSelection ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-600 p-4">
                <div className="flex items-center justify-between  gap-8 ">
                  <div className="flex flex-col gap-2 ">
                    {certificate != 4 && chooseTheme ? (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                        <div className="flex items-center">
                          <input
                            id="default-certificate-1"
                            type="radio"
                            checked={certificate === 1}
                            onClick={(e) => {
                              setCertificate(1);
                              setShowimgeditor(true);
                              setCertificatetempimage(
                                certificate1withnocontent
                              );
                            }}
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                          <label
                            htmlFor="default-certificate-1"
                            className="ml-2 mr-2 text-sm font-medium text-gray-900  "
                          >
                            <img
                              src={certificate1}
                              id="firstcirftificate"
                              className="h-32 w-auto object-cover"
                            />
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="default-certificate-2"
                            type="radio"
                            checked={certificate === 2}
                            onClick={(e) => {
                              setCertificate(2);
                              setShowimgeditor(true);
                              setcustomdesign(false);
                              setCertificatetempimage(
                                certificate2withnocontent
                              );
                            }}
                            name="certificate"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                          <label
                            htmlFor="default-certificate-2"
                            className="ml-2 text-sm font-medium text-gray-900    "
                          >
                            <img
                              src={certificate2}
                              className="h-32 w-fit object-cover"
                            />
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="default-certificate-3"
                            type="radio"
                            checked={certificate === 2}
                            onClick={(e) => {
                              setCertificate(2);
                              setShowimgeditor(true);
                              setcustomdesign(false);
                              setCertificatetempimage(certificate4);
                            }}
                            name="certificate"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                          <label
                            htmlFor="default-certificate-3"
                            className="ml-2 text-sm font-medium text-gray-900    "
                          >
                            <img
                              src={certificate4withnocontent}
                              className="h-32 w-fit object-cover"
                            />
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="default-certificate-4"
                            type="radio"
                            checked={certificate === 3}
                            onChange={(e) => {
                              setCertificate(3);
                              setShowimgeditor(true);

                              setCertificatetempimage(
                                certificate3withnocontent
                              );
                              setcustomdesign(false);
                            }}
                            name="certificate"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                          <label
                            htmlFor="default-certificate-4"
                            className="ml-2 text-sm font-medium text-gray-900    "
                          >
                            <img
                              src={certificate3}
                              className="h-32 w-fit object-cover"
                            />
                          </label>
                        </div>
                      </div>
                    ) : null}
                    <button
                      className="rounded bg-[#1D4ED8] p-2 px-4 font-medium text-white"
                      onClick={() => {
                        setChooseTheme(true);
                        setCertificate(1);
                        setcustomdesign(false);
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
                          setShowimgeditor(true);
                          setCertificatetempimage(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                        name="certificate"
                        className="mb-2 hidden h-full w-fit self-center bg-gray-500"
                      />
                      {/* {customCertificate && !chooseTheme ? (
                    <div
                      className="fixed left-1/2 top-1/2 z-50 hidden h-fit w-[80vw] -translate-x-1/2 -translate-y-1/2 shadow-lg drop-shadow-md"
                      id="certbigpreview"
                    >
                      <div className="relative w-full">
                        <img
                          src={URL.createObjectURL(customCertificate)}
                          className="mb-2 w-full object-cover"
                        />
                        <span
                          className={` absolute left-1/2 top-1/2 min-w-max -translate-x-1/2 -translate-y-1/2 ${ceritificatefontcoluor} ${
                            fontitalice && "italic"
                          } ${CeritificateFontBoldness} text-[${CeritificateFontSize}px]  `}
                        >
                          <p>Student's Name</p>
                        </span>
                      </div>
                    </div>
                  ) : null} */}

                      {/* {customCertificate ? (
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
                      <span
                        className={` absolute left-1/2 top-1/2 min-w-max -translate-x-1/2 -translate-y-1/2 ${ceritificatefontcoluor} ${
                          fontitalice && "italic"
                        } ${CeritificateFontBoldness} text-[${CeritificateFontSize}px]  `}
                      >
                        <p>Student's Name</p>
                      </span>
                    </div>
                  ) : null} */}
                      {/* <label
                      htmlFor="default-radio-3"
                      className="ml-2 text-sm font-medium text-gray-900    "
                    > */}
                      <div className="flex justify-between  gap-6">
                        <button
                          className="flex gap-3 rounded-md bg-[#1D4ED8] px-4 py-2  text-white"
                          onClick={() => {
                            setCertificate(4);
                            setChooseTheme(false);
                            document.getElementById("custom-cert").click();
                            setcustomdesign(true);
                          }}
                        >
                          <span>Upload Certificate </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                          >
                            <path d="M12 12.5858L16.2426 16.8284L14.8284 18.2426L13 16.415V22H11V16.413L9.17157 18.2426L7.75736 16.8284L12 12.5858ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"></path>
                          </svg>
                        </button>
                        {certificatetempimage ? (
                          <button
                            className="flex w-[9rem] items-center justify-center gap-3 rounded-lg bg-[#1D4ED8] p-2 px-4 text-white"
                            onClick={() => setShowimgeditor(true)}
                          >
                            <span className="w-[100px]">Edit Details </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="currentColor"
                            >
                              <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
                            </svg>
                          </button>
                        ) : null}
                      </div>
                      {/* </label> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex w-[20vw]  flex-col">
            <div className="flex w-full flex-col">
              <label
                htmlFor="countries"
                className="mb-2 block text-sm font-medium text-gray-900   "
              >
                Aceess
              </label>
              <select
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                onChange={(e) => {
                  setaccesstype(e.target.value);
                }}
              >
                <option selected value="free">
                  Choose a Access Type
                </option>
                <option selected={accesstype == "public"} value="public">
                  Public
                </option>
                <option selected={accesstype == "private"} value="private">
                  Private
                </option>
              </select>
            </div>
            <>
              {currentUser.subscriptionType != "basic" ? (
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
              ) : (
                <div className="mt-8 flex w-full  flex-col">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm  font-medium text-gray-900   "
                  >
                    Payment Type
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500  "
                    onChange={(e) => {
                      setPaymentType(e.target.value);
                    }}
                  >
                    <option selected={paymentType == "No"} value="free">
                      Choose a Payment Type
                    </option>
                    <option selected={paymentType == "free"} value="free">
                      Free
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
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-8">
                <p className="min-w-max">Quiz Mode</p>
                <select
                  id="countries"
                  className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  value={quizMode}
                  onChange={(e) => setQuizMode(parseInt(e.target.value))}
                >
                  <option value={1} className=" text-black" selected>
                    Classics
                  </option>
                  <option value={2} className=" text-black">
                    Fun
                  </option>
                  <option value={3} className=" text-black">
                    live
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-8">
                <p className="min-w-max">Themes</p>
                <select
                  id="countries"
                  className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  value={themeId}
                  onChange={(e) => setThemeId(parseInt(e.target.value))}
                >
                  <option value={1} className=" text-black">
                    kids Theme
                  </option>
                  <option value={2} className=" text-black">
                    teenage Theme
                  </option>
                  <option value={3} className=" text-black">
                    professional Theme
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-8">
                <p>Music</p>
                <select
                  id="countries"
                  className="my-2 block w-[10rem] w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  value={musicId}
                  onChange={(e) => setMusicId(parseInt(e.target.value))}
                >
                  <option value={1} className=" text-black">
                    1
                  </option>
                  <option value={2} className=" text-black">
                    2
                  </option>
                  <option value={3} className=" text-black">
                    3
                  </option>
                  <option value={4} className=" text-black">
                    4
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStage(2)}
            type="button"
            className="mb-2 ml-6 mr-2 flex items-center justify-center gap-3 rounded-lg bg-[#1D4ED8] px-7 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
            </svg>
            <span>Edit Questions</span>
          </button>
          <button
            onClick={() => {
              saveQuiz();
            }}
            type="button"
            className="mb-2 mr-2 flex items-center gap-2 rounded-lg bg-[#1D4ED8] px-16 py-4   font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#1D4ED8] dark:focus:ring-blue-800"
          >
            {savingQuiz ? (
              <RiLoader4Fill
                className="animate-spin "
                size={"18px"}
                color="white"
              />
            ) : null}
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareQuiz = ({ quizUrl, setQuizUrl }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(quizUrl);
      swal("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

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
          <div className="courser-pointer flex justify-between">
            <span
              className="m-auto inline-flex items-center rounded-lg bg-[#1D4ED8] px-3 py-2 text-center text-sm font-medium text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
              onClick={copyToClipboard}
            >
              <button
                // onClick={savequizlink}
                className="courser-pointer"
              >
                Copy Link
              </button>
            </span>
            {/* <a
              href="/dashboard"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#1D4ED8] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  "
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
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [language, setLanguage] = useState("");
  const [dataispatched, setdataispatched] = useState(false);
  const [quizidwhichcomefrompatch, setquizidwhichlaredycreated] = useState("");
  const [pachedcoverimage ,setpachedcoverimaeg] = useState(null)

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
      timer: 30000,
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

  console.log(questions);

  useEffect(() => {
    if (localStorage.getItem("questionData")) {
      try {
        const parsedQuestions = JSON.parse(localStorage.getItem("questionData"));
        if (Array.isArray(parsedQuestions)) {
          setQuestions(parsedQuestions);
        }
      } catch (error) {
        console.error("Error parsing questions from localStorage:", error);
        // Fallback to default question structure if parsing fails
        setQuestions([{
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
          timer: 30000,
          selectedTimer: {
            code: 30000,
            name: "30 Seconds",
          },
          points: 4,
          cumpolsory: true,
        }]);
      }
    }
  }, [localStorage.getItem("questionData")]);
  const [params, setParams] = useSearchParams();

  async function fetchQuiz(id) {
    const response = await fetch(`${baseUrl}/quiz/quiz/${id}`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const quiz = data.quiz;
      setTitle(quiz.quizTitle);
      setDescription(quiz.quizDescription);
      setGrades(quiz.quizGrades);
      setSubjects(quiz.subject);
      setCoverImage(quiz.coverImage);
      setLanguage(quiz.language);
      setQuestions(quiz.questions);
    } else {
      swal("Err->", data.message);
    }
  }

  useEffect(() => {
    const editQuizId = params.get("quizid");
    if (editQuizId !== null && editQuizId !== "") {
      fetchQuiz(editQuizId);
    }
  }, []);

  const [quizUrl, setQuizUrl] = useState(
    `${baseUrl1}/attendQuiz/649ebed579cd741cc7c85ff0`
  );

  {
    switch (stage) {
      case 1:
        // code block
        return (
          <CreateQuizForm
            setStage={setStage}
            pachedcoverimage={pachedcoverimage}
            properties={{
              title,
              setTitle,
              description,
              setDescription,
              grades,
              setGrades,
              subjects,
              setSubjects,
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
            stage={stage}
            title={title}
            questions={questions}
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
              grades,
              setGrades,
              subjects,
              setSubjects,
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
      default:
        return <CreateQuizForm setStage={setStage} />;
    }
  }

  //
};

export default CreateQuiz;
