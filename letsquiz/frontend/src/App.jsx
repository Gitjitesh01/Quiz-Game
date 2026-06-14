import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./spa_pages/HomePage";
import LoginPage from "./spa_pages/LoginPage";
import Dashboard from "./spa_pages/Dashboard";
import SignupPage from "./spa_pages/SignupPage";
import AttendQuizPage from "./spa_pages/AttendQuizPage";
import Admin from "./spa_pages/Admin";
import ForgotPass from "./spa_pages/ForgotPass";
import PayoutPolicy from "./component/tremsadnconditions/PayoutPolicy";
import AttendPollPage from "./spa_pages/AttendPollPage";
import PrivacyPolicy from "./component/tremsadnconditions/PrivacyPolicy";
import PollGraph from "./component/Dashboard/Dashhome/CreatePollComponents/pollGraph";
import RefundAndCancellationPolicy from "./component/tremsadnconditions/RefundAndCancellationPolicy ";
import WordCloud from "./component/Dashboard/Dashhome/CreatePollComponents/WordCloud";
import AttendWordCloudPage from "./spa_pages/AttendWordCloudPage";
import TermsAndPrivacy from "./component/tremsadnconditions/TermsAndPrivacy";
import UserDetailsPage from "./layouts/admin/QuizManagement/TypeUser/Userid";
import TermsOfUse from "./component/tremsadnconditions/TermsOfUse";
import Languagewise from "./layouts/admin/QuizManagement/TypeUser/Languagewise";
import RtlLayout from "./layouts/rtl";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import Banner from "./component/Banner";
import SubcriptionPanel from "./spa_pages/SubcriptionPanel";
import { useUser } from "./context/userContext";
import Cookies from "js-cookie";
import Quizpayout_Panel from "./spa_pages/Quizpayout_Panel.jsx";


function App() {
  const { currentuserdata } = useUser();
  console.log(currentuserdata);
  const [idToken, setIdToken] = useState(currentuserdata);

  // console.log(currentuserdata?.id)
  const [acCreated, setAcCreated] = useState(false);
  const logout = () => {
    setIdToken("");
    // Remove a cookie named 'XgdRTKJvdjhFGFDGD'
    Cookies.remove("XgdRTKJvdjhFGFDGD");
    localStorage.removeItem("userpic");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setIdToken={setIdToken} />} />
        <Route
          path="/signup"
          element={
            idToken ? (
              <Navigate to="/" />
            ) : (
              <SignupPage setAcCreated={setAcCreated} />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route
          path="/dashboard/*"
          element={<Dashboard logout={logout} idToken={idToken} />}
        />
        <Route
          path="/dashboard/subscription/:id"
          element={<SubcriptionPanel logout={logout} idToken={idToken} />}
        />

        <Route
          path="/dashboard/quiz-payment/:id"
          element={<Quizpayout_Panel logout={logout} idToken={idToken} />}
        />
        <Route path="/attendquiz/:id" element={<AttendQuizPage />} />
        <Route path="/attendpoll/:id" element={<AttendPollPage />} />
        <Route path="/attendwordcloud/:id" element={<AttendWordCloudPage />} />
        <Route path="/pollgraph" element={<PollGraph />} />
        <Route path="/wordcloud" element={<WordCloud />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/rtl/*" element={<RtlLayout />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/termandcondition" element={<TermsAndPrivacy />} />
        <Route path="/payoutpolicy" element={<PayoutPolicy />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/refundpolicy" element={<RefundAndCancellationPolicy />} />
        <Route path="/termsofuse" element={<TermsOfUse />} />

        {/* <Route path="/admin" element={< Admin/>} /> */}
        <Route path="/admin/quiz-management" element={<Languagewise />} />
        <Route
          path="/admin/quiz-management/user-details/:userid"
          element={<UserDetailsPage />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
