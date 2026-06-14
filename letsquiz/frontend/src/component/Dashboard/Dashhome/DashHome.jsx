import React from "react";
import swal from "sweetalert";

("react");
import { Link } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import { useState, useRef, useEffect } from "react";
import ChooseSubscription from "../../utility/chooseSubscription";

localStorage.removeItem("localId");
const DashHome = () => {
  const { currentuserdata } = useUser();
  const [viewPage, setViewPage] = useState(false);
  const currentUser = currentuserdata.id;
  const [subscription, setSubscription] = useState(
    currentUser.subscriptionType
  );

  const handleSubscription = (choice) => {
    currentUser.subscriptionType = choice;

    setSubscription(choice);
  };

  // setViewPage(isLogin ? true : false);
  const [pageNum, setPageNum] = useState(0);

  const handleViewMore = () => {
    console.log(viewPage);
    // debugger
    setViewPage(viewPage ? false : true);
  };
  useEffect(() => {
      localStorage.removeItem("questionData");
      localStorage.removeItem("questions");
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("questiontype_")) {
          localStorage.removeItem(key);
          i--;
        }
      }
  }, [])
  

  return viewPage ? (
    <ChooseSubscription
      handleViewMore={handleViewMore}
      setSubscription={handleSubscription}
      setPageNum={setPageNum}
    />
  ) : (
    <MProfile />
  );
};
let MProfile = ({ }) => {
  const createQuizImage = "/dashboardHomeImages/quizz.png";
  const createSurveyImage = "/dashboardHomeImages/survey.jpg";
  const createPollImage = "/dashboardHomeImages/handPoll.jpg";

  return (
    <div>
      <div className="m-auto flex h-[75vh] items-center justify-center gap-8">
        <Link to={"/dashboard/createquiz"}>
          <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200   bg-white shadow duration-200 hover:scale-105">
            <img
              className="h-[250px] w-[250px] p-4"
              src={createQuizImage}
              alt=""
            />
            <div
              type="button"
              className="mt-2 rounded-xl rounded-t-none  bg-blue-700 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
            >
              Create Quiz
            </div>
          </div>
        </Link>

        <Link to={"/dashboard/createsurvey"}>
          <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white  shadow duration-200 hover:scale-105">
            <img
              className="h-[250px] w-[250px] p-4"
              src={createSurveyImage}
              alt=""
            />
            <div
              onClick={() => { }}
              type="button"
              className="mt-2 rounded-xl rounded-t-none bg-blue-700  px-5 py-2.5 text-center text-lg font-medium text-white duration-200 hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
            >
              Create Survey
            </div>
          </div>
        </Link>

        <Link to={"/dashboard/createpoll"}>
          <div className=" justify- flex max-w-sm flex-col rounded-xl border border-gray-200  bg-white shadow duration-200 hover:scale-105">
            <img
              className="h-[250px] w-[250px] p-4 pb-0"
              src={createPollImage}
              alt=""
            />
            <div
              onClick={() => { }}
              type="button"
              className="mt-2 rounded-xl rounded-t-none bg-blue-700  px-5 py-2.5 text-center text-lg font-medium text-white duration-200 hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
            >
              Create Poll
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashHome;
