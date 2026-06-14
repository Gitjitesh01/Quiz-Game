import React, { useEffect } from "react";
import swal from "sweetalert";

import { Route, Routes } from "react-router-dom";
import CreatePoll from "./Dashhome/CreatePoll";
import CreateQuiz from "./Dashhome/CreateQuiz/CreateQuiz";
import CreateSurvey from "./Dashhome/CreateSurvey";
import DashHome from "./Dashhome/DashHome";
import DashNav from "./DashNav";
import Explore from "./Explore";
import Reports from "./Reports";
import Settings from "./Settings";
import Cancelationpage from "./Cancelationpage";
import Profile from "./Profile";
import MyLibrary from "./MyLibrary";
import Dashboard from "../Admin";
import StudentReport from "../Tables/StudentReport";
import TeacherReport from "../Tables/TeacherReport";
import English from "./English";
import ChooseSubscription from "../../component/utility/chooseSubscription"
import Payments from "../../component/utility/Payments.jsx" 
import Support from "../../component/utility/Support.jsx"
import ExploreQuiz from "./ExploreQuiz";

const MainBoard = ({ userType, userName }) => {
  // url path
  const path = window.location.pathname;
  console.log(userType);

  useEffect(() => {
    console.log("PATH", path);
    console.log(path.startsWith("/dashboard/createquiz"));
  }, [path]);

  return (
    <div
      className={`relative flex flex-1 flex-col overflow-y-auto`}
    >
      <DashNav userName={userName} />
      <div className="p-4 md:pt-2  2xl:p-10">
        {userType === "admin" ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teachers" element={<Dashboard />} />
            <Route path="/students" element={<Dashboard />} />

            <Route path="/reports" element={<Reports userType="teacher" />} />
          </Routes>
        ) : userType === "teacher" ? (
          <Routes>
            <Route
              path="/"
              element={userType === "teacher" ? <DashHome /> : <div></div>}
            />
            <Route path="/createquiz" element={<CreateQuiz />} />
            <Route
              path="/choosesubscription"
              element={<ChooseSubscription />}
            />
            <Route
              path="/choosesubscription"
              element={<ChooseSubscription />}
            />
            <Route path="/support" element={<Support />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/createsurvey" element={<CreateSurvey />} />
            <Route path="/createpoll" element={<CreatePoll />} />
            <Route path="/English" element={<English />} />
            <Route path="/Physics" element={<English />} />
            <Route path="/Chemistry" element={<English />} />
            <Route path="/Biology" element={<English />} />
            <Route path="/Science" element={<English />} />
            <Route path="/Computers" element={<English />} />
            <Route path="/Geography" element={<English />} />
            <Route path="/History" element={<English />} />
            <Route path="/Arts" element={<English />} />
            <Route path="/Fun" element={<English />} />
            <Route path="/WorldLanguages" element={<English />} />
            <Route path="/SocialStudies" element={<English />} />
            <Route path="/ProfessionalDevelopment" element={<English />} />
            <Route path="/PhysicalEd" element={<English />} />
            <Route path="/bioscience" element={<English />} />
            <Route path="/explorequiz/:id" element={<ExploreQuiz />} />

            <Route path="/library" element={<MyLibrary />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/quizattended" element={<StudentReport />} />
            <Route path="/myreports" element={<TeacherReport />} />
            <Route path="/classes" element={<h1>Classes</h1>} />

            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile userName={userName} />} />
          </Routes>
        ) : userType === "student" ? (
          <Routes>
            <Route
              path="/"
              element={userType === "student" ? <DashHome /> : <div></div>}
            />
            <Route
              path="/choosesubscription"
              element={<ChooseSubscription />}
            />

            <Route path="/createquiz" element={<CreateQuiz />} />
            <Route path="/createsurvey" element={<CreateSurvey />} />
            <Route path="/createpoll" element={<CreatePoll />} />
            <Route path="/library" element={<MyLibrary />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/English" element={<English />} />
            <Route path="/Physics" element={<English />} />
            <Route path="/Chemistry" element={<English />} />
            <Route path="/Biology" element={<English />} />
            <Route path="/Science" element={<English />} />
            <Route path="/Computers" element={<English />} />
            <Route path="/Geography" element={<English />} />
            <Route path="/History" element={<English />} />
            <Route path="/Arts" element={<English />} />
            <Route path="/Fun" element={<English />} />
            <Route path="/explorequiz/:id" element={<ExploreQuiz />} />
            <Route path="/quizattended" element={<StudentReport />} />
            <Route path="/myreports" element={<TeacherReport />} />
            <Route path="/classes" element={<h1>Classes</h1>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cancelsubscription" element={<Cancelationpage />} />
            <Route path="/profile" element={<Profile userName={userName} />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={userType === "business" ? <DashHome /> : <div></div>}
            />
            <Route path="/createquiz" element={<CreateQuiz />} />
            <Route path="/createsurvey" element={<CreateSurvey />} />
            <Route
              path="/choosesubscription"
              element={<ChooseSubscription />}
            />
            <Route path="/createpoll" element={<CreatePoll />} />
            <Route path="/English" element={<Explore />} />

            <Route path="/library" element={<MyLibrary />} />
            <Route path="/explore" element={<Explore />} />

            <Route
              path="/quizattended"
              element={<StudentReport userType={userType} />}
            />
            <Route
              path="/myreports"
              element={<TeacherReport userType={userType} />}
            />
            <Route path="/classes" element={<h1>Classes</h1>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile userName={userName} />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default MainBoard;
