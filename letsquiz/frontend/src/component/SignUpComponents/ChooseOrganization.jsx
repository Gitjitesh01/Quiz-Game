import React, { useEffect } from "react";
import swal from "sweetalert";

("react");

const ChooseOrganization = ({ setOrganization, setPageNum }) => {
  const schoolImage = "/SignInImages/school.png";
  const collegeImage = "/SignInImages/college.png";

  useEffect(() => {
    setOrganization("school");
    setPageNum(3);
  }, []);

  return <></>;
};

export default ChooseOrganization;

// <div className="m-auto mt-0 flex flex-col items-center justify-center lg:h-[70vh] lg:gap-8">
//   <div className="mb-6 flex items-center text-3xl font-semibold text-gray-900   ">
//     You teach ?
//     {/* <span className='ml-1 text-cyan-400'>letsquiz</span> */}
//     {/* <span className='ml-1'>?</span> */}
//   </div>
//   <div className="mt-2 flex flex-col items-center justify-center gap-8 lg:mt-[80px] lg:h-[8vh] lg:flex-row">
//     <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white shadow">
//       <img
//         className="w-[250px] p-4 sm:h-[250px]"
//         src={schoolImage}
//         alt=""
//       />
//       <div
//         onClick={() => {
//           setOrganization("school");
//           setPageNum(3);
//         }}
//         type="button"
//         className="mt-2 rounded-xl rounded-t-none bg-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
//       >
//         School
//       </div>
//     </div>
//     <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white shadow">
//       <img
//         className="w-[250px] p-4 sm:h-[250px]"
//         src={collegeImage}
//         alt=""
//       />
//       <div
//         onClick={() => {
//           setOrganization("college");
//           setPageNum(3);
//         }}
//         type="button"
//         className="mt-2 rounded-xl rounded-t-none bg-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
//       >
//         College
//       </div>
//     </div>
//   </div>
// </div>
