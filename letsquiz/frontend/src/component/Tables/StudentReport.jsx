import React, { useRef, useState, useEffect } from "react";
import swal from "sweetalert";
import html2canvas from "html2canvas";
import { AiOutlineDownload } from "react-icons/ai";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { QUIZ, baseUrl } from "../../constants/apiUrl";
import certificatelogo from "../../../public/certificatelogo.png";
import logo from "../../../public/logo.png";
import { useUser } from "../../context/userContext";
// /media/ks/My thing/letsquiz2024/frontend/public/certificatelogo.png

const StudentReport = () => {
  const [quizData, setQuizData] = useState([]);
  const [certificatedata, setCertificatedata] = useState(null);
  const [quizid_for_rating, setQuiz_id_for_rating] = useState(null);
  const { currentuserdata } = useUser();
  const [loading, setLoading] = useState(true);


  const exportToExcel = (tableId) => {
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "table.xlsx");
  };

  useEffect(() => {
    const localId = localStorage.getItem("localId");

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(baseUrl + QUIZ.QuizresponsebyUserId, {
          attenderId: localId,
        });
        setQuizData(response.data.report);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getquizbyid = async (id, firstName, lastName) => {
    try {
      const response = await axios.get(baseUrl + QUIZ.getQuiz + id);
      console.log(response.data.quiz);
      const filteruseabledata = {
        customCertificate: response.data.quiz.customCertificate,
        fontClr: response.data.quiz.fontClr,
        fontSize: response.data.quiz.fontSize,
        fontStyle: response.data.quiz.fontStyle,
        compitionname: response.data.quiz.competitionName,
        discription: response.data.quiz.discriptionofcertificate,
        signature: response.data.quiz.ownerSignature,
        signaturePosition: response.data.quiz.postiononcertificate,
        customlogo: response.data.quiz.customlogo,
        firstName,
        lastName,
      };
      setCertificatedata(filteruseabledata);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const [rating, setRating] = useState(0);

  const give_rating = async () => {
    console.log("quizid_for_rating", quizid_for_rating, QUIZ.giveRating);
    try {
      const response = await axios.post(
        baseUrl + QUIZ.giveRating + "/" + quizid_for_rating,
        {
          userId: currentuserdata.id,
          rating: rating,
        }
      );
      console.log(response.data);
      swal({
        title: "Thank you for giving rating",
        icon: "success",
      });
      setQuiz_id_for_rating(null);
      setRating(0);
    } catch (error) {
      console.error("Error giving rating:", error);
    }
  };

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Sorting logic
  const sortedData = [...quizData].sort((a, b) => {
    if (!sortField) return 0; // Return original order if no sorting is applied

    const valA = sortField === "id" ? a.quizid : a?.quizAttend[0]?.quizTitle || "";
    const valB = sortField === "id" ? b.quizid : b?.quizAttend[0]?.quizTitle || "";

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="relative flex flex-col items-center justify-center overflow-x-auto sm:rounded-lg">
      <h1 className="m-5 text-3xl font-semibold text-[#1D4ED8]">
        Individual Quiz Reports
      </h1>
      <div className="overflow-auto">
        <table
          id="studentReport"
          className="w-full min-w-[70vw] overflow-hidden rounded-2xl border-2 border-blue-500 text-left text-sm text-gray-500"
        >
          <thead className="bg-gray-50 text-xs uppercase text-blue-500">
            <tr>
              <th
                scope="col"
                className="cursor-pointer px-4 py-3"
                onClick={() => handleSort("id")}
              >
                Id {sortField === "id" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3"
                onClick={() => handleSort("name")}
              >
                Quiz Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th scope="col" className="px-6 py-3">
                Points Scored
              </th>
              <th scope="col" className="px-6 py-3">
                Questions Attempted
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Certificate
              </th>
              <th scope="col" className="px-6 py-3">
                Click to Attend
              </th>
            </tr>
          </thead>

          {loading ? (
            <div className="flex justify-center py-10 text-lg text-gray-500">
              Loading....
            </div>
          ) : sortedData.length ? (
            <tbody className="text-md font-body">
              {sortedData.map((quiz, index) => {
                const isGradeEmpty =
                  Array.isArray(quiz?.quizAttend[0]?.quizGrades) &&
                  quiz?.quizAttend[0]?.quizGrades.length === 0;

                return !isGradeEmpty ? (
                  <tr
                    key={index}
                    className="border-b bg-white transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-center">{quiz.quizid}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-blue-500">
                      {quiz?.quizAttend[0]?.quizTitle || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {quiz?.quizAttend[0]?.points || 0}/
                      {quiz?.quizAttend[0]?.totalPoints || 0}
                    </td>
                    <td className="px-6 py-4">
                      {quiz?.quizAttend[0]?.NumQuesAttended || 0}
                    </td>
                    <td
                      className={`px-6 py-4 ${quiz?.quizAttend[0]?.isPass
                          ? "text-green-500"
                          : "text-red-500"
                        }`}
                    >
                      {quiz?.quizAttend[0]?.isPass ? "Passed" : "Failed"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="whitespace-nowrap rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        Give Rating
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {quiz?.quizAttend[0]?.isPass &&
                        quiz.quizAttend[0]?.certificate ? (
                        <button
                          className="whitespace-nowrap rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 flex"
                        >
                          Get Certificate
                        </button>
                      ) : (
                        <span className="text-gray-400">No Certificate</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`https://letsquiz.org/attendquiz/${quiz?.quizid}`}>
                        <button className="whitespace-nowrap rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                          Attend Again
                        </button>
                      </Link>
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          ) : (
            <div className="flex justify-center py-10 text-lg text-gray-500">
              NO QUIZ ATTENDED
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

const GetCertificate = ({ data, setCertificatedata }) => {
  const captureRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState({});
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [localCompetitionName, setLocalCompetitionName] = useState("");
  const [localDescriptionOfCertificate, setLocalDescriptionOfCertificate] =
    useState("");
  const [positionOnCertificate, setPositionOnCertificate] = useState("");
  const [signaturee, setsignature] = useState("");
  const [descriptionOfCertificate, updateDescriptionOfCertificate] =
    useState("");

  const {
    customCertificate,
    fontClr,
    fontSize,
    fontStyle,
    compitionname,
    discription,
    signature,
    signaturePosition,
    customlogo,
    firstName,
    lastName,
  } = data;

  useEffect(() => {
    setLocalCompetitionName(compitionname);
    setLocalDescriptionOfCertificate(discription);
    setPositionOnCertificate(signaturePosition);
    setsignature(signature);
    updateDescriptionOfCertificate(discription);
  }, [compitionname, discription, signature, signaturePosition]);

  useEffect(() => {
    if (data.fontStyle !== undefined) {
      setStyle(data.fontStyle);
    }
    if (data.fontSize !== 0) {
      setSize(data.fontSize);
    }
    if (data.fontClr !== undefined) {
      setColor(data.fontClr);
    }
  }, [data.fontSize, data.fontStyle, data.fontClr]);

  // Ensure all resources (fonts, images) are loaded before capturing
  const loadFontsAndImages = () => {
    const fontPromise = document.fonts.ready;
    const imagePromises = [...document.images].map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = resolve;
        })
    );
    return Promise.all([fontPromise, ...imagePromises]);
  };

  const getCanvas = async () => {
    setLoading(true);
    try {
      await loadFontsAndImages(); // Wait until fonts and images are loaded
      handleCaptureImage();
    } catch (error) {
      console.error("Error loading fonts/images: ", error);
      setLoading(false);
    }
  };

  const handleCaptureImage = async () => {
    const element = captureRef.current;
    if (!element) return;

    const copiedElement = element.cloneNode(true);
    copiedElement.style.position = "fixed";
    copiedElement.style.right = "100%";
    copiedElement.style.height = "auto";
    copiedElement.style.backgroundColor = "white"; // Ensure background is white

    document.body.append(copiedElement);

    try {
      const canvas = await html2canvas(copiedElement);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "certificate.png";
      link.click();
    } catch (error) {
      console.error("Error capturing image:", error);
    } finally {
      copiedElement.remove();
      setLoading(false);
      setCertificatedata(null);
    }
  };

  console.log(customlogo);

  return (
    data && (
      <div className="!fixed top-20 rounded-2xl bg-zinc-200 px-4">
        <div className="h-1/2 w-[650px] rounded-3xl relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-white font-bold"
            onClick={() => { setCertificatedata(null) }}
          >
            X
          </button>

          <div className="flex justify-center">
            <div className="flex flex-col items-center bg-transparent">
              <h1 className="text-3xl font-bold">Certificate</h1>
              <div
                ref={captureRef}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  position: "relative",
                  width: "650px",
                  height: "70vh",
                  overflow: "hidden",
                }}
              >
                <img
                  src={customlogo == null ? customlogo : logo}
                  alt="Logo"
                  style={{
                    width: "130px",
                    top: "18px",
                    height: "fit-content",
                    objectFit: "contain",
                    position: "absolute",
                  }}
                />
                <h1 className="absolute top-[35%] text-[14px] font-semibold text-black">
                  This certificate is proudly presented to...
                </h1>
                <h1 className="absolute top-[22%] text-[20px] font-semibold text-black">
                  {localCompetitionName && localCompetitionName.toUpperCase()}
                </h1>
                <h2 className="absolute top-[45%] font-['Allura'] text-3xl font-medium">
                  {firstName} {lastName}
                </h2>
                <p
                  className="absolute top-[55%] h-fit w-[60%] resize-none bg-transparent text-center text-sm outline-none"
                  value={descriptionOfCertificate}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateDescriptionOfCertificate(value);
                  }}
                >
                  {descriptionOfCertificate}
                </p>
                <div className="flex justify-between ">
                  <span className="absolute left-10 top-[70%] flex w-[100px] flex-col items-center">
                    <img
                      src={signaturee}
                      className="h-[40px] w-[80px]"
                      alt="Signature"
                    />
                    <div className="w-full rounded-3xl border-t border-black" />
                    <h5 className="text-base font-semibold">
                      {positionOnCertificate}
                    </h5>
                  </span>
                  <span className="absolute left-[73%] top-[72%] flex w-[100px] flex-col items-center">
                    <div className="mb-2 w-[80px]">
                      {new Date().toLocaleDateString({
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="w-full rounded-3xl border-t border-black" />
                    <h5 className="text-base font-semibold">Date</h5>
                  </span>
                </div>
                <img
                  src={certificatelogo}
                  alt="Certificate Logo"
                  className="absolute left-1/2 top-[80%] h-auto w-[60px] -translate-x-1/2"
                />
                <img
                  src={data.customCertificate}
                  alt="Certificate Template"
                  className="h-auto w-[650px] rounded-lg shadow-md"
                />
              </div>
              <h4 className="text-lg font-semibold">
                has successfully completed the quiz
              </h4>
              <button
                className="mb-2 rounded-xl bg-[#1D4ED8] px-4 py-1 font-semibold text-white"
                onClick={getCanvas}
              >
                {loading ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  );
};

export default StudentReport;

//<div
//ref={captureRef}
//className="relative w-[650px] h-[70vh] rounded-3xl border-2 overflow-hidden"
//>
//{/* Student name placed on top of the certificate using absolute positioning */}
//<h1
//  style={{
//    color: data.fontClr,
//    fontSize: `${data.fontSize}px`,
//    fontWeight: `Dancing Script`,
//    position: "absolute",
//    top: `${data.studentnamecoordination?.y}px`,
//    left: `${data.studentnamecoordination?.x}px`,
//    zIndex: 10, // Ensure text is above the image
//  }}
//>
//  {data.firstName} {data.lastName}
//</h1>
//{/* Certificate image */}
//<img
//  src={data.customCertificate}
//  className="w-full h-full object-fill absolute top-0 left-0"
//  alt="certificate"
///>
//</div>
