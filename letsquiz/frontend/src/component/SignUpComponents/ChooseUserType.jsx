import React, { useEffect } from "react";
import swal from "sweetalert";

("react");

const ChooseUserType = ({ setUserType, setPageNum }) => {
  const studentImage = "/SignInImages/student.png";
  const collegeImage = "/SignInImages/teacher.png";
  const businessImage = "/SignInImages/business.png";

  useEffect(() => {
    setUserType("teacher");
    setPageNum(2);
  } ,[]);

  return (
    <>
      <div className="m-auto mt-0 flex flex-col items-center justify-center gap-8 lg:h-[70vh]">
        {/* <div className="mb-6 flex items-end text-3xl font-semibold text-gray-900   ">
          How are you using
          <span className="text-cyan-400 lg:ml-1">letsquiz</span>
          <span className="lg:ml-1">?</span>
        </div>
        <div className="mt-2 flex flex-col items-center justify-center gap-8 lg:mt-[80px] lg:h-[8vh] lg:flex-row">
          <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white shadow">
            <img
              className="h-[250px] w-[250px] p-4"
              src={studentImage}
              alt=""
            />
            <div
              onClick={() => {
                setUserType("student");
                setPageNum(2);
              }}
              type="button"
              className="mt-2 rounded-xl rounded-t-none bg-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
            >
              Student
            </div>
          </div>
          <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white shadow">
            <img
              className="h-[250px] w-[250px] p-4"
              src={collegeImage}
              alt=""
            />
            <div
              onClick={() => {
                setUserType("teacher");
                setPageNum(2);
              }}
              type="button"
              className="mt-2 rounded-xl rounded-t-none bg-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
            >
              Teacher
            </div>
          </div>
          <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white shadow">
            <img
              className="h-[250px] w-[250px] p-4"
              src={businessImage}
              alt=""
            />
            <div
              onClick={() => {
                setUserType("business");
                setPageNum(2);
              }}
              type="button"
              className="mt-2 rounded-xl rounded-t-none bg-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
            >
              Business
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ChooseUserType;
