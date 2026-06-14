import React, { useContext, useEffect } from "react";
import swal from "sweetalert";

("react");
import heroImg from "../../assets/hero_img.svg";
import image1 from "../../assets/image.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Hero = () => {
  const { currentuserdata } = useUser();
  const currentUser = currentuserdata?.id;

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return (
    <section className="mt-[1rem]   bg-white">
      <Stack
        sx={{ display: "none", width: "100%" }}
        spacing={2}
        id="accountCreatedAlert"
      >
        <Alert
          onClose={() => {
            document.getElementById("accountCreatedAlert").style.display =
              "none";
          }}
        >
          You account is created, you can log in now.
        </Alert>
      </Stack>
      <div className="mx-auto grid px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-none tracking-tight text-[#1D4ED8] md:text-5xl xl:text-6xl   ">
            Engage the students to unleash their hidden Potentials
          </h1>
          <p className="mb-6 max-w-2xl font-semibold leading-3 text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Letsquiz makes the exams easy and funny for the students. It can be
            used in schools, colleges, Corporate company's etc.
          </p>
          <Link
            to={`${currentUser ? "/dashboard" : "/login"}  `}
            className="mr-3 inline-flex items-center justify-center rounded-lg bg-[#1D4ED8] px-5 py-3 text-center text-base font-bold text-white duration-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Create a Quiz / Survey
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          <p className="mb-2 block text-xs text-red-500 sm:hidden">
            *the quiz/survey can only be create on desktop
          </p>
          <Link
            to={`${currentUser ? "/dashboard/explore" : "/login"}`}
            className="text-bold mr-3  rounded-lg border-2 border-[#1D4ED8] px-5 py-3  text-center text-lg  font-bold text-[#1D4ED8] duration-200   hover:bg-[#1D4ED8] hover:text-white md:mr-0  "
          >
            Attend Quiz
          </Link>
        </div>
        <div className="relative hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img className="w-[28rem] scale-105" src={heroImg} alt="mockup" />
          <div className="absolute flex  h-full w-full">
            <img
              src={image1}
              className="box-shadow: 0px 4px 5px 0px #00000040; absolute ml-[40%] mt-[54%] w-14 animate-bounce
"
              alt="iamge"
            />
            <img
              src={image3}
              className="box-shadow: 0px 4px 5px 0px #00000040; absolute ml-[44%] mt-[16%] w-14 animate-bounce
"
              alt="iamge"
            />
            <img
              src={image4}
              className="box-shadow: 0px 4px 5px 0px #00000040; absolute -mt-[4%] ml-[54%] w-14 animate-bounce
"
              alt="iamge"
            />
            <img
              src={image2}
              className="box-shadow: 0px 4px 5px 0px #00000040; absolute ml-[78%] mt-[9%] w-14 animate-bounce
"
              alt="iamge"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
