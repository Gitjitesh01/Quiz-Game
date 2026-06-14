import React, { useState } from "react";
import swal from "sweetalert";

import FlashMessage from "react-flash-message";
import { Link } from "react-router-dom";

const CreateQuizForm = ({ setStage, properties }) => {
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
      <div className="m-auto overflow-hidden flex w-fit flex-col justify-center rounded-2xl border border-[#1D4ED8] bg-white  dark:border-gray-600 dark:bg-gray-800">
        <span  className="mb-3  text-start pl-4 text-white text-2xl font-bold bg-[#1D4ED8]">
          Survey
        </span>
        <div className="flex px-5">
          <div className="order-1 flex w-fit max-w-[300px]  grow flex-col">
            {/* title */}
            <div className="flex gap-5 items-center  mt-5">
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium w-[37%] "
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full rounded-lg border-2 border-[#1D4ED8] px-3 py-1  outline-none focus:ring-0 "
                placeholder="Enter Survey Title"
                required
                value={properties.title}
                onChange={(e) => properties.setTitle(e.target.value)}
              />
            </div>
            {/* desc */}
            <div className="mt-4 flex gap-5 items-center justify-start">
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium "
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full rounded-lg border-2 border-[#1D4ED8] px-3 py-1  outline-none focus:ring-0"
                placeholder="Enter Survey Description"
                value={properties.description}
                onChange={(e) => properties.setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="order-2 ml-6 flex max-w-[300px] flex-col items-center ">
            <div className="block">
              <label
                htmlFor="large_size"
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
                className="block hidden w-full cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 text-sm  focus:outline-none "
                id="large_size"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="mt-6 flex w-full flex-col ">
              <label
                htmlFor="countries"
                className="mb-1 block text-sm font-medium "
              >
                Language
              </label>
              <select
                id="countries"
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm  focus:border-blue-500 focus:ring-blue-500"
                value={properties.language}
                onChange={(e) => {
                  properties.setLanguage(e.target.value)
                  

                }}
              >
                <option selected>Choose a Language</option>
                <option value="Eng">English</option>
                <option value="tam">Tamil</option>
                <option value="hin">Hindi</option>
              </select>
            </div>
            <div className="mt-6 flex h-[120px] justify-between gap-3 ">
              <button
                onClick={() => setStage(2)}
                type="submit"
                className=" flex  h-fit cursor-pointer items-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-center text-2xl font-medium text-white duration-200 hover:scale-105"
              >
                <span className="m-auto">Next</span>
              </button>
              <Link to="/dashboard">
                <div className=" flex  h-fit items-center rounded-lg border border-[#1D4ED8] bg-white px-4 py-2 text-center text-lg font-medium text-[#1D4ED8] duration-200 hover:scale-105 hover:border-transparent hover:bg-red-500 hover:text-white">
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
