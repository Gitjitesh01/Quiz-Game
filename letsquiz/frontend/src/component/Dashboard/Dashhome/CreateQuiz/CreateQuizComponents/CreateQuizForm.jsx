import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { baseUrl, baseUrl1, QUIZ } from "../../../../../constants/apiUrl";

import { Link } from "react-router-dom";
import axios from "axios";

const CreateQuizForm = ({ setStage, properties, pachedcoverimage }) => {
  const [relevantGrade, setRelevantGrade] = useState([]);
  const [relevantSubject, setRelevantSubject] = useState([]);

  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  const toggleGradeDropdown = () => setIsGradeDropdownOpen(!isGradeDropdownOpen);
  const toggleSubjectDropdown = () =>
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);

  const handleGradeCheckboxChange = (value) => {
    changeGradeColor(value);

    setTimeout(() => {
      if (properties.grades.length === 3) {
        setIsGradeDropdownOpen(false);
      } else {
        setIsGradeDropdownOpen(true);
      }
    }, 0);
  };



  const handleSubjectCheckboxChange = (value) => {
    changeSubjectColor(value);
    setTimeout(() => {
      if (properties.subjects.length === 3) {
        setIsSubjectDropdownOpen(false);
      } else {
        setIsSubjectDropdownOpen(true);
      }
    }, 0);
  };

  useEffect(() => {
    if (properties.subjects.length === 3) {
      setIsSubjectDropdownOpen(false);
    }
  }, [properties.subjects]);
  useEffect(() => {
    if (properties.grades.length === 3) {
      setIsGradeDropdownOpen(false);
    }
  }, [properties.grades]);






  useEffect(() => {
    //get grade
    axios.get(baseUrl + QUIZ.getAllGrades).then((res) => {
      setRelevantGrade(res.data.grade);
      if (res.data) {
        const names = res.data.data;
        setRelevantGrade(names);
      }
    });
    //get subject
    axios.get(baseUrl + QUIZ.getAllSubjects).then((res) => {
      if (res.data) {
        const names = res.data.data;
        setRelevantSubject(names);
      }
    });
  }, []);

  const changeGradeColor = (id) => {
    if (properties.grades.includes(id)) {
      const updatedGrades = properties.grades.filter((item) => item !== id);
      properties.setGrades(updatedGrades);
    } else {
      const updatedGrades = [...properties.grades, id];
      properties.setGrades(updatedGrades);
    }
  };



  const changeSubjectColor = (id) => {
    if (properties.subjects.includes(id)) {
      properties.setSubjects(properties.subjects.filter((item) => item !== id));
    } else {
      properties.setSubjects([...properties.subjects, id]);
    }
  };

  useEffect(() => {
    if (properties.subjects.length === 3) {
      setIsSubjectDropdownOpen(false); // Close the dropdown when the length reaches 3
    }
  }, [properties.subjects]); // Dependency on properties.subjects



  const defaultImageSrc = "/images/default-image.jpg";
  const previewPlaceholderSrc = "/imageAvatar.jpg";
  const [selectedImage, setSelectedImage] = [
    properties.coverImage,
    properties.setCoverImage,
  ];
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        swal("Image size should be less than 1MB");
        event.target.value = null;
        return;
      }
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      localStorage.setItem("selectedImage", imageUrl);
    }
  };

  return (
    <section className="-pb-16 flex  w-full scale-90 flex-col  items-center justify-center  duration-200">
      <div className="flex  flex-col justify-center  rounded-[24px]   duration-200">
        <div className="w-full rounded-t-[24px] bg-[#1D4ED8] px-6 py-3 text-2xl font-bold text-white">
          Quiz
        </div>
        <div className="flex  justify-center  rounded-b-[24px]    border-2 border-[#1D4ED8] duration-200">
          <div className="flex  w-fit flex-col flex-wrap justify-center rounded-[24px]   px-6 duration-200 ">
            <div className="flex w-[500px] flex-col  items-start ">
              <div className="order-1 flex flex-col">
                <div className="mt-11 grid grid-cols-2">
                  <label
                    htmlFor="title"
                    className="flex items-center  justify-start text-sm font-semibold"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="-ml-32 mt-1 block w-[300px] rounded-lg border border-[#1D4ED8] bg-transparent p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]"

                    placeholder="Enter Quiz Title"
                    required
                    value={properties.title}
                    onChange={(e) => properties.setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-5 grid  grid-cols-2">
                  <label
                    htmlFor="message"
                    className="flex items-center  justify-start text-sm font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="-ml-32 mt-1 block h-[100px] w-[300px] rounded-lg border border-[#1D4ED8] bg-transparent p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]"

                    placeholder="Enter Quiz Description"
                    value={properties.description}
                    onChange={(e) => properties.setDescription(e.target.value)}
                  />
                </div>
                {/* DROPDOWNS */}
                <div className="flex">
                  {/* Grade Dropdown */}
                  <div className="mt-5 w-[250px]">
                    <div className="block text-sm font-semibold">
                      Select Relevant Grade <span className="text-xs">(max 3)</span>
                    </div>
                    <div className="my-3 flex flex-col gap-y-1 text-sm">
                      <div className="h-[50px] relative">
                        {properties.grades.length >= 3 ? (
                          <div>You’ve reached your limit</div>
                        ) : (
                          <div
                            className="flex items-center mb-4 h-10 w-full max-w-[200px] rounded-lg border-2 border-[#1D4ED8] bg-white px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]"

                            onClick={toggleGradeDropdown}
                          >
                            {isGradeDropdownOpen ? "Close" : "Select a Grade"}
                            {isGradeDropdownOpen && (
                              <div className="absolute left-0 top-full z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                {relevantGrade &&
                                  relevantGrade.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center px-4 py-1 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => handleGradeCheckboxChange(item.value)}
                                    >
                                      <input
                                        type="checkbox"
                                        id={item.value}
                                        className="mr-2"
                                        value={item.value}
                                        checked={properties.grades.includes(item.value)}
                                        onChange={() => handleGradeCheckboxChange(item.value)}
                                      />
                                      <span>{item.name}</span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex h-[110px] flex-col items-start gap-2">
                        {relevantGrade &&
                          relevantGrade.map(
                            (item, index) =>
                              item.isActive && (
                                <span
                                  className={`ml-3 flex h-fit min-w-max cursor-pointer items-center rounded-full border border-cyan-600 px-2 py-1 font-bold hover:bg-slate-300 ${properties.grades.includes(item.value)
                                    ? "bg-[#1D4ED8] text-white"
                                    : "hidden"
                                    }`}
                                  key={index}
                                  id={item.value}
                                  onClick={async () => await changeGradeColor(item.value)}
                                >
                                  {item.name}
                                  <span className="ml-3 text-base">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="18"
                                      height="18"
                                      fill="currentColor"
                                    >
                                      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                    </svg>
                                  </span>
                                </span>
                              )
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="mt-1 pb-4">
                    <div className="mt-4 block text-sm font-semibold">
                      Select Relevant Subjects <span className="text-xs">(max 3)</span>
                    </div>
                    <div className="my-6 mt-3 flex w-full max-w-[400px] flex-col text-sm">
                      <div className="h-[50px] relative">
                        {properties.subjects.length >= 3 ? (
                          <div>You’ve reached your limit</div>
                        ) : (
                          <div
                            className="flex items-center mb-4 h-10 w-full max-w-[200px] rounded-lg border-2 border-[#1D4ED8] bg-white px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]"

                            onClick={toggleSubjectDropdown}
                          >
                            {isSubjectDropdownOpen ? "Close" : "Select a Subject"}
                            {isSubjectDropdownOpen && (
                              <div className="absolute left-0 top-full z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                {relevantSubject &&
                                  relevantSubject.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center px-4 py-1 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => handleSubjectCheckboxChange(item.value)}
                                    >
                                      <input
                                        type="checkbox"
                                        id={item.value}
                                        className="mr-2"
                                        value={item.value}
                                        checked={properties.subjects.includes(item.value)}
                                        onChange={() => handleSubjectCheckboxChange(item.value)}
                                      />
                                      <span>{item.name}</span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex h-[110px] w-[250px] flex-col gap-2 overflow-auto">
                        {relevantSubject &&
                          relevantSubject.map(
                            (item, index) =>
                              item.isActive &&
                              properties.subjects.includes(item.value) && (
                                <span
                                  className="flex h-fit w-fit cursor-pointer items-center rounded-full border border-cyan-600 bg-[#1D4ED8] px-2 py-1 text-center text-sm font-bold text-white duration-200 hover:bg-slate-300"
                                  key={index}
                                  id={item.value}
                                  onClick={() => changeSubjectColor(item.value)}
                                >
                                  {item.name}
                                  <span className="ml-3 text-base">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="18"
                                      height="18"
                                      fill="currentColor"
                                    >
                                      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                    </svg>
                                  </span>
                                </span>
                              )
                          )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="order-2 mt-12 flex flex-col items-center">
            <div className="block">
              <label
                for="large_size"
                className="-ml-12 flex flex-col gap-3  text-sm font-semibold "
              >
                Cover Image
                {/* {console.log(baseUrl1 +`/uploads/`  + pachedcoverimage)} */}
                <img
                  src={
                    localStorage.getItem("selectedImage")
                      ? localStorage.getItem("selectedImage")
                      : previewUrl
                        ? previewUrl
                        : pachedcoverimage
                          ? `${baseUrl1}/uploads/${pachedcoverimage}`
                          : previewPlaceholderSrc
                  }
                  alt="Preview"
                  className="overflow-hidden  object-cover duration-200 hover:brightness-75 "
                  style={{
                    width: "200px",
                    height: "120px",
                  }}
                />
              </label>
              <input
                className="hidden w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-lg text-gray-900"
                id="large_size"
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </div>

            <div className="ml-7 mt-[50px] w-full ">
              <label
                htmlFor="countries"
                className="block text-sm font-medium font-semibold "
              >
                Language
              </label>
              <select
                id="countries"
                className="mb-4  mt-3 h-10 w-full max-w-[200px] rounded-lg border-2 border-[#1D4ED8] bg-white  focus:outline-none"
                onChange={(e) => properties.setLanguage(e.target.value)}
              >
                <option value="">Choose a Language</option>
                <option value="Eng" selected={properties.language === "Eng"}>
                  English
                </option>
                <option value="tam" selected={properties.language === "tam"}>
                  Tamil
                </option>
                <option value="hin" selected={properties.language === "hin"}>
                  Hindi
                </option>
              </select>
            </div>

            <div className="m-5 flex justify-around">
              <div
                onClick={() => {
                  if (
                    properties.title === "" ||
                    properties.grades.length === 0 ||
                    properties.subjects.length === 0 ||
                    properties.language === ""
                    // ||
                    // (previewUrl === null ^ pachedcoverimage != null)
                  ) {
                    swal({
                      title: "Please fill all the fields",
                      text: (() => {
                        if (properties.title === "") {
                          return "Title is required";
                        } else if (properties.grades.length === 0) {
                          return "Grade is required";
                        } else if (properties.subjects.length === 0) {
                          return "Subject is required";
                        } else if (properties.language === "") {
                          return "Language is required";
                        }
                        // else if (previewUrl === null ^ pachedcoverimage != null) {
                        //   return "Cover Image is required";
                        // }
                      })(),
                      icon: "info",
                      confirmButtonText: "Okay",
                    });
                  } else {
                    setStage(2);
                  }
                }}
                className="m-4 flex h-fit cursor-pointer items-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-center text-2xl font-medium text-white duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#93C5FD]"

              >
                <span className="">Next</span>
              </div>
              <Link
                onClick={() => { localStorage.removeItem("questionData"), localStorage.removeItem("selectedImage") }}
                to="/dashboard"
              >
                <div
                  className="m-4 flex h-fit items-center rounded-lg border border-[#1D4ED8] bg-white px-4 py-2 text-center text-lg font-medium text-[#1D4ED8] duration-200 hover:scale-105 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#93C5FD] focus:border-transparent focus:bg-blue-500 focus:text-white"

                >
                  <span className="m-auto">Cancel</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateQuizForm;
