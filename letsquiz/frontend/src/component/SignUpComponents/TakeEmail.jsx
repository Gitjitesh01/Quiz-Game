import React from "react";
import swal from "sweetalert";

("react");
import axios from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { baseUrl } from "../../constants/apiUrl";
import { USER } from "../../constants/apiUrl";
import { Link } from "react-router-dom";

const TakeEmail = ({ setPageNum, setSignUpEmail }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a JavaScript object with the email
    const data = {
      email: email,
    };
    console.log(data);

    // Send the POST request using fetch or axios
    axios
      .post(baseUrl + USER.USERCLASSIFICATION, data) //https://letsquiz.org/api/user/user-classfication
      .then((response) => {
        const userType = response.data.success;
        //console.log(userType)
        if (userType === true) {
          document.getElementById("emailInUseAlert").style.display = "block";
        } else {
          //alert("valid email")
          setSignUpEmail(email);
          setPageNum(1);
        }
      })
      .catch((e) => {
        console.error("Error:", e);
      });
  };
  return (
    <>
      {/* <div
        href=""
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900 "
      >
        Welcome to
        <span className="ml-1 text-cyan-400">letsquiz</span>
      </div> */}
      <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0  ">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <Stack
            sx={{ display: "none", width: "100%" }}
            spacing={2}
            id="emailInUseAlert"
          >
            <Alert
              severity="error"
              onClose={() => {
                document.getElementById("emailInUseAlert").style.display =
                  "none";
              }}
            >
              Email is already registered.
            </Alert>
          </Stack>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl   ">
            Sign Up to your account
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
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm "
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="flex items-center justify-between"></div>
            <button className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 ">
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500  ">
              Already have an account?
              <Link to="/login" 
                className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default TakeEmail;
