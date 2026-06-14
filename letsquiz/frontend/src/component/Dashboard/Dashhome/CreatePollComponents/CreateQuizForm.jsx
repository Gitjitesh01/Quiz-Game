import React, { useState } from "react";
import swal from "sweetalert";

import FlashMessage from "react-flash-message";
import { Link } from "react-router-dom";

const CreateQuizForm = ({ setStage, properties }) => {
  // const relevantGrade = ["Kindergarten", "Elementary", "High School", "Secondary", "College", "Others"];
  // const relevantSubject = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Science", "Computers", "World Languages", "Geography", "History", "Social Studies", "Professional Development", "Physical Ed", "Arts", "Fun"];
  const relevantGrade = JSON.parse(localStorage.getItem("allGrades"));
  const relevantSubject = JSON.parse(localStorage.getItem("allSubjects"));

  const changeGradeColor = (id) => {
    const element = document.getElementById(id);
    console.log(element.style.background);
    if (element.style.background == "rgb(6, 182, 212)") {
      element.style.background = "";
      properties.setGrade(properties.grade.filter((item) => item !== id));
    } else {
      element.style.background = "rgb(6, 182, 212)";
      properties.setGrade([...properties.grade, id]);
    }
  };

  const changeSubjectColor = (id) => {
    const element = document.getElementById(id);
    console.log(element.style.background);
    if (element.style.background == "rgb(6, 182, 212)") {
      element.style.background = "";
      properties.setSubjects(properties.subjects.filter((item) => item !== id));
    } else {
      element.style.background = "rgb(6, 182, 212)";
      properties.setSubjects([...properties.subjects, id]);
    }
  };
  const defaultImageSrc = "/images/default-image.jpg";
  const previewPlaceholderSrc = "/imageAvatar.jpg";
  const [selectedImage, setSelectedImage] = [
    properties.coverImage,
    properties.setCoverImage,
  ];
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageUrl = file ? URL.createObjectURL(file) : null;
    setPreviewUrl(imageUrl);
  };

  return (
    <section className="flex items-center">
      <div className="m-auto flex w-fit flex-col justify-center overflow-hidden rounded-lg border border-[#1D4ED8] bg-white  dark:border-gray-600 dark:bg-gray-800">
        <span className="mb-3 bg-[#1D4ED8] pl-10 text-center text-start text-2xl font-bold text-white">
          Poll
        </span>
        <div className="flex px-4">
          {/* Left Column: Title and Description */}
          <div className="order-1 flex w-fit max-w-[300px] grow flex-col">
            {/* Title */}
            <div className="mt-4 flex items-center gap-5">
              <label
                htmlFor="title"
                className="mb-1 block w-[37%] text-sm  font-medium"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full rounded-lg border-2 border-[#1D4ED8] px-3 py-1  outline-none focus:ring-0"
                placeholder="Enter Poll Title"
                required
                value={properties.title}
                onChange={(e) => properties.setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mt-4  flex items-center gap-5">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium "
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="w-full rounded-lg border-2 border-[#1D4ED8] px-3 py-1  outline-none focus:ring-0"
                placeholder="Enter Poll Description"
                value={properties.description}
                onChange={(e) => properties.setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: Cover Image and Language */}
          <div className="order-2 ml-6 flex max-w-[300px] flex-col items-center">
            {/* Cover Image */}
            <div className="block">
              <label
                htmlFor="coverImage"
                className="mb-1 block text-sm font-medium "
              >
                Cover Image
                <img
                  src={previewUrl || previewPlaceholderSrc}
                  alt="Preview"
                  style={{ width: "250px", height: "auto", margin: "10px" }}
                  className="overflow-hidden rounded-lg"
                />
              </label>
              <input
                className="block hidden w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm  focus:outline-none"
                id="coverImage"
                type="file"
                onChange={handleImageChange}
              />
            </div>

            {/* Language Selection */}
            <div className="mt-6 flex w-full flex-col">
              <label
                htmlFor="language"
                className="mb-1 block text-sm font-medium "
              >
                Language
              </label>
              <select
                id="language"
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm  focus:border-blue-500 focus:ring-blue-500"
                value={properties.language}
                onChange={(e) => properties.setLanguage(e.target.value)}
              >
                <option selected>Choose a Language</option>
                <option value="Eng">English</option>
                <option value="tam">Tamil</option>
                <option value="hin">Hindi</option>
              </select>
            </div>

            {/* Buttons: Next and Cancel */}
            <div className="mt-6 flex h-[120px] justify-between gap-3">
              <div
                onClick={() => setStage(2)}
                className="flex h-fit cursor-pointer items-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-center text-2xl font-medium text-white duration-200 hover:scale-105"
              >
                <span className="m-auto">Next</span>
              </div>
              <Link to="/dashboard">
                <div className="flex h-fit items-center rounded-lg border border-[#1D4ED8] bg-white px-4 py-2 text-center text-lg font-medium  duration-200 hover:scale-105 hover:border-transparent hover:bg-red-500 hover:text-white">
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
