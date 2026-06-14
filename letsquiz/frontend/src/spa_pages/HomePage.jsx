import React from "react";
import swal from "sweetalert";

import Footer from "../component/Home/Footer";
import Hero from "../component/Home/Hero";
import NumberTicker from "../component/NumberTicker/index";
import Navbar from "../component/Home/Navbar";
import Testimonial from "../component/Home/Testimonial";
import CarouselComp from "../component/utility/CarouselComp";
import { HomePageStats, testmonials } from "../constants";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "./AboutUsPage";
import TestimonialPage from "./TestimonialPage";
import { FeaturesPage } from "./FeaturesPage";
import img_1 from "../assets/Leenjain.png";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="mx-auto max-w-screen-xl ">
              <div className=" mt-[15vh] flex h-[40vh] w-full items-center justify-center overflow-hidden  rounded-3xl ">
                <CarouselComp />
              </div>

              <Hero />

              <Testimonial />

              <section className="z-50 my-8  bg-white">
                <h2 className="mb-8 text-center text-[2.25rem] font-bold">
                  Thousands of people use{" "}
                  <span className="text-primary-800">Lets Quiz</span>
                </h2>
                <dl className="mx-auto  flex max-w-screen-md flex-wrap  items-center justify-center gap-8 rounded-lg   ">
                  {HomePageStats.map((stat) => {
                    return (
                      <div
                        className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-lg border-2 border-zinc-300 bg-white"
                        key={stat.id}
                      >
                        <dt className="mb-2 text-3xl font-extrabold text-black md:text-4xl">
                          <NumberTicker value={stat.stat} />
                          {stat.title == "Countries" ? "+" : "k"}
                        </dt>
                        <dd className="font-light text-gray-500  ">
                          {stat.title}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </section>
              <div className="z-10 -mt-20 flex h-[30vh] w-full justify-end overflow-hidden   pr-[15%]">
                <svg
                  width="195"
                  height="427"
                  viewBox="-0 10 190 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="z-10"
                >
                  <path
                    d="M160.34 424.814C160.34 424.814 197.192 389.633 191.145 363.544C185.255 338.135 138.833 322.022 138.833 322.022C138.833 322.022 74.6316 302.519 57.2196 268.651C27.4943 210.832 148.834 189.486 141.218 124.92C132.736 53.0168 1.62086 2.91766 1.62086 2.91766"
                    stroke="url(#paint0_linear_3_191)"
                    strokeOpacity="0.5" // Convert stroke-opacity to strokeOpacity
                    strokeWidth="5"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3_191"
                      x1="-2.02476"
                      y1="6.35309"
                      x2="158.35"
                      y2="482.826"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#1D4ED8" />
                      <stop offset="1" stopColor="#0086E6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex h-[50vh]  w-full flex-wrap items-center justify-center gap-2">
                {testmonials.map((testmonial) => (
                  <div
                    key={testmonial.id}
                    className="flex h-full w-[30%] flex-col items-center justify-start gap-5 rounded-lg border-2 border-[#f6f6f6] px-10 py-5 text-center"
                  >
                    <h2 className="text-3xl font-bold text-[#1D4ED8]">
                      {testmonial.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {testmonial.description}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`relative  w-full ${`h-fit${+"10px"}`} text-center`}
              >
                <div className="absolute -top-[30%] left-1/2 z-10 h-fit w-fit -translate-x-1/2">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={img_1}
                    alt="profile picture"
                  />
                </div>

                <div className="mt-24 flex h-fit w-fit items-center justify-center">
                  <div className=" z-0 h-fit w-full  items-center justify-center rounded-lg border-2 bg-white">
                    <blockquote>
                      <p className="mt-4 text-sm font-medium italic text-gray-300   ">
                        Letsquiz is a powerful platform designed to
                        revolutionize the way educators create and assess
                        students through formative and summative assessments.
                        Whether you're an educator looking to track student
                        progress over time or a learner seeking to master a
                        variety of subjects, Letsquiz has you covered. The
                        platform offers a dynamic environment where assessments
                        are not just about grading but are also integral to the
                        learning process. With Letsquiz, educators can create
                        customized quizzes and exams that are both engaging and
                        effective. The assessments are tailored to encourage
                        students to delve deeper into their subjects, promoting
                        a mastery-based approach to learning. One of the
                        standout features of Letsquiz is its ability to make
                        learning enjoyable. By incorporating elements of
                        gamification, the platform turns assessments into a fun
                        and interactive experience, keeping students motivated
                        and engaged. Whether it's a quick quiz or a
                        comprehensive exam, Letsquiz ensures that learners are
                        not only tested on their knowledge but also inspired to
                        improve continuously. In addition, the platform provides
                        valuable insights into student performance, allowing
                        educators to identify strengths and areas for
                        improvement. This data-driven approach ensures that each
                        student receives the support they need to excel across
                        all subject areas. In summary, Letsquiz is more than
                        just an assessment tool—it's a comprehensive educational
                        platform that empowers students to achieve mastery in a
                        fun, engaging, and supportive environment. Whether for
                        formative or summative assessments, Letsquiz is the
                        ideal solution for educators and learners alike.
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/testimonials" element={<TestimonialPage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default HomePage;
