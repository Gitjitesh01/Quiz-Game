import React from "react";
import swal from "sweetalert";

("react");
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {useUser} from '../context/userContext'


import { PUBLICURL, USER, baseUrl } from "../constants/apiUrl";
import Navbar from "../component/Home/Navbar";

const LoginPage = ({ setUserType, setIdToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {currentuserdata ,setCurrentUser} = useUser()
  const showAlert = () => {
    document.getElementById("cantLogInAlert").style.display = "block";
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
   
    try {
      const getUser = async () => {
        console.log("data", data);
        try {
          const result = await axios.post(baseUrl + USER.LOGIN, data); //https://letsquiz.org/api/user/user-login
          console.log(result.data.token);
          if(result.data.token){
            setCurrentUser(result.data.token);
            Cookies.set("XgdRTKJvdjhFGFDGD" , result.data.token);

          }
          // Cookies.set("kansihk" , "soni");
          // window.location.reload();
          navigate("/dashboard");
        } catch (error) {
          showAlert();
          console.error(" SIGN IN ERROR", error);
        }
      };
      getUser();
      const getGradesList = async () => {
        try {
          const result = await axios.get(baseUrl + PUBLICURL.getAllGrades);

          localStorage.setItem("allGrades", JSON.stringify(result.data.data));
        } catch (error) {
          showAlert();
          console.error("ERROR", error);
        }
      };
      getGradesList();
      const getQuestionList = async () => {
        try {
          const result1 = await axios.get(baseUrl + PUBLICURL.getAllQuestions);

          localStorage.setItem(
            "allQuestions",
            JSON.stringify(result1.data.data)
          );
        } catch (error) {
          showAlert();
          console.error(" ERROR", error);
        }
      };
      getQuestionList();
      const getSubjectList = async () => {
        try {
          const result2 = await axios.get(baseUrl + PUBLICURL.getAllSubjects);

          localStorage.setItem(
            "allSubjects",
            JSON.stringify(result2.data.data)
          );
        } catch (error) {
          showAlert();
          console.error("  ERROR", error);
        }
      };
      getSubjectList();
    } catch (error) {
      console.error("API2 ERROR", error);
    }
  };

  return (
    <>
    <Navbar/>
    <section className="bg-gray-50  ">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:min-h-screen lg:py-10 lg:mt-[12vh]">
       
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0  ">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <Stack
              sx={{ display: "none", width: "100%" }}
              spacing={2}
              id="cantLogInAlert"
            >
              <Alert
                severity="error"
                onClose={() => {
                  document.getElementById("cantLogInAlert").style.display =
                    "none";
                }}
              >
                Incorrect username or password.
              </Alert>
            </Stack>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl   ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900   "
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm  "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900   "
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm  "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                {/* <div className="flex items-start">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div> */}
              </div>
              <button
                type="submit"
                className="text-md w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                <a
                  href="/forgot-password"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot Password ?
                </a>
              </p>
              <p className="-top-6 text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <Link
                to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default LoginPage;
