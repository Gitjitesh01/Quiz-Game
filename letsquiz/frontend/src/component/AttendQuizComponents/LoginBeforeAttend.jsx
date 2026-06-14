import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { USER, baseUrl, PUBLICURL } from "../../constants/apiUrl";
import { useUser } from "../../context/userContext";

const LoginBeforeAttend = ({ setIndex, LogIn }) => {
  const { setCurrentUser , currentuserdata } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(currentuserdata)
  if(currentuserdata){  
    setIndex(1);
  }

  const showAlert = () => {
    document.getElementById("cantLogInAlert").style.display = "block";
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = { email, password };

      // Function to handle login and storing user data
      const loginUser = async () => {
        try {
          const result = await axios.post(baseUrl + USER.LOGIN, data);
          console.log(result.data);
          const token = result.data.token;
          const user = result.data.user;

          // Set cookies
          Cookies.set("XgdRTKJvdjhFGFDGD", token);
          Cookies.set("currentUser", JSON.stringify(user));

          // Update user context and execute callback
          setCurrentUser(user);
          LogIn();
          setIndex(1);
          // navigate("/");
        } catch (error) {
          showAlert();
          console.error("SIGN IN ERROR", error);
        }
      };

      // Function to fetch additional data
      const fetchAdditionalData = async () => {
        try {
          const [gradesResult, questionsResult, subjectsResult] = await Promise.all([
            axios.get(baseUrl + PUBLICURL.getAllGrades),
            axios.get(baseUrl + PUBLICURL.getAllQuestions),
            axios.get(baseUrl + PUBLICURL.getAllSubjects)
          ]);

          localStorage.setItem("allGrades", JSON.stringify(gradesResult.data.data));
          localStorage.setItem("allQuestions", JSON.stringify(questionsResult.data.data));
          localStorage.setItem("allSubjects", JSON.stringify(subjectsResult.data.data));
        } catch (error) {
          showAlert();
          console.error("DATA FETCH ERROR", error);
        }
      };

      // Execute functions
      await loginUser();
      await fetchAdditionalData();
    } catch (error) {
      console.error("API ERROR", error);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
        >
          Welcome to
          <span className="ml-1 text-cyan-400">letsquiz</span>
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <Stack
              sx={{ display: "none", width: "100%" }}
              spacing={2}
              id="cantLogInAlert"
            >
              <Alert
                severity="error"
                onClose={() => {
                  document.getElementById("cantLogInAlert").style.display = "none";
                }}
              >
                Incorrect username or password.
              </Alert>
            </Stack>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-md w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                <a
                  href="/forgot-password"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginBeforeAttend;
