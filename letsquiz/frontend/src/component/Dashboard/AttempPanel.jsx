import React from "react";
import { Link } from "react-router-dom";
import { QUIZ, baseUrl, baseUrl1 } from "../../constants/apiUrl";

import PropTypes from 'prop-types';

const AttempPanel = ({ item, setshow_update_panel }) => {
  console.log(item);



  const avarage_rating = item?.avarage_rating || 0;

  return (
    <div className="fixed z-50 ml-[10vw] h-[30vw] w-[60vw] rounded-2xl border-2 border-[#3B82F6] bg-white overflow-hidden">
      <div className="items-between flex h-full w-full">
        <div className="h-full w-[50%] flex flex-col pl-10 pt-10 text-start">
          <img
            className="outline-none shadow-none h-[40%] w-3/4 rounded-lg border-none ring-0 object-cover"
            src={
              baseUrl1 + `/uploads/coverimage/` + item?.coverImage || "default-image.jpg"
            }
            alt="Example"
          />
    
          <h1 className="text-start mt-3 text-[#3B82F6] text-lg">Title : {item?.quizTitle}</h1>
          <p className="text-start mt-3 text-[#3B82F6] text-sm">
            Description : {item?.quizDescription === "" ? "No Description" : item?.quizDescription}
          </p>
        </div>

        <div className="h-full w-[50%] flex pt-10 items-center justify-center gap-20 flex-col">
          <div className="flex gap-3 h-fit">
            <span>Rating ({item?.rating.length})</span>  {[...Array(5)].map((_, index) => {
              return (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill={index < avarage_rating ? "#3B82F6" : "#E5E7EB"}
                >
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                </svg>
              );
            })}
          </div>
          <div className="flex gap-3">
            <Link
              className="bg-[#3B82F6] text-white hover:text-white rounded-lg px-5 py-2 border-2 border-[#3B82F6]"
              to={`/attendquiz/${item?._id}`}
            >
              Attempt Quiz
            </Link>
            <button 
              className="text-[#3B82F6] bg-white hover:bg-white border-2 border-[#3B82F6] rounded-lg px-5 py-2"
              onClick={() => setshow_update_panel(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttempPanel;
